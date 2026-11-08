import { useContext } from "react"
import { AuthContext } from "../Auth"
import { useNavigate } from "react-router"

export default function Expired() {
    const {userNow, perpanjangMember} = useContext(AuthContext)
    const navigate = useNavigate()
    
    function perpanjang() {
        perpanjangMember(userNow.id)
        navigate('/app/member/listtrainer')
    }

    return (<>
        <div style={{border:'1px solid red', color:'red', padding:'10px', margin:'10px 10px'}}>
            <h3>Membership Kadaluwarsa!</h3>
            <p>Masa aktif keanggotaan Anda berakhir pada: <b>{userNow.expiryDate}</b></p>
            <button onClick={perpanjang}>Perpanjang Membership Sekarang</button>
        </div>
    </>)
}