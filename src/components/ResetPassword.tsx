'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from 'zod';
import LoadingSpinner from './LoadingSpinner';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  password2: z.string(),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
});

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [formErrors, setFormErrors] = useState<{
    password?: string[];
    password2?: string[];
  } | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!uid || !token) {
      setAlert({ type: 'error', message: 'Invalid reset password link' });
    }
  }, [uid, token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(null);
    setAlert(null);

    // Frontend Validation
    try {
      resetPasswordSchema.parse({ password, password2 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.formErrors.fieldErrors);
        return;
      }
    }

    // Ensure the reset link is valid
    if (!uid || !token) {
      setAlert({ type: 'error', message: 'Invalid reset password link' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/reset-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, token, password, password2 }),
      });
      console.log("Response:", response);

      const data = await response.json();

      if (response.ok) {
        setAlert({ type: 'success', message: 'Password reset successfully. Redirecting to login page...' });
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setAlert({ type: 'error', message: data.message || 'Failed to reset password. Please try again.' });
      }
    } catch {
      setAlert({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Suspense>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          

          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div>
              <Label htmlFor="password">New Password</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="password"
                  name="password"
                  type={showPassword1 ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" onClick={() => setShowPassword1(!showPassword1)} className="focus:outline-none">
                    {showPassword1 ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              {formErrors?.password && <p className="mt-2 text-sm text-red-600">{formErrors.password[0]}</p>}
            </div>

            <div>
              <Label htmlFor="password2">Confirm New Password</Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="password2"
                  name="password2"
                  type={showPassword2 ? "text" : "password"}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" onClick={() => setShowPassword2(!showPassword2)} className="focus:outline-none">
                    {showPassword2 ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              {formErrors?.password2 && <p className="mt-2 text-sm text-red-600">{formErrors.password2[0]}</p>}
            </div>

            {alert && (
            <Alert className={alert.type === 'error' ? 'bg-red-100 mb-4' : 'bg-green-100 mb-4'}>
              <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

            <Button type="submit" className="w-full bg-custom-blue hover:bg-custom-blue-hover text-white" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </Suspense>
  );
  
}
