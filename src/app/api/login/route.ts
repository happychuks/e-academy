import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, rememberMe } = await request.json()

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      // Use rememberMe to determine the type of response to return
      if (rememberMe) {
        // Return a response with a longer expiration time
        return NextResponse.json(data, { headers: { 'Set-Cookie': 'rememberMe=true; Max-Age=3600' } })
      } else {
        return NextResponse.json(data)
      }
    } else {
      const errorData = await response.json()
      return NextResponse.json({ message: errorData.detail || 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 })
  }
}