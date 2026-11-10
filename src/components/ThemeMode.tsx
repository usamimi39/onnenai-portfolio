import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { Theme } from '@astryxdesign/core/theme'
import { defaultThemeSlug, themes } from '../astryx-themes'

export type ThemeModeName = 'system' | 'light' | 'dark'

type ThemeModeValue = {
  mode: ThemeModeName
  setMode: (mode: ThemeModeName) => void
}

const ThemeModeContext = createContext<ThemeModeValue | null>(null)

// Astryx の <Theme mode> を切り替えるための入れ物（SPEC 4.6）。初期値はOS設定
export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeModeName>('system')

  return (
    <ThemeModeContext value={{ mode, setMode }}>
      <Theme theme={themes[defaultThemeSlug]} mode={mode}>
        {children}
      </Theme>
    </ThemeModeContext>
  )
}

export function useThemeMode() {
  const value = useContext(ThemeModeContext)
  if (!value) throw new Error('useThemeMode は ThemeModeProvider の中で使う')
  return value
}
