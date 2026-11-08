
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

    const expired = userNow.expiryDate < new Date().toLocaleDateString("en-CA")

    return (<>
        <div style={{display:'flex', backgroundColor:'lightgray', padding: '12px',justifyContent:'space-between', alignItems:'center'}}>
            <div className="kiri" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap: '25px'}}>
                <NavLink style={{color:'black', textDecoration:'none'}} to={expired? 'expired' : 'listtrainer'}>List Trainer</NavLink>
                <NavLink style={{color:'black', textDecoration:'none'}} to={expired? 'expired' : 'booksession'}>Book Session</NavLink>
                <NavLink style={{color:'black', textDecoration:'none'}} to={expired? 'expired' : 'mybooks'}>My Bookings</NavLink>
                <NavLink style={{color:'black', textDecoration:'none'}} to={expired? 'expired' : 'mytrainsM'}>My Trainings</NavLink>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
        <p style={{fontSize:'27px', marginLeft:'10px', marginTop:'20px'}}>Welcome, <b>{userNow.username}</b></p>
        <br />
        <Outlet></Outlet>
    </>)
}