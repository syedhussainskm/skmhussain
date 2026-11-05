import { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { site } from '../../lib/site'
import { useTypewriter } from './motion'

/**
 * Full-screen intro video with sound toggle, play/pause and a typed list of
 * focus areas. A blurred copy of the same video fills the edges on wide
 * screens. Hides itself if the video file is missing.
 */
export function VideoIntro() {
  const fgRef = useRef<HTMLVideoElement>(null)
  const bgRef = useRef<HTMLVideoElement>(null)
  const [missing, setMissing] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [hint, setHint] = useState(true)
  const typed = useTypewriter(site.introTopics)

  useEffect(() => {
    const fg = fgRef.current
    if (!fg) return
    // Errors fired before hydration never reach React's onError.
    if (fg.error || fg.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setMissing(true)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fg.pause()
      bgRef.current?.pause()
      setPlaying(false)
    }
    const timer = setTimeout(() => setHint(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = useCallback(() => {
    const fg = fgRef.current
    if (!fg) return
    if (fg.paused) {
      void fg.play()
      void bgRef.current?.play()
      setPlaying(true)
    } else {
      fg.pause()
      bgRef.current?.pause()
      setPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const fg = fgRef.current
    if (!fg) return
    const next = !fg.muted
    fg.muted = next
    setMuted(next)
    setHint(false)
    // Unmuting should play the intro from the start, with sound.
    if (!next) {
      fg.currentTime = 0
      if (bgRef.current) bgRef.current.currentTime = 0
      void fg.play()
      void bgRef.current?.play()
      setPlaying(true)
    }
  }, [])

  if (missing) return null

  return (
    <section
        id="top"
        aria-label={`Video introduction from ${site.shortName}`}
        className="relative left-1/2 flex w-screen max-w-none -translate-x-1/2 h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-background"
    >
      <div aria-hidden="true" className="absolute -inset-16">
        <video
          ref={bgRef}
          src={site.introVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full scale-110 object-cover blur-[70px] brightness-[0.2] saturate-150"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={fgRef}
          src={site.introVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onClick={toggleMute}
          onError={() => setMissing(true)}
          className="h-full w-full cursor-pointer object-cover md:object-contain"
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-background/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[16%] bg-gradient-to-r from-background/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[16%] bg-gradient-to-l from-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_30px_var(--accent)]" />
      </div>

      <div className="pointer-events-none absolute bottom-[clamp(6rem,13vh,9rem)] left-1/2 w-max max-w-[90vw] -translate-x-1/2 text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
          I am into
        </p>
        <p className="min-h-[1.2em] text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="text-gradient">{typed}</span>
          <span className="caret" aria-hidden="true" />
          <span className="sr-only">{site.introTopics.join(', ')}</span>
        </p>
      </div>

      {hint && muted && (
        <button
          type="button"
          onClick={toggleMute}
          className="glass absolute left-1/2 top-24 hidden -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] tracking-wider text-foreground/80 sm:flex"
        >
          <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
          Tap for sound
        </button>
      )}

      <div className="absolute bottom-6 right-4 flex gap-2 sm:bottom-10 sm:right-10">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition hover:scale-105 hover:border-primary hover:text-foreground"
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition hover:scale-105 hover:border-primary hover:text-foreground"
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      <a
        href="#hero"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <span className="scroll-pulse absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-accent to-transparent" />
        </span>
      </a>
    </section>
  )
}