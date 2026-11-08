import { useContext } from "react"
import { AuthContext } from "../Auth"

export default function ListTrainer() {
    const {dataUser} = useContext(AuthContext)

    return (<>
        <div className="kiri">
            <h3>Daftar Trainer</h3>
            <table border={1} cellSpacing={0}>
                <tr>
                    <th>Nama Trainer</th>
                    <th>Spesialisasi</th>
                    <th>Hari Kerja</th>
                    <th>Jam Operasional</th>
                </tr>
                {dataUser.filter((e) => e.role == "Trainer").map((f) => (
                    <tr key={f.username}>
                        <td><b>{f.username}</b></td>
                        <td>{f.Keahlian}</td>
                        <td>{f.hariKerja.join(", ")}</td>
                        <td>{f.jamMulai} - {f.jamSelesai}</td>
                    </tr>
                ))}
            </table>
        </div>
    </>)
}