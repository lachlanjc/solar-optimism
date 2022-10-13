import type { GetStaticProps } from 'next'
import Head from 'next/head'

import Header from '../components/header'
import RenewablesMix from '../components/renewables-mix'
import Regions from '../components/regions'
import SolarPrice from '../components/solar-price'
import RealTime, { TodayData } from '../components/real-time'

function Home({ todayData }: { todayData: TodayData }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>The Case for Climate Optimism</title>
      </Head>

      <Header />

      <Regions />
      <SolarPrice />
      <RealTime todayData={todayData} />
      {/* <RenewablesMix /> */}

      <p className="py-20 text-lg">
        67% of global population lives in countries where solar and wind are
        cheaper to build and operate than emitting sources
      </p>

      <footer className="p-8 w-full items-center justify-center border-t dark:border-zinc-900">
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto text-sm">
          <p className="text-zinc-600 dark:text-zinc-400 mr-auto">
            {'Site by '}
            <a
              href="https://lachlanjc.com"
              className="hover:underline text-blue-500"
            >
              @lachlanjc
            </a>
            {', October 2022.'}
          </p>
          <a
            className="hover:underline text-blue-500"
            href="https://github.com/lachlanjc/climate-optimism"
          >
            Open source on GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const todayData = await fetch(
    'https://api.misoenergy.org/MISORTWDDataBroker/DataBrokerServices.asmx?messageType=getSolarActual&returnType=json'
  ).then((res) => res.json())
  return { props: { todayData } }
}
