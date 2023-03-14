import React from 'react'
import Graph from './Graph'
import useFetchExercises from '../hooks/fetchExercises'

export default function Dashboard(props) {
    const { currentlySelectedExercise } = props
    const { exercises, loading, error, setExercises } = useFetchExercises()
    return (
        <div className="flex">
            {!error && !loading && (
                <>
                    {Object.keys(exercises).map((exercise, i) => {
                        return exercises[exercise]
                    })}
                </>
            )}
            {/* <Graph currentlySelectedExercise={currentlySelectedExercise} /> */}
        </div>
    )
}
