# jackHack2025_F

このプロジェクトでは、webアプリケーションを作ります。  
セットアップ方法、git,環境構築についてまとめました。
わからないことがあったら先輩に聞きましょう！

---

## 開発環境を準備しよう！

### 1. 必要なソフトをインストール

以下のリンク先の説明にしたがって、それぞれのソフトをインストールしてください。

- **Git / GitHub（チームで作業するため）**  
  https://prog-8.com/docs/git-env-win

- **Visual Studio Code（コードを書くアプリ）**  
  https://www.kikagaku.co.jp/kikagaku-blog/visual-studio-code-windows/  
  - 推奨の拡張機能（VScode上で左にある資格が４つのマークから検索して入れてください）  
    - Live Share（任意）  
    - Prettier（コードをきれいに整えてくれる）

- **nvm・Node.js（アプリを動かすエンジン）**  
  https://qiita.com/nayoshik/items/c0febffab4a4b0ffb3b9

---

### 2. Node.js のバージョンを設定

以下のコマンドを、ターミナル（黒い画面）で順番に入力してください。

```bash
nvm install --lts --latest-npm
nvm alias default 'lts/*'

下のコマンドを実行して同じ数字が出たら成功です！
わからなかったら先輩に聞いてください

  node -v
    v22.15.0
  
  npm -v
    11.3.0
  ```


## 開発環境の立ち上げ方
- 該当の作業ディレクトリに移動する。

```cd ~/???/jackHack2025_F/subcan```

```pwd```

で/subcanが最後にあれば大丈夫！

- スタートコマンドを打つ

  `npm run dev`
  
- http://localhost:3000 にアクセス

  画面が見えれば成功！！

# gitについて（コードの記録＆共有）

**git** は、チームで効率よく開発するためのツールです。  
誰がどこを変更したかを記録したり、間違えたときに戻したり、チームと変更を共有したりできます。

## 基本の3ステップ：`add` → `commit` → `push`

### ① `git add`

変更したファイルを「保存の対象」としてマークします。

```bash
git add ファイル名     # 一部のファイルだけ追加
git add .              # すべての変更を追加
```

### ② `git commit`

変更内容を保存して、「どんな変更をしたか」をメッセージとして記録します。

```bash
git commit -m "〇〇を修正・追加"
```

例：

```bash
git commit -m "検索バーのデザインを変更"
```

### ③ `git push`

ローカル（自分のPC）で保存した変更を、GitHubにアップロードしてチームと共有します。

```bash
git push
```

---

## よく使うgitコマンドまとめ

| コマンド | 意味 |
|----------|------|
| `git status` | 今の状態を確認 |
| `git add .` | 全部の変更を追加 |
| `git commit -m "説明"` | 変更を記録する |
| `git push` | GitHubにアップロード |
| `git pull` | GitHubから最新の状態を取り込む |
| `git clone` | 最初にプロジェクトをまるごとコピーする |
---

## 困ったときは

- 「pushできない」「pullしても変わらない」などエラーが出たら、エラーメッセージを先輩に見せましょう！
-　エラーは開発において避けられないものです！のでよくわからなかったら聞きましょう！
- 少しずつ使っていくうちに、自然と慣れていきます

---

## 使用技術
frontend : Next.js

database,認証: firebase

  
