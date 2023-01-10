import { useState } from 'react'
import Layout from '../components/Layout'
import { AuthProvider } from '../context/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    const [currentlySelectedExercise, setCurrentlySelectedExercise] =
        useState(null)
    return (
        <AuthProvider>
            <Layout
                currentlySelectedExercise={currentlySelectedExercise}
                setCurrentlySelectedExercise={setCurrentlySelectedExercise}
            >
                <Component
                    {...pageProps}
                    currentlySelectedExercise={currentlySelectedExercise}
                    setCurrentlySelectedExercise={setCurrentlySelectedExercise}
                />
            </Layout>
        </AuthProvider>
    )
}

export default MyApp
