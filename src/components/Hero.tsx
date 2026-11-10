import { AspectRatio } from '@astryxdesign/core/AspectRatio'
import { Button } from '@astryxdesign/core/Button'
import { Heading } from '@astryxdesign/core/Heading'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import type { Profile } from '../content/types'
import { Container } from './Container'

// Figma: Top の Hero。PC はアイコンが右、スマホはキャッチコピーの下
export function Hero({ profile }: { profile: Profile }) {
  return (
    <section>
      <Container className="py-12 md:py-section">
        <VStack className="gap-4 md:gap-6">
          <Heading level={1} type="display-1">
            {profile.catchcopy}
          </Heading>

          <VStack className="flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between md:gap-12">
            <VStack className="gap-4 md:max-w-9/14 md:flex-1 md:gap-6">
              <HStack gap={3} wrap="wrap" className="items-baseline">
                <Text size="xl" weight="bold">
                  {profile.nameReal}
                </Text>
                <Text type="large" color="secondary">
                  {profile.nameAlt}
                </Text>
              </HStack>
              <Text as="p" display="block" color="secondary">
                {profile.affiliation}
              </Text>
              <Text as="p" display="block" type="large">
                {profile.intro}
              </Text>
              <HStack as="ul" wrap="wrap" className="gap-2 md:gap-3">
                {profile.links.map((link) => (
                  <li key={link.label}>
                    <Button
                      variant="secondary"
                      size="lg"
                      href={link.href}
                      target="_blank"
                      label={`${link.label}（新しいタブで開く）`}
                    >
                      {link.label}
                    </Button>
                  </li>
                ))}
              </HStack>
            </VStack>

            <AspectRatio
              ratio={1}
              shape="ellipse"
              fit="cover"
              className="w-24 shrink-0 border border-border bg-accent-muted md:w-1/5"
            >
              <img src={profile.icon} alt={profile.iconAlt} decoding="async" />
            </AspectRatio>
          </VStack>
        </VStack>
      </Container>
    </section>
  )
}
