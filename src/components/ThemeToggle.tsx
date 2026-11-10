import { Icon } from '@astryxdesign/core/Icon'
import { IconButton } from '@astryxdesign/core/IconButton'
import { useTheme } from '@astryxdesign/core/theme'
import { SunIcon } from './SunIcon'
import { useThemeMode } from './ThemeMode'

const names = { light: 'ライト', dark: 'ダーク' } as const

// Figma: ThemeToggle。初期値はOS設定。押すたびに、いま表示しているモード（OS設定を反映したあとの light / dark）の反対に切り替える
// 「OSに合わせる」を切り替えの順番に入れると、OS と同じモードへ進む1回が見た目では何も起きないため外している
// TODO(usami): Figma にライト・ダーク用のアイコンができたら、状態ごとに出し分ける（今は太陽だけ）
export function ThemeToggle({ className }: { className?: string }) {
  const { setMode } = useThemeMode()
  const { mode: shown } = useTheme()

  return (
    <IconButton
      variant="ghost"
      size="lg"
      label={`テーマ: ${names[shown]}`}
      icon={<Icon icon={SunIcon} />}
      onClick={() => setMode(shown === 'dark' ? 'light' : 'dark')}
      className={`rounded-full ${className ?? ''}`}
    />
  )
}
