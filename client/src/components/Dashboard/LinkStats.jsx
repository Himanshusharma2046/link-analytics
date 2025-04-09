import { useSelector } from 'react-redux'
import { formatDate } from '../../utils/formatDate'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Spinner from '../Layout/Spinner'

function LinkStats() {
  const { currentLink, isLoading } = useSelector((state) => state.links)

  if (isLoading) {
    return <Spinner />
  }

  if (!currentLink) {
    return null
  }

  // Prepare data for charts
  const clicksByDate = {}
  const deviceCounts = {}
  const browserCounts = {}

  currentLink.clicks.forEach((click) => {
    // Process clicks by date
    const date = new Date(click.timestamp).toLocaleDateString()
    clicksByDate[date] = (clicksByDate[date] || 0) + 1

    // Process device types
    const device = click.device || 'Unknown'
    deviceCounts[device] = (deviceCounts[device] || 0) + 1

    // Process browsers
    const browser = click.browser || 'Unknown'
    browserCounts[browser] = (browserCounts[browser] || 0) + 1
  })

  // Convert to array format for charts
  const clicksData = Object.keys(clicksByDate).map((date) => ({
    date,
    clicks: clicksByDate[date],
  }))

  const deviceData = Object.keys(deviceCounts).map((device) => ({
    name: device,
    value: deviceCounts[device],
  }))

  const browserData = Object.keys(browserCounts).map((browser) => ({
    name: browser,
    value: browserCounts[browser],
  }))

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Link Statistics</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Link Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Original URL:</p>
            <p className="text-gray-800 break-all">{currentLink.originalUrl}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Short URL:</p>
            <p className="text-blue-500">
              <a 
                href={`http://localhost:5000/${currentLink.shortUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                /{currentLink.shortUrl}
              </a>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Created:</p>
            <p className="text-gray-800">{formatDate(currentLink.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Expires:</p>
            <p className="text-gray-800">{currentLink.expiresAt ? formatDate(currentLink.expiresAt) : 'Never'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Clicks:</p>
            <p className="text-gray-800 font-bold">{currentLink.clicks.length}</p>
          </div>
        </div>
      </div>

      {currentLink.clicks.length > 0 ? (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Clicks Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={clicksData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Devices</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Browsers</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={browserData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {browserData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No clicks recorded yet for this link.
        </div>
      )}
    </div>
  )
}

export default LinkStats
