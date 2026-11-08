
import { useContext } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router'
import { AuthContext } from '../Auth'

export default function Member() {
    const {setUserNow, userNow} = useContext(AuthContext)
    const navigate = useNavigate()

    function logout() {
        setUserNow(null)
        navigate('/')
    }

    return (<>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className="kiri" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap: '10px'}}>
                <NavLink to='listtrainer'>List Trainer</NavLink>
                <NavLink to='booksession'>Book Session</NavLink>
                <NavLink to='mybooks'>My Bookings</NavLink>
                <NavLink to='mytrainsM'>My Trainings</NavLink>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
        <p>Welcome, {userNow.username}</p>
        <Outlet></Outlet>
    </>)
}