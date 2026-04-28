"""Re-export PNG raster set from the canonical SVGs.

Run from the `logo/` directory:
    python3 _export_png.py

Requires `rsvg-convert` (Homebrew: `brew install librsvg`).

Each entry in TARGETS is `(source_svg, output_basename, width, height_or_None)`.
- height=None → preserve aspect ratio at the given width
- height=N    → force exact width×height (favicon variant; slight stretch since icon SVG is 222×242)
"""
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
PNG_DIR = ROOT / "png"

TARGETS = [
    ("masic-icon.svg", "masic-icon-32",   32,   None),
    ("masic-icon.svg", "masic-icon-64",   64,   None),
    ("masic-icon.svg", "masic-icon-128",  128,  None),
    ("masic-icon.svg", "masic-icon-256",  256,  None),
    ("masic-icon.svg", "masic-icon-512",  512,  None),
    ("masic-icon.svg", "masic-icon-1024", 1024, None),
    ("masic-logo.svg", "masic-logo-256",  256,  None),
    ("masic-logo.svg", "masic-logo-512",  512,  None),
    ("masic-logo.svg", "masic-logo-1024", 1024, None),
    ("masic-logo.svg", "masic-logo-2048", 2048, None),
    ("masic-icon.svg", "favicon-32", 32, 32),
    ("masic-icon.svg", "favicon-64", 64, 64),
]


def main() -> int:
    if shutil.which("rsvg-convert") is None:
        print("error: rsvg-convert not found. Install with `brew install librsvg`.", file=sys.stderr)
        return 1
    PNG_DIR.mkdir(exist_ok=True)
    for src, name, w, h in TARGETS:
        src_path = ROOT / src
        out_path = PNG_DIR / f"{name}.png"
        cmd = ["rsvg-convert", "-w", str(w)]
        if h is not None:
            cmd += ["-h", str(h)]
        cmd += ["-o", str(out_path), str(src_path)]
        subprocess.run(cmd, check=True)
        print(f"  {src} → png/{name}.png  ({w}{'×' + str(h) if h else ''})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
