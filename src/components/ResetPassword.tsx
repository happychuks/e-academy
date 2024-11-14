'use client'

import { useState, Suspense } from 'react'
import { z } from 'zod'
import dynamic from 'next/dynamic'
import LoadingSpinner from "@/components/LoadingSpinner";


const ResetPasswordForm = dynamic(() => import('./ResetPasswordForm'), { 
  loading: () => <LoadingSpinner />,
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  password2: z.string(),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
})

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [formErrors, setFormErrors] = useState<{
    password?: string[]
    password2?: string[]
  } | null>(null)

  const handleResetPassword = async (e: React.FormEvent, uid: string | null, token: string | null) => {
    e.preventDefault();
    setFormErrors(null)
    setAlert(null)

    // Frontend Validation
    try {
      resetPasswordSchema.parse({ password, password2 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.formErrors.fieldErrors)
        return
      }
    }

    // Ensure the reset link is valid
    if (!uid || !token) {
      setAlert({ type: 'error', message: 'Invalid reset password link' })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/reset-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, token, password, password2 }),
      })
      console.log("Response:", response)

      const data = await response.json()

      if (response.ok) {
        setAlert({ type: 'success', message: 'Password reset successfully. Redirecting to login page...' })
        setTimeout(() => window.location.href = '/login', 3000)
      } else {
        setAlert({ type: 'error', message: data.message || 'Failed to reset password. Please try again.' })
      }
    } catch {
      setAlert({ type: 'error', message: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Suspense fallback={<LoadingSpinner />}>
            <ResetPasswordForm
              password={password}
              setPassword={setPassword}
              password2={password2}
              setPassword2={setPassword2}
              showPassword1={showPassword1}
              setShowPassword1={setShowPassword1}
              showPassword2={showPassword2}
              setShowPassword2={setShowPassword2}
              isLoading={isLoading}
              formErrors={formErrors}
              alert={alert}
              handleResetPassword={handleResetPassword}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}