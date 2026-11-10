import { Text } from '@astryxdesign/core/Text'

// 担当（roles）と年（year）の小ラベル（Figma: Tag）
// Astryx の Badge は数の表示専用なので使わない
export function Tag({ label }: { label: string }) {
  return (
    <Text
      type="supporting"
      display="block"
      className="rounded-full bg-muted px-3 py-1"
    >
      {label}
    </Text>
  )
}
