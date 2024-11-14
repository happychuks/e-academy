import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { uid, token, password, password2 } = await request.json()
/*   console.log('uid:', uid)
  console.log('token:', token)
  console.log('password:', password)
  console.log('password2:', password2) */

  if (!uid || !token || !password || !password2) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  const backendUrl = process.env.BACKEND_URL
  if (!backendUrl) {
    console.error('BACKEND_URL is not set')
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 })
  }

  const resetUrl = `${backendUrl}/api/reset-password/${uid}/${token}/`
  console.log('Sending request to:', resetUrl)


  try {
    const response = await fetch(resetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, password2 }),
    })

    console.log('Backend response status:', response.status)

    if (response.ok) {
      return NextResponse.json({ message: 'Password reset successfully' })
    } else {
      const errorData = await response.json()
      return NextResponse.json({ message: errorData.detail || 'Failed to reset password' }, { status: response.status })
    }
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ message: '(API) An unexpected error occurred' }, { status: 500 })
  }
}