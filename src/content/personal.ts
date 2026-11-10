import placeholder from '../assets/works/placeholder.png'
import type { Work } from './types'

// 個人の創作・開発（SPEC 3.2）
// TODO(usami): 下は表示確認用の仮置き（文言は Figma の Screens に合わせた）。作品を書く。画像は src/assets/works/ に置いて import する
// TODO(usami): placeholder.png は本物のサムネイルに差し替えたら消す
export const personal: Work[] = [
  {
    id: 'personal-placeholder-1',
    title: 'TODO(usami): 作品名',
    summary: 'TODO(usami): 説明（1〜2行）',
    thumbnail: placeholder,
    thumbnailAlt: 'TODO(usami): 代替テキストを書く',
    year: 2025, // TODO(usami): 年
    roles: ['主催'], // TODO(usami): 担当
    order: 10,
    links: [{ label: '作品を見る', href: 'https://example.com/' }],
  },
  {
    id: 'personal-placeholder-2',
    title: 'TODO(usami): 作品名',
    summary: 'TODO(usami): 説明（1〜2行）',
    thumbnail: placeholder,
    thumbnailAlt: 'TODO(usami): 代替テキストを書く',
    year: 2025, // TODO(usami): 年
    roles: ['主催'], // TODO(usami): 担当
    order: 20,
    links: [], // リンクがない作品の表示確認用,
  },
]
