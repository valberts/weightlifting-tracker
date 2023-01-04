import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useAuth } from '../context/AuthContext'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchExercises from '../hooks/fetchExercises'

export default function AddExerciseModal(props) {
    const { userInfo, currentUser } = useAuth()
    const { setOpenAddExerciseModal } = props
    const [_document, set_document] = useState(null)
    const [exercise, setExercise] = useState('')
    const { exercises, setExercises } = useFetchExercises()

    function handleClose(e) {
        if (e.target.id === 'wrapper') {
            setOpenAddExerciseModal(false)
        }
    }

    async function handleAddExercise() {
        if (!exercise) {
            return
        }
        const newKey =
            Object.keys(exercises).length === 0
                ? 1
                : Math.max(...Object.keys(exercises)) + 1
        const userRef = doc(db, 'users', currentUser.uid)
        setExercises({ ...exercises, [newKey]: exercise })
        await setDoc(
            userRef,
            {
                exercises: {
                    [newKey]: exercise,
                },
            },
            { merge: true }
        )
        setExercise('')
        setOpenAddExerciseModal(false)
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
                    <h2 className="p-2">Create a new exercise:</h2>
                    <input
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                        type="text"
                        placeholder="Exercise name"
                        className="outline-none duration-300 border-slate-300 border text-slate-900 p-2 w-full max-w-[30ch]"
                    />
                </div>
                <div className="py-2 px-4 flex-col-reverse sm:flex-row flex justify-end sm:space-x-3 items-center bg-slate-100 rounded-b-lg text-lg sm:text-base">
                    <button
                        onClick={() => setOpenAddExerciseModal(false)}
                        className="py-2 mt-2 sm:mt-0 sm:py-1 px-3 rounded-md bg-white border border-slate-300 duration-300 hover:bg-slate-100 select-none w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddExercise}
                        className="py-2 sm:py-1 px-3 rounded-md bg-blue-600 border border-transparent text-white duration-300 hover:bg-blue-700 select-none w-full sm:w-auto text-lg sm:text-base"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>,
        _document.getElementById('portal2')
    )
}
