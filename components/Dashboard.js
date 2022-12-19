import React from 'react'

export default function Dashboard() {
    return (
        <div className="bg-green-300 flex flex-row flex-1 p-4 text-slate-900">
            <div className="w-1/4 bg-green-100">Sidebar</div>
            <div className="w-3/4 bg-green-200">Graph</div>
        </div>
    )
}
