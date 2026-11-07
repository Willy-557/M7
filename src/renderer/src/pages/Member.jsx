
import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { AuthContext } from '../Auth'

export default function Member() {
    const {setUserNow} = useContext(AuthContext)
    const navigate = useNavigate()

    function logout() {
        setUserNow(null)
        navigate('/')
    }

    return (<>
        <div>
            <p>Halo</p>
            <button onClick={logout}>Logout</button>
        </div>  
    </>)
}