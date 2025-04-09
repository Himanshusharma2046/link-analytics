import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Link Analytics Dashboard</h1>
        <p className="text-xl text-gray-600 mb-8">
          Create shortened links and track their performance with detailed analytics.
        </p>
        {user ? (
          <Link
            to="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  )
}

export default Home
