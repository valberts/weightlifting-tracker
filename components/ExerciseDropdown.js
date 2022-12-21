import React, { useEffect, useState } from 'react'

export default function ExerciseDropdown() {
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
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                tabIndex="-1"
                className="flex w-full p-2 sm:p-3 justify-center items-center border border-solid border-white duration-300 hover:opacity-40"
            >
                <h2 className="px-2 select-none">Select exercise</h2>
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
                <div className="w-full absolute bg-white text-slate-900">
                    <h2 className="block cursor-pointer select-none duration-300 hover:bg-indigo-500 hover:text-white px-4 py-2 text-center">
                        Bench press
                    </h2>
                    <h2 className="block cursor-pointer select-none duration-300 hover:bg-indigo-500 hover:text-white px-4 py-2 border-t-2 text-center">
                        Deadlift
                    </h2>
                    <h2 className="block cursor-pointer select-none duration-300 hover:bg-indigo-500 hover:text-white px-4 py-2 border-t-2 text-center">
                        Squat
                    </h2>
                    <button className="block w-full select-none duration-300 hover:bg-indigo-500 hover:text-white px-4 py-2 border-t-2">
                        Add new exercise
                    </button>
                </div>
            )}
            <div>Element under dropdown</div>
        </div>
    )
}
