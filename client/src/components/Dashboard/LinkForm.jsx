import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createLink } from '../../features/links/linkSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function LinkForm() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [expiresAt, setExpiresAt] = useState(null)

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createLink({
      originalUrl,
      customAlias: customAlias || undefined,
      expiresAt: expiresAt || undefined,
    }))

    // Reset form
    setOriginalUrl('')
    setCustomAlias('')
    setExpiresAt(null)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="originalUrl">
            Original URL*
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="originalUrl"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="customAlias">
            Custom Alias (optional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="customAlias"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="my-custom-link"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="expiresAt">
            Expiration Date (optional)
          </label>
          <DatePicker
            selected={expiresAt}
            onChange={(date) => setExpiresAt(date)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select expiration date"
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Short Link
          </button>
        </div>
      </form>
    </div>
  )
}

export default LinkForm
