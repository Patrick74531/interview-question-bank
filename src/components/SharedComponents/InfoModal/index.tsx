import { useEffect, useRef, FC } from 'react'
import { InfoModalType } from '../../../types'

const InfoModal: FC<InfoModalType> = ({ isOpen, children, onClose }) => {
  const modalContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    //for accessibility
    if (isOpen && modalContentRef.current) {
      modalContentRef.current.focus()
    }
  }, [isOpen])
  return isOpen ? (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      role='dialog'
      aria-labelledby='info-modal'
      data-testid='info-modal'
    >
      <div
        className='fixed inset-0 bg-gray-900 opacity-50'
        onClick={onClose}
        tabIndex={0}
        aria-label='Close modal'
      />
      <div
        className='bg-white rounded-lg p-6 relative z-10'
        ref={modalContentRef}
        tabIndex={-1}
        data-testid='modal-content'
      >
        {children}
      </div>
    </div>
  ) : null
}

export default InfoModal
