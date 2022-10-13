import palette from '../../lib/tailwind-palette'
import { ResponsiveContainer, Funnel, FunnelChart, LabelList } from 'recharts'

export default function RealTime({
  todayData,
}: {
  todayData: {
    MktDay: string
    instance: Array<{
      DateTimeEST: string
      HourEndingEST: string
      Value: string
    }>
  }
}) {
  return (
    <section className="relative py-24 flex flex-col items-center gap-8 bg-gradient-to-b from-white to-gray-50 w-full border-t overflow-y-hidden">
      <div
        className="bg-gradient-to-b w-full absolute z-0 top-0 left-1/2 -translate-y-2/4 -translate-x-2/4 from-amber-200"
        style={{
          height: '66vh',
          backgroundImage: 'radial-gradient(var(--tw-gradient-stops) 80%)',
          zIndex: 0,
          opacity: 0.5,
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
        <p className="text-xl leading-normal text-gray-600 mt-6 mb-8 relative">
          Data from today, {new Date(todayData.MktDay).toLocaleDateString()}{' '}
          covering the{' '}
          <a
            href="https://api.misoenergy.org/MISORTWD/lmpcontourmap.html"
            className="text-amber-500 underline"
          >
            MISO region of the Midwestern US
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
            strokeWidth={2}
          >
            <LabelList
              position="insideRight"
              fill="#000"
              stroke="none"
              dataKey="HourEndingEST"
              formatter={(value: string) => `${value}:00`}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </section>
  )
}
