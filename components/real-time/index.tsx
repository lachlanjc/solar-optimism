import palette from '../../lib/tailwind-palette'
import { ResponsiveContainer, Funnel, FunnelChart, LabelList } from 'recharts'
import { round } from 'lodash'

export interface TodayData {
  MktDay: string
  instance: Array<{
    DateTimeEST: string
    HourEndingEST: string
    Value: string
  }>
}

export default function RealTime({ todayData }: { todayData: TodayData }) {
  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center gap-8 w-full overflow-y-hidden">
      <div
        className="bg-gradient-to-b w-full absolute z-0 bottom-0 left-1/2 translate-y-3/4 -translate-x-2/4 from-amber-200"
        style={{
          height: '66vh',
          backgroundImage: 'radial-gradient(var(--tw-gradient-stops) 80%)',
          zIndex: 0,
          opacity: 0.75,
        }}
      />

      <div className="w-full max-w-4xl relative z-1">
        <h2 className="text-6xl max-w-3xl tabular-nums">
          Here’s the solar energy produced{' '}
          <div
            className="relative ml-4 mr-4 inline-block align-middle bottom-3"
            aria-hidden
          >
            <span className="w-5 h-5 inline-block rounded-full bg-amber-500 animate-ping absolute left-0" />
            <span className="w-5 h-5 inline-block rounded-full bg-amber-500 absolute left-0" />
          </div>{' '}
          today.
        </h2>
        <p className="text-lg leading-normal text-stone-600 dark:text-stone-400 mt-6 mb-8 relative">
          Hourly data in MWh from{' '}
          {new Date(todayData.MktDay).toLocaleDateString()} covering the{' '}
          <a
            href="https://api.misoenergy.org/MISORTWD/lmpcontourmap.html"
            className="text-amber-600 underline"
          >
            MISO region of the Midwestern US
          </a>
          , provided by{' '}
          <a
            href="https://www.misoenergy.org/markets-and-operations/real-time--market-data/operations-displays/"
            className="text-amber-600 underline"
          >
            MISO
          </a>
          .
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
        minHeight={512}
        minWidth={512}
        className="w-48 h-48 max-w-2xl"
      >
        <FunnelChart>
          <Funnel
            data={todayData.instance}
            fillOpacity={1}
            dataKey="Value"
            fill={palette.amber[200]}
            stroke={palette.amber[400]}
            strokeWidth={1}
          >
            <LabelList
              position="center"
              fill={palette.amber[700]}
              stroke="none"
              dataKey="HourEndingEST"
              formatter={(value: string) => `${value}:00`}
            />
            <LabelList
              position="right"
              fill={palette.amber[900]}
              stroke="none"
              dataKey="Value"
              formatter={(value: number) =>
                value > 100 ? `${round(value)}` : ''
              }
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </section>
  )
}
