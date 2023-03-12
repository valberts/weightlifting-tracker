import React, { useState } from 'react'
import AccountDropdown from './AccountDropdown'
import AccountModal from './AccountModal'
import { useAuth } from '../context/AuthContext'
import SelectExerciseModal from './SelectExerciseModal'
import LogWorkoutModal from './LogWorkoutModal'

export default function Header(props) {
    const { currentlySelectedExercise, setCurrentlySelectedExercise } = props
    const [openAccountModal, setOpenAccountModal] = useState(false)
    const [openExerciseModal, setOpenExerciseModal] = useState(false)
    const [openWorkoutModal, setOpenWorkoutModal] = useState(false)
    const { currentUser, logout } = useAuth()

    return (
        <>
            {openAccountModal && (
                <AccountModal
                    setOpenAccountModal={setOpenAccountModal}
                    setOpenExerciseModal={setOpenExerciseModal}
                    setOpenWorkoutModal={setOpenWorkoutModal}
                />
            )}
            {openExerciseModal && (
                <SelectExerciseModal
                    setOpenExerciseModal={setOpenExerciseModal}
                    currentlySelectedExercise={currentlySelectedExercise}
                    setCurrentlySelectedExercise={setCurrentlySelectedExercise}
                />
            )}
            {openWorkoutModal && (
                <LogWorkoutModal
                    setOpenWorkoutModal={setOpenWorkoutModal}
                    currentlySelectedExercise={currentlySelectedExercise}
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
                        setOpenWorkoutModal={setOpenWorkoutModal}
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
