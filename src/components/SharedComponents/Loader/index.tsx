const Loader = () => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-full flex justify-center items-center'
      role='status'
      aria-label='Loading'
    >
      <div
        className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'
        data-testid='loader-spinner'
      ></div>
    </div>
  )
}

export default Loader
