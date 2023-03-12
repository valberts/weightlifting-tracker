import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useAuth } from '../context/AuthContext'

export default function AccountModal(props) {
    const { setOpenAccountModal, setOpenExerciseModal, setOpenWorkoutModal } =
        props
    const [_document, set_document] = useState(null)
    const { logout } = useAuth()

    useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) {
        return null
    }

    return ReactDom.createPortal(
        <div className="fixed w-screen h-screen top-0 left-0 bg-white text-slate-900 flex flex-col text-lg sm:text-xl">
            <div className="flex items-center justify-between border-b border-solid border-slate-900 p-4">
                <h1 className="font-extrabold text-2xl sm:text-5xl select-none">
                    Menu
                </h1>
                <i
                    onClick={() => setOpenAccountModal(false)}
                    className="fa-solid fa-xmark text-2xl sm:text-4xl duration-300 hover:rotate-90 hover:opacity-50 cursor-pointer"
                ></i>
            </div>
            <div className="p-4 flex flex-row items-center border-b-2 border-b-slate-200 duration-300 hover:pl-6 cursor-pointer">
                <i className="fa-solid fa-list block pr-4"></i>
                <h2
                    onClick={() => {
                        setOpenAccountModal(false)
                        setOpenExerciseModal(true)
                    }}
                    className="select-none"
                >
                    Select exercise
                </h2>
            </div>
            <div className="p-4 flex flex-row items-center border-b-2 border-b-slate-200 duration-300 hover:pl-6 cursor-pointer">
                <i className="fa-solid fa-plus block pr-4"></i>
                <h2
                    onClick={() => {
                        setOpenAccountModal(false)
                        setOpenWorkoutModal(true)
                    }}
                    className="select-none "
                >
                    Log workout
                </h2>
            </div>
            <div className="p-4 flex flex-row items-center border-b-2 border-b-slate-200 duration-300 hover:pl-6 cursor-pointer">
                <i className="fa-solid fa-right-from-bracket block pr-4"></i>

                <h2
                    onClick={() => {
                        logout()
                        setOpenAccountModal(false)
                    }}
                    className="select-none"
                >
                    Logout
                </h2>
            </div>
        </div>,
        _document.getElementById('portal')
    )
}
