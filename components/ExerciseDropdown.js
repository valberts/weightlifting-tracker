import React, { useEffect, useState } from 'react'
import useFetchExercises from '../hooks/fetchExercises'

export default function ExerciseDropdown(props) {
    const {
        setOpenExerciseModal,
        currentlySelected,
        setCurrentlySelected,
        setError,
        setAddOpenExerciseModal,
    } = props
    const [isOpen, setIsOpen] = useState(false)
    const { loading, error, exercises, setExercises } = useFetchExercises()

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
        <>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-row items-center justify-center p-2 border border-slate-300 w-full select-none text-lg"
                >
                    {currentlySelected ? currentlySelected : 'Select Exercise'}
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
                    <div className="mt-2 flex flex-col absolute w-full max-h-80 sm:max-h-56 shadow-lg overflow-scroll border bg-white">
                        {!error && !loading && (
                            <>
                                {Object.keys(exercises).map((exercise, i) => {
                                    return (
                                        <button
                                            onClick={() => {
                                                setCurrentlySelected(
                                                    exercises[exercise]
                                                )
                                                setIsOpen(false)
                                                setError(null)
                                            }}
                                            className="sm:py-1 py-2 select-none duration-300 hover:bg-indigo-500 hover:text-white border-b-slate-200 border-t-2"
                                        >
                                            <div className="flex flex-row text-lg">
                                                <div className="p-2">
                                                    {exercises[exercise]}
                                                </div>
                                                <div className="flex-1 justify-end items-center gap-2 flex p-2">
                                                    <i className="fa-solid fa-pen-to-square hover:scale-125 duration-300"></i>
                                                    <i className="fa-solid fa-trash hover:scale-125 duration-300"></i>
                                                </div>
                                            </div>
                                        </button>
                                        /* <TodoCard
                                            key={i}
                                            handlEditTodo={handleEditTodo}
                                            handleAddEdit={handleAddEdit}
                                            edit={edit}
                                            todoKey={todo}
                                            editedValue={editedValue}
                                            setEditedValue={setEditedValue}
                                            handleDelete={handleDelete}
                                        >
                                            {todos[todo]}
                                        </TodoCard> */
                                    )
                                })}
                            </>
                        )}
                        <button
                            onClick={() => {
                                setCurrentlySelected(null)
                                setIsOpen(false)
                                setError(null)
                                // setOpenExerciseModal(false)
                                setAddOpenExerciseModal(true)
                            }}
                            className="flex flex-row items-center justify-center sm:py-1 py-2 select-none duration-300 hover:bg-indigo-500 hover:text-white border-t-2 text-lg"
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
