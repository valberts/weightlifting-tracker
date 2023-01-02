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
            <div className="w-1/2 rounded-lg shadow-xl flex flex-col bg-white text-slate-900">
                <div className="p-4 flex flex-col flex-1">
                    {/* Select Exercise */}
                    {/* <Dropdown /> */}
                    <ExerciseDropdown
                        currentlySelected={currentlySelected}
                        setCurrentlySelected={setCurrentlySelected}
                        setError={setError}
                    />
                    {error && (
                        <div className="w-full max-w-[30ch] border border-solid border-rose-400 text-rose-400 text-center mt-2">
                            {error}
                        </div>
                    )}
                </div>

                <div className="py-2 px-4 flex-row flex justify-end space-x-3 items-center bg-gray-100 text-sm rounded-b-lg">
                    <button
                        onClick={() => setOpenExerciseModal(false)}
                        className="py-1 px-3 rounded-md bg-white border border-gray-300 duration-300 hover:bg-gray-100 select-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSelect}
                        className="py-1 px-3 rounded-md bg-blue-600 border border-transparent text-white duration-300 hover:bg-blue-700 select-none"
                    >
                        Select
                    </button>
                </div>
            </div>
        </div>,
        _document.getElementById('portal')
    )
}
