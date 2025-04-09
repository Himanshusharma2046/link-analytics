import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLinks } from '../../features/links/linkSlice'
import { FaCopy, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../Layout/Spinner'
import { formatDate } from '../../utils/formatDate'

function LinkList() {
  const dispatch = useDispatch()
  const { links, isLoading, isError, message } = useSelector(
    (state) => state.links
  )

  useEffect(() => {
    dispatch(getLinks())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <div className="text-red-500">Error: {message}</div>
  }

  if (!links || links.length === 0) {
    return <div className="text-gray-500 mt-4">No links found. Create your first short link above!</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Your Links</h2>
      <div className="space-y-4">
        {links.map((link) => (
          <LinkItem key={link._id} link={link} />
        ))}
      </div>
    </div>
  )
}

// LinkItem component (internal to LinkList.jsx)
function LinkItem({ link }) {
  const [copied, setCopied] = useState(false)

  // Get the base URL for short links from environment variables
  // If VITE_SHORT_URL_BASE is not available, fall back to environment detection
  const baseUrl = import.meta.env.VITE_SHORT_URL_BASE || 
    (import.meta.env.PROD
      ? 'https://link-analytics-api.onrender.com'
      : 'http://localhost:5000')

  const shortUrl = `${baseUrl}/${link.shortUrl}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    toast.success('Link copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <h3 className="text-lg font-semibold truncate mr-2">
          {link.originalUrl}
        </h3>
        <div className="flex items-center mt-2 md:mt-0">
          <Link
            to={`/dashboard/links/${link._id}`}
            className="text-blue-500 hover:text-blue-700 mr-4 flex items-center"
          >
            <FaChartBar className="mr-1" /> Stats
          </Link>
          <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <FaCopy className="mr-1" /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-600">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 truncate mr-4"
        >
          {shortUrl}
        </a>
        <div className="mt-1 md:mt-0">
          <span className="mr-4">Clicks: {link.clicks.length}</span>
          <span>Created: {formatDate(link.createdAt)}</span>
          {link.expiresAt && (
            <span className="ml-4">Expires: {formatDate(link.expiresAt)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default LinkList
