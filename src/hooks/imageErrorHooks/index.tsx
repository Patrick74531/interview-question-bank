import { SyntheticEvent, useCallback } from 'react'
export const useImageError = () => {
  const handleImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.onerror = null
      event.currentTarget.src = 'no-image.png'
    },
    []
  )
  return { handleImageError }
}
