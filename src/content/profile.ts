import icon from '../assets/profile/icon_v2.jpg'
import type { Profile } from './types'

// トップのヒーロー兼About（SPEC 3.3）。ESと同じ言葉で書く
export const profile: Profile = {
  catchcopy: '創るをつなぐ、広げる。',
  nameReal: 'Haruki USAMI',
  nameAlt: 'Onnenai',
  affiliation: '公立はこだて未来大学 システム情報科学部 情報アーキテクチャ学科 情報デザインコース 2年',
  intro: 'エンジニアリングとデザインを学びながら創作趣味を楽しむ、マルチに活動している学生です。',
  icon,
  iconAlt: '本人を描いたイラスト（自作）',
  positions: ['DTMサークルSoundCreate : 代表', '未来大ボーカロイド同好会 : 副代表', '公立はこだて未来大学DJサークル : 副代表', "Mariners' Conference : 副代表"],
  awards: ['P2HACKS2025 Pre-PBL部門 最優秀賞', 'P2HACKS2025 Pre-PBL部門 企業賞(Fenrir賞)'],
  skills: [
    { group: 'デザイン', items: ['Figma', 'Adobe Illustrator', 'Adobe InDesign'] },
    { group: '実装', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Next.js', 'Vite', 'Tailwind CSS'] },
    { group: '制作', items: ['Ableton Live', 'CLIPStudioPaint', 'Blender'] },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/usamimi39' },
    { label: 'Blog', href: 'https://blog.onnenai.cc' },
    { label: 'Wantedly', href: 'https://www.wantedly.com/id/H_Usami' },
  ],
  aboutSite: [
    { title: 'デザイン', body: 'TODO(usami): 1〜2行で' },
    { title: '作り方', body: 'TODO(usami): 1〜2行で' },
    { title: '技術', body: 'TODO(usami): 1〜2行で' },
  ],
}
