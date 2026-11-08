import { useContext } from "react"
import { AuthContext } from "../Auth"

export default function MyBookings() {
    const {dataBooking, userNow} = useContext(AuthContext)
    return (<>
        <h4>Daftar Booking Saya</h4>
        <table border={1} cellSpacing={0}>
            <tr>
                <th>ID</th>
                <th>Program</th>
                <th>Trainer</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            {dataBooking.filter((e) => e.pembuat === userNow.username).map((f) => (
                <tr>
                    <td>{f.id}</td>
                    <td>{f.program}</td>
                    <td>{f.trainer}</td>
                    <td>{f.hari}</td>
                    <td>{f.jamMulai} - {f.jamSelesai}</td>
                    {f.status == "Pending" ? 
                    <td style={{color: 'orange'}}>
                        {f.status}
                    </td>
                     : 
                    <td style={{color: 'red'}}>
                        {f.status}
                    </td>
                    }
                    <td>
                        <button>Hapus</button>
                    </td>
                </tr>
            ))
            }
        </table>
    </>)
}