import './styles/globals.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { ThemeModeProvider } from './components/ThemeMode'
import { getRouter } from './router'

const router = getRouter()

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <ThemeModeProvider>
      <RouterProvider router={router} />
    </ThemeModeProvider>,
  )
}
