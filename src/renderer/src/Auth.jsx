import { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext("")

export default function Auth({children}) {
    const [userNow, setUserNow] = useState(null)
    const [dataUser, setDataUser] = useState([])
    const [dataProgram, setDataProgram] = useState([])
    const [dataBooking, setDataBooking] = useState([])

    useEffect(() => {
        window.api.loadUser().then((data) => {
            setDataUser(data)
        })
        window.api.loadProgram().then((e) => {
            setDataProgram(e)
        })
    }, [])

    function login(username, password) {
        if (username == "" || password == "") {
            alert("Field tidak boleh kosong!")
            return
        }

        window.api.cariUser(username, password).then((u) => {
            if (u != null) {
                setUserNow(u)
                return u
            } else {
                alert("User tidak ditemukan!, harap melakukan register terlebih dahulu")
            }
        })

    }

    function register(usn, pass, confirmPass, role, detail) {
        if (usn == "" || pass == "" || confirmPass == "" || role == "" || detail == "") {
            alert("Semua Field wajib diisi!")
            return
        }

        const cekNama = dataUser.find((e) => e.username == usn)

        if (cekNama) {
            alert("Username sudah ada, silahkan pilih username yang lain")
            return
        }

        if (pass !== confirmPass) {
            alert("Password tidak sama!")
            return
        }
        
        const idBaru = dataUser.length + 1
        let dataUserBaru = {}
        role == "Member" ? dataUserBaru = {
            "id" : idBaru,
            "username" : usn,
            "password" : pass,
            "role" : role,
            "expiryDate" : detail
        } : dataUserBaru = {
            "id" : idBaru,
            "username" : usn,
            "password" : pass,
            "role" : role,
            "Keahlian" : detail,
            "jamMulai" : "",
            "jamSelesai" : "",
            "hariKerja" : []
        }

        const temp = [...dataUser, dataUserBaru]
        setDataUser(temp)
        window.api.save(temp)
    }

    function simpanJadwalTrainer(id, jamMulai, jamSelesai, hariKerja) {
        const temp = dataUser.map((e) => e.id === id ? 
            {...e, jamMulai: jamMulai, jamSelesai: jamSelesai, hariKerja: hariKerja} : e
        )
        setDataUser(temp)
        setUserNow({ ...userNow, jamMulai, jamSelesai, hariKerja })
        window.api.save(temp)
    }

    function addProgram(namaTrainer, namaProgram, deskripsiProgram) {
        const cari = dataProgram.find((e) => e.namaProgram == namaProgram)
        if (cari) {
            alert("Nama program harus unik!")
        } else {
            const idBaru = dataProgram.length + 1
            const dataProgramBaru = {
                id: idBaru,
                namaPembuatProgram: namaTrainer,
                namaProgram: namaProgram,
                deskripsiProgram: deskripsiProgram
            }
            const temp = [...dataProgram, dataProgramBaru]
            setDataProgram(temp)
            window.api.saveProgram(temp)
        }
    }

    function deletePrograms(id) {
        const temp = dataProgram.filter((e) => e.id != id)
        setDataProgram(temp)
        window.api.saveProgram(temp)
    }

    function addBooking(detailBookingan, durasiBooking, jamBooking, hariBooking, pembuatBooking) {
        if (detailBookingan == "" || durasiBooking == 0 || jamBooking == "" || hariBooking == "") {
            alert("Semua field wajib diisi!")
            return
        }

        const idBaru = dataBooking.length + 1
        const [namaTrainer, programTrainer] = detailBookingan.split(":")
        const dataBookingBaru = {
            "id" : idBaru,
            "trainer" : namaTrainer,
            "program" : programTrainer,
            "hari" : hariBooking,
            "pembuat" : pembuatBooking,
            "jam" :  
        }
    }

    function jamKeMenit(waktu) {
        const [jam, menit] = waktu.split(":")
        return Number(jam) * 60 + Number(menit)
    }

    function menitKeJam(menit) {
        const jam = Math.floor(menit / 60) % 24
        const m = menit % 60
        return `${jam < 10 ? "0" + jam : jam}:${m < 10 ? "0" + m : m}`
    }

    

    const auth = {dataUser, deletePrograms, dataProgram, addProgram, simpanJadwalTrainer, register, login, userNow, setUserNow}
    
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}