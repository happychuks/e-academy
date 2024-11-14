import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/forgot-password/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      return NextResponse.json({ message: 'Password reset email sent' })
    } else {
      const errorData = await response.json()
      return NextResponse.json({ message: errorData.detail || 'Failed to send reset email' }, { status: 400 })
    }
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 })
  }
}