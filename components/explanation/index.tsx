import palette from '../../lib/tailwind-palette'
import data from '../solar-price/data.json'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts'
import { round } from 'lodash'

export default function Explanation() {
  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center gap-8 w-full overflow-y-hidden">
      <div
        className="bg-gradient-to-b w-full absolute z-0 bottom-0 left-1/2 translate-y-3/4 -translate-x-2/4 from-lime-200"
        style={{
          height: '66vh',
          backgroundImage: 'radial-gradient(var(--tw-gradient-stops) 80%)',
          zIndex: 0,
          opacity: 0.75,
        }}
      />

      <div className="w-full max-w-4xl relative z-1">
        <h2 className="text-6xl mb-6">
          As we install more, solar gets cheaper, driving more installation.
        </h2>
        {/* <p className="text-lg max-w-xl leading-normal text-stone-600 dark:text-stone-400 my-5">
          Imagine you found an apartment in 2009 with $3590 rent; a decade later
          it’s $400, and better. That’s how solar electricity has progressed.
        </p> */}

        <p className="text-xl max-w-2xl leading-normal text-stone-700 dark:text-stone-400">
          It’s the same reason if you’re making a cake, making two isn’t twice
          as hard: as production scales, it creates{' '}
          <strong>economies of scale</strong>. This drives down prices,
          increasing demand, creating a virtuous cycle.
        </p>
        <div className="flex flex-wrap text-center gap-8 mt-10 mb-6">
          <div>
            <div className="text-6xl text-lime-600 font-bold">2x</div>
            <div className="text-lg text-stone-500 dark:text-stone-400">
              installed capacity
            </div>
          </div>
          <div className="text-stone-400 text-6xl">&rarr;</div>
          <div>
            <div className="text-6xl text-red-500">&darr; 20%</div>
            <div className="text-lg text-stone-500 dark:text-stone-400">
              price of modules
            </div>
          </div>
          <div className="text-stone-400 text-6xl self-center ml-6">🔄</div>
        </div>
        {/* <p className="text-lg max-w-xl leading-normal text-stone-700 my-5">
          NASA first produced solar panels for satellites in the 1960s, then
          they were used in remote locations, then further investment made them
          generally cost-effective.
        </p> */}
        {/* <p className="text-lg max-w-xl leading-normal text-stone-700 my-5"></p> */}
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
          <XAxis dataKey="Cumulative capacity" />
          <YAxis
            dataKey="Cost per Watt"
            // scale="log"
            type="number"
            allowDataOverflow
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
          />
          <Line
            dataKey="Cumulative capacity"
            stroke={palette.lime[600]}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
