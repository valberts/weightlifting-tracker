import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import AddExerciseModal from './AddExerciseModal'
import ExerciseDropdown from './ExerciseDropdown'
import { useAuth } from '../context/AuthContext'
import useFetchExercises from '../hooks/fetchExercises'

export default function SelectExerciseModal(props) {
    const { exercises, setExercises, loading, error } = useFetchExercises()
    const { currentUser } = useAuth()
    const {
        setOpenExerciseModal,
        currentlySelectedExercise,
        setCurrentlySelectedExercise,
    } = props
    const [_document, set_document] = useState(null)
    const [error1, setError1] = useState(null)
    const [openAddExerciseModal, setOpenAddExerciseModal] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState(
        currentlySelectedExercise
    )

    function handleClose(e) {
        if (e.target.id === 'wrapper') {
            setOpenExerciseModal(false)
        }
    }

    function handleSelect() {
        if (selectedExercise) {
            setCurrentlySelectedExercise(selectedExercise)
            setError1(null)
            setOpenExerciseModal(false)
            return
        }
        setError1('Please select an exercise first')
    }

    useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) {
        return null
    }

    return ReactDom.createPortal(
        <>
            {openAddExerciseModal && (
                <AddExerciseModal
                    setOpenAddExerciseModal={setOpenAddExerciseModal}
                    currentUser={currentUser}
                    exercises={exercises}
                    setExercises={setExercises}
                    setCurrentlySelectedExercise={setCurrentlySelectedExercise}
                    setSelectedExercise={setSelectedExercise}
                />
            )}
            <div
                onClick={handleClose}
                className="fixed inset-0 bg-slate-900 bg-opacity-25 flex justify-center items-center"
                id="wrapper"
            >
                <div className="w-full max-w-[30ch] rounded-lg shadow-xl flex flex-col bg-white text-slate-900">
                    <div className="sm:p-6 p-4 flex flex-col flex-1">
                        <ExerciseDropdown
                            currentlySelectedExercise={
                                currentlySelectedExercise
                            }
                            setCurrentlySelectedExercise={
                                setCurrentlySelectedExercise
                            }
                            selectedExercise={selectedExercise}
                            setSelectedExercise={setSelectedExercise}
                            setAddOpenExerciseModal={setOpenAddExerciseModal}
                            setError1={setError1}
                            loading={loading}
                            error={error}
                            currentUser={currentUser}
                            exercises={exercises}
                            setExercises={setExercises}
                        />
                        {error1 && (
                            <div className="w-full max-w-[30ch] border border-solid border-rose-400 text-rose-400 text-center mt-4 text-lg sm:text-base">
                                {error1}
                            </div>
                        )}
                    </div>

                    <div className="py-2 px-4 flex-col-reverse sm:flex-row flex justify-end sm:space-x-3 items-center bg-slate-100 rounded-b-lg text-lg sm:text-base font-semibold">
                        <button
                            onClick={() => setOpenExerciseModal(false)}
                            className="py-2 mt-2 sm:mt-0 sm:py-1 px-3 rounded-md bg-white border border-slate-300 duration-300 hover:bg-slate-100 select-none w-full sm:w-auto"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSelect}
                            className="py-2 sm:py-1 px-3 rounded-md bg-blue-600 border border-transparent text-white duration-300 hover:bg-blue-700 select-none w-full sm:w-auto text-lg sm:text-base"
                        >
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </>,
        _document.getElementById('portal')
    )
}
