import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext("")

export function Auth({children}) {
    const [userNow, setUserNow] = useState(null)
    const [dataUser, setDataUser] = useState([])

    function login(username, password) {
        if (username == "" || password == "") {
            alert("Field tidak boleh kosong!")
            return
        }

        const cekUser = window.api.loadUser(username, password)
        if(cekUser) {
            setUserNow(cekUser)
        } else {
            alert("User tidak ditemukan!, harap melakukan register terlebih dahulu")
        }
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
        
        const dataUserBaru = {}
        {role == "Member" ? dataUserBaru = {
            "username" : usn,
            "password" : pass,
            "role" : "Member",
            "expiryDate" : detail
        } : dataUserBaru = {
            "username" : usn,
            "password" : pass,
            "role" : "Trainer",
            "Keahlian" : detail
        }}
        const temp = setDataUser([...dataUser, dataUserBaru])
        window.api.save(temp)
    }

    const auth = {register, login, userNow}
    
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}