import React from 'react'

export default function Dashboard(props) {
    const { currentlySelectedExercise } = props
    return (
        <div className=" flex flex-1">
            <div className="">
                <h2
                    onClick={() => alert(currentlySelectedExercise)}
                    className="text-black bg-white"
                >
                    Graph {currentlySelectedExercise}
                </h2>
            </div>
        </div>
    )
}
