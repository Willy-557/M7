import { Outlet, useNavigate, NavLink } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Auth'


export default function Trainer() {
    const {setUserNow, userNow} = useContext(AuthContext)
    const navigate = useNavigate()

    function logout() {
        setUserNow(null)
        navigate('/')
    }

    return (<>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className="kiri" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap: '10px'}}>
                <NavLink to='setup'>Setup Jadwal</NavLink>
                <NavLink to='incomingbooks'>Incoming Bookings</NavLink>
                <NavLink to='myprograms'>My Programs</NavLink>
                <NavLink to='mytrainsT'>My Trainings</NavLink>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
        <p>Welcome, {userNow.username}</p>
        <Outlet></Outlet>
    </>)
}