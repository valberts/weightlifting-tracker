import React from 'react'
import ExerciseDropdown from './ExerciseDropdown'

export default function Dashboard() {
    return (
        <div className="border border-solid border-white flex flex-col-reverse sm:flex-row flex-1">
            <div className="w-full sm:w-1/4 border border-solid border-white">
                <ExerciseDropdown />
            </div>
            <div className="w-full sm:w-3/4 border border-solid border-white">
                Graph
            </div>
        </div>
    )
}
