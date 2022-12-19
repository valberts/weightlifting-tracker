import React from 'react'

export default function TodoCard(props) {
    const {
        children,
        edit,
        handleAddEdit,
        editedValue,
        setEditedValue,
        todoKey,
        handlEditTodo,
        handleDelete,
    } = props

    return (
        <div className="p-2 relative sm:p-3 flex items-stretch border border-white border-solid">
            <div className="flex-1 flex">
                {!(edit === todoKey) ? (
                    <>{children}</>
                ) : (
                    <input
                        className="flex-1 bg-inherit opacity-50 text-white outline-none"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                    />
                )}
                {/* {children} */}
            </div>
            <div className="flex items-center">
                {edit === todoKey ? (
                    <i
                        onClick={handlEditTodo}
                        className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"
                    />
                ) : (
                    <i
                        onClick={handleAddEdit(todoKey)}
                        className="fa-solid fa-pencil px-2 duration-300 hover:scale-125 cursor-pointer"
                    ></i>
                )}
                <i
                    onClick={handleDelete(todoKey)}
                    className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"
                ></i>
            </div>
        </div>
    )
}
