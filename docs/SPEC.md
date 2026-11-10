# ポートフォリオサイト 技術仕様（SPEC）

最終更新: 2026-11-10（Astryx 導入版） / オーナー: @Usami
このファイルが実装の正。制作ブリーフ（目的・メッセージ・情報設計）を技術判断に落としたもの。
`{{ }}` はユーザー入力待ちのプレースホルダ。

---

## 0. 決定事項サマリ

| 項目 | 決定 |
| --- | --- |
| 構成 | React + Vite + TanStack Router（ファイルベースルーティング）のSPA |
| 将来 | TanStack Start へ移行してプリレンダリング化（提出後、任意） |
| 実行環境 | Node 22 LTS 以上 / pnpm |
| 配信 | Cloudflare Workers Static Assets（Workerスクリプトなし、SPAフォールバック） |
| ドメイン | `{{DOMAIN}}`（Cloudflare管理、Workersのカスタムドメインで接続） |
| UIライブラリ | Meta Astryx（`@astryxdesign/core`、ベータのためバージョン固定）。テーマ・トークン・ダークモード・基本部品を担当 |
| スタイル | Tailwind CSS v4 を Astryx の Tailwind ブリッジ経由で使用。値は持たず、Astryx のトークンを読むクラス名だけ使う。StyleX（`xstyle`）は使わない |
| ダークモード | Astryx の `<Theme>` が管理（`data-theme` と `light-dark()`）。初期値はOS設定、手動トグルあり |
| フォント | npm `gen-interface-jp` をセルフホストし、Astryx テーマのフォントを差し替え |
| ベースカラー | #66ccff（`--color-accent`） |
| Figma | onnenai.cc-systems（Foundations / Components ページ）が正 |
| コンテンツ | `src/content/*.ts` に型付きの配列で持つ（SoundCreateWeb の `members.ts` と同じ書き方） |
| URL | `/` `/works` `/personal` ＋ notFound（詳細ページは作らない） |
| カード並び順 | 重要度順（frontmatter `order` 昇順）。年はタグで表示 |
| カードのタグ | 担当（roles）と年（year） |
| カードの行き先 | 外部リンク（`links[0]`）。リンクがなければボタンなし |
| OGP / SEO | サイト共通のOGPを `index.html` に固定で書くだけ。ページごとのOGPとSEOは対象外 |

### 判断の記録（About用の材料。文章はユーザーが書く）
- ポートフォリオは企業に見せるための独立したサイトで、検索流入やページ単位のシェアを狙わない。そのためSSRやプリレンダリングを必須にせず、いちばん書き慣れていて構成がすっきりする React + Vite + TanStack Router を選んだ
- 採用担当がURLをチャットなどに貼ったときのプレビューは、サイト共通のOGPで足りる
- 型安全なルーティング、ホバー時の先読み、View Transitions はTanStack Routerの標準機能で実現
- 将来ブログなどページ単位の発信が必要になったら、同じルーティングのまま TanStack Start に移せる構成にしてある
- Next.jsは慣れているが、サーバー機能を使わないサイトには過剰と判断。React Routerは適切だが、自分が説明しきれない技術で作ることを避けた
- 作品は外部リンクへ飛ばすため詳細ページを持たず、コンテンツはTypeScriptの型付き配列で管理する。ブログのように本文を書きたい内容は、このサイトではなく別のブログで扱う
- テーマ・部品・レイアウトは Astryx、微調整は Tailwind と役割を分けた。Tailwind は公式ブリッジで Astryx のトークンを読むだけにし、テーマの値を二重に持たない

---

## 1. ディレクトリ構成

```
.
├── CLAUDE.md                 # このプロジェクトのルール（Astryx CLI が生成する内容は末尾に統合）
├── docs/SPEC.md
├── docs/TOKENS.md            # ブリッジで使えるクラス名の一覧（実装時に生成）
├── index.html                # 共通OGP、<noscript>
├── public/
│   ├── og/default.png        # 1200x630
│   ├── favicon.svg
│   └── _headers
├── src/
│   ├── main.tsx              # 1行目で globals.css を import → <Theme> → RouterProvider
│   ├── routes/               # ファイルベースルーティング（routeTree.gen.ts は自動生成）
│   │   ├── __root.tsx        # Header + <Outlet/> + Footer、notFoundComponent
│   │   ├── index.tsx
│   │   ├── works.tsx
│   │   └── personal.tsx
│   ├── components/           # Header, Footer, WorkCard, CardGrid, Tag, ThemeToggle, NotFound
│   ├── content/
│   │   ├── types.ts          # Work / Profile の型
│   │   ├── profile.ts        # トップのヒーロー兼About
│   │   ├── works.ts          # チーム・公的な制作
│   │   ├── personal.ts       # 個人の創作・開発
│   │   └── index.ts          # 並び替え・featured 抽出などの関数
│   ├── assets/works/         # サムネイル（TSから import する）
│   ├── themes/onnenai/
│   │   ├── onnenaiTheme.ts       # defineTheme({ extends: neutral, ... })。Figmaの値をここに写す
│   │   ├── onnenaiTheme.doc.mjs  # `astryx theme add` が読む記述子
│   │   └── onnenai.{css,js,d.ts} # `pnpm theme:build` の生成物（手で編集しない）
│   ├── astryx-themes.ts      # `astryx theme add` が生成。onnenai テーマを既定にする
│   └── styles/
│       └── globals.css       # レイヤー順の宣言 + Tailwind + Astryx + ブリッジ（最初に読み込む）
├── scripts/
│   └── token-guard.sh        # 値の直書き検出
├── vite.config.ts
└── wrangler.jsonc
```

---

## 2. ルーティング

- `@tanstack/react-router` + `@tanstack/router-plugin/vite`（ファイルベース、autoCodeSplitting 有効）
- `createRouter` のオプション: `defaultPreload: "intent"`、`scrollRestoration: true`、`defaultViewTransition: true`
- 存在しないパスは `__root` の `notFoundComponent` で404表示
- ページタイトルは各ルートの `head` で設定（インストールしたバージョンで `head` / `<HeadContent />` が使えなければ、ルートコンポーネントで `document.title` を設定）
- `prefers-reduced-motion: reduce` のときView Transitionのアニメーションを止める

### アクセシビリティ（SPA特有）
- ページ遷移後、メインの `<h1>` にフォーカスを移す（`tabIndex={-1}`）。スクリーンリーダーに遷移が伝わるようにする
- 各ページに `<h1>` は1つ

### 将来の TanStack Start 移行に備えて守ること
- モジュールのトップレベルで `window` `document` `localStorage` に触らない（`useEffect` かイベントハンドラ内だけ）
- データ取得は loader に置き、コンポーネント内で非同期取得しない
- ルートファイルの構成とパスは移行後もそのまま使う

---

## 3. コンテンツモデル

SoundCreateWeb（`src/lib/members.ts`）と同じく、型を書いて配列で持つ。Markdown・frontmatter・パーサーは使わない。必須項目の抜けは型チェック（`pnpm check`）で止まる。

### 3.1 型（src/content/types.ts）

```ts
export type WorkLink = {
  label: string; // ボタンの文言（例: "Bandcampで聴く"）
  href: string;
};

export type Work = {
  id: string;            // URLに使えるASCIIスラッグ。React の key にも使う
  title: string;
  summary: string;       // カードの説明。1〜2行（60字程度まで）
  thumbnail: string;     // src/assets から import した画像
  thumbnailAlt: string;  // 必須。画像の内容を説明する
  year: number;
  roles: string[];       // 自分の担当だけ（例: ["主催", "ディレクション"]）
  order: number;         // 小さいほど上。重要度順
  featured?: boolean;    // トップのイチオシ（2〜3件）
  links: WorkLink[];     // 先頭がカードのボタンになる。空ならボタンなし
};
```

### 3.2 データ（src/content/works.ts / personal.ts）

```ts
import type { Work } from "./types";
import miraithmicThumb from "../assets/works/miraithmic.webp";

export const works: Work[] = [
  {
    id: "miraithmic",
    title: "Miraithmic",
    summary: "TODO(usami): 説明を書く",
    thumbnail: miraithmicThumb,
    thumbnailAlt: "TODO(usami): 代替テキストを書く",
    year: 2025,
    roles: ["TODO(usami)"],
    order: 10,
    featured: true,
    links: [{ label: "TODO(usami)", href: "https://..." }],
  },
];
```

- 画像は文字列パスでなく import する。ファイルがなければビルドが失敗し、ファイル名にハッシュが付いてキャッシュも効く
- 文章・担当・年・リンクはユーザーが書く。AIは `TODO(usami)` を置くだけ
- チーム成果は担当範囲を正確に書く（例: FUTURE CLASTAR の照明同期は、先輩が制作したツールから書き出したデータを映像に反映したもの）
- `src/content/index.ts` に `getFeatured()`（works と personal から featured を order 順）と `sortWorks()`（order 昇順 → year 降順）を置く

### 3.3 プロフィール（src/content/profile.ts）

```ts
export type Profile = {
  catchcopy: string;
  nameReal: string;
  nameAlt: string;
  affiliation: string;
  intro: string;
  positions: string[];
  awards: string[];
  skills: { group: string; items: string[] }[];
  links: { label: string; href: string }[];
};
```

値はすべてユーザーが書く（ESと同じ言葉で）。

### 3.4 将来ブログ的な内容が必要になったら
本文を書きたい内容（ケーススタディなど）は、まず別のブログで扱う。どうしてもこのサイトに置くなら、SoundCreateWeb の `/news` と同じく MDX（`export const metadata`）で追加する。

---

## 4. デザインシステム（Astryx + Tailwind ブリッジ）

### 4.1 役割分担

| 担当 | 持つもの |
| --- | --- |
| Figma（onnenai.cc-systems） | 値の正。バリアブル（Primitives / Color(Light,Dark) / Dimension / Typography）、テキストスタイル、コンポーネント |
| Astryx | テーマ（`defineTheme`）、トークンのCSS変数、ダークモード（`<Theme>`）、Button などの部品、レイアウト部品（VStack / HStack / Grid など） |
| Tailwind | 部品の `className` での微調整と、Astryx で表せないもの（比率、object-fit、最大幅、ブレークポイント）だけ。ブリッジ経由で Astryx のトークンを読むだけで、値は持たない |
| テーマの `localTokens` | Astryx にないアプリ独自トークンだけ |

スタイルを書く手段は `className`（Tailwind）だけ。Astryx 部品の見た目調整も `className` で行い、`xstyle` / StyleX は使わない。

### 4.2 導入

```bash
pnpm add -E @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral
pnpm add -D -E @astryxdesign/cli
npx @astryxdesign/cli init        # エージェント向けドキュメント生成（CLAUDE.md の扱いは 4.8）
npx @astryxdesign/cli theme add neutral
```

- バージョンは `-E` で固定し、Astryx のパッケージは必ず同じリリースにそろえる（テーマは対応する Core のリリースが決まっている）
- pnpm の新着リリース待機設定を使う場合は `@astryxdesign/*` を丸ごと除外する
- 部品は個別エントリから import（`@astryxdesign/core/Button` など）
- API・props は推測せず `npx @astryxdesign/cli component <Name>` と `npx @astryxdesign/cli docs <topic>` で確認する

### 4.3 globals.css（レイヤー順が最重要）

公式の「新規アプリ + Tailwind」構成に従う。テーマ行は onnenai テーマ用に CLI が生成するものへ置き換える。

```css
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "@astryxdesign/theme-neutral/theme.css";   /* onnenai テーマのCSSに置き換え */
@import "@astryxdesign/core/tailwind-theme.css";   /* ブリッジ */
@import "tailwindcss/utilities.css" layer(utilities);

@import "gen-interface-jp/400.css";
@import "gen-interface-jp/500.css";
@import "gen-interface-jp/700.css";
```

- `globals.css` は `src/main.tsx` の**1行目**で import する。生成された `astryx-themes` やテーマCSSより先に読まれないとレイヤー順が崩れる
- 崩れてもビルドもコンソールも何も言わない。実装後に、Tailwind のユーティリティが Astryx 部品の既定スタイルを上書きできること、Astryx の reset がユーティリティを打ち消していないことを画面で確認する

### 4.4 テーマ（src/themes/onnenai/onnenaiTheme.ts）

Astryx の `theme add` は `src/themes/<slug>/` だけを読むため、この場所に置く。値を変えたら `pnpm theme:build` で再ビルドする。

`defineTheme({ extends: <neutral テーマ>, ... })` で、Figma の値を上書きする。書き方は `npx @astryxdesign/cli docs author-a-theme` を見て合わせる。

**命名ルール:** Figma のバリアブル名の `/` を `-` に置き換えたものが CSS 変数名。

| Figma | CSS 変数 | Light | Dark |
| --- | --- | --- | --- |
| color/background/body | --color-background-body | mist/50 #f5f8fa | abyss/950 #070d12 |
| color/background/surface | --color-background-surface | mist/0 #ffffff | abyss/900 #0e1820 |
| color/background/card | --color-background-card | mist/0 #ffffff | abyss/900 #0e1820 |
| color/background/muted | --color-background-muted | mist/100 #ecf1f4 | abyss/800 #19242e |
| color/text/primary | --color-text-primary | mist/900 #121921 | moon/100 #e7eff3 |
| color/text/secondary | --color-text-secondary | mist/500 #5e6d79 | moon/400 #98a8b3 |
| color/text/accent | --color-text-accent | tianyi/700 #006aa3 | tianyi/400 #66ccff |
| color/accent | --color-accent | tianyi/400 #66ccff | tianyi/400 #66ccff |
| color/accent-muted | --color-accent-muted | tianyi/100 #d6f1ff | tianyi/900 #09283e |
| color/on-accent | --color-on-accent | mist/900 #121921 | abyss/950 #070d12 |
| color/border | --color-border | mist/200 #dae2e7 | abyss/700 #293642 |
| color/border-emphasized | --color-border-emphasized | mist/300 #c4cfd4 | abyss/600 #3d4e5c |
| focus/outline-color | --focus-outline-color | tianyi/600 #0088cc | tianyi/400 #66ccff |

上の表は確認用の写し。食い違ったら Figma（`get_variable_defs`）が正。

**色の約束（コントラスト）**
- #66ccff は白地で 1.8:1。文字色・細い線には使わない。塗りに使い、上の文字は `--color-on-accent`（濃色）。白文字は不可
- ライトのリンク文字は `--color-text-accent`（#006aa3）、フォーカスリングは #0088cc

**その他の上書き**
- 角丸: `--radius-inner` 8 / `--radius-element` 12 / `--radius-container` 16 / `--radius-page` 32 / `--radius-full`（Astryx と同名・同値。Figma と一致を確認するだけ）
- 余白: Figma の spacing/1〜12 は Astryx の `--spacing-1`〜`--spacing-12` と同値（4px単位）
- フォント: `--font-family-body` と `--font-family-heading` を `"Gen Interface JP", system-ui, sans-serif` に。neutral テーマのフォント（Figtree）のCSSが読み込まれないようにする
- タイプスケール（`typography.scale`）を Figma のテキストスタイルに合わせる:

| Figma テキストスタイル | Astryx scale | サイズ / 行間 / ウェイト |
| --- | --- | --- |
| display/1 | display1 | 56px / 115% / 700 |
| display/2 | display2 | 40px / 120% / 700 |
| heading/h1 | h1 | 32px / 130% / 700 |
| heading/h2 | h2 | 24px / 140% / 700 |
| heading/h3 | h3 | 20px / 150% / 700 |
| text/large | large | 18px / 170% / 400 |
| text/body | body | 16px / 180% / 400（Astryx 既定の14pxから上げる） |
| text/label | label | 14px / 150% / 500 |
| text/supporting | supporting | 13px / 160% / 400 |

### 4.5 アプリ独自トークン（onnenai テーマの `localTokens`）

Astryx にないものだけ。名前を Astryx と重ねない。`:root` には書かない。

```ts
localTokens: {
  '--color-decor-dot': ['#c4cfd4', '#19242e'],
  '--decor-dot-size': '3.2px',
  '--decor-dot-gap': '28px',
  '--layout-content-width': '1120px',
  '--layout-gutter': '24px',
  '--space-block': '64px',   // Figma spacing/16
  '--space-section': '96px', // Figma spacing/24
},
```

Tailwind から使うものは `globals.css` の `@theme reference inline` で別名を付けて公開する（Astryx・ブリッジの名前と衝突しないことを確認）。

### 4.6 ダークモード
- Astryx の `<Theme>` が `data-theme="light|dark"` を `<html>` に同期する。ほかのダークモードの仕組みを足さない
- 初期値はOS設定。ThemeToggle は Astryx の API（`useTheme` など）でモードを切り替える。選択を保存する必要があれば、Astryx に保存機能がない場合だけ `localStorage` を使う（読み書きは `useEffect` 内）

### 4.7 ドット背景
`body` の背景に CSS で描く。画像にしない。

```css
background-color: var(--color-background-body);
background-image: radial-gradient(var(--color-decor-dot) calc(var(--decor-dot-size) / 2), transparent 0);
background-size: var(--decor-dot-gap) var(--decor-dot-gap);
```

カードの上にはドットを出さない（カードは `--color-background-card` で塗る）。

### 4.8 CLAUDE.md の統合
`astryx init` は AGENTS.md / CLAUDE.md を生成する。このリポジトリの CLAUDE.md を上書きさせない。生成内容は `docs/astryx-agent.md` に退避し、CLAUDE.md の末尾から参照する。

### 4.9 直書き検出（scripts/token-guard.sh）
`src/` 配下で以下を検出したら exit 1。`pnpm check` に含める。
- Tailwind の任意値: `-\[`
- Tailwind 既定パレット: `-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}`
- 16進カラー・`rgb(`・`hsl(`（`src/themes/` 以外）
- `style={{`、`xstyle`、`stylex`

### 4.10 使えるクラス名の一覧（docs/TOKENS.md）
導入後、`node_modules/@astryxdesign/core/tailwind-theme.css` と `globals.css` の `@theme reference inline` を読み、使えるクラス名（色・余白・角丸・影・文字）を一覧にして `docs/TOKENS.md` に書き出す。実装ではこの一覧にあるクラスだけを使う。

---

## 5. コンポーネント

Figma の Components ページと名前・プロパティをそろえる。

| Figma | 実装 | 仕様 |
| --- | --- | --- |
| Button（Style=Primary / Secondary） | Astryx `Button` | Primary は #66ccff の塗り＋濃色文字。1画面に1つまで。variant 名は `cli component Button` で確認 |
| Tag | 自作（Astryx の Badge は数の表示専用なので使わない）。中身は Astryx の部品で組む | 担当と年の小ラベル。`--color-background-muted` 地、`--color-text-secondary` 文字、角丸 full |
| WorkCard | 自作。Astryx のレイアウト部品で組み、Astryx に合う Card があれば中身に使ってよい。Tailwind は微調整だけ | サムネ16:9、タイトル（h3）、説明（body・secondary）、Tag、外部リンクのボタン（`links[0]`）。影なし・境界線あり・角丸 container。カード内リンクは1つ |
| Background/DotGrid | CSS（4.7） | |
| Header / Footer / ThemeToggle / NotFound | 自作（Astryx のレイアウト部品で組む）。中のボタン類は Astryx | Figma で作ったら追加 |

- サムネイルは `aspect-ratio` 固定＋`object-fit: cover`、`loading="lazy" decoding="async"`（トップのイチオシは eager）
- 外部リンクは `target="_blank" rel="noopener"` と、外部であることの視覚的手がかり＋読み上げテキスト

---

## 6. ページ仕様

### `/`（ヒーロー兼About）
キャッチコピー → 名前（本名とalt名義を併記）・所属 → 短い自己紹介 → イチオシ作品（`featured` を order 順に2〜3件、Miraithmic と universe を先頭）→ 役職・受賞 → スキル → 外部リンク → 技術構成の短い説明。文章はすべて `src/content/profile.ts` から。

### `/works` `/personal`
ページ見出し＋一言説明＋CardGrid。

### 迷い方の上限
どのページもヘッダーから一覧へ1クリック、作品の外部リンクへ2クリック。

---

## 7. index.html（共通メタ）

- `<html lang="ja">`、`<title>`、`description`
- 共通OGP: `og:title` `og:description` `og:type=website` `og:url=https://{{DOMAIN}}/` `og:image=https://{{DOMAIN}}/og/default.png` `twitter:card=summary_large_image`
- `<noscript>`: 名前と、SoundCloud・pixiv・GitHubなど主要リンクだけを書いた最小限の内容

---

## 8. 品質の目標
- Lighthouse（モバイル）Performance / Accessibility / Best Practices 95以上を目安
- 初回のJSは小さく保つ（ルート単位のコード分割、Astryx 部品は個別 import）
- 画像はWebP、サムネは幅800px程度まで
- キーボードで全操作でき、フォーカスリングが見える
- 360px幅で横スクロールが出ない

---

## 9. デプロイ

### wrangler.jsonc

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "usami-portfolio",
  "compatibility_date": "2026-11-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  },
  "routes": [
    { "pattern": "{{DOMAIN}}", "custom_domain": true }
  ]
}
```

- `pnpm deploy` = `pnpm build && wrangler deploy`（実行前にユーザーに確認）
- 今夜はローカルから手動デプロイ。Git連携は提出後でよい
- デプロイ後、`/works` を直接開いて表示されること、存在しないパスでNotFoundが出ること、ブラウザの戻る・進むとスクロール位置を確認

### public/_headers

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## 10. 今夜のMVP（11/10中に提出）

1. 雛形作成 → 空のトップを `{{DOMAIN}}` にデプロイ（ドメイン接続の問題を最初に潰す）
2. Astryx 導入（4.2〜4.3）→ onnenai テーマ（4.4）→ 独自トークン（localTokens）・ドット背景 → TOKENS.md → 基本コンポーネント（Header / Footer / WorkCard / Tag、Button は Astryx）
3. `src/content/` の型と枠（文章と画像はユーザーが入れる）
4. `/`（ヒーロー＋イチオシ）、`/works`、`/personal`、NotFound
5. ThemeToggle、共通OGP
6. 最終確認 → デプロイ → ESにURLを入れて提出

MVPのコンテンツ:
- `works.ts`: miraithmic, universe, soundcreate-site, future-clastar-2026
- `personal.ts`: original-songs, illustrations

切り捨て順（時間が足りないとき）: ThemeToggle（OS追従だけ残す）→ View Transitions → `/personal`（トップから外部リンクで代替）。

載せないもの: rera-scope vol.1、ローカルLLMなどの実験系、開発アルバイトの業務（会社確認後）。

---

## 11. 提出後のTODO
- TanStack Start へ移行し、全ページをプリレンダリング
- Git連携の自動デプロイ
- 書けていない制作の話は別のブログで（必要なら 3.4）

## 12. ユーザー判断待ち
- `{{DOMAIN}}`
- profile.md の全文言（ESと同じ言葉で）
- 各作品の summary / roles / 画像 / alt / リンク（`src/content/*.ts`）
- ナビの表示名（URLは `/works` `/personal` で確定）
- Figmaのトップ・詳細の2画面
- Gen Interface JP を Figma 環境にインストールし、テキストスタイルのフォントを差し替え
