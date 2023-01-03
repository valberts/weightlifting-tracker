import React, { useContext, useState, useEffect, useRef } from 'react'
import { auth, db } from '../firebase'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errorCode, setErrorCode] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const userInfo = useRef()

    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        return
    }

    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password).catch((error) => {
            setErrorCode(error.code)
            setErrorMessage(error.message)
        })
        return
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        userInfo,
        errorCode,
        errorMessage,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
