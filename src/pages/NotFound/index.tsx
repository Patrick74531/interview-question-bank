import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-2xl font-semibold text-gray-900'>404</h1>
          <p className='mt-4 text-gray-700'>Sorry, the page is not found.</p>
          <Link to='/' aria-label='Go back to homepage'>
            <button
              className='mt-6 px-4 py-2 font-semibold text-white bg-btn-primary hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              aria-label='Go back to homepage'
            >
              go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
