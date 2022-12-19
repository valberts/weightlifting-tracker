import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import TodoCard from './TodoCard'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTodos from '../hooks/fetchTodos'

export default function UserDashboard() {
    const { userInfo, currentUser } = useAuth()
    const [edit, setEdit] = useState(null)
    const [todo, setTodo] = useState('')
    const [editedValue, setEditedValue] = useState('')

    const { todos, loading, error, setTodos } = useFetchTodos()

    // useEffect(() => {
    //     if (!userInfo || Object.keys(userInfo).length === 0) {
    //         setAddTodo(true)
    //     }
    // }, [userInfo])

    async function handleAddTodo() {
        if (!todo) {
            return
        }
        const newKey =
            Object.keys(todos).length === 0
                ? 1
                : Math.max(...Object.keys(todos)) + 1
        const userRef = doc(db, 'users', currentUser.uid)
        setTodos({ ...todos, [newKey]: todo })
        await setDoc(
            userRef,
            {
                todos: {
                    [newKey]: todo,
                },
            },
            { merge: true }
        )
        setTodo('')
    }

    async function handleEditTodo() {
        if (!editedValue) {
            return
        }
        const newKey = edit
        setTodos({ ...todos, [newKey]: editedValue })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(
            userRef,
            {
                todos: {
                    [newKey]: editedValue,
                },
            },
            { merge: true }
        )
        setEdit(null)
        setEditedValue('')
    }

    function handleAddEdit(todoKey) {
        return () => {
            setEdit(todoKey)
            setEditedValue(todos[todoKey])
        }
    }

    function handleDelete(todoKey) {
        return async () => {
            const tempObj = { ...todos }
            delete tempObj[todoKey]
            setTodos(tempObj)
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(
                userRef,
                {
                    todos: {
                        [todoKey]: deleteField(),
                    },
                },
                { merge: true }
            )
        }
    }

    return (
        <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5">
            <div className="flex items-stretch">
                <input
                    type="text"
                    placeholder="Enter todo"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="outline-none p-3 text-slate-900 text-base sm:text-lg flex-1"
                ></input>
                <button
                    onClick={handleAddTodo}
                    className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40 select-none"
                >
                    Add
                </button>
            </div>
            {error && (
                <div className="w-full border border-solid border-rose-400 text-rose-400 text-center padding-y-2">
                    {error}
                </div>
            )}
            {loading && (
                <div className="flex-1 grid place-items-center">
                    <i className="fa-solid fa-spinner animate-spin text-4xl"></i>
                </div>
            )}
            {!error && !loading && (
                <>
                    {Object.keys(todos).map((todo, i) => {
                        return (
                            <TodoCard
                                key={i}
                                handlEditTodo={handleEditTodo}
                                handleAddEdit={handleAddEdit}
                                edit={edit}
                                todoKey={todo}
                                editedValue={editedValue}
                                setEditedValue={setEditedValue}
                                handleDelete={handleDelete}
                            >
                                {todos[todo]}
                            </TodoCard>
                        )
                    })}
                </>
            )}
            {/* {!addTodo && (
                <button
                    onClick={() => setAddTodo(true)}
                    className="text-cyan-300 border border-solid border-cyan-300 py-2 text-center duration-300 hover:opacity-40"
                >
                    ADD TODO
                </button>
            )} */}
        </div>
    )
}
