import { useContext, useState } from "react"
import { NavLink } from "react-router"
import { AuthContext } from "../Auth"

export default function Register() {
    const {register} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [role, setRole] = useState("Member")
    const [detail, setDetail] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        register(username, password, confirmPass, role, detail)
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
            <form onSubmit={handleSubmit} >
                <h2 style={{marginBottom:'3px'}}>Register</h2>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
                    style={{width: '100%', marginTop:'3px'}}
                    /> <br /><br />
                Password:
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} 
                    style={{width: '100%', marginTop:'3px'}}
                /> <br /><br />
                Confirm Password:
                <input type="text" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} 
                    style={{width: '100%', marginTop:'3px'}}
                /> <br /><br />
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}
                    style={{width: '100%', marginTop:'3px'}}>
                    <option value="Member">Member</option>
                    <option value="Trainer">Trainer</option>
                </select> <br /><br />
                {role == "Member" ? (<>
                    Expiry Date:
                    <input type="date" value={detail} onChange={(e) => setDetail(e.target.value)} 
                        style={{width: '100%', marginTop:'3px'}}
                    />
                </>) : (<>
                    Keahlian:
                    <input type="text" value={detail} onChange={(e) => setDetail(e.target.value)} 
                        style={{width: '100%', marginTop:'3px'}}
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