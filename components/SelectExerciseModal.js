import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import ExerciseDropdown from './ExerciseDropdown'

export default function SelectExerciseModal(props) {
    const { setOpenExerciseModal } = props
    const [_document, set_document] = useState(null)
    const [error, setError] = useState(null)
    const [currentlySelected, setCurrentlySelected] = useState(null)

    function handleClose(e) {
        if (e.target.id === 'wrapper') {
            setOpenExerciseModal(false)
        }
    }

    function handleSelect() {
        if (currentlySelected) {
            setError(null)
            setOpenExerciseModal(false)
            return
        }
        setError('Please select an exercise first')
    }

    useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) {
        return null
    }

    return ReactDom.createPortal(
        <div
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900 bg-opacity-25 flex justify-center items-center"
            id="wrapper"
        >
            <div className="w-full max-w-[30ch] rounded-lg shadow-xl flex flex-col bg-white text-slate-900">
                <div className="sm:p-6 p-4 flex flex-col flex-1">
                    {/* Select Exercise */}
                    {/* <Dropdown /> */}
                    <ExerciseDropdown
                        currentlySelected={currentlySelected}
                        setCurrentlySelected={setCurrentlySelected}
                        setError={setError}
                    />
                    {error && (
                        <div className="w-full max-w-[30ch] border border-solid border-rose-400 text-rose-400 text-center mt-4 text-lg sm:text-base">
                            {error}
                        </div>
                    )}
                </div>

                <div className="py-2 px-4 flex-col-reverse sm:flex-row flex justify-end sm:space-x-3 items-center bg-gray-100 rounded-b-lg text-lg sm:text-base">
                    <button
                        onClick={() => setOpenExerciseModal(false)}
                        className="py-2 mt-2 sm:mt-0 sm:py-1 px-3 rounded-md bg-white border border-gray-300 duration-300 hover:bg-gray-100 select-none w-full sm:w-auto"
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
        </div>,
        _document.getElementById('portal')
    )
}
