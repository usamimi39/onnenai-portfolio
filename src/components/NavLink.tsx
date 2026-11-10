import { Link } from '@astryxdesign/core/Link'
import { Text } from '@astryxdesign/core/Text'
import type { FileRouteTypes } from '../routeTree.gen'

type NavLinkProps = {
  to: FileRouteTypes['to']
  label: string
  onClick?: () => void
}

// Figma: NavLink。現在地は文字色をアクセントの青（--color-text-accent）にする。TanStack Router が現在地のリンクに aria-current="page" と data-status="active" を付けるので、data-status で色を変える
export function NavLink({ to, label, onClick }: NavLinkProps) {
  return (
    <Link
      href={to}
      color="inherit"
      onClick={onClick}
      className="block rounded-full px-3 py-2 text-secondary no-underline data-status:text-accent"
    >
      <Text type="body" weight="medium" color="inherit">
        {label}
      </Text>
    </Link>
  )
}
