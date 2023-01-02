import React, { useEffect, useState } from 'react'

export default function ExerciseDropdown(props) {
    const { currentlySelected, setCurrentlySelected, setError } = props
    const [isOpen, setIsOpen] = useState(false)

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
                    className="flex flex-row items-center justify-center px-2 sm:py-1 py-2 border border-gray-300 w-full select-none rounded-md sm:text-base text-lg"
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
                    <div className="mt-2 flex flex-col absolute w-full max-h-40 shadow-lg overflow-scroll border bg-white text-lg sm:text-base">
                        <button
                            onClick={() => {
                                setCurrentlySelected('Bench press')
                                setIsOpen(false)
                                setError(null)
                            }}
                            className="sm:py-1 py-2 select-none duration-300 hover:bg-indigo-500 hover:text-white"
                        >
                            Bench press
                        </button>
                        <button
                            onClick={() => {
                                setCurrentlySelected('Squat')
                                setIsOpen(false)
                                setError(null)
                            }}
                            className="sm:py-1 py-2 pxselect-none duration-300 hover:bg-indigo-500 hover:text-white border-t-2"
                        >
                            Squat
                        </button>
                        <button
                            onClick={() => {
                                setCurrentlySelected('Deadlift')
                                setIsOpen(false)
                                setError(null)
                            }}
                            className="sm:py-1 py-2 select-none duration-300 hover:bg-indigo-500 hover:text-white border-t-2"
                        >
                            Deadlift
                        </button>
                        <button
                            onClick={() => {
                                setCurrentlySelected(null)
                                setIsOpen(false)
                                setError(null)
                            }}
                            className="flex flex-row items-center justify-center sm:py-1 py-2 select-none duration-300 hover:bg-indigo-500 hover:text-white border-t-2"
                        >
                            <i className="fa-solid fa-plus pr-2"></i>
                            <h2 className="font-semibold">Add new exercise</h2>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
