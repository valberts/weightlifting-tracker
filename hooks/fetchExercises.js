import React, { useState, useEffect, useRef } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

export default function useFetchExercises() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [exercises, setExercises] = useState(null)

    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setExercises(docSnap.data().exercises)
                } else {
                    setExercises({})
                }
            } catch (err) {
                setError('Failed to load exercises')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { loading, error, exercises, setExercises }
}
