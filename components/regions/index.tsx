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
// import { motion } from 'framer-motion'

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
    <section className="relative min-h-screen py-24 flex flex-col items-center  w-full overflow-y-hidden">
      <div
        className="bg-gradient-to-b w-full absolute z-0 bottom-0 left-1/2 translate-y-3/4 -translate-x-2/4 from-rose-200 pointer-events-none"
        style={{
          height: '66vh',
          backgroundImage: 'radial-gradient(var(--tw-gradient-stops) 80%)',
          zIndex: 0,
          opacity: 0.75,
        }}
      />

      <div className="w-full max-w-4xl mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-6xl leading-none">
          There’s been a <strong className="text-rose-500">30x</strong>{' '}
          explosion in solar installed—in just a decade.
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
      <p className="text-stone-500 dark:text-stone-400 text-sm text-center mt-4">
        CIS: a group of former Soviet countries in Eurasia.
      </p>

      {/* <motion.div
        initial={{ opacity: 0, translateY: 48 }}
        whileInView={{
          opacity: 1,
          translateY: 0,
          transition: { delay: 4, duration: 1 },
        }}
        viewport={{ once: false }}
        className="border-2 border-rose-500 leading-none rounded-full py-3 px-4 text-center mt-8 md:mt-12"
      >
        <strong className="text-rose-500 text-lg block">So why is that?</strong>{' '}
        <span className="text-stone-500 dark:text-stone-400 text-sm max-w-min">
          (electricity overall is only ↑ 15%)
        </span>
      </motion.div> */}
    </section>
  )
}
