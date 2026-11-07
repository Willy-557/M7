import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Auth"

export default function SetupJadwal() {
    const {userNow, simpanJadwalTrainer} = useContext(AuthContext)

    useEffect(() => {
        setJamMulai(userNow.jamMulai)
        setJamSelesai(userNow.jamSelesai)
        setSelectedHari(userNow.hariKerja)
    }, [userNow])

    const [selectedHari, setSelectedHari] = useState([])
    const hari = [
        "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"
    ]
    const [jamMulai, setJamMulai] = useState("")
    const [jamSelesai, setJamSelesai] = useState("")

    function handleCheck(e) {
        if(selectedHari.includes(e)) {
            setSelectedHari(selectedHari.filter((c) => c !== e))
        } else {
            setSelectedHari([...selectedHari, e])
        }
    }

    function simpan() {
        if (jamMulai == "" || jamSelesai == "") {
            alert("Jam mulai dan jam selesai harus diisi!")
            return
        }
        if (jamMulai >= jamSelesai) {
            alert("Jam selesai harus lebih besar dari jam mulai!")
            return
        }

        simpanJadwalTrainer(userNow.id, jamMulai, jamSelesai, selectedHari)
    }

    return (<>
        <p><b>Atur Jadwalmu</b></p>
        {hari.map((e) => (
            <label key={e} style={{marginRight:'10px'}}>
                <input type="checkbox" 
                style={{marginRight:'10px'}}
                onChange={() => handleCheck(e)}
                checked={selectedHari.includes(e)}/>
                {e}
            </label>
        ))}
        <p>Jam Operasional Harian:</p>
        Jam Mulai <input type="time" value={jamMulai} onChange={(e) => setJamMulai(e.target.value)}/> Jam Selesai: <input type="time" value={jamSelesai} onChange={(e) => setJamSelesai(e.target.value)}/><br />
        <button onClick={simpan}>Simpan Jadwal</button>
    </>)
}