'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail } from 'lucide-react'
import { z } from 'zod'
import LoadingSpinner from './LoadingSpinner';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [formErrors, setFormErrors] = useState<{ email?: string[] } | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormErrors(null)
    setAlert(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string

    try {
      forgotPasswordSchema.parse({ email })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.formErrors.fieldErrors)
        return
      }
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setAlert({ type: 'success', message: 'Password reset email sent. Please check your inbox.' })
      } else {
        const data = await response.json()
        setAlert({ type: 'error', message: data.message || 'An error occurred. Please try again.' })
      }
    } catch (error) {
        console.error(error);
      setAlert({ type: 'error', message: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">          

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {formErrors?.email && <p className="mt-2 text-sm text-red-600">{formErrors.email[0]}</p>}
            </div>

            {alert && (
            <Alert className={alert.type === 'error' ? 'bg-red-100' : 'bg-green-100'}>
              <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}