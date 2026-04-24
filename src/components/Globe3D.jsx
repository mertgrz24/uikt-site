import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { feature as topoFeature, mesh as topoMesh } from 'topojson-client'

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

function lonLatToVec3(lon, lat, r = 1) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -Math.sin(phi) * Math.cos(theta) * r,
    Math.cos(phi) * r,
    Math.sin(phi) * Math.sin(theta) * r,
  )
}

function buildCountryGeo(feat, radius = 1.002) {
  const positions = []
  const indices = []

  const processRing = (ring) => {
    const pts =
      ring.length > 1 &&
      ring[0][0] === ring[ring.length - 1][0] &&
      ring[0][1] === ring[ring.length - 1][1]
        ? ring.slice(0, -1)
        : ring
    if (pts.length < 3) return
    const contour = pts.map(([lon, lat]) => new THREE.Vector2(lon, lat))
    let tris
    try {
      tris = THREE.ShapeUtils.triangulateShape(contour, [])
    } catch {
      return
    }
    const base = positions.length / 3
    pts.forEach(([lon, lat]) => {
      const { x, y, z } = lonLatToVec3(lon, lat, radius)
      positions.push(x, y, z)
    })
    tris.forEach(([a, b, c]) => indices.push(base + a, base + b, base + c))
  }

  const { type, coordinates } = feat.geometry
  if (type === 'Polygon') {
    processRing(coordinates[0])
  } else if (type === 'MultiPolygon') {
    coordinates.forEach((p) => processRing(p[0]))
  }

  if (indices.length === 0) return null

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

function buildBorderGeo(topology, radius = 1.003) {
  const borders = topoMesh(topology, topology.objects.countries)
  const positions = []
  borders.coordinates.forEach((line) => {
    for (let i = 0; i < line.length - 1; i++) {
      const a = lonLatToVec3(line[i][0], line[i][1], radius)
      const b = lonLatToVec3(line[i + 1][0], line[i + 1][1], radius)
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
  })
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return geo
}

function CountryMesh({ feat, slug, onNavigate }) {
  const matRef = useRef()
  const isClickable = !!slug
  const baseColor = isClickable ? '#9ca3af' : '#6b7280'
  const geo = useMemo(() => buildCountryGeo(feat), [feat])
  if (!geo) return null

  const handlers = isClickable
    ? {
        onClick: (e) => {
          e.stopPropagation()
          onNavigate(slug)
        },
        onPointerOver: (e) => {
          e.stopPropagation()
          if (matRef.current) matRef.current.color.set('#ffffff')
          document.body.style.cursor = 'pointer'
        },
        onPointerOut: (e) => {
          e.stopPropagation()
          if (matRef.current) matRef.current.color.set(baseColor)
          document.body.style.cursor = 'default'
        },
      }
    : {}

  return (
    <mesh geometry={geo} {...handlers}>
      <meshLambertMaterial ref={matRef} color={baseColor} />
    </mesh>
  )
}

function GlobeScene({ topology, onNavigate }) {
  const [autoRotate, setAutoRotate] = useState(true)

  const { features } = useMemo(
    () => topoFeature(topology, topology.objects.countries),
    [topology],
  )

  const borderGeo = useMemo(() => buildBorderGeo(topology), [topology])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />

      <mesh>
        <sphereGeometry args={[0.999, 64, 64]} />
        <meshLambertMaterial color="#111827" />
      </mesh>

      {features.map((feat, i) => (
        <CountryMesh
          key={feat.id ?? i}
          feat={feat}
          slug={ISO_TO_SLUG[Number(feat.id)]}
          onNavigate={onNavigate}
        />
      ))}

      <lineSegments geometry={borderGeo}>
        <lineBasicMaterial color="#000000" linewidth={1} />
      </lineSegments>

      <OrbitControls
        enableRotate
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        onStart={() => setAutoRotate(false)}
      />
    </>
  )
}

export default function Globe3D() {
  const navigate = useNavigate()
  const [topology, setTopology] = useState(null)
  const [error, setError] = useState(null)

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
    return () => {
      document.body.style.cursor = 'default'
    }
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-400 font-sans text-sm">
        Harita verisi yüklenemedi: {error}
      </div>
    )
  }

  if (!topology) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 font-sans animate-pulse">Küre yükleniyor…</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[60vh] relative">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: '#0a0a0a' }}
      >
        <GlobeScene
          topology={topology}
          onNavigate={(slug) => navigate(`/country/${slug}`)}
        />
      </Canvas>
    </div>
  )
}
