import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 lg:p-24 bg-white text-gray-900">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-green-700">Welcome to E-Academy</h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-700">
          E-Academy is an innovative Islamic Edtech on a mission to revolutionize online learning by providing high-quality, accessible education to learners worldwide.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-green-700">Interactive Courses</h3>
            <p className="text-gray-700">Engage with interactive content and quizzes to enhance your learning experience.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-green-700">Expert Instructors</h3>
            <p className="text-gray-700">Learn from industry experts and experienced educators.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-green-700">Flexible Schedule</h3>
            <p className="text-gray-700">Access courses anytime, anywhere, and learn at your own pace.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Testimonials</h2>
        <div className="space-y-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4"> E-Academy has transformed the way I learn. The courses are engaging and the instructors are top-notch!</p>
            <p className="text-gray-900 font-bold">- Jane Doe</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">I love the flexibility of being able to learn at my own pace. E-Academy fits perfectly into my busy schedule.</p>
            <p className="text-gray-900 font-bold">- John Smith</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full max-w-4xl text-center py-8 border-t border-gray-300">
        <p className="text-gray-700">&copy; {new Date().getFullYear()} E-Academy. All rights reserved.</p>
      </footer>
    </main>
  )
}