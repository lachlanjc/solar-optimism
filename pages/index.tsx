import type { GetStaticProps } from 'next'
import Head from 'next/head'

import Header from '../components/header'
import Sendoff from '../components/sendoff'
import RenewablesMix from '../components/renewables-mix'
import Regions from '../components/regions'
import SolarPrice from '../components/solar-price'
import RealTime, { TodayData } from '../components/real-time'
import Explanation from '../components/explanation'

function Home({ todayData }: { todayData: TodayData }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-black dark:text-stone-50">
      <Head>
        <title>The Case for Climate Optimism</title>
      </Head>

      <Header />

      <Regions />
      <SolarPrice />
      <Explanation />
      <RealTime todayData={todayData} />
      {/* <RenewablesMix /> */}

      <Sendoff />

      <footer className="p-8 w-full items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto text-sm">
          <p className="text-stone-600 dark:text-stone-400 mr-auto">
            {'Site by '}
            <a
              href="https://lachlanjc.com"
              className="hover:underline text-amber-600"
            >
              @lachlanjc
            </a>
            , October 2022. Header image from{' '}
            <a
              href="https://unsplash.com/photos/Ilpf2eUPpUE"
              className="hover:underline text-amber-600"
            >
              Unsplash
            </a>
            .
            <br />
            Research from Our World in Data. Ending illustration adapted from{' '}
            <a
              href="https://twitter.com/MengTo/status/1564743669483200513"
              className="hover:underline text-amber-600"
            >
              Meng To
            </a>
            .
          </p>
          <a
            className="hover:underline text-amber-600"
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
  // const todayData = await fetch(
  //   'https://api.misoenergy.org/MISORTWDDataBroker/DataBrokerServices.asmx?messageType=getSolarActual&returnType=json'
  // ).then((res) => res.json())
  const todayData = require('../components/real-time/sample.json')
  return { props: { todayData } }
}
