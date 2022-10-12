import data from './data.json' assert { type: 'json' }
import palette from '../../lib/tailwind-palette'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  Line,
} from 'recharts'
import { useState } from 'react'

export default function SolarPrice() {
  const [brushIndices, setBrushIndices] = useState([0, 43])
  return (
    <section className="py-24 flex flex-col items-center gap-8 bg-gradient-to-b from-white to-gray-100 w-full">
      <div className="w-full max-w-4xl">
        <h2 className="text-6xl max-w-2xl" style={{ maxWidth: '18ch' }}>
          <span className="text-amber-500">Solar</span> is now the cheapest form
          of electricity. The&nbsp;price has dropped{' '}
          <span className="text-lime-600 whitespace-nowrap">↓ 90%</span>{' '}
          in&nbsp;the last decade.
        </h2>
        <p className="text-xl max-w-2xl leading-normal text-gray-600 mt-6 mb-8">
          When companies need to build new power supplies, they choose the
          cheapest option. That’s now solar nearly everywhere.
        </p>

        <h3 className="text-xl font-bold">
          In the last {brushIndices[1] - brushIndices[0]} years
        </h3>
      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
        minHeight={256}
        minWidth={256}
        className="max-w-4xl w-full"
      >
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="Year"
            // tickCount={8}
            // type="number"
            // scale="time"
            // domain={[2010, 'dataMax']}
          />
          <YAxis
            dataKey="Solar PV Module Cost (2019 US$ per W)"
            tickFormatter={(value: string) => `$${value}`}
            label={{
              value: 'Cost per Watt',
              angle: -90,
              fill: palette.gray[600],
              position: 'insideLeft',
            }}
          />
          <Tooltip
            separator=": "
            formatter={(value, name, item) => `$${value}`}
          />
          <Line
            dataKey="Solar PV Module Cost (2019 US$ per W)"
            stroke={palette.amber[600]}
          />
          <Brush
            dataKey="Year"
            height={30}
            stroke="#8884d8"
            onChange={({ startIndex, endIndex }) => {
              setBrushIndices([startIndex, endIndex])
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
