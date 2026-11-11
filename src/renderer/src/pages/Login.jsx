import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { AuthContext } from "../Auth"

export default function Login() {
    const {login, userNow} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (userNow != null) {
            if (userNow.role == "Member") {
                navigate('/app/member')
            } else {
                navigate('/app/trainer')
            }
        }
    }, [userNow])

    function handleSubmit(e) {
        e.preventDefault()
        login(username, password)
        kosong()
    }

    function kosong() {
        setUsername("")
        setPassword("")
    }
    

    return (<>
        <div style={{border: '1px solid black', padding:'10px', width:'40%', marginLeft: '20px', marginTop: '20px'}}>
            <form className="login" onSubmit={handleSubmit} >
                <h2 style={{marginBottom:'3px'}}>Login</h2>
                Username: <br />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
                    
                    /> <br /><br />
                Password: <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form> <br />
            <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent:'center'}}>
                <p>Belum punya akun?</p>
                <NavLink to={'/regis'}>Register</NavLink>
            </div>
        </div>
    </>)
}