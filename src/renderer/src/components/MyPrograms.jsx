import { useContext, useState } from "react"
import { AuthContext } from "../Auth"

export default function MyPrograms() {
    const {deletePrograms, dataProgram, addProgram, userNow} = useContext(AuthContext)
    const [namaProgram, setNamaProgram] = useState("")
    const [deskripsiProgram, setDeskripsiProgram] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        if(namaProgram == "" || deskripsiProgram == "") {
            alert("Semua field wajib diisi!")
            return
        }
        
        addProgram(userNow.username, namaProgram, deskripsiProgram)
        setNamaProgram("")
        setDeskripsiProgram("")
    }

    function hapus(id) {
        deletePrograms(id)
    }
    

    return (<>
        <div className="kiri">
            <h3>Tambah Program Baru</h3>
            <br />
            <form onSubmit={handleSubmit}>
                Nama: <input type="text" value={namaProgram} onChange={(e) => setNamaProgram(e.target.value)} /> <br />
                Deskripsi: <textarea value={deskripsiProgram} onChange={(e) => setDeskripsiProgram(e.target.value)} ></textarea><br /><br />
                <button type="submit">Tambah Program</button>
                <br /><br />
            </form>
            <h3>Daftar Program</h3>
            <table border={1} cellSpacing={0}>
                <tr>
                    <th>ID</th>
                    <th>Nama Program</th>
                    <th>Deskripsi</th>
                    <th>Action</th>
                </tr>
                {dataProgram.map((e) => e.namaPembuatProgram == userNow.username ? 
                    <tr>
                        <td>{e.id}</td>
                        <td>{e.namaProgram}</td>
                        <td>{e.deskripsiProgram}</td>
                        <td>
                            <button onClick={() => hapus(e.id)}>Delete</button>
                        </td>
                    </tr>
                : <div></div>
                )}
            </table>
        </div>
    </>)
}