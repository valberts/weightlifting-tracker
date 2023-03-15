import React from 'react'
import Graph from './Graph'
import useFetchExercises from '../hooks/fetchExercises'

export default function Dashboard(props) {
    const { currentlySelectedExercise } = props
    const { exercises, loading, error, setExercises } = useFetchExercises()
    return (
        <div className="flex">
            <p>{JSON.stringify(exercises)}</p>
            {/* <h1 className="text-2xl">
                {!currentlySelectedExercise
                    ? 'No exercise selected'
                    : currentlySelectedExercise}
            </h1>
            {!error && !loading && (
                <>
                    {Object.keys(exercises).map((exercise, i) => {
                        return exercises[exercise]
                    })}
                </>
            )} */}
            {/* <Graph currentlySelectedExercise={currentlySelectedExercise} /> */}
        </div>
    )
}
