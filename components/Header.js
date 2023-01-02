import React, { useState } from 'react'
import AccountDropdown from './AccountDropdown'
import AccountModal from './AccountModal'
import { useAuth } from '../context/AuthContext'
import SelectExerciseModal from './SelectExerciseModal'

export default function Header() {
    const [openAccountModal, setOpenAccountModal] = useState(false)
    const [openExerciseModal, setOpenExerciseModal] = useState(false)
    const { currentUser, logout } = useAuth()

    return (
        <>
            {openAccountModal && (
                <AccountModal
                    setOpenAccountModal={setOpenAccountModal}
                    setOpenExerciseModal={setOpenExerciseModal}
                />
            )}
            {openExerciseModal && (
                <SelectExerciseModal
                    setOpenExerciseModal={setOpenExerciseModal}
                />
            )}
            <div className="sticky top-0 w-full left-0 bg-inherit flex items-center justify-between p-4 border-b border-solid border-white">
                <h1 className="text-3xl select-none sm:text-5xl duration-300">
                    AppName
                </h1>
                {currentUser && (
                    <AccountDropdown
                        currentUser={currentUser}
                        logout={logout}
                        setOpenExerciseModal={setOpenExerciseModal}
                    />
                )}
                {currentUser && (
                    <i
                        onClick={() => setOpenAccountModal(true)}
                        className="sm:hidden block fa-solid fa-user relative text-xl duration-300 hover:opacity-40 cursor-pointer sm:text-3xl"
                    ></i>
                )}
            </div>
        </>
    )
}
