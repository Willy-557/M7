import { useContext } from "react"
import { AuthContext } from "../Auth"

export default function MyTrainingsT() {
    const {dataBooking, deleteBooking, userNow} = useContext(AuthContext)
    return (<>
        <div className="kiri">
            <h3>Daftar Training</h3>
            <table border={1} cellSpacing={0}>
                <tr>
                    <th>ID</th>
                    <th>Member</th>
                    <th>Program</th>
                    <th>Hari</th>
                    <th>Jam</th>
                    <th>Action</th>
                </tr>
                {dataBooking.filter((e) => e.pembuat == userNow.username && e.status === "Approve").map((f) => (
                    <tr>
                        <td>{f.id}</td>
                        <td>{f.pembuat}</td>
                        <td>{f.program}</td>
                        <td>{f.hari}</td>
                        <td>{f.jamMulai} - {f.jamSelesai}</td>
                        <td>
                            <button onClick={() => deleteBooking(f.id)}>Cancel</button>
                        </td>
                    </tr>
                ))
                }
            </table>
        </div>
    </>)
}