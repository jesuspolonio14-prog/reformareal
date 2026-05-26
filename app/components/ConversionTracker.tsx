'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export default function ConversionTracker({ conversionId }: { conversionId: string }) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current || !window.gtag) return
    fired.current = true
    window.gtag('event', 'conversion', { send_to: conversionId })
  }, [conversionId])
  return null
}
