# CLAUDE.md

このリポジトリで作業するエージェント向けの非自明な情報のみを記す。一般的な概要・使い方・パレット値などは [README.md](README.md) を参照。

## 編集対象の境界

- 編集して良い: `business-card/MaSIC 名刺*.html`（2 本）／ `business-card/cards.jsx` ／ `business-card/design-canvas.jsx` ／ `logo/masic-icon.svg` ／ `logo/masic-logo.svg`
- `business-card/dist/*.html` と `logo/png/*.png` は **派生物**。直接編集せず、`business-card/_rebuild.py` / `logo/_export_png.py` 経由で再生成する
- `logo/sources/*.png` は元素材（ベクター化の入力）。編集対象ではない
- `logo/preview/index.html` のパスは相対参照（`../masic-icon.svg` 等）。編集時に壊さないこと

## ロゴ SVG はコード内に inline（手動同期必須）

`business-card/cards.jsx` の `MaSICLogo` コンポーネントは `logo/masic-icon.svg` のパスを **inline SVG** で持つ（`<img src=...>` で参照していない）。

**Why**: `business-card/dist/*.html`（standalone）はランタイムで JSX を評価する単一 HTML として完結させたいので、外部 SVG 参照にできない。

ロゴを差し替える際の作業順:

1. `logo/masic-icon.svg`（必要なら `masic-logo.svg` も）を更新
2. `cd logo && python3 _export_png.py` で PNG を再書き出し
3. `business-card/cards.jsx` の `MaSICLogo` の viewBox / path / 色を 1. に手動同期
4. パレット定数 `C` の `teal` / `navy` / `red` を新色に同期
5. `business-card/MaSIC 名刺*.html` の `__bundler_thumbnail` template 内の SVG（フォールバック表示用の手書きシェイプ）も同色・同ジオメトリに更新
6. `cd business-card && python3 _rebuild.py` で standalone を再パック

## 旧パレット値の置換

旧値 `#1F656D` / `#162B3B` / `#C22F30` がコード内に残っていたら、それぞれ新値 `#1E656D` / `#152B3B` / `#C32F30` に置換すること（README のパレット表が新値）。

## ソース HTML は HTTP サーバ必須

`business-card/MaSIC 名刺*.html`（ソース）は Babel が `cards.jsx` / `design-canvas.jsx` を `fetch` するため、`file://` で開くと CORS でブロックされる。動作確認時は HTTP サーバを立てる（手順は README）。

`business-card/dist/*.html`（standalone）と `logo/preview/index.html` は `file://` で開いて良い。

## ソース編集後は `_rebuild.py` を回す

JSX / ソース HTML を編集しただけでは `business-card/dist/*.html` には反映されない。**ソースを変更したら必ず** `cd business-card && python3 _rebuild.py` を実行して standalone を再パックする（CI などでの自動化はしていない）。

## standalone HTML 内部構造（`_rebuild.py` メンテ時に参照）

`business-card/dist/*.html` は Anthropic Design Canvas のバンドラ出力。

- `<script type="__bundler/manifest">` — UUID → `{mime, compressed, data}` のテーブル。アセット（React / ReactDOM / Babel / Noto Sans JP 等のフォント / `cards.jsx` / `design-canvas.jsx`）は **gzip+base64** で格納
- `<script type="__bundler/ext_resources">` — 通常は空配列
- `<script type="__bundler/template">` — ソース HTML を **JSON エンコードした文字列**。`/` は `\/` にエスケープ（埋め込み HTML 内の `</script>` が外側 script タグを閉じないようにするため）
- ブートストラップ `<script>` — DOMContentLoaded 後に manifest を atob → DecompressionStream で展開 → `URL.createObjectURL` で blob URL を作り、template 内の **UUID 文字列を全置換**で blob URL に差し替えてから `DOMParser` で再パースして `documentElement.replaceWith` する

つまり template には `<script src="cards.jsx">` ではなく `<script src="<UUID>">` の形で UUID が直書きされている必要がある。UUID は standalone ごとに異なる（入稿用とエクスプロレーションで別 UUID）ため、`_rebuild.py` はハードコードせず、JSX 先頭コメント署名（`// MaSIC 名刺` / `// DesignCanvas.jsx`）でファイル名にマップしている。

### `_rebuild.py` のリミテーション

オリジナルのバンドラは `<link href="https://fonts.googleapis.com/...">` を **インライン化された `@font-face` ブロック**（manifest 内の woff2 を UUID 経由で参照）に置き換える処理を行うが、`_rebuild.py` はそれをやっていない。よって rebuild 後の standalone は:

- `cards.jsx` / `design-canvas.jsx` は manifest からインラインで読み込まれる（オフライン OK）
- React / ReactDOM / Babel / Google Fonts は CDN 参照のまま（**オフラインだとフォントとライブラリが落ちて表示が崩れる**）
- manifest にはフォントと React/Babel 一式が入ったまま（〜2 MB）だが template から参照されていないので未使用バイト

完全にオフラインで配布したい場合は Design Canvas で再生成すること。CDN 前提で良ければ `_rebuild.py` の出力で十分。
