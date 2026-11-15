import React, { useEffect, useRef, useState } from 'react'
import { Lang, T } from '../data/translations'

interface PhysicsViewProps {
  lang: Lang
}

export const PhysicsView: React.FC<PhysicsViewProps> = ({ lang }) => {
  const t = T[lang]

  // Two responsive physics parameters
  const [gravity, setGravity] = useState<number>(0.0) // 0.0g (microgravity) to 1.0g (Earth)
  const [temperature, setTemperature] = useState<number>(850) // 400°C to 1500°C

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let animId: number
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
      angle: number
      dist: number
      speed: number
    }

    const particles: Particle[] = []
    let tick = 0

    const render = () => {
      tick++

      // Dark motion-blur trail
      ctx.fillStyle = 'rgba(5, 6, 8, 0.35)'
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2 + gravity * 60 // Shift down as gravity increases to give teardrop headroom

      // Compute color profile from temperature
      // 400 - 600°C: Cool flame (cyan / soft violet)
      // 700 - 1000°C: Microgravity blue chemiluminescence
      // 1100 - 1500°C: Incandescent soot (yellow / bright orange / white)
      const isCool = temperature < 650
      const isHot = temperature > 1100

      // Emit new particles
      const emitCount = 3 + Math.round(gravity * 3)
      for (let i = 0; i < emitCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.6 + Math.random() * 0.6
        particles.push({
          x: centerX + (Math.random() - 0.5) * (10 * (1 - gravity) + 4),
          y: centerY,
          vx: Math.cos(angle) * speed * (1 - gravity * 0.85),
          vy: Math.sin(angle) * speed * (1 - gravity) - gravity * (2.8 + Math.random() * 2.2), // Buoyant upward draft
          size: Math.random() * 5 + 4,
          life: 0,
          maxLife: 40 + Math.random() * 25,
          angle,
          dist: 0,
          speed
        })
      }

      // Draw central glow
      const glowRadius = 45 + (temperature - 400) / 30
      const glowGrad = ctx.createRadialGradient(
        centerX, centerY, 5,
        centerX, centerY, glowRadius
      )

      if (isCool) {
        glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)')
        glowGrad.addColorStop(0.6, 'rgba(129, 140, 248, 0.2)')
        glowGrad.addColorStop(1, 'rgba(5, 6, 8, 0)')
      } else if (isHot) {
        glowGrad.addColorStop(0, 'rgba(255, 255, 220, 0.6)')
        glowGrad.addColorStop(0.4, 'rgba(255, 160, 20, 0.4)')
        glowGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.15)')
        glowGrad.addColorStop(1, 'rgba(5, 6, 8, 0)')
      } else {
        glowGrad.addColorStop(0, 'rgba(52, 211, 153, 0.45)')
        glowGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.35)')
        glowGrad.addColorStop(1, 'rgba(5, 6, 8, 0)')
      }

      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2)
      ctx.fill()

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++

        // Convective buoyancy flicker when gravity > 0
        p.x += p.vx + (gravity > 0.1 ? Math.sin(tick * 0.2 + p.y * 0.05) * (gravity * 0.8) : 0)
        p.y += p.vy
        p.size *= 0.96

        const progress = p.life / p.maxLife
        if (progress > 1 || p.size < 0.5) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)

        if (isCool) {
          ctx.fillStyle = `rgba(147, 197, 253, ${0.7 * (1 - progress)})`
        } else if (isHot) {
          if (progress < 0.3) {
            ctx.fillStyle = `rgba(255, 255, 230, ${1 - progress})`
          } else if (progress < 0.7) {
            ctx.fillStyle = `rgba(255, 170, 30, ${0.9 - progress * 0.7})`
          } else {
            ctx.fillStyle = `rgba(220, 38, 38, ${0.7 - progress * 0.6})`
          }
        } else {
          if (progress < 0.4) {
            ctx.fillStyle = `rgba(52, 211, 153, ${0.8 * (1 - progress)})`
          } else {
            ctx.fillStyle = `rgba(56, 189, 248, ${0.6 * (1 - progress)})`
          }
        }
        ctx.fill()
      }

      // Draw central burner / droplet source
      ctx.fillStyle = '#334155'
      ctx.beginPath()
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2)
      ctx.fill()

      animId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animId)
  }, [gravity, temperature])

  return (
    <div className="h-full flex flex-col p-10 overflow-hidden space-y-6 bg-[#050608]">
      {/* Header */}
      <div className="border-b border-[#1a1f26] pb-6 shrink-0">
        <h1 className="text-3xl font-black text-white tracking-tight uppercase">
          {t.physicsHeader}
        </h1>
        <div className="w-16 h-1.5 bg-emerald-400 mt-3" />
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="flex-1 bg-[#0b0e14] border border-[#1b222d] flex flex-col items-center justify-center relative overflow-hidden min-h-[380px]">
        <canvas
          ref={canvasRef}
          width={700}
          height={480}
          className="w-full h-full object-contain"
        />

        {/* Dynamic telemetry in canvas corner */}
        <div className="absolute top-6 left-6 font-mono text-xs space-y-1">
          <div className="text-neutral-500 uppercase tracking-wider">
            {lang === 'ru' ? 'Режим горения' : 'Combustion Regime'}:
          </div>
          <div className="text-emerald-400 font-bold uppercase text-sm">
            {gravity === 0 ? (lang === 'ru' ? 'Изотропная сфера (0-g)' : 'Isotropic Sphere (0-g)') : (lang === 'ru' ? `Конвекционная слеза (${gravity.toFixed(2)}g)` : `Convective Teardrop (${gravity.toFixed(2)}g)`)}
          </div>
          <div className="text-neutral-400">
            {temperature < 650 ? (lang === 'ru' ? 'Холодное пламя (Cool Flame)' : 'Cool Flame Regime') : (lang === 'ru' ? 'Высокотемпературная зона' : 'High Temperature Incandescence')}
          </div>
        </div>
      </div>

      {/* Two Wide Sliders for G and T */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#0b0e14] border border-[#1b222d] p-6 shrink-0">
        {/* Gravity Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono">
            <span className="text-xs uppercase text-neutral-300 tracking-wider">
              {t.physicsGravitySlider}
            </span>
            <span className="text-sm font-bold text-emerald-400">
              {gravity.toFixed(2)}g
            </span>
          </div>
          <input
            type="range"
            min={0.0}
            max={1.0}
            step={0.01}
            value={gravity}
            onChange={(e) => setGravity(parseFloat(e.target.value))}
            className="w-full h-2 bg-[#07090c] appearance-none cursor-pointer accent-emerald-400 border border-[#1b222d]"
          />
          <div className="flex justify-between text-[11px] font-mono text-neutral-500">
            <span>0.0g ({lang === 'ru' ? 'Невесомость' : 'Microgravity'})</span>
            <span>0.166g ({lang === 'ru' ? 'Луна' : 'Moon'})</span>
            <span>0.38g ({lang === 'ru' ? 'Марс' : 'Mars'})</span>
            <span>1.0g ({lang === 'ru' ? 'Земля' : 'Earth'})</span>
          </div>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono">
            <span className="text-xs uppercase text-neutral-300 tracking-wider">
              {t.physicsTempSlider}
            </span>
            <span className="text-sm font-bold text-white">
              {temperature}°C
            </span>
          </div>
          <input
            type="range"
            min={400}
            max={1500}
            step={10}
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="w-full h-2 bg-[#07090c] appearance-none cursor-pointer accent-white border border-[#1b222d]"
          />
          <div className="flex justify-between text-[11px] font-mono text-neutral-500">
            <span>400°C ({lang === 'ru' ? 'Холодное пламя' : 'Cool Flame'})</span>
            <span>900°C ({lang === 'ru' ? 'Хемилюминесценция' : 'Chemiluminescence'})</span>
            <span>1500°C ({lang === 'ru' ? 'Раскаленная сажа' : 'Incandescent Soot'})</span>
          </div>
        </div>
      </div>
    </div>
  )
}
