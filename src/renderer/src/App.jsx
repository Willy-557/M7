import { Outlet } from 'react-router'
import './App.css'
import { useContext } from 'react'
import { AuthContext } from './Auth'

export default function App() {
  const {userNow} = useContext(AuthContext)
  return (
    <>
      <p>Welcome, {userNow.username}</p>
      <Outlet></Outlet>
    </>
  )
}
