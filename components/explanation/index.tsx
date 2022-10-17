import palette from '../../lib/tailwind-palette'
import data from '../solar-price/data.json'
import {
  ComposedChart,
  XAxis,
  YAxis,
  Text,
  ResponsiveContainer,
  Scatter,
  Line,
} from 'recharts'
import millify from 'millify'
import { motion } from 'framer-motion'

export default function Explanation() {
  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center gap-8 w-full overflow-y-hidden">
      <div
        className="bg-gradient-to-b w-full absolute z-0 bottom-0 left-1/2 translate-y-3/4 -translate-x-2/4 from-fuchsia-200 pointer-events-none"
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
          As production scales, it creates <strong>economies of scale</strong>:
          the same reason if you’re making a cake, making two isn’t twice as
          hard. Plus, after you make thousands of cakes, you get faster, & the
          cakes are better. In solar, this drives down prices, increasing
          demand, & improves efficiency, creating a virtuous cycle.
        </p>
        <div className="flex flex-wrap justify-center text-center gap-8 mt-12 mb-6">
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

      <h3 className="text-stone-700 text-center -mb-8 font-bold">
        Price per Watt vs Installed Capacity (MW), Logarithmic Scale
      </h3>
      <ResponsiveContainer
        width={640}
        height={512}
        className="w-48 h-48 max-w-full aspect-square"
      >
        <ComposedChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="Cumulative capacity"
            tickFormatter={(value: number) =>
              millify(Number(value), { precision: 0 })
            }
            scale="log"
            tickCount={10}
            // label={{ value: 'Installed capacity', y: -5 }}
          />
          <YAxis
            dataKey="Cost per Watt"
            scale="log"
            // type="number"
            domain={[0.25, 120]}
            allowDataOverflow={false}
            tickFormatter={(value: number) =>
              `$${millify(Number(value), { precision: 2 })}${
                value < 1 ? '0' : ''
              }`
            }
            // label={{
            //   value: 'Price per Watt',
            //   angle: -90,
            //   fill: palette.gray[600],
            //   position: 'insideLeft',
            // }}
          />
          <Scatter dataKey="Cost per Watt" fill={palette.fuchsia[300]} />
          <Line
            dataKey="Cost per Watt"
            stroke={palette.fuchsia[600]}
            dot={false}
            activeDot={false}
            legendType="none"
            strokeWidth={2}
            type="natural"
          />
        </ComposedChart>
      </ResponsiveContainer>

      <motion.a
        href="https://blog.datawrapper.de/weeklychart-logscale/"
        initial={{ opacity: 0, translateY: 48 }}
        whileInView={{
          opacity: 1,
          translateY: 0,
          transition: { delay: 4, duration: 1 },
        }}
        whileHover={{
          translateY: -6,
        }}
        viewport={{ once: false }}
        className="border-2 border-fuchsia-500 text-fuchsia-500 text-lg font-bold shadow-md shadow-fuchsia-300 leading-none rounded-full py-3 px-4 text-center mt-8 md:mt-12"
      >
        Not sure how to read a log scale?{'  '}↗
      </motion.a>
    </section>
  )
}
