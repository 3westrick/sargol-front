"use client"
import { register } from '@/lib/actions'
import React, { useState, useTransition } from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState<string | undefined>("")

  const [isPending, startTransition] = useTransition()
  const handleSubmit = () => {
    setError(undefined)
    startTransition(() => {
      register({username, email, password, password_confirm})
      .then((data) => data && setError(data.error))
    })
  }
  return (
    <form action={handleSubmit}>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="username" placeholder="Username" required />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
        <input value={password_confirm} onChange={(e)=>setPasswordConfirm(e.target.value)} type="password" name="password_confirm" placeholder="Password Confirm" />
        <button type="submit">Register</button>
    </form>
  )
}

export default RegisterPage
