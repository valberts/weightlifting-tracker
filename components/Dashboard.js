import React from 'react'

export default function Dashboard() {
    return (
        <div className="bg-green-300 flex flex-row flex-1 p-4 text-slate-900">
            <div className="w-1/4 bg-green-100">
                Sidebar
                <h1>Select Exercise (Dropdown)</h1>
                <ul>
                    <li>-- Bench press - [Edit] [Delete]</li>
                    <li>-- Squat - [Edit] [Delete]</li>
                    <li>-- Deadlift - [Edit] [Delete]</li>
                    <l1>-- Button [Add new exercise]</l1>
                </ul>
                <h1>Log workout button (Opens modal)</h1>
                <h1>Edit and delete inside select exercise also opens modal</h1>
                <h1>
                    Selecting an exercise closes the dropdown and sets it as
                    active
                </h1>
            </div>
            <div className="w-3/4 bg-green-200">Graph</div>
        </div>
    )
}
