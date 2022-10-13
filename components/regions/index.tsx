import palette from '../../lib/tailwind-palette'
import data from './data.json'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { round } from 'lodash'

const STACKS: Record<string, Record<number, string>> = {
  'Asia Pacific': palette.sky,
  'Middle East': palette.violet,
  'North America': palette.pink,
  'South and Central America': palette.red,
  Africa: palette.amber,
  CIS: palette.lime,
  Europe: palette.teal,
}

export default function Regions() {
  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center bg-gradient-to-b from-white to-gray-50 w-full border-t overflow-y-hidden">
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-6xl leading-none">
          There’s been a <span className="text-sky-600">30x</span> explosion in
          solar installed—in just a decade.
        </h2>
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
            top: 15,
            right: 5,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke={palette.stone[200]} />
          <Legend
            iconType="circle"
            // align="right"
            // layout="vertical"
            margin={{ top: 0, left: 16 }}
          />
          <XAxis dataKey="Year" />
          <YAxis unit=" TWh" />
          <Tooltip
            separator=": "
            // @ts-expect-error I want string!
            formatter={(value: number) => `${round(value, 2)} TWh`}
            labelStyle={{ fontWeight: 'bold' }}
          />
          {Object.keys(STACKS).map((region) => (
            <Area
              key={region}
              fillOpacity={0.875}
              stackId="1"
              type="monotone"
              dataKey={region}
              fill={STACKS[region][500]}
              stroke="none"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-stone-500 text-sm text-center mt-4">
        CIS: a group of former Soviet countries in Eurasia.
      </p>
    </section>
  )
}
