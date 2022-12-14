import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoggingIn, setIsLoggingIn] = useState(true)

    const { login, signup, errorMessage, errorCode } = useAuth()

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password')
            return
        }
        if (isLoggingIn) {
            await login(email, password)
            if (errorCode == 'auth/too-many-requests') {
                setError('Too many attempts, please try again later')
                return
            } else if (errorCode == 'auth/wrong-password') {
                setError('Incorrect email or password, please try again')
                return
            }
            setError(errorCode)
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
                <div className="w-full max-w-[30ch] border border-solid border-rose-400 text-rose-400 text-center">
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
