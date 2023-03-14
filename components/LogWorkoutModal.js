import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function LogWorkoutModal(props) {
    const { currentlySelectedExercise, setOpenWorkoutModal } = props
    const [error, setError] = useState(null)
    const [_document, set_document] = useState(null)
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) {
        return null
    }

    function handleClose(e) {
        if (e.target.id === 'wrapper') {
            setOpenWorkoutModal(false)
        }
    }

    function handleSubmit() {
        return () => {
            if (currentlySelectedExercise) {
                if (!weight || !reps) {
                    setError('Please complete the form')
                    return
                }
                setError(null)
                setLoading(true)
                return
            }
            setError('Please select an exercise first')
            return
        }
    }

    return ReactDom.createPortal(
        <div
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900 bg-opacity-25 flex justify-center items-center"
            id="wrapper"
        >
            <div className="w-full max-w-[30ch] rounded-lg shadow-xl flex flex-col bg-white text-slate-900">
                <div className="sm:p-6 p-4 flex flex-col flex-1">
                    <h2 className="p-2 font-semibold text-lg">
                        {currentlySelectedExercise
                            ? currentlySelectedExercise
                            : 'No exercise selected'}
                    </h2>
                    {error && (
                        <div className="w-full max-w-[30ch] border border-solid border-rose-400 text-rose-400 text-center mb-2 text-lg sm:text-base">
                            {error}
                        </div>
                    )}
                    {/* <h2 className="px-2">Log a workout:</h2> */}
                    <input
                        value={weight}
                        onChange={(e) =>
                            setWeight(e.target.value.replace(/\D/, ''))
                        }
                        type="text"
                        placeholder="Weight (kg)"
                        className="outline-none duration-300 border-slate-300 border text-slate-900 p-2 w-full max-w-[30ch]"
                    />
                    <input
                        value={reps}
                        onChange={(e) =>
                            setReps(e.target.value.replace(/\D/, ''))
                        }
                        type="text"
                        placeholder="Number of reps (total)"
                        className="outline-none duration-300 border-slate-300 border text-slate-900 p-2 mt-2 w-full max-w-[30ch]"
                    />
                    <div className="flex flex-row items-center relative">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="outline-none duration-300 border-slate-300 border text-slate-900 p-2 mt-2 w-full max-w-[30ch]"
                        />
                        <i className="fa-solid fa-calendar-days absolute top-5 right-3 pointer-events-none"></i>
                    </div>
                </div>

                <div className="py-2 px-4 flex-col-reverse sm:flex-row flex justify-end sm:space-x-3 items-center bg-slate-100 rounded-b-lg text-lg sm:text-base font-semibold">
                    <button
                        onClick={() => setOpenWorkoutModal(false)}
                        className="py-2 mt-2 sm:mt-0 sm:py-1 px-3 rounded-md bg-white border border-slate-300 duration-300 hover:bg-slate-100 select-none w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit()}
                        className="py-2 sm:py-1 px-3 rounded-md bg-blue-600 border border-transparent text-white duration-300 hover:bg-blue-700 select-none w-full sm:w-auto text-lg sm:text-base"
                    >
                        {loading ? (
                            <i className="fa-solid fa-spinner animate-spin"></i>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
            </div>
        </div>,
        _document.getElementById('portal')
    )
}
