"""Patch the Design-Canvas standalone bundles in place.

For each bundle:
- replace the embedded `__bundler/template` with the latest source HTML
- re-pack the cards.jsx / design-canvas.jsx manifest entries (gzip + base64)
- preserve everything else (fonts, React/Babel, manifest entry order)
"""
import json, gzip, base64, re, os, pathlib

ROOT = pathlib.Path(__file__).parent
DIST = ROOT / "dist"
JSX_SIGNATURES = {
    "cards.jsx":         "// MaSIC 名刺 — type-forward",
    "design-canvas.jsx": "// DesignCanvas.jsx",
}

def detect_uuids(manifest):
    out = {}
    for uuid, entry in manifest.items():
        if entry.get("mime") not in ("text/jsx", "application/javascript"):
            continue
        data = base64.b64decode(entry["data"])
        if entry.get("compressed"):
            try: data = gzip.decompress(data)
            except: continue
        head = data[:300].decode("utf-8", errors="replace").lstrip()
        for fname, sig in JSX_SIGNATURES.items():
            if head.startswith(sig):
                out[fname] = uuid
    return out  # missing entries are fine — not every bundle ships every jsx
PAIRS = [
    ("MaSIC 名刺.html",         "MaSIC 名刺 - standalone.html"),
    ("MaSIC 名刺 - 入稿用.html", "MaSIC 名刺 入稿用 - standalone.html"),
]

def repack(text: str) -> str:
    raw = text.encode("utf-8")
    return base64.b64encode(gzip.compress(raw)).decode("ascii")

def patch_block(bundle: str, tag: str, new_inner: str) -> str:
    pat = re.compile(rf'(<script type="{tag}">)(.*?)(</script>)', re.DOTALL)
    n = 0
    def sub(m):
        nonlocal n
        n += 1
        return m.group(1) + new_inner + m.group(3)
    out = pat.sub(sub, bundle, count=1)
    if n != 1:
        raise RuntimeError(f"expected 1 match for {tag}, got {n}")
    return out

DIST.mkdir(exist_ok=True)
for src_html, bundle_html in PAIRS:
    src_text = (ROOT / src_html).read_text(encoding="utf-8")
    bundle_text = (DIST / bundle_html).read_text(encoding="utf-8")

    # 1) update jsx assets in the manifest, then rewrite filename-based
    #    `src="cards.jsx"` references in the new template to point at the
    #    matching UUIDs (the bundler runtime swaps every UUID occurrence
    #    in the template for a blob URL, so the template must contain UUIDs).
    m = re.search(r'<script type="__bundler/manifest">(.*?)</script>', bundle_text, re.DOTALL)
    manifest = json.loads(m.group(1))
    uuids = detect_uuids(manifest)
    for fname, uuid in uuids.items():
        new_text = (ROOT / fname).read_text(encoding="utf-8")
        manifest[uuid]["data"] = repack(new_text)
        manifest[uuid]["compressed"] = True
        # rewrite src="cards.jsx" → src="<uuid>" (and likewise for design-canvas.jsx)
        src_text = src_text.replace(f'src="{fname}"', f'src="{uuid}"')
        print(f"  {fname} → {uuid}")

    # 2) replace template (JSON-encoded string of the source HTML).
    # Escape `/` as `\/` so embedded `</script>` cannot terminate the outer script
    # tag — this matches the original bundler's encoding.
    new_template = json.dumps(src_text, ensure_ascii=False).replace("/", r"\/")
    bundle_text = patch_block(bundle_text, "__bundler/template", new_template)
    # Same escaping for the manifest — base64 data contains `/` and could
    # accidentally form `</script>`.
    new_manifest = json.dumps(manifest, ensure_ascii=False).replace("/", r"\/")
    bundle_text = patch_block(bundle_text, "__bundler/manifest", new_manifest)


    (DIST / bundle_html).write_text(bundle_text, encoding="utf-8")
    print(f"rebuilt: dist/{bundle_html}  ({len(bundle_text):,} bytes)")
