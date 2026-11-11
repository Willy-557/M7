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
        window.api.loadBooking().then((e) => {
            setDataBooking(e)
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
        
        const idBaru = dataUser.length > 0 ? Number(dataUser[dataUser.length - 1].id) + 1 : 1
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
        return true
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
            const idBaru = dataProgram.length > 0 ? Number(dataProgram[dataProgram.length - 1].id) + 1 : 1
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
        const program = dataProgram.find((e) => e.id == id)
        const temp = dataProgram.filter((e) => e.id != id)
        const tempBooking = dataBooking.filter((e) => e.trainer != program.namaPembuatProgram || e.program != program.namaProgram)
        setDataProgram(temp)
        setDataBooking(tempBooking)
        window.api.saveProgram(temp)
        window.api.saveBooking(tempBooking)
    }

    function addBooking(detailBookingan, durasiBooking, jamBooking, hariBooking, pembuatBooking) {
        if (detailBookingan == "" || durasiBooking == 0 || jamBooking == "" || hariBooking == "") {
            alert("Semua field wajib diisi!")
            return
        }

        const idBaru = dataBooking.length > 0 ? Number(dataBooking[dataBooking.length - 1].id) + 1 : 1
        const [namaTrainer, programTrainer] = detailBookingan.split(":")
        const durasiKeMenit = durasiBooking * 60
        
        const cariTrainer = dataUser.find((e) => e.username === namaTrainer)
        if (cariTrainer.jamMulai == "") {
            alert("Trainer belum mengatur jadwal")
            return
        }
        const jadwalTrainingUser = dataBooking.filter((e) => (e.pembuat == userNow.username || e.trainer == namaTrainer) && e.hari === hariBooking && e.status != "Rejected")
        const cariProgram = dataProgram.find((e) => e.namaProgram == programTrainer)

        const mulai = jamKeMenit(jamBooking)
        const selesai = mulai + durasiKeMenit

        if (mulai < jamKeMenit(cariTrainer.jamMulai) || selesai > jamKeMenit(cariTrainer.jamSelesai)) {
            alert("Jam booking di luar jadwal trainer")
            return
        } else {
            const cekBentrok = jadwalTrainingUser.filter((e) => mulai < jamKeMenit(e.jamSelesai) && selesai > jamKeMenit(e.jamMulai))

            if (cekBentrok.length > 0) {
                alert("Jam booking bentrok dengan training lain")
                return
            }
        }

        const dataBookingBaru = {
            "id" : idBaru,
            "trainer" : namaTrainer,
            "program" : programTrainer,
            "deskripsiProgram" : cariProgram.deskripsiProgram,
            "hari" : hariBooking,
            "pembuat" : pembuatBooking,
            "jamMulai" : jamBooking,
            "jamSelesai" : menitKeJam(selesai),
            "status" : "Pending"
        }

        const temp = [...dataBooking, dataBookingBaru]
        setDataBooking(temp)
        window.api.saveBooking(temp)
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

    function deleteBooking(id) {
        const temp = dataBooking.filter((e) => e.id != id)
        setDataBooking(temp)
        window.api.saveBooking(temp)
    }

    function accBooking(status, id) {
        const temp = dataBooking.map((e) => (
                e.id == id ? {...e, status: status == "Approved" ? "Approved" : "Rejected"} : e
            ))
        setDataBooking(temp)
        window.api.saveBooking(temp)
    }

    function perpanjangMember(id) {
        const cariUser = dataUser.find((e) => e.id == id)
        const [tahun, bulan, hari] = new Date().toLocaleDateString("en-CA").split("-")
        const tanggalBaru = `${Number(tahun) + 1}-${bulan}-${hari}`
        const temp = dataUser.map((f) => f.id == id ? {...f, expiryDate: tanggalBaru} : f)
        setDataUser(temp)
        setUserNow({ ...userNow, expiryDate: tanggalBaru})
        window.api.save(temp)    
    }

    const auth = {perpanjangMember, accBooking, deleteBooking, dataBooking, addBooking, dataUser, deletePrograms, dataProgram, addProgram, simpanJadwalTrainer, register, login, userNow, setUserNow}
    
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}