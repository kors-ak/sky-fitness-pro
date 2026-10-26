'use client'

import { useEffect, useState } from 'react'
import styles from './scrollToTop.module.css'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={styles.button}
      aria-label="Прокрутить страницу наверх"
      onClick={scrollToTop}
      data-visible={isVisible}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
    >
      Наверх ↑
    </button>
  )
}
