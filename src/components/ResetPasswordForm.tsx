'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoadingSpinner from './LoadingSpinner';

interface ResetPasswordFormProps {
  password: string;
  setPassword: (password: string) => void;
  password2: string;
  setPassword2: (password: string) => void;
  showPassword1: boolean;
  setShowPassword1: (show: boolean) => void;
  showPassword2: boolean;
  setShowPassword2: (show: boolean) => void;
  isLoading: boolean;
  formErrors: {
    password?: string[];
    password2?: string[];
  } | null;
  alert: { type: 'success' | 'error', message: string } | null;
  handleResetPassword: (e: React.FormEvent, uid: string | null, token: string | null) => void;
}

export default function ResetPasswordForm({
  password,
  setPassword,
  password2,
  setPassword2,
  showPassword1,
  setShowPassword1,
  showPassword2,
  setShowPassword2,
  isLoading,
  formErrors,
  alert,
  handleResetPassword,
}: ResetPasswordFormProps) {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!uid || !token) {
      // Handle invalid reset password link
      console.error('Invalid reset password link');
    }
  }, [uid, token]);

  return (
    <form className="space-y-6" onSubmit={(e) => handleResetPassword(e, uid, token)}>
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
  );
}