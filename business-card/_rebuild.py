"""Patch the Design-Canvas standalone bundles into `dist/`.

Reads base bundles from `_base/` (committed; neutral / no personal info),
patches their template + manifest with the current source HTML and JSX,
and writes the result to `dist/` (gitignored).

With `--profile path/to/foo.json`, prepend `window.__MaSIC_PROFILE = {...};`
to cards.jsx before gzipping. cards.jsx merges that over its placeholder `P`,
so the profile values are baked into the dist bundles. Output filenames get
a `-foo` suffix; without `--profile`, dist bundles show neutral placeholders.
"""
import argparse, json, gzip, base64, re, os, pathlib

ROOT = pathlib.Path(__file__).parent
BASE = ROOT / "_base"
DIST = ROOT / "dist"
JSX_SIGNATURES = {
    "cards.jsx":         "// MaSIC 名刺 — type-forward",
    "design-canvas.jsx": "// DesignCanvas.jsx",
}

ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
ap.add_argument("--profile", type=pathlib.Path, default=None,
                help="JSON profile to inject into cards.jsx (e.g. profiles/uda.json)")
args = ap.parse_args()
profile = json.loads(args.profile.read_text(encoding="utf-8")) if args.profile else None
profile_suffix = f"-{args.profile.stem}" if args.profile else ""

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
    # (source_html_in_root, base_bundle_in_BASE, output_template_in_DIST_with_{suffix})
    ("cards.html", "cards.html", "cards{suffix}.html"),
    ("print.html", "print.html", "print{suffix}.html"),
]

def repack(text: str) -> str:
    raw = text.encode("utf-8")
    return base64.b64encode(gzip.compress(raw)).decode("ascii")

def patch_block(bundle: str, tag: str, new_inner: str) -> str:
    # HTML5 ends a <script> only when </script> is followed by whitespace, ">", or "/".
    # The bundler relies on this: JSON-encoded content can contain `</script>` (the
    # surrounding JSON quote means the next char is literal backslash-n, which is
    # NOT a terminator). So the regex must require a real terminator after </script>
    # to avoid matching the FIRST inner pseudo-close instead of the real one.
    pat = re.compile(rf'(<script type="{tag}">)(.*?)(</script>(?=[\s/>]))', re.DOTALL)
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
for src_html, base_bundle_html, out_template in PAIRS:
    src_text = (ROOT / src_html).read_text(encoding="utf-8")
    bundle_text = (BASE / base_bundle_html).read_text(encoding="utf-8")
    out_html = out_template.format(suffix=profile_suffix)

    # 1) update jsx assets in the manifest, then rewrite filename-based
    #    `src="cards.jsx"` references in the new template to point at the
    #    matching UUIDs (the bundler runtime swaps every UUID occurrence
    #    in the template for a blob URL, so the template must contain UUIDs).
    m = re.search(r'<script type="__bundler/manifest">(.*?)</script>', bundle_text, re.DOTALL)
    manifest = json.loads(m.group(1))
    uuids = detect_uuids(manifest)
    for fname, uuid in uuids.items():
        new_text = (ROOT / fname).read_text(encoding="utf-8")
        if profile is not None and fname == "cards.jsx":
            new_text = (
                f"window.__MaSIC_PROFILE = {json.dumps(profile, ensure_ascii=False)};\n"
                + new_text
            )
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


    (DIST / out_html).write_text(bundle_text, encoding="utf-8")
    print(f"rebuilt: dist/{out_html}  ({len(bundle_text):,} bytes)")

# canva-export: lightweight path — no _base/ needed.
# Inlines cards.jsx directly (replaces `src="cards.jsx"` with inline script)
# so the output is self-contained for Canva's importer. CDN references
# (React, Babel, Google Fonts) are left as-is; Canva fetches them at import time.
canva_src = (ROOT / "canva-export.html").read_text(encoding="utf-8")
jsx_text = (ROOT / "cards.jsx").read_text(encoding="utf-8")
if profile is not None:
    jsx_text = (
        f"window.__MaSIC_PROFILE = {json.dumps(profile, ensure_ascii=False)};\n"
        + jsx_text
    )
canva_out = canva_src.replace(
    '<script type="text/babel" src="cards.jsx"></script>',
    f'<script type="text/babel">\n{jsx_text}\n</script>',
)
if canva_out == canva_src:
    raise RuntimeError('canva-export.html: could not find <script type="text/babel" src="cards.jsx"></script>')
out_canva = f"canva-export{profile_suffix}.html"
(DIST / out_canva).write_text(canva_out, encoding="utf-8")
print(f"rebuilt: dist/{out_canva}  ({len(canva_out):,} bytes)")
