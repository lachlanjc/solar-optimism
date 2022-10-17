import { Mercator, Graticule } from '@visx/geo'
import * as topojson from 'topojson-client'
import topology from './world-topo.json'
import palette from '../../lib/tailwind-palette'
import data from './data.json'

export const background = palette.amber[50]

export type GeoMercatorProps = {
  width?: number
  height?: number
  events?: boolean
}

interface FeatureShape {
  type: 'Feature'
  id: string
  geometry: { coordinates: [number, number][][]; type: 'Polygon' }
  properties: { name: string }
}

// @ts-ignore
const world = topojson.feature(topology, topology.objects.units) as {
  type: 'FeatureCollection'
  features: FeatureShape[]
}

const colors = {
  '0.1% or less': 600,
  'Below 1%': 400,
  'Below 5%': 300,
  'Over 5%': 100,
} as const
const labels = {
  Superabundant: '0.1% or less',
  Abundant: 'Below 1%',
  Replete: 'Below 5%',
  Stretched: 'Over 5%',
} as const

function Map({ width = 768, height = 512, events = false }: GeoMercatorProps) {
  const centerX = width / 2
  const centerY = height / 2
  const scale = (width / 630) * 100

  return (
    <figure>
      <div
        className="bg-orange-600 bg-orange-400 bg-orange-300 bg-orange-100"
        hidden
      />
      <dl className="flex items-center justify-center text-center text-stone-600 gap-4 mb-3">
        <strong>Land area required:</strong>
        {Object.entries(colors).map(([category, color]) => (
          <div className="flex items-center gap-2" key={color}>
            <dt className={`w-4 h-4 rounded-full bg-orange-${color}`} />
            <dd>{category}</dd>
          </div>
        ))}
      </dl>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        />
        <Mercator<FeatureShape>
          data={world.features}
          scale={scale}
          translate={[centerX, centerY + 50]}
        >
          {(mercator) => (
            <g>
              <Graticule
                graticule={(g) => mercator.path(g) || ''}
                stroke={palette.amber[100]}
              />
              {mercator.features.map(({ feature, path }, i) => {
                const { Category: category, Label: label } =
                  data.find((c) => c['Country code'] === feature.id) ?? {}
                return (
                  <path
                    key={`map-feature-${i}`}
                    d={path || ''}
                    fill={
                      category && colors[label as keyof typeof colors]
                        ? palette.orange[colors[label as keyof typeof colors]]
                        : palette.stone[200]
                    }
                    // title={category}
                    stroke={background}
                    strokeWidth={0.5}
                  />
                )
              })}
            </g>
          )}
        </Mercator>
      </svg>
      <p className="mt-3 text-right text-stone-500 text-sm">
        Data source:{' '}
        <a
          href="https://carbontracker.org/reports/the-skys-the-limit-solar-wind/"
          className="text-orange-500 underline"
        >
          Carbon Tracker
        </a>
      </p>
    </figure>
  )
}

export default Map
