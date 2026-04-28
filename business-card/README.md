# business-card

MaSIC 名刺のソース HTML / JSX と配布用 standalone HTML を管理する。

## 構成

| パス | 種別 | 説明 |
|---|---|---|
| `cards.html` | ソース | Design Exploration ビュー（Babel inline で JSX を読み込み） |
| `print.html` | ソース | トンボ付き入稿ビュー |
| `cards.jsx` | ソース | カード V1〜V5 + `MaSICLogo` コンポーネント定義 |
| `design-canvas.jsx` | ソース | Figma 風キャンバス UI（Section / Artboard / PostIt） |
| `_rebuild.py` | スクリプト | ソースから standalone を再パック（`--profile` で個人情報を差し替え） |
| `_base/cards.html`, `_base/print.html` | ソース | 中立プレースホルダ入りベース standalone（commit 対象。`_rebuild.py` の入力） |
| `profiles/example.json` | ソース | 個人情報プロファイルのテンプレート |
| `profiles/<name>.json` | ローカル | 各個人の実値プロファイル（gitignore） |
| `dist/cards.html`, `dist/print.html`, `dist/cards-<name>.html`, `dist/print-<name>.html` | 派生物 | `_rebuild.py` の出力（gitignore） |

## ローカル動作確認

リポジトリルート（`masic-brand-assets/`）で:

```bash
python3 -m http.server 8000
```

| URL | プロトコル要件 |
|---|---|
| http://localhost:8000/business-card/cards.html | HTTP 必須（Babel が JSX を fetch するため） |
| http://localhost:8000/business-card/print.html | HTTP 必須 |
| http://localhost:8000/business-card/dist/cards.html | `file://` で直接開いても可（要 CDN） |
| http://localhost:8000/business-card/dist/print.html | 同上 |

## 編集サイクル

1. `cards.jsx` / `design-canvas.jsx` / ソース HTML を編集
2. ブラウザでソース HTML をリロードしてライブ確認（個人情報は自分の `profiles/<name>.json` を `cards.jsx` 経由で当てるか、デフォルトのプレースホルダで確認）
3. 問題なければ `python3 _rebuild.py [--profile profiles/<name>.json]` → `dist/` 配下に standalone を出力
4. 必要なら `dist/` の standalone をブラウザで確認

ソースの変更は `_rebuild.py` を回すまで `dist/` には反映されない。

## 個人情報をプロファイル化して別の人の名刺を作る

氏名・役職・メール・Web は `profiles/<name>.json` で差し替える（`profiles/example.json` がテンプレート）。`cards.jsx` の `P` 定数のうち `name_jp` / `name_en` / `dept_jp` / `dept_en` / `email` / `web` がオーバーライド対象（組織名はリテラル固定）。

新メンバー `yamada` を追加する例:

```bash
cp profiles/example.json profiles/yamada.json
# profiles/yamada.json を編集して氏名・役職・連絡先を入れる
python3 _rebuild.py --profile profiles/yamada.json
```

出力:

- `dist/cards-yamada.html`
- `dist/print-yamada.html`

`--profile` を省略すると `dist/cards.html` / `dist/print.html` が中立プレースホルダ（`お名前 / Your Name / name@example.com`）で生成される。

`profiles/<name>.json` は `.gitignore` 拾いで untracked。各人がローカルに自分用を保持し、commit はしない。

## 入稿 PDF 書き出し

`dist/print-<name>.html`（自分用プロファイルでビルドしたもの）をブラウザで開き、

- 用紙: A4 縦
- 余白: なし（または最小）
- 背景グラフィック: ON

の設定で PDF として保存する（Chrome の「PDF として保存」推奨）。

## `_base/` の役割

`_rebuild.py` は Anthropic Design Canvas が生成した standalone のバンドラスケルトン（React/Babel/フォントを含む UUID マニフェスト + bootstrap script）を必要とする。それを `_base/` に置いて commit している。`_rebuild.py` 実行のたびに、その中の JSX とテンプレートだけを最新ソースで上書きして `dist/` に書き出す。

`_base/cards.html` / `_base/print.html` は中立プレースホルダ状態で固定されており、個人情報は含まない。Anthropic Design Canvas で再ビルドした場合（フォントを完全インライン化したい等）は、生成された standalone を `_base/` に置き換える。
