import { useContext } from "react"
import { AuthContext } from "../Auth"

export default function IncomingBookings() {
    const {accBooking, dataBooking, userNow} = useContext(AuthContext)
    return (<>
        <h4>Daftar Permintaan Booking Masuk</h4>
        <table border={1} cellSpacing={0}>
            <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Program</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Action</th>
            </tr>
            {dataBooking.filter((e) => e.trainer == userNow.username && e.status == "Pending").map((f) => (
                <tr key={f.id}>
                    <td>{f.id}</td>
                    <td>{f.pembuat}</td>
                    <td>{f.program}</td>
                    <td>{f.hari}</td>
                    <td>{f.jamMulai} - {f.jamSelesai}</td>
                    <td>
                        <button onClick={() => accBooking("Approve", f.id)}>Approve</button>
                    </td>
                </tr>
            ))
            }
        </table>
    </>)
}