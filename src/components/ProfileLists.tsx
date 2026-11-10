import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import { Container } from './Container'

type Column = { title: string; items: string[] }

// Figma: Top の Profile（役職・受賞）。PC は2列、スマホは縦に並べる
export function ProfileLists({ columns }: { columns: Column[] }) {
  return (
    <section>
      <Container className="py-8 md:py-12">
        <VStack className="gap-8 md:flex-row md:gap-12">
          {columns.map((column) => (
            <VStack key={column.title} gap={3} className="md:flex-1">
              <Heading level={2}>{column.title}</Heading>
              <VStack as="ul" gap={3}>
                {column.items.map((item, index) => (
                  <li key={index}>
                    <Text as="p" display="block">
                      {item}
                    </Text>
                  </li>
                ))}
              </VStack>
            </VStack>
          ))}
        </VStack>
      </Container>
    </section>
  )
}
