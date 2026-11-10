import { useState } from 'react'
import { HStack } from '@astryxdesign/core/HStack'
import { Icon } from '@astryxdesign/core/Icon'
import { IconButton } from '@astryxdesign/core/IconButton'
import { Link } from '@astryxdesign/core/Link'
import { MobileNav } from '@astryxdesign/core/MobileNav'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import logoIcon from '../assets/profile/usagi_icon.png'
import { site } from '../content/site'
import type { FileRouteTypes } from '../routeTree.gen'
import { Container } from './Container'
import { MenuIcon } from './MenuIcon'
import { NavLink } from './NavLink'
import { ThemeToggle } from './ThemeToggle'

const nav: { to: FileRouteTypes['to']; label: string }[] = [
  { to: '/works', label: site.pages.works.title },
  { to: '/personal', label: site.pages.personal.title },
]

// Figma: Header（Style=Classic）と Header/Mobile。md 未満はナビをメニューボタンから開く
// 画面上部に固定する（中身とフッターだけがスクロールする）
// ロゴは favicon と同じうさぎのアイコン＋サイト名。アイコンは隣の文字と同じ内容なので alt は空（読み上げが二重にならないように）
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-body">
      <Container>
        <HStack justify="between" align="center" className="py-2">
          <Link href="/" color="primary" className="no-underline">
            <HStack as="span" align="center" gap={2}>
              <img src={logoIcon} alt="" className="size-md md:size-lg" />
              <Text
                type="body"
                weight="medium"
                color="inherit"
                className="md:hidden"
              >
                {site.name}
              </Text>
              <Text
                size="2xl"
                weight="medium"
                color="inherit"
                className="hidden md:inline"
              >
                {site.name}
              </Text>
            </HStack>
          </Link>

          <HStack align="center" gap={4} className="hidden md:flex">
            <HStack as="nav" aria-label="メイン">
              <HStack as="ul" align="center" gap={1}>
                {nav.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} label={item.label} />
                  </li>
                ))}
              </HStack>
            </HStack>
            <ThemeToggle />
          </HStack>

          <HStack align="center" gap={2} className="md:hidden">
            <ThemeToggle className="border border-border" />
            <IconButton
              variant="ghost"
              size="lg"
              label="メニューを開く"
              icon={<Icon icon={MenuIcon} />}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
              className="rounded-full"
            />
          </HStack>
        </HStack>
      </Container>

      <MobileNav
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        header={site.name}
        side="end"
      >
        <VStack as="nav" aria-label="メイン">
          <VStack as="ul" gap={1}>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  label={item.label}
                  onClick={() => setIsMenuOpen(false)}
                />
              </li>
            ))}
          </VStack>
        </VStack>
      </MobileNav>
    </header>
  )
}
