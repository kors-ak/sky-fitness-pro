'use client'

import { usePathname } from 'next/navigation'
import HomePageContent from '../HomePageContent/HomePageContent'

export default function AuthBackground() {
  const pathname = usePathname()

  if (!pathname.startsWith('/auth/')) {
    return null
  }

  return (
    <div className="authBackground">
      <HomePageContent />
    </div>
  )
}
