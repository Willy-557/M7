import { useContext, useState } from "react"
import { NavLink,useNavigate } from "react-router"
import { AuthContext } from "../Auth"

export default function Register() {
    const { register } = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [role, setRole] = useState("Member")
    const [detail, setDetail] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        const berhasil = register(username, password, confirmPass, role, detail)
        if(berhasil) {
            kosong()
            navigate('/')
        }
        kosong()    
    }

    function kosong() {
        setConfirmPass("")
        setDetail("")
        setPassword("")
        setRole("")
        setUsername("")
    }

    return (<>
        <div style={{border: '1px solid black', padding:'10px', width:'40%', marginLeft: '20px', marginTop: '20px'}}>
            <form className="register" onSubmit={handleSubmit} >
                <h2 style={{marginBottom:'3px'}}>Register</h2>
                Username: <br />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
                    /> <br /><br />
                Password:
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                /> <br /><br />
                Confirm Password:
                <input type="text" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} 
                /> <br /><br />
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}
                    >
                    <option value="Member">Member</option>
                    <option value="Trainer">Trainer</option>
                </select> <br /><br />
                {role == "Member" ? (<>
                    Expiry Date:
                    <input type="date" value={detail} onChange={(e) => setDetail(e.target.value)} 
                    />
                </>) : (<>
                    Keahlian:
                    <input type="text" value={detail} onChange={(e) => setDetail(e.target.value)} 
                    />
                </>)}
                <button type="submit" style={{width: '100%', marginTop: '10px', padding: '7px 0px'}}>Register</button>
            </form>
            <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent:'center', marginTop: '15px'}}>
                <p>Sudah punya akun?</p>
                <NavLink to={'/'}>Login</NavLink>
            </div>
        </div>
    </>)
}