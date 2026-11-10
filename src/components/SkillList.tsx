import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import type { Profile } from '../content/types'
import { Tag } from './Tag'

// Figma: Top の Skills。左に分類（幅96px）、右にタグ
export function SkillList({ skills }: { skills: Profile['skills'] }) {
  return (
    <VStack as="ul" className="gap-4 md:gap-6">
      {skills.map((skill) => (
        <HStack
          as="li"
          key={skill.group}
          gap={4}
          className="items-start md:items-center"
        >
          <Text
            type="label"
            color="secondary"
            display="block"
            className="w-24 shrink-0"
          >
            {skill.group}
          </Text>
          <HStack as="ul" gap={2} wrap="wrap">
            {skill.items.map((item, index) => (
              <li key={index}>
                <Tag label={item} />
              </li>
            ))}
          </HStack>
        </HStack>
      ))}
    </VStack>
  )
}
