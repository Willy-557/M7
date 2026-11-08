import { useContext, useState } from "react"
import { AuthContext } from "../Auth"

export default function BookSession() {
    const {dataUser, userNow, dataProgram, addBooking} = useContext(AuthContext)

    const [durasi, setDurasi] = useState(0)
    const [pilihan, setPilihan] = useState("")
    const [hari, setHari] = useState("")
    const [jamTraining, setJamTraining] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        addBooking(pilihan, durasi, jamTraining, hari, userNow.username)
        kosong()
    }

    function kosong() {
        setDurasi(0)
        setPilihan("")
        setHari("")
        setJamTraining("")
    }

    return (<>
        <h4>Buat Booking Session Training</h4>
        <form onSubmit={handleSubmit}>
            <p>Pilih Trainer</p>
            <select value={pilihan} onChange={(e) => setPilihan(e.target.value)}>
                <option value="">testing</option>
                {dataUser.map((e) => 
                    dataProgram.filter((d) => d.namaPembuatProgram == e.username).map((f) => (
                        <option key={f.id} value={`${f.namaPembuatProgram}:${f.namaProgram}`}>{f.namaPembuatProgram} ({f.namaProgram})</option>
                    ))
                )}
            </select><br />
            Hari:
            <select value={hari} onChange={(e) => setHari(e.target.value)}>
                {dataUser.filter((e) => e.role === "Trainer").map((e) => 
                    e.hariKerja.map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))
                )}
            </select><br />
            Jam:
            <input type="time" value={jamTraining} onChange={(e) => setJamTraining(e.target.value)} /> <br />
            Durasi:
            <input type="number" value={durasi} onChange={(e) => setDurasi(e.target.value)} /> <br />
            <button type="submit">Submit Booking</button>
        </form>
    </>)
}