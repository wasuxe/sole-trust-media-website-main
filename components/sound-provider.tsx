'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'

interface SoundContextValue {
  soundOn: boolean
  activeVideoId: string | null
  toggleSound: () => void
  toggleVideoAudio: (videoId: string) => void
  registerVideo: (videoId: string, el: HTMLVideoElement | null) => void
  setSoundOn: (next: boolean) => void
  setActiveVideoId: (id: string | null) => void
  playWarmClick: () => void
  playWarmChime: () => void
}

const SoundContext = createContext<SoundContextValue>({
  soundOn: false,
  activeVideoId: null,
  toggleSound: () => {},
  toggleVideoAudio: () => {},
  registerVideo: () => {},
  setSoundOn: () => {},
  setActiveVideoId: () => {},
  playWarmClick: () => {},
  playWarmChime: () => {},
})

export function useSound() {
  return useContext(SoundContext)
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundOn, setSoundOnState] = useState(false)
  const [activeVideoId, setActiveVideoIdState] = useState<string | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const videosRef = useRef<Map<string, HTMLVideoElement>>(new Map())

  const registerVideo = useCallback((videoId: string, el: HTMLVideoElement | null) => {
    if (el) {
      videosRef.current.set(videoId, el)
    } else {
      videosRef.current.delete(videoId)
    }
  }, [])

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return null
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }, [])

  const playWarmTone = useCallback(
    (freqStart: number, freqEnd: number, durationSec: number, gainPeak: number) => {
      const ctx = getAudioContext()
      if (!ctx) return
      try {
        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freqStart, now)
        osc.frequency.exponentialRampToValueAtTime(freqEnd, now + durationSec)

        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.018)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + durationSec + 0.02)
      } catch {
        // Ignore Web Audio restrictions when autoplay policy blocks before gesture
      }
    },
    [getAudioContext]
  )

  const muteAllVideosSync = useCallback((exceptId?: string | null) => {
    videosRef.current.forEach((video, id) => {
      if (exceptId && id === exceptId) return
      try {
        video.muted = true
        video.defaultMuted = true
        video.volume = 0
      } catch {
        // Ignore DOM errors on detached nodes
      }
    })
  }, [])

  const unmuteVideoSync = useCallback((videoId: string) => {
    const target = videosRef.current.get(videoId)
    if (!target) return false
    try {
      // Must happen synchronously inside user click gesture for Safari/Chrome audio unlock
      target.muted = false
      target.defaultMuted = false
      target.volume = 1.0
      const playPromise = target.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Fallback: if browser blocks unmuted play, try play after small tick
          try {
            target.play().catch(() => {})
          } catch {
            // noop
          }
        })
      }
      return true
    } catch {
      return false
    }
  }, [])

  const pickBestVisibleVideoId = useCallback((): string | null => {
    if (videosRef.current.size === 0) return null
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900
    const viewportCenter = viewportHeight / 2

    let bestId: string | null = null
    let bestScore = -Infinity

    videosRef.current.forEach((video, id) => {
      const rect = video.getBoundingClientRect()
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(viewportHeight, rect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const centerDist = Math.abs((rect.top + rect.bottom) / 2 - viewportCenter)
      const score = visibleHeight > 0 ? visibleHeight * 10 - centerDist : -10000 - centerDist
      if (score > bestScore) {
        bestScore = score
        bestId = id
      }
    })

    return bestId ?? Array.from(videosRef.current.keys())[0] ?? null
  }, [])

  const playWarmClick = useCallback(() => {
    if (!soundOn) return
    playWarmTone(210, 145, 0.085, 0.025)
  }, [soundOn, playWarmTone])

  const playWarmChime = useCallback(() => {
    if (!soundOn) return
    playWarmTone(240, 320, 0.16, 0.028)
  }, [soundOn, playWarmTone])

  // Synchronous per-video audio toggle bound directly to user click
  const toggleVideoAudio = useCallback(
    (videoId: string) => {
      const isCurrentlyActive = soundOn && activeVideoId === videoId
      if (isCurrentlyActive) {
        muteAllVideosSync()
        setActiveVideoIdState(null)
        return
      }
      // Unlock target video synchronously in user gesture
      muteAllVideosSync(videoId)
      unmuteVideoSync(videoId)
      setSoundOnState(true)
      setActiveVideoIdState(videoId)
    },
    [soundOn, activeVideoId, muteAllVideosSync, unmuteVideoSync]
  )

  const setSoundOn = useCallback(
    (next: boolean) => {
      if (next) {
        const targetId = activeVideoId ?? pickBestVisibleVideoId()
        muteAllVideosSync(targetId)
        if (targetId) {
          unmuteVideoSync(targetId)
          setActiveVideoIdState(targetId)
        }
        setSoundOnState(true)
        playWarmTone(196, 294, 0.14, 0.024)
      } else {
        muteAllVideosSync()
        setSoundOnState(false)
        setActiveVideoIdState(null)
      }
    },
    [activeVideoId, pickBestVisibleVideoId, muteAllVideosSync, unmuteVideoSync, playWarmTone]
  )

  const setActiveVideoId = useCallback(
    (id: string | null) => {
      if (!id) {
        muteAllVideosSync()
        setActiveVideoIdState(null)
        return
      }
      muteAllVideosSync(id)
      unmuteVideoSync(id)
      setSoundOnState(true)
      setActiveVideoIdState(id)
    },
    [muteAllVideosSync, unmuteVideoSync]
  )

  const toggleSound = useCallback(() => {
    setSoundOn(!soundOn)
  }, [soundOn, setSoundOn])

  return (
    <SoundContext.Provider
      value={{
        soundOn,
        activeVideoId,
        toggleSound,
        toggleVideoAudio,
        registerVideo,
        setSoundOn,
        setActiveVideoId,
        playWarmClick,
        playWarmChime,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

/* ==========================================================================
   LUXURY EDITORIAL SOUND PILL (4-BAR ANIMATED EQUALIZER WAVEFORM)
   ========================================================================== */
export function SoundTogglePill({
  active,
  onClick,
  tone = 'parchment',
  compact = false,
  ariaLabel,
}: {
  active: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  tone?: 'parchment' | 'espresso'
  compact?: boolean
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`stm-sound-pill tone-${tone} ${active ? 'is-on' : 'is-off'} ${compact ? 'is-compact' : ''}`}
      aria-pressed={active}
      aria-label={ariaLabel || (active ? 'Mute studio audio' : 'Unmute studio audio')}
    >
      <span className="stm-eq-bars" aria-hidden="true">
        <span className="stm-eq-bar b1" />
        <span className="stm-eq-bar b2" />
        <span className="stm-eq-bar b3" />
        <span className="stm-eq-bar b4" />
      </span>
      <span>{active ? 'SOUND ON' : 'SOUND OFF'}</span>
    </button>
  )
}
