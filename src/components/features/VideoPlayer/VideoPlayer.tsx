'use client'

import { getVideoId } from '@/utils/getvideoId'
import Image from 'next/image'
import { useState } from 'react'
import YouTube, { YouTubePlayer } from 'react-youtube'
import styles from './videoPlayer.module.css'

type VideoPlayerProps = {
  url: string
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const videoId = getVideoId(url)

  if (!videoId) return null

  return (
    <div className={styles.player}>
      <YouTube
        videoId={videoId}
        className={styles.youtube}
        iframeClassName={styles.iframe}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            controls: 1,
            autoplay: 0,
            rel: 0,
            playsinline: 1,
          },
        }}
        onReady={(event) => setPlayer(event.target)}
        onStateChange={(event) => {
          setIsPlaying(event.data === 1)
        }}
      />

      {!isPlaying && (
        <button
          type="button"
          className={styles.playButton}
          aria-label="Начать воспроизведение"
          onClick={() => player?.playVideo()}
        >
          <Image
            src="/icons/play.svg"
            alt="Включить"
            width={156}
            height={156}
          />
        </button>
      )}
    </div>
  )
}
