# AGENTS.md

このリポジトリで作業する AI エージェント（Antigravity, Gemini, Claude 等）向けの非自明な情報のみを記す。一般的な概要・使い方・パレット値などは [README.md](README.md) を参照。

## 編集対象の境界

- 編集して良い: `business-card/cards.html` ／ `business-card/print.html` ／ `business-card/cards.jsx` ／ `business-card/design-canvas.jsx` ／ `logo/masic-icon.svg` ／ `logo/masic-logo.svg`
- `business-card/dist/*.html` と `logo/png/*.png` は **派生物**。直接編集せず、`business-card/_rebuild.py` / `logo/_export_png.py` 経由で再生成する。`dist/` は `.gitignore` 拾い
- `business-card/_base/*.html` は **`_rebuild.py` の入力スケルトン**（中立プレースホルダ入りの commit 済 standalone）。基本的に直接編集しない。Design Canvas 等で再生成した standalone がある場合のみ手動で差し替える
- `business-card/profiles/<name>.json` は各個人がローカルに保持する個人情報プロファイル。`profiles/example.json` 以外は `.gitignore` 拾いで untracked
- `logo/sources/*.png` は元素材（ベクター化の入力）。編集対象ではない
- `logo/preview/index.html` のパスは相対参照（`../masic-icon.svg` 等）。編集時に壊さないこと

## ロゴ SVG はコード内に inline（手動同期必須）

`business-card/cards.jsx` の `MaSICLogo` コンポーネントは `logo/masic-icon.svg` を **inline SVG** で持つ（`dist/*.html` が外部ファイル参照なしで自己完結するため、`<img src=...>` では参照できない）。

ロゴを差し替える際の作業順:

1. `logo/masic-icon.svg`（必要なら `masic-logo.svg` も）を更新
2. `cd logo && python3 _export_png.py` で PNG を再書き出し
3. `business-card/cards.jsx` の `MaSICLogo` の viewBox / path / 色を 1. に手動同期
4. パレット定数 `C` の `teal` / `navy` / `red` を新色に同期
5. `business-card/cards.html` / `print.html` の `__bundler_thumbnail` template 内の SVG（フォールバック表示用の手書きシェイプ）も同色・同ジオメトリに更新
6. `cd business-card && python3 _rebuild.py` で standalone を再パック

## 旧パレット値の置換

旧値 `#1F656D` / `#162B3B` / `#C22F30` がコード内に残っていたら、それぞれ新値 `#1E656D` / `#152B3B` / `#C32F30` に置換すること（README のパレット表が新値）。

## ソース HTML は HTTP サーバ必須

`business-card/cards.html` / `business-card/print.html`（ソース）は Babel が `cards.jsx` / `design-canvas.jsx` を `fetch` するため、`file://` で開くと CORS でブロックされる。動作確認時は HTTP サーバを立てる（手順は README）。

`business-card/dist/*.html`（standalone）と `logo/preview/index.html` は `file://` で開いて良い。

## ソース編集後は `_rebuild.py` を回す

JSX / ソース HTML を編集しただけでは `business-card/dist/*.html` には反映されない。**ソースを変更したら必ず** `cd business-card && python3 _rebuild.py` を実行して standalone を再パックする。

別人の名刺を出すときは `python3 _rebuild.py --profile profiles/<name>.json` で `dist/cards-<name>.html` / `dist/print-<name>.html` が出力される。プロファイル機構の詳細は [business-card/README.md](business-card/README.md) を参照。

## 個人情報の上書き機構（`window.__MaSIC_PROFILE` / `window.MaSIC_P`）

`cards.jsx` の `const P = {...}` は IIFE で `window.__MaSIC_PROFILE` を中立プレースホルダ defaults にマージして返す形。`_rebuild.py --profile` は `cards.jsx` を gzip する**直前**に `window.__MaSIC_PROFILE = {...};\n` を 1 行プリペンドするだけ。

`P` 自体も `window.MaSIC_P` として export されており、`cards.html` の specimen 表示と `print.html` の印刷フッターはここから個人情報を引いている。

**ハードコード禁止**: `cards.jsx` 内の氏名・役職・メール表示は **必ず `{P.foo}` 経由**、`cards.html` / `print.html` 側は **必ず `{window.MaSIC_P.foo}` 経由**にすること。`P` / `MaSIC_P` を経由しないリテラルが残るとプロファイルで上書きできなくなる上、リポジトリに個人情報がリークする。

## standalone HTML 内部構造（`_rebuild.py` メンテ時に参照）

`business-card/dist/*.html` は Anthropic Design Canvas のバンドラ出力をベースにしている。

- `<script type="__bundler/manifest">` — UUID → `{mime, compressed, data}` のテーブル。アセット（React / ReactDOM / Babel / Noto Sans JP 等のフォント / `cards.jsx` / `design-canvas.jsx`）は **gzip+base64** で格納
- `<script type="__bundler/ext_resources">` — 通常は空配列
- `<script type="__bundler/template">` — ソース HTML を **JSON エンコードした文字列**。`/` は `\/` にエスケープ（埋め込み HTML 内の `</script>` が外側 script タグを閉じないようにするため）
- ブートストラップ `<script>` — DOMContentLoaded 後に manifest を atob → DecompressionStream で展開 → `URL.createObjectURL` で blob URL を作り、template 内の **UUID 文字列を全置換**で blob URL に差し替えてから `DOMParser` で再パースして `documentElement.replaceWith` する

template には `<script src="cards.jsx">` ではなく `<script src="<UUID>">` の形で UUID が直書きされている必要がある。UUID は standalone ごとに異なる（`_base/cards.html` と `_base/print.html` で別 UUID）ため、`_rebuild.py` はハードコードせず、JSX 先頭コメント署名（`// MaSIC 名刺` / `// DesignCanvas.jsx`）でファイル名にマップしている。

## `_base/` と `dist/` の関係

`_rebuild.py` は `_base/<name>.html` を読んで `dist/<name>.html`（ないし `dist/<name>-<profile>.html`）に書き出す。`_base/` は commit 対象で中立プレースホルダ状態に固定、`dist/` は `.gitignore` 拾いで各人ローカル。`_base/` は Design Canvas で再生成した standalone を貼り直す以外は書き換えない（`cards.jsx` / ソース HTML を変えても `_base/` は自動同期しない）。

`_base/` を更新する手順: `_rebuild.py` を実行 → `dist/cards.html` / `dist/print.html` が中立で出力される → それを `_base/` にコピーする。

### `_rebuild.py` のリミテーション

`_rebuild.py` は Google Fonts のインライン化をしない。rebuild 後の standalone は:

- `cards.jsx` / `design-canvas.jsx` は manifest からインラインで読み込まれる（オフライン OK）
- React / ReactDOM / Babel / Google Fonts は CDN 参照のまま（**オフラインだとフォントとライブラリが落ちて表示が崩れる**）
- manifest にはフォントと React/Babel 一式が入ったまま（〜2 MB）だが template から参照されていないので未使用バイト

完全にオフラインで配布したい場合は Design Canvas で再生成すること。CDN 前提で良ければ `_rebuild.py` の出力で十分。

## 開発環境・ツール

- **Python**: `python3` を使用する。仮想環境（`poetry` や `uv`）が導入されている場合はそれに従うこと（現時点では標準ライブラリと `rsvg-convert` に依存）。
- **HTTP Server**: ソースの確認には `python3 -m http.server 8000` 等を利用する。
- **PNG 変換**: `logo/_export_png.py` は `rsvg-convert` (`brew install librsvg`) を必要とする。
