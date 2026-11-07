import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'
import Member from './pages/Member'
import Trainer from './pages/Trainer'
import Auth from './Auth'
import MyBookings from './components/MyBookings'
import IncomingBookings from './components/IncomingBookings'
import BookSession from './components/BookSession'
import ListTrainer from './components/ListTrainer'
import MyPrograms from './components/MyPrograms'
import MyTrainingT from './components/MyTrainingT'
import MyTrainingsM from './components/MyTrainingsM'
import SetupJadwal from './components/SetupJadwal'

const router = createBrowserRouter([
  {path:'/', element:<Login /> },
  {path:'/regis', element:<Register /> },
  {path:'/app', element:<App/>, children: [
    {path:'/member', element:<Member />, children : [
    {path:'listtrainer', element:<ListTrainer/>},
    {path:'booksession', element:<BookSession/>},
    {path:'mybooks', element:<MyBookings/>},
    {path:'mytrainsM', element:<MyTrainingsM/>}
  ] },
  {path:'/trainer', element:<Trainer />, children : [
    {path:'setup', element:<SetupJadwal/>},
    {path:'incomingbooks', element:<IncomingBookings/>},
    {path:'myprograms', element:<MyPrograms/>},
    {path:'mytrainsT', element:<MyTrainingT/>}
  ] }
  ]}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth>
      <RouterProvider router={router}></RouterProvider>
    </Auth>
  </StrictMode>
)
