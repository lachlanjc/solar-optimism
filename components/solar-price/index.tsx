import data from './data.json'
import palette from '../../lib/tailwind-palette'
import { round } from 'lodash'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Line,
} from 'recharts'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const PRICE_KEY = 'Cost per Watt'

export default function SolarPrice() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef)

  const [brushIndices, setBrushIndices] = useState([0, data.length - 1])
  const selectedYears = brushIndices[1] - brushIndices[0]
  const decades = Math.floor(selectedYears / 10)
  const startPrice = Number(data[brushIndices[0]][PRICE_KEY])
  const latestPrice = Number(data[data.length - 1][PRICE_KEY])
  const priceDiff = (startPrice - latestPrice) / startPrice

  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center gap-8 bg-gradient-to-b from-white to-stone-50 w-full border-t overflow-y-hidden">
      <div
        className="bg-gradient-to-b w-full absolute z-0 top-0 left-1/2 -translate-y-2/4 -translate-x-2/4 from-lime-200"
        style={{
          height: '66vh',
          backgroundImage: 'radial-gradient(var(--tw-gradient-stops) 80%)',
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      <div className="w-full max-w-4xl relative z-1">
        <h2 className="text-6xl tabular-nums">
          The&nbsp;price has dropped
          <br />
          <span className="text-lime-600 whitespace-nowrap">
            ↓ {round(priceDiff * 100, 1)}%
          </span>{' '}
          in&nbsp;the last{' '}
          <span className="text-sky-600">
            {decades === 0
              ? `${selectedYears} year${selectedYears === 1 ? '' : 's'}`
              : decades === 1
              ? 'decade'
              : `${decades} decades`}
          </span>
          .
        </h2>
        <p className="text-xl max-w-2xl leading-normal text-gray-600 mt-6 mb-8">
          When companies need to build new power supplies, they choose the
          cheapest option. That’s now solar nearly everywhere.
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
        minHeight={512}
        minWidth={640}
        className="max-w-4xl w-full h-48"
      >
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <XAxis dataKey="Year" />
          <YAxis
            dataKey="Cost per Watt"
            tickFormatter={(value: string) => `$${value}`}
            label={{
              value: 'Cost per Watt',
              angle: -90,
              fill: palette.gray[600],
              position: 'insideLeft',
            }}
          />
          <Tooltip
            separator=""
            // @ts-expect-error recharts wants a number
            formatter={(value: number) => [`$${round(value, 2)} per W`, '']}
            wrapperStyle={{ border: 0 }}
            contentStyle={{ fontVariantNumeric: 'tabular-nums' }}
          />
          <Line
            dataKey="Cost per Watt"
            stroke={palette.lime[600]}
            strokeWidth={2}
          />
          <Brush
            dataKey="Year"
            height={48}
            stroke={palette.sky[600]}
            onChange={(brush) => {
              // @ts-expect-error this works tho
              const { startIndex, endIndex } = brush
              setBrushIndices([startIndex, endIndex])
            }}
            alwaysShowText
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
