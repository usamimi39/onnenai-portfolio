import { AspectRatio } from '@astryxdesign/core/AspectRatio'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Heading } from '@astryxdesign/core/Heading'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import {  workYears } from '../content/types'
import type {Work} from '../content/types';
import { Tag } from './Tag'

type WorkCardProps = {
  work: Work
  // トップのピックアップなど、最初の画面に入るカードは true（画像を先に読み込む）
  isPriority?: boolean
}

// Figma: WorkCard。モバイルは Layout=Vertical、md 以上は Layout=Horizontal
export function WorkCard({ work, isPriority = false }: WorkCardProps) {
  return (
    <Card padding={0} className="overflow-hidden">
      <VStack as="article" className="md:flex-row">
        <AspectRatio
          ratio={16 / 9}
          fit="cover"
          className="bg-accent-muted md:aspect-auto md:w-5/14 md:shrink-0"
        >
          <img
            src={work.thumbnail}
            alt={work.thumbnailAlt}
            loading={isPriority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </AspectRatio>
        <VStack
          gap={3}
          padding={6}
          justify="center"
          className="md:flex-1 md:p-8"
        >
          <Heading level={3}>{work.title}</Heading>
          <Text as="p" display="block" color="secondary">
            {work.summary}
          </Text>
          <HStack as="ul" gap={2} wrap="wrap">
            {work.roles.map((role) => (
              <li key={role}>
                <Tag label={role} />
              </li>
            ))}
            {workYears(work).map((year) => (
              <li key={year}>
                <Tag label={String(year)} />
              </li>
            ))}
          </HStack>
          {work.links.length > 0 && (
            <HStack as="ul" gap={2} wrap="wrap" className="pt-2">
              {work.links.map((link) => (
                <li key={link.href}>
                  <Button
                    variant="secondary"
                    size="lg"
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    label={`${link.label}（新しいタブで開く）`}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </HStack>
          )}
        </VStack>
      </VStack>
    </Card>
  )
}
