import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext("")

export function Auth({children}) {
    const [userNow, setUserNow] = useState("")
    const [dataTrainer, setDataTrainer] = useState([])
    const [dataMember, setDataMember] = useState([])

    useEffect(() => {

    })

    function login(username, password) {
        if (username == "" || password == "") {
            alert("Field tidak boleh kosong!")
            return
        }

        const cekUser = window.api.loadUser(username, password)
        if(cekUser) {

        } else {
            alert("User tidak ditemukan!, harap melakukan register terlebih dahulu")
        }
    }

    const auth = {}
    
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}