import { useContext } from "react"
import { AuthContext } from "../Auth"

export default function Expired() {
    const {userNow, perpanjangMember} = useContext(AuthContext)

    return (<>
        <div style={{border:'1px solid red', color:'red'}}>
            <h4>Membership Kadaluwarsa!</h4>
            <p>Masa aktif keanggotaan Anda berakhir pada: <b>{userNow.expiryDate}</b></p>
            <button onClick={() => perpanjangMember(userNow.id)}>Perpanjang Membership Sekarang</button>
        </div>
    </>)
}