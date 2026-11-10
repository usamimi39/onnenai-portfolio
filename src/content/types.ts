// SPEC 3.1 / 3.3
export type WorkLink = {
  label: string // ボタンの文言（例: "Bandcampで聴く"）
  href: string
}

export type Work = {
  id: string // URLに使えるASCIIスラッグ。React の key にも使う
  title: string
  summary: string // カードの説明。1〜2行（60字程度まで）
  thumbnail: string // src/assets から import した画像
  thumbnailAlt: string // 必須。画像の内容を説明する
  year: number | number[] // 複数年にまたがる作品は配列で（例: [2025, 2026]）。年ごとにタグになる
  roles: string[] // 自分の担当だけ（例: ["主催", "ディレクション"]）
  order: number // 小さいほど上。重要度順
  featured?: boolean // トップのピックアップ（2〜3件）
  links: WorkLink[] // 並べた順にカードのボタンになる。空ならボタンなし
}

// 年を配列にそろえる（表示と並び替え用）
export function workYears(work: Work): number[] {
  return Array.isArray(work.year) ? work.year : [work.year]
}

export type Profile = {
  catchcopy: string
  nameReal: string
  nameAlt: string
  affiliation: string
  intro: string
  icon: string // src/assets から import した自作イラスト（丸く切り抜く）
  iconAlt: string
  positions: string[]
  awards: string[]
  skills: { group: string; items: string[] }[]
  links: { label: string; href: string }[] // ヒーローのボタンとフッターに使う
  aboutSite: { title: string; body: string }[] // 「このサイトについて」の項目（1〜2行ずつ）
}

// ページの見出しと一言説明（/works /personal、ヘッダーのナビにも使う）
export type PageText = {
  title: string
  description: string
}

// サイト全体の文言（ヘッダー・フッター・404）
export type Site = {
  name: string
  pages: {
    works: PageText
    personal: PageText
  }
  // トップの各セクションの見出し
  sections: {
    featured: string
    positions: string
    awards: string
    skills: string
    aboutSite: string
  }
  notFound: {
    title: string
    body: string
    backLabel: string
  }
  // フッターのクレジット表記。before + リンク + after で1文になる
  credit: {
    before: string
    link: { label: string; href: string }
    after: string
  }
}
