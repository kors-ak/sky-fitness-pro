'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import styles from './layout.module.css'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
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
