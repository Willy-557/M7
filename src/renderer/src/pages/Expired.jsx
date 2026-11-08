import { useContext } from "react"
import { AuthContext } from "../Auth"

export default function Expired() {
    const {userNow} = useContext(AuthContext)

    return (<>
        <h4>Membership Kadaluwarsa!</h4>
        <p>Masa aktif keanggotaan Anda berakhir pada: <b>{userNow.expiryDate}</b></p>
        <button>Perpanjang Membership Sekarang</button>
    </>)
}