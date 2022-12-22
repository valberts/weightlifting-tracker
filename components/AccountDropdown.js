import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false)

    const { currentUser, logout } = useAuth()

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('keydown', keyDownHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [])

    return (
        <div className="hidden sm:block relative">
            <i
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-10 fa-solid fa-user-ninja text-xl duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"
            ></i>
            {isOpen && (
                <button
                    onClick={() => setIsOpen(false)}
                    tabIndex="-1"
                    className="fixed inset-0 h-full w-full bg-slate-900 opacity-50 cursor-default"
                ></button>
            )}
            {isOpen && (
                <div className="absolute right-0 py-2 w-48 mt-2 bg-white text-slate-600 rounded-lg shadow-xl text-base font-normal">
                    <h2 className="block py-2 px-4 select-none font-semibold break-words">
                        {currentUser.email}
                    </h2>
                    <div className="flex flex-row items-center py-2 px-4 duration-300 hover:bg-indigo-500 hover:text-white select-none cursor-pointer border-t-2">
                        <i className="fa-solid fa-list block pr-2"></i>
                        <h2 className="block">Select exercise</h2>
                    </div>
                    <div className="flex flex-row items-center py-2 px-4 duration-300 hover:bg-indigo-500 hover:text-white select-none cursor-pointer">
                        <i className="fa-solid fa-plus block pr-2"></i>
                        <h2 className="block">Log workout</h2>
                    </div>
                    <div
                        onClick={() => {
                            logout()
                            setIsOpen(false)
                        }}
                        className="flex flex-row items-center py-2 px-4 duration-300 hover:bg-indigo-500 hover:text-white select-none cursor-pointer"
                    >
                        <i className="fa-solid fa-right-from-bracket block pr-2"></i>
                        <h2 className="block">Logout</h2>
                    </div>
                </div>
            )}
        </div>
    )
}
