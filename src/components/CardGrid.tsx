import { VStack } from '@astryxdesign/core/VStack'
import type { Work } from '../content/types'
import { WorkCard } from './WorkCard'

// 作品カードの一覧。Figma ではモバイル・PCとも1カラムで、間隔はスマホ 16px・PC 24px
export function CardGrid({ items }: { items: Work[] }) {
  return (
    <VStack as="ul" className="gap-4 md:gap-6">
      {items.map((work) => (
        <li key={work.id}>
          <WorkCard work={work} />
        </li>
      ))}
    </VStack>
  )
}
