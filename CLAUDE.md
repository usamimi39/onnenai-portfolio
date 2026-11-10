# CLAUDE.md

Usamiの個人ポートフォリオ。React + Vite + TanStack Router のSPA。UIは Meta Astryx、レイアウトは Tailwind（Astryx の Tailwind ブリッジ経由）。
仕様の正は `docs/SPEC.md`、デザインの正は Figma「onnenai.cc-systems」。SPECに書いていない判断が必要になったら、推測で進めずユーザーに聞く。

## 絶対に守ること

1. **テーマの値は Astryx だけが持つ。** 色・余白・角丸・文字の値は `src/theme/onnenai-theme.ts`（defineTheme）に、Astryx にないものだけ `src/styles/app-tokens.css` に置く。Tailwind 側で値を定義しない。
2. **スタイルは `className`（Tailwind）だけで書く。** 使ってよいクラスは `docs/TOKENS.md` の一覧にあるものだけ。Tailwind の任意値（`p-[13px]`）、既定パレット（`bg-blue-500`）、インラインstyle、16進カラー、`xstyle` / StyleX は禁止。必要なトークンがなければ作らずに止めて、「Figmaにどのバリアブルを足せばよいか」をユーザーに聞く。
3. **部品は Astryx を優先する。** Button などは Astryx を使い、props は `npx @astryxdesign/cli component <Name>` で確認してから書く。Astryx で組めないものだけ自作し、作る前に理由を伝える。
4. **#66ccff（`--color-accent`）を文字色や細い線に使わない。** 白地では読めない。上に載せる文字は `--color-on-accent`。リンク文字は `--color-text-accent`。
5. **文章を書かない。** キャッチコピー、自己紹介、作品説明、担当範囲、数字、受賞歴は `src/content/*.ts` にユーザーが書く。空なら `TODO(usami): 〇〇を書く` を置く。
6. **Figmaが正。** UIを作る前に Figma MCP（`get_design_context` / `get_variable_defs` / `get_screenshot`）で該当フレームを読む。Figmaにない装飾やアニメーションを足さない。
7. **コンテンツは `src/content/*.ts` の型付き配列で持つ。** 型を緩めない（`any`、必須項目の `?` 化は禁止）。画像は import する。詳細ページは作らない。
8. **画像には必ず意味のある alt。**
9. **TanStack Start 移行を妨げない。** モジュールのトップレベルで `window` `document` `localStorage` に触らない。データは loader で用意する。

## Astryx まわりの注意
- `src/styles/globals.css` は `src/main.tsx` の1行目で import する。レイヤー順（SPEC 4.3）を崩さない。崩れてもエラーは出ないので、変更したら画面で確認する
- ダークモードは Astryx の `<Theme>` に任せる。別の仕組みを足さない
- Astryx のパッケージはバージョン固定で、全部同じリリースにそろえる。勝手に上げない
- 部品は個別エントリから import する（`@astryxdesign/core/Button`）
- Astryx CLI が生成したエージェント向けドキュメントは `docs/astryx-agent.md`。Astryx の書き方で迷ったらそこと `npx @astryxdesign/cli docs` を見る。このファイルを上書きさせない

## Figmaに指示がない限りやらないこと（AIっぽさの典型）
- 全大文字のラベル、見出しの上の小さな飾りラベル、内容が順序でないのに付ける 01/02/03
- 見出しの一語だけ色や太さを変える
- カードに影やグラデーションを付ける（このサイトのカードは境界線だけ）
- `A · B · C` 形式のメタ表記、リンク文字末尾の `→`
- セクションごとのフェードイン・スライドアップ、全カードのホバーアニメーション

## コマンド
- `pnpm dev` 開発サーバー
- `pnpm check` 型チェック + lint + `scripts/token-guard.sh`
- `pnpm build` ビルド（`dist/`）
- `pnpm deploy` ビルドしてCloudflare Workersへデプロイ（実行前にユーザーに確認）

変更のたびに `pnpm check` と `pnpm build` を通してから報告する。

## 技術メモ
- TanStack Router はファイルベース（`@tanstack/router-plugin/vite`）。`routeTree.gen.ts` は手で編集しない
- API はインストールしたバージョンの公式ドキュメントで確認してから使う
- フォントは `gen-interface-jp` をnpmからセルフホスト。ウェイトを勝手に増やさない
- 配信は Workers Static Assets（`not_found_handling: "single-page-application"`）

## Astryx エージェント向けドキュメント
@docs/astryx-agent.md
