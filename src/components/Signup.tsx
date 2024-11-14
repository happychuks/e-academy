'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { z } from 'zod'
import LoadingSpinner from './LoadingSpinner';
import GoogleIcon from './GoogleIcon';
import TwitterIcon from './TwitterIcon';

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't  match",
  path: ["confirmPassword"],
})


export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [formErrors, setFormErrors] = useState<{
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  } | null>(null)
  const router = useRouter()

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormErrors(null)
    setAlert(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    try {
      signUpSchema.parse({ email, password, confirmPassword })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.formErrors.fieldErrors)
        return
      }
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, password2: confirmPassword }),
      })

      if (response.ok) {
        setAlert({ type: 'success', message: 'Account created successfully!' })
        setTimeout(() => router.push('/login'), 2000)
      } else {
        const errorData = await response.json()
        setAlert({ type: 'error', message: errorData.message || 'Signup failed. Please try again.' })
      }
    } catch (error) {
      console.error('Error in signup route:', error)
      setAlert({ type: 'error', message: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h5 className="mt-6 text-center text-2xl font-bold text-gray-900">E-Academy</h5>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h4 className="mb-6 text-center text-2xl font-bold text-gray-900">Create an account</h4>
          <p className="mb-6 text-center text-sm text-gray-600">Enter your credentials to create your account</p>
                    
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input id="email" name="email" type="email" placeholder="Enter Email" required />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {formErrors?.email && <p className="mt-2 text-sm text-red-600">{formErrors.email[0]}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              {formErrors?.password && <p className="mt-2 text-sm text-red-600">{formErrors.password[0]}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="focus:outline-none">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              {formErrors?.confirmPassword && <p className="mt-2 text-sm text-red-600">{formErrors.confirmPassword[0]}</p>}
            </div>
            
            {alert && (
            <Alert className={alert.type === 'error' ? 'bg-red-100' : 'bg-green-100'}>
              <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

            <Button type="submit" className="w-full bg-custom-blue hover:bg-custom-blue-hover text-white flex items-center justify-center" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Create an account'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col space-y-3">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <GoogleIcon />
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <TwitterIcon />
                Continue with Twitter
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account? {' '}
              <Link href="/login" className="font-medium text-custom-blue hover:text-custom-blue-hover">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}