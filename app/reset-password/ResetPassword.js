"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '@/utils/api'

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reset_password_token = searchParams.get('reset_password_token')

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.put('/authors/password', {
        author: {
          reset_password_token,
          password,
          password_confirmation: passwordConfirmation,
        },
      })
      setMessage('Password reset successfully. Redirecting to login...')
      setTimeout(() => router.push('/author/sign_in'), 2000)
    } catch (err) {
      setError(err.response?.data?.errors || ['An error occurred.'])
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-4 border rounded-xl">
      <h1 className="text-xl font-bold mb-4">Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Confirm new password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Reset Password</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error.length > 0 && (
        <ul className="mt-4 text-red-600 list-disc pl-5">
          {error.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
