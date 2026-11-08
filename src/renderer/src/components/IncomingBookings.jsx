import { useContext } from "react"
import { AuthContext } from "../Auth"

export default function IncomingBookings() {
    const {dataBooking, userNow} = useContext(AuthContext)
    return (<>
        <h4>Daftar Permintaan Booking Masuk</h4>
        <table border={1} cellSpacing={0}>
            <tr>
                <th>ID</th>
                <th>Program</th>
                <th>Deskripsi Program</th>
                <th>Trainer</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Action</th>
            </tr>
            {dataBooking.filter((e) => e.pembuat === userNow.username && e.status === "Approve").map((f) => (
                <tr>
                    <td>{f.id}</td>
                    <td>{f.program}</td>
                    <td>{f.deskripsiProgram}</td>
                    <td>{f.trainer}</td>
                    <td>{f.hari}</td>
                    <td>{f.jamMulai} - {f.jamSelesai}</td>
                    <td>
                        <button>Approve</button>
                        <button>Reject</button>
                    </td>
                </tr>
            ))
            }
        </table>
    </>)
}