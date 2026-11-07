import { useContext, useState } from "react"
import { AuthContext } from "../Auth"

export default function MyPrograms() {

    return (<>
        <h4>Tambah Program Baru</h4>
        <form onSubmit={handleSubmit}>
            Nama: <input type="text" value={namaProgram} onChange={(e) => setNamaProgram(e.target.value)} />
            Deskripsi: <textarea value={deskripsiProgram} onChange={(e) => setDeskripsiProgram(e.target.value)} ></textarea><br />
            <button type="submit">Tambah Program</button>
        </form>
        <h3>Daftar Program</h3>
        <table border={1} cellSpacing={0}>
            <tr>
                <th>ID</th>
                <th>Nama Program</th>
                <th>Deskripsi</th>
                <th>Action</th>
            </tr>
        </table>
    </>)
}