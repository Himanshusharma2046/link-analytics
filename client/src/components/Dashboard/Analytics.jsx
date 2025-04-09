import { useState } from 'react'
import LinkForm from './LinkForm'
import LinkList from './LinkList'
import LinkStats from './LinkStats'

function Analytics() {
  const [showStats, setShowStats] = useState(false)

  const handleSelectLink = () => {
    setShowStats(true)
  }

  const handleBackToList = () => {
    setShowStats(false)
  }

  return (
    <div>
      <LinkForm />
      
      {showStats ? (
        <div>
          <button
            onClick={handleBackToList}
            className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Links
          </button>
          <LinkStats />
        </div>
      ) : (
        <LinkList onSelectLink={handleSelectLink} />
      )}
    </div>
  )
}

export default Analytics
