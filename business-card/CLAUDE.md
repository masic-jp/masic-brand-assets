# business-card — ローカル動作確認

## ファイルの種類とプロトコル要件

| ファイル | 開き方 | 理由 |
|---|---|---|
| `MaSIC 名刺.html`（ソース） | **HTTP サーバ必須** | Babel が `cards.jsx` / `design-canvas.jsx` を `fetch` する。`file://` だと CORS でブロックされる |
| `MaSIC 名刺 - 入稿用.html`（ソース） | **HTTP サーバ必須** | 同上 |
| `dist/MaSIC 名刺 - standalone.html` | `file://` で直接開いて OK | JSX は manifest にインラインで入っており、外部 fetch は React/Babel/フォントの CDN のみ |
| `dist/MaSIC 名刺 入稿用 - standalone.html` | `file://` で直接開いて OK | 同上 |

`dist/*.html` は CDN 依存なので **オフラインだと React/Babel/フォントが落ちて崩れる**。完全オフライン配布が必要なら Design Canvas で再生成。

## ローカルサーバの立て方

リポジトリルート（`masic-brand-assets/`）で:

```bash
python3 -m http.server 8000
```

別タブで以下を開く:

- ソース（編集用・ライブ確認）
  - http://localhost:8000/business-card/MaSIC%20名刺.html
  - http://localhost:8000/business-card/MaSIC%20名刺%20-%20入稿用.html
- standalone（最終形の確認）
  - http://localhost:8000/business-card/dist/MaSIC%20名刺%20-%20standalone.html
  - http://localhost:8000/business-card/dist/MaSIC%20名刺%20入稿用%20-%20standalone.html
- ロゴプレビュー
  - http://localhost:8000/logo/preview/index.html

`%20` は半角スペース。日本語ファイル名はブラウザがそのまま URL エンコードしてくれることもある。

`npx serve .` や `php -S localhost:8000` でも可。

## 編集サイクル

1. `cards.jsx` / `design-canvas.jsx` / ソース HTML を編集
2. ブラウザで `http://localhost:8000/business-card/MaSIC%20名刺.html` をリロードして確認
3. OK なら `python3 _rebuild.py`（このディレクトリ直下で）→ `dist/` の standalone を更新
4. `dist/` の standalone もブラウザで確認（こちらは `file://` でも `http://localhost:8000/.../dist/...` でも可）

## 入稿出力

`dist/MaSIC 名刺 入稿用 - standalone.html` をブラウザで開き、A4 縦・余白 0・背景グラフィック ON で PDF 書き出し（Chrome の「PDF として保存」推奨）。
