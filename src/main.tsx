import './styles/globals.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { Theme } from '@astryxdesign/core/theme'
import { defaultThemeSlug, themes } from './astryx-themes'
import { getRouter } from './router'

const router = getRouter()

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <Theme theme={themes[defaultThemeSlug]}>
      <RouterProvider router={router} />
    </Theme>,
  )
}
