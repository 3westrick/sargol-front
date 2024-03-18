"use client"
import { authenticate } from '@/lib/actions'
import { useState, useTransition } from 'react'
import { Button } from "@mui/material";

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | undefined>("")

  const [isPending, startTransition] = useTransition()
  const handleSubmit = () => {
    setError(undefined)
    startTransition(() => {
      authenticate({email, password})
      .then((data) => data && setError(data.error))
    })
  }
  return (
    <form action={handleSubmit}>
      <input type="text" name="email" placeholder="Email" required  value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <input type="password" name="password" placeholder="Password"  value={password} onChange={(e)=> setPassword(e.target.value)}/>
      {error && <p>{error}</p>}
      <Button type="submit">Login</Button>
    </form>
  )
}