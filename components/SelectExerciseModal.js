import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

export default function SelectExerciseModal(props) {
    const { setOpenExerciseModal } = props
    const [_document, set_document] = useState(null)

    useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) {
        return null
    }

    return ReactDom.createPortal(
        <div
            onClick={() => setOpenExerciseModal(false)}
            className="fixed inset-0 bg-slate-900 opacity-50 flex justify-center items-center text-white"
        >
            <h1 className="opacity-100">Modal</h1>
        </div>,
        _document.getElementById('portal')
    )
}
