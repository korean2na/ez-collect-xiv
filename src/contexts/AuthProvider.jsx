import { useContext, createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = function (props) {
    const [user, setUser] = useState({
        loggedIn: false
    })
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    // Something to try implementing later
    // async function createAccountEmail(username, email, password) {
    //     const result = await createUserWithEmailAndPassword(auth, email, password)
    //     console.log(result)
    //     const userDoc = await setDoc(doc(db, 'users', `${result.uid} `), {
    //         username
    //     })
    // }

    // Something to try implementing later
    // async function emailLogin(email, password) {
    //     const result = await signInWithEmailAndPassword(auth, email, password)
    //     console.log(result)
    // }

    async function googleLogin() {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
    }

    async function logout() {
        const result = await signOut(auth)
        console.log(result)        
    }

    useEffect(() => {
        onAuthStateChanged(auth, (userInfo) => {
            if (userInfo) {
                setUser({
                    email: userInfo.email,
                    displayName: userInfo.displayName,
                    uid: userInfo.uid,
                    loggedIn: true
                })
            } else {
                setUser({
                    loggedIn: false
                })
            }
        })
    },[])

    const value = {
        user,
        googleLogin,
        // createAccountEmail,
        // emailLogin,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { props.children }
        </AuthContext.Provider>
    )
}