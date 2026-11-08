import { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext("")

export default function Auth({children}) {
    const [userNow, setUserNow] = useState(null)
    const [dataUser, setDataUser] = useState([])
    const [dataProgram, setDataProgram] = useState([])

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

    function addBooking(pembuatBookingan, durasiBooking, jamBooking, ) {

    }

    const auth = {dataUser, deletePrograms, dataProgram, addProgram, simpanJadwalTrainer, register, login, userNow, setUserNow}
    
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}