import { Heading } from '@astryxdesign/core/Heading'
import { Link } from '@astryxdesign/core/Link'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import { site } from '../content/site'
import { Container } from './Container'

// TODO(usami): Figma に 404 を作ったら合わせる。今は PageHeader と同じ余白
export function NotFound() {
  return (
    <Container className="py-8 md:py-16">
      <VStack gap={4} align="start">
        <Heading level={1}>{site.notFound.title}</Heading>
        <Text as="p" display="block" color="secondary">
          {site.notFound.body}
        </Text>
        <Link href="/" isStandalone>
          {site.notFound.backLabel}
        </Link>
      </VStack>
    </Container>
  )
}
