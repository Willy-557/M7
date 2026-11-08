import { useContext, useState } from "react"
import { AuthContext } from "../Auth"

export default function BookSession() {
    const {dataUser} = useContext(AuthContext)

    const [durasi, setDurasi] = useState(0)
    const [pilihanTrainer, setPilihanTrainer] = useState("")
    const [hari, setHari] = useState("")
    const [jamTraining, setJamTraining] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        console.log(durasi);
        console.log(pilihanTrainer);
        console.log(hari);
        console.log(jamTraining);
        kosong()
    }

    function kosong() {
        setDurasi(0)
        setPilihanTrainer("")
        setHari("")
        setJamTraining("")
    }

    return (<>
        <h4>Buat Booking Session Training</h4>
        <form onSubmit={handleSubmit}>
            <p>Pilih Trainer</p>
            <select value={pilihanTrainer} onChange={(e) => setPilihanTrainer(e.target.value)}>
                {dataUser.map((e) => (
                    <option key={e.username} value={e.username}>{e.username} ({e.Keahlian})</option>
                ))}
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