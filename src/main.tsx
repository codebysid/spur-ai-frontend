import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TanStackProvider from './providers/TanStackProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TanStackProvider>
        <App />
      </TanStackProvider>
    </Provider>
  </StrictMode>,
)
