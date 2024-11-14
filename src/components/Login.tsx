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
import { Checkbox } from "@/components/ui/checkbox"
import { z } from 'zod'
import LoadingSpinner from './LoadingSpinner';
import GoogleIcon from './GoogleIcon';
import TwitterIcon from './TwitterIcon';



// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const router = useRouter()
  const [formErrors, setFormErrors] = useState<{
    email?: string[];
    password?: string[];
  } | null>(null)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormErrors(null)
    setIsLoading(true)
    setAlert(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const rememberMe = formData.get('remember-me') === 'on'

    try {
      loginSchema.parse({ email, password })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.formErrors.fieldErrors)
        return
      }
    }

    setIsLoading(true)

    // Send login request to backend API
    try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('accessToken', data.access)
        if (rememberMe) {
          localStorage.setItem('refreshToken', data.refresh)
        } else {
          sessionStorage.setItem('refreshToken', data.refresh)
        }
        setAlert({ type: 'success', message: 'Logged in successfully!' })
        router.push('/dashboard')
      } else {
        const errorData = await response.json()
        setAlert({ type: 'error', message: errorData.message || 'Invalid credentials' })
      }
    } catch (error) {
      console.error('Login error:', error)
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
          <h4 className="mb-6 text-center text-2xl font-bold text-gray-900">Log In</h4>
          <p className="mb-6 text-center text-sm text-gray-600">Enter your credentials to access your account</p>
          
          
          <form className="space-y-6" onSubmit={handleLogin}>
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

            {alert && (
            <Alert className={alert.type === 'error' ? 'bg-red-100' : 'bg-green-100'}>
              <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}


            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </Label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-custom-red hover:text-red-500">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full bg-custom-blue hover:bg-custom-blue-hover text-white flex items-center justify-center" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Log into Account'}
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
                <Link href="#" passHref>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                        <GoogleIcon />
                        Continue with Google
                    </Button>
                </Link>
                <Link href="#" passHref>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                        <TwitterIcon />
                        Continue with Twitter
                    </Button>
                </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Are you new here? {' '}
              <Link href="/signup" className="font-medium text-custom-blue hover:text-custom-blue-hover">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}