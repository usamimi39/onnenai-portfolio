import type { ReactNode } from 'react'
import { VStack } from '@astryxdesign/core/VStack'

type ContainerProps = {
  children: ReactNode
  className?: string
}

// 左右の余白（--layout-gutter）の内側で、中身の幅を --layout-content-width までにそろえる枠
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <VStack className={`w-full px-gutter ${className}`}>
      <VStack className="mx-auto w-full max-w-content">{children}</VStack>
    </VStack>
  )
}
