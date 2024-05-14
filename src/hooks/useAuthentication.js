import {db} from "../firebase/config"

import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    //cancelar ações futuras do componente cancela quando as ações derem certo
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user
            
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMensage

            if(error.message.includes("Password")){
                systemErrorMensage = "A senha precisa ter pelo menos 6 caracteres"
            } else if(error.message.includes("email-already")){
                systemErrorMensage = "E-mail já cadastrado"
            }else{
                systemErrorMensage = "Ocorreu um erro, por favor tente mais tarde"
            }
            setError(systemErrorMensage)
        }

        
    }

    //logout or sign out
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)

    }

    //login - sign in 
    const login = async(data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
            
        } catch (error) {

            let systemErrorMensage

            if(error.message.includes("Firebase: Error (auth/invalid-credential).")){
                systemErrorMensage = "Email ou Senha incorreta"
            } else{
                systemErrorMensage = "Ocorreu um erro por favor tente mais tarde"
            }
            setError(systemErrorMensage)
            setLoading(false)
        }
    }

    useEffect(() =>{
        return () => setCancelled(true)
    }, [] )

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}