# business-card

MaSIC 名刺のソース HTML / JSX と配布用 standalone HTML を管理する。

## 構成

| ファイル | 種別 | 説明 |
|---|---|---|
| `MaSIC 名刺.html` | ソース | Design Exploration ビュー（Babel inline で JSX を読み込み） |
| `MaSIC 名刺 - 入稿用.html` | ソース | トンボ付き入稿ビュー |
| `cards.jsx` | ソース | カード V1〜V5 + `MaSICLogo` コンポーネント定義 |
| `design-canvas.jsx` | ソース | Figma 風キャンバス UI（Section / Artboard / PostIt） |
| `_rebuild.py` | スクリプト | ソースから standalone を再パック |
| `dist/MaSIC 名刺 - standalone.html` | 派生物 | 配布用バンドル（〜2.4MB） |
| `dist/MaSIC 名刺 入稿用 - standalone.html` | 派生物 | 入稿用バンドル |

## ローカル動作確認

リポジトリルート（`masic-brand-assets/`）で:

```bash
python3 -m http.server 8000
```

| URL | プロトコル要件 |
|---|---|
| http://localhost:8000/business-card/MaSIC%20名刺.html | HTTP 必須（Babel が JSX を fetch するため） |
| http://localhost:8000/business-card/MaSIC%20名刺%20-%20入稿用.html | HTTP 必須 |
| http://localhost:8000/business-card/dist/MaSIC%20名刺%20-%20standalone.html | `file://` で直接開いても可（要 CDN） |
| http://localhost:8000/business-card/dist/MaSIC%20名刺%20入稿用%20-%20standalone.html | 同上 |

## 編集サイクル

1. `cards.jsx` / `design-canvas.jsx` / ソース HTML を編集
2. ブラウザでソース HTML をリロードしてライブ確認
3. 問題なければ `python3 _rebuild.py`（このディレクトリ直下で）→ `dist/` の standalone を更新
4. 必要なら `dist/` の standalone もブラウザで確認

ソースの変更は `_rebuild.py` を回すまで `dist/` には反映されない。

## 入稿 PDF 書き出し

`dist/MaSIC 名刺 入稿用 - standalone.html` をブラウザで開き、

- 用紙: A4 縦
- 余白: なし（または最小）
- 背景グラフィック: ON

の設定で PDF として保存する（Chrome の「PDF として保存」推奨）。
