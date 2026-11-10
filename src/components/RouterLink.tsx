import type { ComponentPropsWithRef } from 'react'
import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'

type RouterLinkProps = Omit<ComponentPropsWithRef<'a'>, 'href'> & {
  href?: string
  to?: string
}

// Astryx の LinkProvider に渡す部品。Astryx の Link / Button(href) を TanStack Router の Link で描く
// 外部URLは TanStack Router を通さず、ふつうの <a> にする
export function RouterLink({ href, to, ...props }: RouterLinkProps) {
  const destination = to ?? href ?? ''
  if (/^[a-z][a-z\d+.-]*:/i.test(destination) || destination.startsWith('//')) {
    return <a href={destination} {...props} />
  }
  return <Link to={destination as LinkProps['to']} {...props} />
}
