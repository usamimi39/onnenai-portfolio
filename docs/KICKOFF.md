# Claude Code 最初のプロンプト（コピペ用）

リポジトリ直下に `CLAUDE.md` と `docs/SPEC.md` を置いてから、以下を順に投げる。

## プロンプト1: 既存プロジェクトの確認（10分で切り上げ）

```
docs/SPEC.md と CLAUDE.md を読んでください。
その上で、僕が過去に作った次のWebプロジェクトを読んで、コンテンツ（Markdownやデータ）の持ち方、
ディレクトリ構成、使っているライブラリ、lint/format設定を短く報告してください。
- SoundCreateWeb（https://github.com/FUNSoundCreate/SoundCreateWeb_v0 または WSL内のパス）
- {{FUTURE CLASTAR公式サイトのパス（WSL内）}}
SPEC 3章と違う点があれば、どちらに寄せるべきか提案だけしてください。まだコードは書かないでください。
```

## プロンプト2: 雛形の整理とデプロイ

```
雛形は create-tsrouter-app（file-router + Tailwind + pnpm）で作成済みです。SPEC 10章のステップ1をやってください。
- デモのルート・コンポーネント・画像を削除し、SPEC 1章の構成に合わせてください（雛形が app/ を使っていたら src/ に寄せるか、SPEC を直す案を先に出してください）
- Node 22 LTS 以上を engines と .nvmrc に書き、依存は package.json で確認できる状態に
- SPEC 2章のルーター設定、9章の wrangler.jsonc、7章の index.html を入れて、空のトップページがビルドできるところまで
- スタイルはまだ入れなくてOKです（Astryx はプロンプト3で入れます。雛形の @import "tailwindcss" はそのとき SPEC 4.3 の形に置き換えます）
pnpm build を確認したら、wrangler deploy の前に僕に確認してください。
```

## プロンプト3: Astryx とテーマ

```
SPEC 4.2〜4.10 をやってください。
- Astryx を導入する前に CLAUDE.md を退避し、astryx init が作ったエージェント向けドキュメントは docs/astryx-agent.md に移して、CLAUDE.md を元に戻してください
- Figmaの {{onnenai.cc-systems のFoundationsページURL}} を get_variable_defs で読み、SPEC 4.4 の表と食い違いがないか確認してから onnenai テーマを defineTheme で作ってください。食い違いがあれば先に教えてください
- globals.css のレイヤー順は SPEC 4.3 のとおりに。設定後、Astryx の Button に Tailwind のクラスで余白を足して効くかを確認してください
- 最後に docs/TOKENS.md を作って、使えるクラス名を見せてください
```

## プロンプト3.5: コンポーネント

```
Figmaの {{ComponentsページURL}} を読んで、SPEC 5章のとおり Tag、WorkCard を実装してください。
Button は Astryx を使います。Tag に Astryx の Badge が使えるかは、cli component Badge で確認してから判断して教えてください。
```

## プロンプト4: コンテンツとページ

```
SPEC 3章の型と、10章のMVPコンテンツの枠を src/content/ に TODO(usami) 入りで作ってください。サムネイルは届くまで、--color-accent-muted 一色の src/assets/placeholder.webp を共通で import し、各行に TODO(usami) を残してください。
その後、Figmaの {{トップ}} と {{詳細}} のフレームを読んで、/、/works、/personal、NotFound を実装してください。
```

## プロンプト5: 仕上げ

```
ThemeToggle（SPEC 4.6）、2章のアクセシビリティ対応を入れて、8章と9章の確認項目をチェックしてください。
問題がなければ deploy してよいか聞いてください。
```
