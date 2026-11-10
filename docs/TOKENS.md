# TOKENS.md — 使ってよい Tailwind クラス名

SPEC 4.10。出典は `node_modules/@astryxdesign/core/src/tailwind-theme.css`（Astryx 0.7.11 のブリッジ）と `src/styles/globals.css` の `@theme reference inline`（onnenai テーマの `localTokens` の別名）。
実装ではこの一覧にあるクラスだけを使う。ここにない値が必要になったら、作らずに「Figma にどのバリアブルを足すか」をユーザーに聞く。

表の「名前」は Tailwind のユーティリティ接頭辞（`bg-` `text-` `border-` など）の後ろに付ける部分。

## 色

ブリッジは `--color-*` で登録するので、どの色名も `bg-` `text-` `border-` `outline-` `ring-` `fill-` `stroke-` などと組み合わせられる。ただし下の「主な使い方」以外の組み合わせは、使う前に理由を確認する。

### テキスト

| 名前        | 読む変数                                | 主な使い方                  |
| ----------- | --------------------------------------- | --------------------------- |
| `primary`   | `--color-text-primary`                  | `text-primary`              |
| `secondary` | `--color-text-secondary`                | `text-secondary`            |
| `disabled`  | `--color-text-disabled`                 | `text-disabled`             |
| `accent`    | `--color-text-accent`（ライト #006aa3） | `text-accent`（リンク文字） |

> **注意:** Tailwind の `accent` は `--color-text-accent` を指す。#66ccff の塗りは `bg-accent-bg`。`bg-accent` は使わない。

### 面

| 名前       | 読む変数                      | 主な使い方    |
| ---------- | ----------------------------- | ------------- |
| `body`     | `--color-background-body`     | `bg-body`     |
| `surface`  | `--color-background-surface`  | `bg-surface`  |
| `card`     | `--color-background-card`     | `bg-card`     |
| `popover`  | `--color-background-popover`  | `bg-popover`  |
| `muted`    | `--color-background-muted`    | `bg-muted`    |
| `inverted` | `--color-background-inverted` | `bg-inverted` |
| `overlay`  | `--color-overlay`             | `bg-overlay`  |

### アクセント・操作

| 名前              | 読む変数                    | 主な使い方                                                 |
| ----------------- | --------------------------- | ---------------------------------------------------------- |
| `accent-bg`       | `--color-accent`（#66ccff） | `bg-accent-bg`。塗りだけに使う。文字色・細い線には使わない（例外: ヘッダーのロゴ文字の `text-accent-bg`） |
| `accent-muted`    | `--color-accent-muted`      | `bg-accent-muted`                                          |
| `on-accent`       | `--color-on-accent`         | `text-on-accent`（`bg-accent-bg` の上の文字）              |
| `neutral`         | `--color-neutral`           | `bg-neutral`                                               |
| `overlay-hover`   | `--color-overlay-hover`     | `bg-overlay-hover`                                         |
| `overlay-pressed` | `--color-overlay-pressed`   | `bg-overlay-pressed`                                       |
| `tint-hover`      | `--color-tint-hover`        | `bg-tint-hover`                                            |

### 境界線

| 名前            | 読む変数                    | 主な使い方             |
| --------------- | --------------------------- | ---------------------- |
| `border`        | `--color-border`            | `border-border`        |
| `border-strong` | `--color-border-emphasized` | `border-border-strong` |

### ステータス

| 名前                                                                   | 主な使い方                                                                                               |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `info` `success` `warning` `error`                                     | `bg-*` は強い塗り、`text-*` `border-*` `outline-*` `ring-*` はそれぞれ文字用・線用の色に自動で切り替わる |
| `info-muted` `success-muted` `warning-muted` `error-muted`             | `bg-*-muted`                                                                                             |
| `on-info` `on-success` `on-warning` `on-error`                         | `text-on-*`（強い塗りの上の文字）                                                                        |
| `on-info-muted` `on-success-muted` `on-warning-muted` `on-error-muted` | `text-on-*-muted`（muted 塗りの上の文字）                                                                |
| `status-info` `status-success` `status-warning` `status-error`         | `text-status-*`                                                                                          |

### その他

| 名前                   | 読む変数                               |
| ---------------------- | -------------------------------------- |
| `on-dark` / `on-light` | `--color-on-dark` / `--color-on-light` |
| `skeleton`             | `--color-skeleton`                     |
| `track`                | `--color-track`                        |
| `shadow`               | `--color-shadow`                       |

### 色相パレット

`blue` `cyan` `gray` `green` `orange` `pink` `purple` `red` `teal` `yellow` に、それぞれ次の3つがある。

| 名前           | 主な使い方          |
| -------------- | ------------------- |
| `<hue>-subtle` | `bg-<hue>-subtle`   |
| `<hue>-ring`   | `border-<hue>-ring` |
| `<hue>-vivid`  | `text-<hue>-vivid`  |

> Tailwind 既定パレット（`bg-blue-500` など）とは別物。既定パレットは token-guard で禁止している。

### アプリ独自（テーマの localTokens）

| 名前        | 読む変数            | 主な使い方                      |
| ----------- | ------------------- | ------------------------------- |
| `decor-dot` | `--color-decor-dot` | ドット背景用。`body` で使用済み |

## 余白

ブリッジは `--spacing` を `--spacing-1`（4px）にしている。数値はすべて 4px の倍数になる（`p-1` = 4px、`p-4` = 16px、`gap-6` = 24px）。
Figma の spacing と同じ数字だけを使う: **1 / 2 / 3 / 4 / 6 / 8 / 12 / 16 / 24**

アプリ独自（テーマの localTokens）:

| 名前      | 値                                     | 例                     |
| --------- | -------------------------------------- | ---------------------- |
| `gutter`  | `--layout-gutter`（24px）              | `px-gutter`            |
| `block`   | `--space-block`（64px = spacing/16）   | `py-block` `gap-block` |
| `section` | `--space-section`（96px = spacing/24） | `py-section`           |

## 幅

| クラス          | 読む変数                           |
| --------------- | ---------------------------------- |
| `max-w-content` | `--layout-content-width`（1120px） |

## 角丸

| クラス                      | 読む変数             | Figma                    |
| --------------------------- | -------------------- | ------------------------ |
| `rounded-none`              | `--radius-none`      |                          |
| `rounded-xs` / `rounded-sm` | `--radius-inner`     | radius/inner（8px）      |
| `rounded-md`                | `--radius-element`   | radius/element（12px）   |
| `rounded-lg`                | `--radius-container` | radius/container（16px） |
| `rounded-xl`                | `--radius-page`      | radius/page（32px）      |
| `rounded-full`              | `--radius-full`      | radius/full              |

## 影

| クラス      | 読む変数        |
| ----------- | --------------- |
| `shadow-sm` | `--shadow-low`  |
| `shadow-md` | `--shadow-med`  |
| `shadow-lg` | `--shadow-high` |

> カードには影を付けない（CLAUDE.md）。

## 文字

### フォント

| クラス         | 読む変数                                    |
| -------------- | ------------------------------------------- |
| `font-sans`    | `--font-family-body`（Gen Interface JP）    |
| `font-heading` | `--font-family-heading`（Gen Interface JP） |
| `font-mono`    | `--font-family-code`                        |

### ウェイト

| クラス          | 読む変数                 |
| --------------- | ------------------------ |
| `font-normal`   | `--font-weight-normal`   |
| `font-medium`   | `--font-weight-medium`   |
| `font-semibold` | `--font-weight-semibold` |
| `font-bold`     | `--font-weight-bold`     |

### サイズ

`text-2xs` `text-xs` `text-sm` `text-base` `text-lg` `text-xl` `text-2xl` `text-3xl` `text-4xl` `text-5xl`
（Astryx の `--font-size-*` を読む。Astryx の幾何スケールで、**Figma のテキストスタイルとは対応していない**）

> Figma のテキストスタイル（display/1〜text/supporting）は、テーマの `--text-*-size` / `-leading` / `-weight` に入っている。
> ブリッジはこれを Tailwind に公開していないので、文字の見た目は Astryx の `Heading` / `Text` などの部品で指定する。

## 動き・サイズ

| クラス                                                                              | 読む変数                  |
| ----------------------------------------------------------------------------------- | ------------------------- |
| `ease-out`                                                                          | `--ease-standard`         |
| `transition-colors` `transition-opacity` `transition-shadow` `transition-transform` | （プロパティ指定のみ）    |
| `size-sm` / `size-md` / `size-lg`（幅と高さを同時に決める。`h-md` などは生成されない） | `--size-element-sm/md/lg` |

> アニメーションは Figma に指示があるものだけ（CLAUDE.md）。
