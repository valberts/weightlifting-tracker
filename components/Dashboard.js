import React from 'react'
import Graph from './Graph'

export default function Dashboard(props) {
    const { currentlySelectedExercise } = props
    return (
        <div className="flex">
            <div className="">
                <Graph currentlySelectedExercise={currentlySelectedExercise} />
            </div>
        </div>
    )
}
