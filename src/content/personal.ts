import thmic03illustthum from '../assets/personal/thmic03illust.png'
import michizurethum from '../assets/personal/michizure.png'
import type { Work } from './types'

// 個人の創作・開発（SPEC 3.2）
export const personal: Work[] = [
  {
    id: 'personal-thmic03illust',
    title: '「Miraithmic 03」向けイラスト',
    summary: 'DTMサークルSoundCreateのアルバムジャケット向けにイラストを制作しました。',
    thumbnail: thmic03illustthum,
    thumbnailAlt: 'ヘッドセットを着けた初音ミクが膝を抱えて浮かんでいるイラスト。水色とピンクの三角形や円が背景に散りばめられている',
    year: 2026, 
    roles: ['イラスト制作'], 
    order: 10,
    links: [{ label: '作品を見る', href: 'https://www.pixiv.net/artworks/150548648' }],
  },
  {
    id: 'personal-complexe01',
    title: 'ミチズレ / compl.exe feat. 初音ミク & 重音テト',
    summary: 'ボカコレ2026冬にて、ユニット「compl.exe」で楽曲・MVを投稿しました。',
    thumbnail: michizurethum,
    thumbnailAlt: '「ミチズレ」MVの一場面。立っている初音ミクの横に雪景色の写真が置かれ、オレンジ色の大きな文字で「この景色が」と歌詞が表示されている',
    year: 2026, 
    roles: ['楽曲制作'], 
    order: 20,
    links: [{ label: 'YouTubeで見る', href: 'https://youtu.be/VXRsrcBSajI?list=RDVXRsrcBSajI' }], 
  },
]
