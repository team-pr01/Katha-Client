import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
     <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </HelmetProvider>
  </Provider>,
)
