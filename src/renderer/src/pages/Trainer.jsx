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
        <div style={{display:'flex', backgroundColor:'lightgray', padding: '12px',justifyContent:'space-between', alignItems:'center'}}>
            <div className="kiri" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap: '25px'}}>
                <NavLink style={{color:'black', textDecoration:'none'}} to='setup'>Setup Jadwal</NavLink>
                <NavLink style={{color:'black', textDecoration:'none'}} to='incomingbooks'>Incoming Bookings</NavLink>
                <NavLink style={{color:'black', textDecoration:'none'}} to='myprograms'>My Programs</NavLink>
                <NavLink style={{color:'black', textDecoration:'none'}} to='mytrainsT'>My Trainings</NavLink>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
        <p style={{fontSize:'27px', marginLeft:'10px', marginTop:'20px'}}>Welcome, <b>{userNow.username}</b></p>
        <br />
        <Outlet></Outlet>
    </>)
}