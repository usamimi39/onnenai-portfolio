import type { Site } from './types'

export const site: Site = {
  name: 'onnenai.cc',
  pages: {
    works: {
      title: 'チームの活動',
      description: '大学やサークルでの活動まとめ',
    },
    personal: {
      title: '個人の活動',
      description: '個人の活動まとめ',
    },
  },
  sections: {
    featured: 'ピックアップ',
    positions: '役職',
    awards: '受賞',
    skills: 'スキル',
    aboutSite: 'このサイトについて',
  },
  notFound: {
    title: '404 Not Found',
    body: 'お探しのページが見つかりません',
    backLabel: 'トップへ',
  },
  credit: {
    before: 'プロフィールアイコンのイラストは、',
    link: {
      label: 'ピアプロ・キャラクター・ライセンス',
      href: 'https://piapro.jp/license/pcl/summary',
    },
    after:
      'に基づいてクリプトン・フューチャー・メディア株式会社のキャラクター「初音ミク」を描いたものです。',
  },
}
