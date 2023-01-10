import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout(props) {
    const {
        children,
        currentlySelectedExercise,
        setCurrentlySelectedExercise,
    } = props
    return (
        <div className="flex flex-col min-h-screen relative bg-slate-900 text-white">
            <Header
                currentlySelectedExercise={currentlySelectedExercise}
                setCurrentlySelectedExercise={setCurrentlySelectedExercise}
            />
            <main
                className="flex-1 flex flex-col p-4 "
                // currentlySelectedExercise={currentlySelectedExercise}
            >
                {children}
            </main>
            <Footer />
        </div>
    )
}
