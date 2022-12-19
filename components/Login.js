import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoggingIn, setIsLoggingIn] = useState(true)

    const { login, signup } = useAuth()

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password')
            return
        }
        if (isLoggingIn) {
            try {
                await login(email, password)
            } catch (err) {
                setError('Incorrect email or password')
            }
            return
        }
        await signup(email, password)
    }
    return (
        <div className="flex-1 flex flex-col justify-center items-center text-xs sm:text-sm gap-2 sm:gap-4">
            <h1 className="font-extrabold select-none text-2xl sm:text-4xl">
                {isLoggingIn ? 'Login' : 'Register'}
            </h1>
            {error && (
                <div className="w-full max-w-[30ch] border border-solid border-rose-400 text-rose-400 text-center padding-y-2">
                    {error}
                </div>
            )}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email Address"
                className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[30ch]"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[30ch]"
            />
            <button
                onClick={submitHandler}
                className="w-full max-w-[30ch] border border-white border-solid py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
            >
                <h2 className="relative z-20 select-none">Submit</h2>
            </button>
            <h2
                className="duration-300 hover:scale-110 cursor-pointer select-none"
                onClick={() => setIsLoggingIn(!isLoggingIn)}
            >
                {!isLoggingIn ? 'Login' : 'Register'}
            </h2>
        </div>
    )
}
