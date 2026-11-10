import { HStack } from '@astryxdesign/core/HStack'
import { Link } from '@astryxdesign/core/Link'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import { profile } from '../content/profile'
import { site } from '../content/site'
import { Container } from './Container'

// Figma: Footer。幅は画面に合わせて伸縮（中身は最大1120）
export function Footer() {
  return (
    <footer>
      <Container className="pt-16 pb-8">
        <VStack gap={3} className="border-t border-border pt-6">
          <Text type="supporting">
            {site.credit.before}
            <Link href={site.credit.link.href} target="_blank" type="inherit">
              {site.credit.link.label}
              <span className="sr-only">（新しいタブで開く）</span>
            </Link>
            {site.credit.after}
          </Text>
          <HStack
            justify="between"
            align="center"
            wrap="wrap"
            className="gap-x-4 gap-y-3"
          >
            <Text type="supporting">
              © {new Date().getFullYear()} {site.name}
            </Text>
            <HStack as="ul" gap={4} wrap="wrap">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    size="sm"
                    weight="medium"
                  >
                    {link.label}
                    <span className="sr-only">（新しいタブで開く）</span>
                  </Link>
                </li>
              ))}
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </footer>
  )
}
