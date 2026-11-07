import { Outlet, useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Auth'


export default function Trainer() {
    const {setUserNow} = useContext(AuthContext)
    const navigate = useNavigate()

    function logout() {
        setUserNow(null)
        navigate('/')
    }

    return (<>
        <div>
            <p>Setup Jadwal</p>
            <p>Incoming Bookings</p>
            <p>My Programs</p>
            <p>My Trainings</p>
            <button onClick={logout}>Logout</button>
        </div>
    </>)
}