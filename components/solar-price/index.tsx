import data from './data.json'
import palette from '../../lib/tailwind-palette'
import { round } from 'lodash'
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Area,
} from 'recharts'
import { useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion'

const PRICE_KEY = 'Cost per Watt'

export default function SolarPrice() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  const [isBrushed, setIsBrushed] = useState(false)
  const [brushIndices, setBrushIndices] = useState([0, data.length - 1])
  const selectedYears = brushIndices[1] - brushIndices[0]
  const decades = Math.floor(selectedYears / 10)
  const startPrice = Number(data[brushIndices[0]][PRICE_KEY])
  const latestPrice = Number(data[data.length - 1][PRICE_KEY])
  const priceDiff = (startPrice - latestPrice) / startPrice

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 flex flex-col items-center gap-8 w-full overflow-y-hidden"
    >
      <div
        className="bg-gradient-to-b w-full absolute z-0 bottom-0 left-1/2 translate-y-3/4 -translate-x-2/4 from-indigo-200"
        style={{
          height: '66vh',
          backgroundImage: 'radial-gradient(var(--tw-gradient-stops) 80%)',
          zIndex: 0,
          opacity: 0.75,
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
          <span className="text-blue-600">
            {decades === 0
              ? `${selectedYears} year${selectedYears === 1 ? '' : 's'}`
              : decades === 1
              ? 'decade'
              : `${decades} decades`}
          </span>
          .
        </h2>
        <p className="text-xl leading-normal text-stone-600 dark:text-stone-400 mt-6 mb-8">
          No other source of energy has dropped in price so drastically.
          <br />
          Solar is now the cheapest form of electricity in most places.
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
        minHeight={512}
        minWidth={640}
        className="max-w-4xl w-full h-48"
      >
        <AreaChart
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
              value: 'Price per Watt',
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
          <Area
            dataKey="Cost per Watt"
            stroke={palette.lime[600]}
            strokeWidth={2}
            fill={palette.lime[200]}
            fillOpacity={1}
          />
          <Brush
            dataKey="Year"
            height={48}
            stroke={palette.blue[600]}
            fill="transparent"
            onChange={(brush) => {
              // @ts-expect-error this works tho
              const { startIndex, endIndex } = brush
              setBrushIndices([startIndex, endIndex])
              setIsBrushed(true)
            }}
            alwaysShowText
          />
        </AreaChart>
      </ResponsiveContainer>

      <motion.div
        initial={{ opacity: 0, translateY: 48 }}
        whileInView={{
          opacity: 1,
          translateY: 0,
          transition: { delay: 4, duration: 1 },
        }}
        viewport={{ once: false }}
        className={`border-2 ${
          isBrushed
            ? brushIndices[0] < 10
              ? 'border-blue-600'
              : 'border-indigo-600'
            : 'border-blue-600'
        } transition-colors bg-white dark:bg-stone-900 relative z-10 leading-none rounded-full py-3 px-5 text-center mt-8 md:mt-12`}
      >
        <strong
          className={`transition-colors ${
            isBrushed
              ? brushIndices[0] < 10
                ? 'text-blue-600'
                : 'text-indigo-600'
              : 'text-blue-600'
          } text-lg block`}
        >
          {isBrushed
            ? brushIndices[0] < 10
              ? 'Try starting the graph in 2008…'
              : brushIndices[0] < 25
              ? 'After the early drops, the trend is clearer…'
              : '90% of the drop was in just this decade.'
            : 'Try starting the graph in 2008…'}
        </strong>
      </motion.div>
    </section>
  )
}
