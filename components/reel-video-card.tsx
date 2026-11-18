'use client'

import { useEffect, useRef } from 'react'
import { SoundTogglePill, useSound } from '@/components/sound-provider'

interface ReelVideoCardProps {
  id: string
  src: string
  category: string
  title: string
}

export default function ReelVideoCard({ id, src, category, title }: ReelVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const { soundOn, activeVideoId, toggleVideoAudio, registerVideo } = useSound()

  const isUnmuted = soundOn && activeVideoId === id

  // Register direct DOM ref with SoundProvider so navbar + card toggles unlock audio synchronously
  useEffect(() => {
    const el = videoRef.current
    registerVideo(id, el)
    if (el) {
      el.muted = !isUnmuted
      el.defaultMuted = !isUnmuted
      el.volume = isUnmuted ? 1.0 : 0
      el.play().catch(() => { })
    }
    return () => {
      registerVideo(id, null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, registerVideo])

  // Keep DOM audio state strictly synchronized whenever activeVideoId or soundOn changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isUnmuted) {
      video.muted = false
      video.defaultMuted = false
      video.volume = 1.0
      if (video.paused) {
        video.play().catch(() => { })
      }
    } else {
      video.muted = true
      video.defaultMuted = true
      video.volume = 0
    }
  }, [isUnmuted])

  // Synchronous user-gesture audio unlock directly inside onClick handler
  const handleToggleAudio = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const video = videoRef.current
    if (video) {
      if (isUnmuted) {
        video.muted = true
        video.defaultMuted = true
        video.volume = 0
      } else {
        video.muted = false
        video.defaultMuted = false
        video.volume = 1.0
        video.play().catch(() => { })
      }
    }
    toggleVideoAudio(id)
  }

  return (
    <div
      className="video-reel-card stm-reel-interactive"
      onClick={handleToggleAudio}
      role="group"
      aria-label={`${title} video reel`}
      style={{ cursor: 'pointer' }}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        muted={!isUnmuted}
        loop
        autoPlay
        preload="metadata"
      />
      <div className="stm-reel-sound-pin">
        <SoundTogglePill
          active={isUnmuted}
          onClick={handleToggleAudio}
          tone="espresso"
          compact
          ariaLabel={isUnmuted ? `Mute ${title}` : `Unmute ${title}`}
        />
      </div>
      <div className="video-reel-overlay">
        <span className="video-reel-category">{category}</span>
        <strong className="video-reel-title">{title}</strong>
      </div>
    </div>
  )
}
