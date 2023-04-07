import { useState, useEffect } from 'react'

const BackToTopButton = () => {
  const BackToTopButton = 'Back to top button'
  const [isVisible, setIsVisible] = useState(false)

  // Function to handle scroll events
  const handleScroll = () => {
    const currentScroll = window.pageYOffset
    setIsVisible(currentScroll > 200)
  }

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-4 right-4 p-2 bg-btn-primary text-white  rounded-lg shadow-md hover:bg-purple-700 transition duration-200 ease-in-out'
      aria-labelledby={BackToTopButton}
    >
      Back to Top
    </button>
  )
}

export default BackToTopButton
