'use client'

import { useEscapeKey } from '@/hooks/useEscapeKey'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import styles from './layout.module.css'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter()

  useEscapeKey(() => router.push('/'))

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.overlay} onClick={() => router.push('/')}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <Link href="/" aria-label="SkyFitnessPro — главная">
          <Image
            src="/logo.svg"
            alt="SkyFitnessPro"
            width={220}
            height={35}
            priority
          />
        </Link>
        {children}
      </div>
    </div>
  )
}
