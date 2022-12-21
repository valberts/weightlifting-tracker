import React, { useEffect, useState } from 'react'

export default function ExerciseDropdown() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const keyDownHandler = (event) => {
            console.log('User pressed: ', event.key)

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
                className="relative focus:z-10 flex w-full p-2 sm:p-3 justify-center items-center border border-solid border-white   duration-300 hover:opacity-40"
            >
                <h2 className="px-2 select-none">Select exercise</h2>
                <i className="fa-solid fa-chevron-down px-2"></i>
            </button>
            {isOpen && (
                <button
                    onClick={() => setIsOpen(false)}
                    tabIndex="-1"
                    className="fixed inset-0 h-full w-full bg-slate-900 opacity-50 cursor-default"
                ></button>
            )}
            {isOpen && (
                <div className="absolute w-full bg-white text-slate-900">
                    <h2 className="block cursor-pointer select-none hover:bg-indigo-100">
                        Option 1
                    </h2>
                    <h2 className="block cursor-pointer select-none hover:bg-indigo-100">
                        Option 2
                    </h2>
                    <h2 className="block cursor-pointer select-none hover:bg-indigo-100">
                        Option 3
                    </h2>
                </div>
            )}
            <div>Element under dropdown</div>
        </div>
    )
}
