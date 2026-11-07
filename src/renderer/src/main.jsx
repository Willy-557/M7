import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {path:'/', element:<Login /> },
  {path:'/regis', element:<Register /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
