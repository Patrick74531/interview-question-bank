import { useState, useCallback, useRef, useEffect } from 'react'
import { HttpClientHookReturnType } from '../../types'

export const useHttpClient = (): HttpClientHookReturnType => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const activeHttpRequests = useRef<AbortController[]>([])

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = 'GET',
      body: string | null | undefined = undefined,
      headers: Record<string, string> = {}
    ) => {
      setIsLoading(true)
      const httpAbortCtrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrl)

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        })

        const responseData = await response.json()

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        )
        if (!response.ok) {
          setIsOpen(true)
          throw new Error(responseData.message)
        }
        setIsLoading(false)

        return responseData
      } catch (err: any) {
        setError(err.message)
        setIsOpen(true)
        setIsLoading(false)
        throw err
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())
    }
  }, [])

  return { isLoading, error, isOpen, sendRequest, clearError, setIsOpen }
}
