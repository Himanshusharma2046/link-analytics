import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLinks, getLinkById } from '../../features/links/linkSlice'
import { formatDate, isExpired } from '../../utils/formatDate'
import Spinner from '../Layout/Spinner'

function LinkList({ onSelectLink }) {
  const dispatch = useDispatch()
  const { links, isLoading } = useSelector((state) => state.links)

  useEffect(() => {
    dispatch(getLinks())
  }, [dispatch])

  const handleSelectLink = (id) => {
    dispatch(getLinkById(id))
    onSelectLink()
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Links</h2>
      {links.length === 0 ? (
        <p className="text-gray-500">You haven't created any links yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {links.map((link) => (
                <tr key={link._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                    {link.originalUrl}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    <a 
                      href={`http://localhost:5000/${link.shortUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      /{link.shortUrl}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {link.clicks.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(link.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isExpired(link.expiresAt) ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Expired
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleSelectLink(link._id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Stats
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default LinkList
