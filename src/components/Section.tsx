import type { ReactNode } from 'react'
import { Heading } from '@astryxdesign/core/Heading'
import { VStack } from '@astryxdesign/core/VStack'
import { Container } from './Container'

type SectionProps = {
  title: string
  children: ReactNode
}

// トップの各セクション（Figma: Featured / Profile / Skills / AboutThisSite）
// 上下の余白は PC 48px・スマホ 32px、見出しと中身の間は PC 24px・スマホ 16px
export function Section({ title, children }: SectionProps) {
  return (
    <section>
      <Container className="py-8 md:py-12">
        <VStack className="gap-4 md:gap-6">
          <Heading level={2}>{title}</Heading>
          {children}
        </VStack>
      </Container>
    </section>
  )
}
