import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import type { Profile } from '../content/types'

// Figma: Top の AboutThisSite。PC は3列、スマホは縦に並べる
export function AboutSite({ notes }: { notes: Profile['aboutSite'] }) {
  return (
    <VStack className="gap-8 md:flex-row">
      {notes.map((note) => (
        <VStack key={note.title} gap={2} className="md:flex-1">
          <Heading level={3}>{note.title}</Heading>
          <Text as="p" display="block" color="secondary">
            {note.body}
          </Text>
        </VStack>
      ))}
    </VStack>
  )
}
