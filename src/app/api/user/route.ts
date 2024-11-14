import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const headersList = request.headers
  const token = headersList.get('Authorization')?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })

    if (response.ok) {
      const userData = await response.json()
      return NextResponse.json(userData)
    } else {
      return NextResponse.json({ message: 'Failed to fetch user data' }, { status: response.status })
    }
  } catch (error) {
    console.error('User data fetch error:', error)
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 })
  }
}