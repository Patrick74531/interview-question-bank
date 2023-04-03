const ErrorModal = ({ isOpen, onClose, error }: any) => {
  const modalLabel = 'Error message'
  return isOpen ? (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      aria-labelledby={modalLabel}
    >
      <div className='fixed inset-0 bg-gray-900 opacity-50' onClick={onClose} />
      <div className='bg-white rounded-lg p-6 relative z-10'>{error}</div>
    </div>
  ) : null
}

export default ErrorModal
