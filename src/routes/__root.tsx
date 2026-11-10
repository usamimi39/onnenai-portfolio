import { useEffect } from 'react'
import {
  HeadContent,
  Outlet,
  createRootRoute,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { LinkProvider } from '@astryxdesign/core/Link'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { NotFound } from '../components/NotFound'
import { RouterLink } from '../components/RouterLink'
import { site } from '../content/site'

export const Route = createRootRoute({
  head: () => ({ meta: [{ title: site.name }] }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

// ページ遷移後、メインの <h1> にフォーカスを移す（SPEC 2 アクセシビリティ）
function useFocusHeadingOnNavigate() {
  const router = useRouter()
  useEffect(
    () =>
      router.subscribe('onRendered', (event) => {
        if (!event.fromLocation || !event.pathChanged) return
        const heading = document.querySelector<HTMLElement>('main h1')
        if (!heading) return
        heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
      }),
    [router],
  )
}

function RootComponent() {
  useFocusHeadingOnNavigate()

  return (
    <LinkProvider component={RouterLink}>
      <HeadContent />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </LinkProvider>
  )
}
