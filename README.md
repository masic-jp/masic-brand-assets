# masic-brand-assets

MaSIC（数理社会実装教育研究センター）のブランドアセット集約リポジトリ。
ロゴ・アイコン（ベクター + ラスタ）と名刺デザイン（HTML/JSX ソースおよび配布用 standalone HTML）を一元管理する。

## ツリー

```
.
├── logo/
│   ├── masic-icon.svg          アイコン canonical（222×242）
│   ├── masic-logo.svg          フルロゴ canonical（540×375）
│   ├── png/                    ラスタ書き出し（icon 32–1024, logo 256–2048, favicon 32/64）
│   ├── sources/                元素材 PNG（ベクター化の入力）
│   ├── preview/index.html      成果物展示・ダウンロードページ
│   └── _export_png.py          SVG → PNG 一括書き出しスクリプト
│
└── business-card/
    ├── MaSIC 名刺.html          ソース（Design Exploration ビュー）
    ├── MaSIC 名刺 - 入稿用.html   ソース（トンボ付き入稿ビュー）
    ├── cards.jsx               カード V1〜V5 + MaSICLogo コンポーネント
    ├── design-canvas.jsx       Figma 風キャンバス UI
    ├── _rebuild.py             standalone を再パックするスクリプト
    └── dist/                   配布用 standalone HTML（〜2.4MB／本）
```

詳細な開発手順は [`business-card/README.md`](business-card/README.md) 参照。

## ブランドパレット

```
teal #1E656D   navy #152B3B   red #C32F30   ink #0D1117
paper #FAFAF7  paperWarm #F4F1EA  muted #6B7280
```

## 印刷仕様（名刺）

- 仕上がり: 91 × 55 mm
- 塗り足し: 各辺 +3 mm（97 × 61 mm）
- トンボ: 仕上がり線から 3 mm 外、長さ 3 mm
- 表示プレビュー: 4× スケール（PRINT_DPI = 4 px/mm → 364 × 220 px）
- 入稿は `business-card/dist/MaSIC 名刺 入稿用 - standalone.html` を A4 縦で PDF 書き出し

## ローカル動作確認

リポジトリルートで HTTP サーバを起動:

```bash
python3 -m http.server 8000
```

各ページ:

- ソース（編集中の確認）
  - http://localhost:8000/business-card/MaSIC%20名刺.html
  - http://localhost:8000/business-card/MaSIC%20名刺%20-%20入稿用.html
- standalone（最終形の確認）
  - http://localhost:8000/business-card/dist/MaSIC%20名刺%20-%20standalone.html
  - http://localhost:8000/business-card/dist/MaSIC%20名刺%20入稿用%20-%20standalone.html
- ロゴプレビュー
  - http://localhost:8000/logo/preview/index.html

`dist/*.html` と `logo/preview/index.html` は `file://` でも開ける（前者は React/Babel/フォントを CDN 経由で取得するためオンライン必須）。`MaSIC 名刺*.html`（ソース）は HTTP サーバ越しでのみ動作。

## ビルド

| スクリプト | 役割 | 前提 |
|---|---|---|
| `logo/_export_png.py` | SVG → PNG 一括書き出し | `rsvg-convert`（`brew install librsvg`） |
| `business-card/_rebuild.py` | ソース HTML/JSX を standalone にバンドル | Python 3 標準ライブラリのみ |

ロゴ差し替えや色変更を行う場合の具体的な作業順は [CLAUDE.md](CLAUDE.md) の「ロゴ SVG はコード内に inline」節を参照。
