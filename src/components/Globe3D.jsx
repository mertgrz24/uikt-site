import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { feature as topoFeature } from 'topojson-client'
import Globe from 'react-globe.gl'
import { countries } from '../data/countries'

const ISO_TO_SLUG = {
  792: 'turkey',
  840: 'usa',
  156: 'china',
  643: 'russia',
  276: 'germany',
  250: 'france',
  826: 'uk',
  392: 'japan',
  356: 'india',
  76: 'brazil',
  124: 'canada',
  380: 'italy',
  724: 'spain',
  410: 'south-korea',
  36: 'australia',
  484: 'mexico',
  32: 'argentina',
  710: 'south-africa',
  818: 'egypt',
  682: 'saudi-arabia',
  364: 'iran',
  376: 'israel',
  586: 'pakistan',
  360: 'indonesia',
  566: 'nigeria',
  528: 'netherlands',
  752: 'sweden',
  616: 'poland',
  300: 'greece',
  804: 'ukraine',
}

const ACTIVE_COLOR = '#64748b'
const INACTIVE_COLOR = '#94a3b8'
const HOVER_COLOR = '#0e3c7d'
const BORDER_COLOR = '#475569'

const isActive = (feat) => ISO_TO_SLUG[Number(feat.id)] !== undefined

export default function Globe3D() {
  const navigate = useNavigate()
  const globeRef = useRef()
  const containerRef = useRef()

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  )
  const [topology, setTopology] = useState(null)
  const [error, setError] = useState(null)
  const [hoveredPolygon, setHoveredPolygon] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const globeMaterial = useMemo(
    () => new THREE.MeshLambertMaterial({ color: '#e8f0fe' }),
    [],
  )

  const countryFeatures = useMemo(() => {
    if (!topology) return []
    return topoFeature(topology, topology.objects.countries).features
  }, [topology])

  useEffect(() => {
    fetch('/world-110m.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(setTopology)
      .catch((e) => setError(e.message))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setDimensions({ width, height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    return () => { document.body.style.cursor = 'default' }
  }, [])

  useEffect(() => {
    if (!globeRef.current || !topology) return
    const controls = globeRef.current.controls()
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.3

    let resumeTimer = null

    const onStart = () => {
      clearTimeout(resumeTimer)
      controls.autoRotate = false
    }

    const onEnd = () => {
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => {
        controls.autoRotate = true
      }, 2500)
    }

    controls.addEventListener('start', onStart)
    controls.addEventListener('end', onEnd)

    return () => {
      clearTimeout(resumeTimer)
      controls.removeEventListener('start', onStart)
      controls.removeEventListener('end', onEnd)
    }
  }, [topology, dimensions])

  const getCapColor = (feat) => {
    if (feat === hoveredPolygon && isActive(feat)) return HOVER_COLOR
    return isActive(feat) ? ACTIVE_COLOR : INACTIVE_COLOR
  }

  const handleHover = (feat) => {
    setHoveredPolygon(feat)
    document.body.style.cursor = feat && isActive(feat) ? 'pointer' : 'default'
  }

  const handleClick = (feat) => {
    const slug = ISO_TO_SLUG[Number(feat.id)]
    if (!slug) return
    navigate(`/country/${slug}`)
  }

  const handleZoom = (direction) => {
    if (!globeRef.current) return
    const { altitude } = globeRef.current.pointOfView()
    const next = direction === 'in'
      ? Math.max(1.5, altitude - 0.3)
      : Math.min(4.0, altitude + 0.3)
    globeRef.current.pointOfView({ altitude: next }, 300)
  }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <div className="w-full px-4 py-6">
        <p className="text-brand-textMuted text-xs font-mono uppercase tracking-widest text-center mb-4">
          Ülke Seçin
        </p>
        <div className="grid grid-cols-2 gap-2">
          {countries.map((country) => (
            <button
              key={country.id}
              onClick={() => navigate(`/country/${country.id}`)}
              className="card-glass rounded-lg p-3 text-white hover:bg-white/10 flex items-center gap-2 text-left transition-colors duration-200"
            >
              <span className="text-xl leading-none">{country.flag}</span>
              <span className="text-white text-sm font-medium leading-snug truncate">
                {country.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-400 font-sans text-sm">
        Harita verisi yüklenemedi: {error}
      </div>
    )
  }

  const isReady = topology && dimensions.width > 0

  return (
    <div ref={containerRef} className="w-full relative" style={{ height: '60vh' }}>
      {isReady ? (
        <>
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(255,255,255,0)"
            globeMaterial={globeMaterial}
            showAtmosphere={false}
            showGraticules={false}
            polygonsData={countryFeatures}
            polygonCapColor={getCapColor}
            polygonSideColor={() => 'rgba(0,0,0,0)'}
            polygonStrokeColor={() => BORDER_COLOR}
            polygonAltitude={0.005}
            onPolygonClick={handleClick}
            onPolygonHover={handleHover}
          />
          <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1">
            <button
              onClick={() => handleZoom('in')}
              aria-label="Yakınlaştır"
              className="w-10 h-10 rounded card-glass hover:bg-white/10 text-white text-xl font-bold flex items-center justify-center transition-colors"
            >
              +
            </button>
            <button
              onClick={() => handleZoom('out')}
              aria-label="Uzaklaştır"
              className="w-10 h-10 rounded card-glass hover:bg-white/10 text-white text-xl font-bold flex items-center justify-center transition-colors"
            >
              −
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-brand-textMuted font-sans animate-pulse">Küre yükleniyor…</p>
        </div>
      )}
    </div>
  )
}
