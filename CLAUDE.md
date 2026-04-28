# masic-brand-assets

MaSIC（数理社会実装教育研究センター）のブランドアセット集約リポジトリ。
ロゴ・アイコン（ベクター + ラスタ）と名刺デザイン（HTML/JSX ソースおよび配布用 standalone HTML）を一元管理する。

## ツリー

```
.
├── logo/
│   ├── masic-icon.svg          ✅ アイコン canonical（222×242）
│   ├── masic-logo.svg          ✅ フルロゴ canonical（540×375）
│   ├── png/                    ✅ ラスタ書き出し（icon 32–1024, logo 256–2048, favicon 32/64）
│   ├── sources/                📄 元素材 PNG（ベクター化の入力）
│   ├── preview/index.html      🌐 成果物展示・ダウンロードページ
│   └── _export_png.py          🛠 SVG → PNG 一括書き出しスクリプト
│
└── business-card/
    ├── MaSIC 名刺.html          ✏️ ソース（Design Exploration ビュー）
    ├── MaSIC 名刺 - 入稿用.html   ✏️ ソース（トンボ付き入稿ビュー）
    ├── cards.jsx               ✏️ カード V1〜V5 + MaSICLogo コンポーネント
    ├── design-canvas.jsx       ✏️ Figma 風キャンバス UI
    ├── _rebuild.py             🛠 standalone を再パックするスクリプト
    └── dist/                   ✅ 配布用 standalone HTML（〜2.4MB／本）
```

編集対象は **ソース HTML 2 本 + JSX 2 本 + SVG 2 本** のみ。`dist/` と `png/` は派生物（ただしコミット対象）。

## ローカル動作確認

ソース HTML（`business-card/MaSIC 名刺*.html`）は Babel が JSX を fetch するため **HTTP サーバが必要**（`file://` 不可）。リポジトリルートで `python3 -m http.server 8000` を起動して http://localhost:8000/ から各ページを開く。詳細は [`business-card/CLAUDE.md`](business-card/CLAUDE.md) 参照。

`dist/*.html` と `logo/preview/index.html` は `file://` で直接開いても表示できる。

## ロゴはコード内に inline SVG（手動同期）

`business-card/cards.jsx` の `MaSICLogo` コンポーネントは `logo/masic-icon.svg` のパスを inline で持つ。Design Canvas の standalone は外部 SVG 参照ではなくランタイムで JSX を評価する単一 HTML として完結させたいため。

ロゴを差し替える際の作業順:

1. `logo/masic-icon.svg`（必要なら `masic-logo.svg` も）を更新
2. `cd logo && python3 _export_png.py` で PNG を再書き出し
3. `business-card/cards.jsx` の `MaSICLogo` の viewBox / path / 色を 1. に手動同期
4. パレット定数 `C` の `teal` / `navy` / `red` を新色に同期
5. ソース HTML 2 本の `__bundler_thumbnail` template 内の SVG（フォールバック表示用の手書きシェイプ）も同色・同ジオメトリに更新
6. `cd business-card && python3 _rebuild.py` で standalone を再生成

## ブランドパレット

```
teal #1E656D   navy #152B3B   red #C32F30   ink #0D1117
paper #FAFAF7  paperWarm #F4F1EA  muted #6B7280
```

`#1F656D` / `#162B3B` / `#C22F30` は旧値。検索して残っていれば差し替え対象。

## 印刷仕様（名刺）

- 仕上がり: 91 × 55 mm
- 塗り足し: 各辺 +3 mm（97 × 61 mm）
- トンボ: 仕上がり線から 3 mm 外、長さ 3 mm
- 表示プレビュー: 4× スケール（PRINT_DPI = 4 px/mm → 364 × 220 px）
- 入稿は `business-card/dist/MaSIC 名刺 入稿用 - standalone.html` を A4 縦で書き出す

## standalone HTML の構造（参考）

`business-card/dist/*.html` は Anthropic Design Canvas のバンドラ出力。構造は:

- `<script type="__bundler/manifest">` — UUID → `{mime, compressed, data}` のテーブル。アセット（React / ReactDOM / Babel / Noto Sans JP 等のフォント / `cards.jsx` / `design-canvas.jsx`）は **gzip+base64** で格納
- `<script type="__bundler/ext_resources">` — 通常は空配列
- `<script type="__bundler/template">` — ソース HTML を **JSON エンコードした文字列**。`/` は `\/` にエスケープ（埋め込み HTML 内の `</script>` が外側の script タグを閉じないようにするため）
- ブートストラップ `<script>` — DOMContentLoaded 後に manifest を atob → DecompressionStream で展開 → `URL.createObjectURL` で blob URL を作り、template 内の **UUID 文字列を全置換**で blob URL に差し替えてから `DOMParser` で再パースして `documentElement.replaceWith` する

つまり template には `<script src="cards.jsx">` ではなく `<script src="<UUID>">` の形で UUID が直書きされている必要がある。

### `_rebuild.py` の動作

`business-card/` 直下で `python3 _rebuild.py` を実行。各 standalone ペアに対して:

1. manifest 中の `text/jsx` / `application/javascript` エントリを展開し、先頭コメント署名（`// MaSIC 名刺` / `// DesignCanvas.jsx`）でファイル名にマップ
2. 編集後の JSX を gzip+base64 して当該エントリの `data` を上書き
3. ソース HTML を新 template として用意し、`src="cards.jsx"` / `src="design-canvas.jsx"` を対応する UUID に置換
4. `json.dumps(..., ensure_ascii=False).replace("/", r"\/")` で template / manifest を再エンコードし、それぞれの `<script>` ブロックを差し替え
5. 結果を `dist/` に書き戻す

UUID は standalone ごとに異なる（入稿用とエクスプロレーションで別 UUID）ため、ハードコードせず署名マッチで動的に検出している。

### `_rebuild.py` のリミテーション

オリジナルのバンドラは `<link href="https://fonts.googleapis.com/...">` を **インライン化された `@font-face` ブロック**（manifest 内の woff2 を UUID 経由で参照）に置き換える処理を行うが、この再構成は `_rebuild.py` ではやっていない。よって rebuild 後の standalone は:

- `cards.jsx` / `design-canvas.jsx` は manifest からインラインで読み込まれる（オフライン OK）
- React / ReactDOM / Babel / Google Fonts は CDN 参照のまま（**オフラインだとフォントとライブラリが落ちて表示が崩れる**）
- manifest にはフォントと React/Babel 一式が入ったまま（〜2 MB）だが template から参照されていないので未使用バイト

完全にオフラインで配布したい場合は Design Canvas で再生成する方が確実。CDN が使える前提で良ければ `_rebuild.py` の出力で十分。
