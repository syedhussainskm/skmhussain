import { useEffect, useRef } from 'react'

/**
 * Animated "connected records" background for the hero — drifting nodes that
 * link up when close, and gravitate gently toward the pointer.
 */
export function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let frame = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: -9999, y: -9999 }
    type Node = {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      hue: number
    }
    let nodes: Node[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, (width * height) / 16000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        hue: Math.random(),
      }))
    }

    const color = (t: number, a: number) => {
      // Interpolate azure (#5b8cff) → mint (#38e0b5)
      const r = Math.round(91 + (56 - 91) * t)
      const g = Math.round(140 + (224 - 140) * t)
      const b = Math.round(255 + (181 - 255) * t)
      return `rgba(${r},${g},${b},${a})`
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const linkDist = 130
      for (const n of nodes) {
        if (!reduced) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < 180 && d > 1) {
            n.vx += (dx / d) * 0.012
            n.vy += (dy / d) * 0.012
          }
          n.vx *= 0.99
          n.vy *= 0.99
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < linkDist) {
            ctx.strokeStyle = color(
              (a.hue + b.hue) / 2,
              (1 - d / linkDist) * 0.28,
            )
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = color(n.hue, 0.85)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced) frame = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
