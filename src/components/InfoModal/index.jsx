import InfoForm from '../InfoForm'

const InfoModal = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-gray-900 opacity-50' onClick={onClose} />
      <div className='bg-white rounded-lg p-6 relative z-10'>
        <InfoForm onClose={onClose} />
      </div>
    </div>
  ) : null
}

export default InfoModal
