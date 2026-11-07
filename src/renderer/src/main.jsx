import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'
import Member from './pages/Member'
import Trainer from './pages/Trainer'
import Auth from './Auth'

const router = createBrowserRouter([
  {path:'/', element:<Login /> },
  {path:'/regis', element:<Register /> },
  {path:'/member', element:<Member /> },
  {path:'/trainer', element:<Trainer /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth>
      <RouterProvider router={router}></RouterProvider>
    </Auth>
  </StrictMode>
)
