import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import type { PageText } from '../content/types'
import { Container } from './Container'

// 一覧ページの見出し＋一言説明（Figma: Works の PageHeader）
export function PageHeader({ page }: { page: PageText }) {
  return (
    <Container className="py-8 md:py-16">
      <VStack className="gap-2 md:gap-3">
        <Heading level={1}>{page.title}</Heading>
        <Text as="p" display="block" color="secondary">
          {page.description}
        </Text>
      </VStack>
    </Container>
  )
}
