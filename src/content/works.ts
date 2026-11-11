import fllooatthum from '../assets/works/fllooat.png'
import thmic03thum from '../assets/works/thmic03.jpg'
import futureclastarthum from '../assets/works/futureclastar2026.jpg'
import soundcreatewebthum from '../assets/works/soundcreateweb.png'
import thmic02thum from '../assets/works/thmic02.jpg'
import universethum from '../assets/works/universe.jpg'
import devhubthum from '../assets/works/devhub.png'
import funlt2026 from '../assets/works/funlt26.png'
import type { Work } from './types'

// チーム・公的な制作（SPEC 3.2）
export const works: Work[] = [
  {
    id: 'works-jphacks2026',
    title: 'JPHACKS 2026「Fllooat」の制作',
    summary: 'JPHACKS 2026 札幌会場にてチーム「もふもふぽっぷ」として参加しました。PM・フロントエンドを担当しました。',
    thumbnail: fllooatthum,
    thumbnailAlt: 'Fllooatの紹介画像。青い画面のアプリを表示したスマートフォン2台と、「みんなの「暇」を可視化する。」のキャッチコピーが並んでいる',
    year: 2026,
    roles: ['PM', 'フロントエンド', 'ハッカソン'], 
    order: 10,
    links: [
      { label: 'YouTubeで見る', href: 'https://youtu.be/m6ntC_12vh0' },
      { label: 'GitHub', href: 'https://github.com/mofumofupop/fllooat' }
    ],
  },
  {
    id: 'works-miraithmic03',
    title: '「Miraithmic 03」リリース',
    summary: 'SoundCreateにて主催するコンピレーションアルバム「Miraithmic 03」を未来祭にてリリースしました。',
    thumbnail: thmic03thum,
    thumbnailAlt: '初音ミクのイラストが描かれた「Miraithmic 03」のCDジャケットを手に持った写真',
    year: 2026, 
    roles: ['主催', '楽曲制作', 'イラスト制作', 'サークル活動'],
    order: 20,
    featured: true,
    links: [{ label: 'ブログを見る', href: 'https://www.soundcreate.org/news/2026-10-26' }],
  },
  {
    id: 'works-futureclastar2026',
    title: '「FUTURE CLASTAR 2026」企画運営',
    summary: 'ボーカロイド同好会の主催するバーチャルライブの企画運営、制作を行いました。',
    thumbnail: futureclastarthum,
    thumbnailAlt: '虹色の照明に照らされたライブ会場のホールと、客席に向けて設置されたスピーカー',
    year: 2026, 
    roles: ['Web制作', '企画・運営', '映像制作', 'サークル活動',], 
    order: 30,
    links: [
      { label: 'サイトを見る', href: 'https://funvc.live/2026' },
      { label: 'GitHub', href: 'https://github.com/FUNVC/funfes2026' }
    ],
  },
  {
    id: 'works-funlt2026',
    title: '「未来大×企業 大LT 2026」運営',
    summary: '「未来大×企業 大LT 2026」の運営メンバーとして、イベントの運営、スポンサー誘致、ノベルティ制作に携わりました。',
    thumbnail: funlt2026,
    thumbnailAlt: '大LTのノベルティタオルの画像',
    year: 2026, 
    roles: ['運営', 'ノベルティ制作'], 
    order: 40,
    links: [],
  },
  {
    id: 'works-soundcreateweb',
    title: 'SoundCreate公式Webサイトの制作',
    summary: 'DTMサークルSoundCreateの公式Webサイトを制作しました。',
    thumbnail: soundcreatewebthum,
    thumbnailAlt: 'SoundCreate公式Webサイトのトップページ。ヘッドホンを着けた紫髪の女の子のイラストが大きく配置されている',
    year: 2026, 
    roles: ['Web制作','サークル活動'],
    order: 50,
    links: [
      { label: 'サイトを見る', href: 'https://soundcreate.org' },
      { label: 'GitHub', href: 'https://github.com/FUNSoundCreate/SoundCreateWeb_v0' }
    ],
  },
  {
    id: 'works-miraithmic02',
    title: '「Miraithmic 02」リリース',
    summary: 'SoundCreateにて主催するコンピレーションアルバム「Miraithmic 02」をM3春にてリリースしました。',
    thumbnail: thmic02thum,
    thumbnailAlt: '初音ミクのイラストが描かれた「Miraithmic 02」のCDジャケットを手に持った写真',
    year: 2026, 
    roles: ['主催', '楽曲制作', 'イラスト制作', 'サークル活動'],
    order: 60,
    links: [{ label: 'ブログを見る', href: 'https://www.soundcreate.org/news/2026-07-07' }],
  },
  {
    id: 'works-p2hacks2025',
    title: "P2HACKS 2025「U'n'iverse」の制作",
    summary: 'P2HACKS 2025 にてチーム「もふもふぽっぷ」として参加しまし、最優秀賞・企業賞をいただきました。PM・フロントエンドを担当しました。',
    thumbnail: universethum,
    thumbnailAlt: "U'n'iverseの紹介画像。スマートフォン2台にデジタル名刺とQRコードの画面が表示され、「名刺交換を気軽に、もっと。」のキャッチコピーが添えられている",
    year: 2025,
    roles: ['PM', 'フロントエンド', 'ハッカソン'], 
    order: 70,
    featured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/mofumofupop/universe' }],
  },
  {
    id: 'works-devhub',
    title: '高度ICT演習「FUN Developers Hub」での活動',
    summary: '高度ICT演習「FUN Developers Hub」にてWebフロントエンドを担当しています。Web開発の基礎から、チーム開発の手法まで、エンジニアリングの基礎を学びました。',
    thumbnail: devhubthum,
    thumbnailAlt: 'FUN Developers Hubのプロフィールページ。ポスター発表の写真をヘッダーに、水色のタイル状のロゴとサービス名が並んでいる',
    year: [2025, 2026],
    roles: ['Web制作', 'フロントエンド', '高度ICT演習'], 
    order: 80,
    links: [],
  },
]
