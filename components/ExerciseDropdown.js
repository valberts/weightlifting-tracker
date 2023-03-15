import React, { useEffect, useState } from 'react'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'

export default function ExerciseDropdown(props) {
    const {
        currentlySelectedExercise,
        setCurrentlySelectedExercise,
        setError1,
        setAddOpenExerciseModal,
        currentUser,
        loading,
        error,
        exercises,
        setExercises,
        selectedExercise,
        setSelectedExercise,
    } = props
    const [isOpen, setIsOpen] = useState(false)
    const [edit, setEdit] = useState(null)
    const [editedValue, setEditedValue] = useState('')

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

    function handleDelete(exerciseKey) {
        return async () => {
            const tempObj = { ...exercises }
            delete tempObj[exerciseKey]
            setExercises(tempObj)
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(
                userRef,
                {
                    exercises: {
                        [exerciseKey]: deleteField(),
                    },
                },
                { merge: true }
            )
            setSelectedExercise(null)
            setCurrentlySelectedExercise(null)
        }
    }

    async function handleEditExercise() {
        if (!editedValue) {
            return
        }
        const newKey = edit
        setExercises({ ...exercises, [newKey]: editedValue })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(
            userRef,
            {
                exercises: {
                    [newKey]: editedValue,
                },
            },
            { merge: true }
        )
        setEdit(null)
        setSelectedExercise(editedValue)
        setCurrentlySelectedExercise(editedValue)
        setEditedValue('')
    }

    function handleAddEdit(exerciseKey) {
        return () => {
            setEdit(exerciseKey)
            setEditedValue(exercises[exerciseKey])
        }
    }

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-row items-center justify-center p-3 border border-slate-300 w-full select-none text-lg font-semibold"
                >
                    {selectedExercise && currentlySelectedExercise
                        ? selectedExercise
                        : currentlySelectedExercise
                        ? currentlySelectedExercise
                        : selectedExercise
                        ? selectedExercise
                        : 'Select Exercise'}

                    <i
                        className={`fa-solid fa-chevron-down px-2 duration-300 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    ></i>
                </button>
                {isOpen && (
                    <button
                        onClick={() => setIsOpen(false)}
                        tabIndex="-1"
                        className="fixed inset-0 h-full w-full cursor-default"
                    ></button>
                )}
                {isOpen && (
                    <div className="mt-2 flex flex-col absolute w-full max-h-80 sm:max-h-56 shadow-lg overflow-scroll border border-slate-300 bg-white">
                        {loading && (
                            <div className="flex-1 grid place-items-center p-4 text-2xl">
                                <i className="fa-solid fa-spinner animate-spin "></i>
                            </div>
                        )}
                        {!error && !loading && (
                            <>
                                {Object.keys(exercises).map((exercise, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="flex flex-row text-lg duration-300 hover:bg-indigo-500 hover:text-white border-b border-slate-300 p-3 items-center"
                                        >
                                            {!(edit === exercise) ? (
                                                <button
                                                    onClick={() => {
                                                        setSelectedExercise(
                                                            exercises[exercise]
                                                        )
                                                        setIsOpen(false)
                                                        setError1(null)
                                                    }}
                                                    className="select-none flex-1 flex"
                                                >
                                                    <div className="">
                                                        {exercises[exercise]}
                                                    </div>
                                                </button>
                                            ) : (
                                                <input
                                                    className="flex-1 bg-inherit opacity-70 outline-none max-w-[16ch]"
                                                    value={editedValue}
                                                    onChange={(e) =>
                                                        setEditedValue(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            )}
                                            <div className="justify-end items-center gap-2 flex p-2">
                                                {!(edit === exercise) ? (
                                                    <>
                                                        <i
                                                            onClick={handleAddEdit(
                                                                exercise
                                                            )}
                                                            className="fa-solid fa-pen-to-square hover:scale-125 duration-300 cursor-pointer"
                                                        ></i>
                                                        <i
                                                            onClick={handleDelete(
                                                                exercise
                                                            )}
                                                            className="fa-solid fa-trash hover:scale-125 duration-300 cursor-pointer"
                                                        ></i>
                                                    </>
                                                ) : (
                                                    <i
                                                        onClick={
                                                            handleEditExercise
                                                        }
                                                        className="fa-solid fa-check hover:scale-125 duration-300 cursor-pointer pr-2 pl-4 -ml-3"
                                                    ></i>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        )}
                        <button
                            onClick={() => {
                                // setCurrentlySelectedExercise(null)
                                setSelectedExercise(null)
                                setIsOpen(false)
                                setError1(null)
                                // setOpenExerciseModal(false)
                                setAddOpenExerciseModal(true)
                            }}
                            className="flex flex-row items-center justify-center sm:py-1 py-2 select-none duration-300 hover:bg-indigo-500 hover:text-white text-lg"
                        >
                            <i className="fa-solid fa-plus p-2"></i>
                            <h2 className="font-semibold p-2">
                                Add new exercise
                            </h2>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
