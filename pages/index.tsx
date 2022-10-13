import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/future/image'
import imgFarm from '../public/farm.jpeg'
import imgBlobs from '../public/wallpaper.webp'

import RenewablesMix from '../components/renewables-mix'
import SolarPrice from '../components/solar-price'
import RealTime from '../components/real-time'

const Home: NextPage = ({ todayData }: { todayData: {} }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>The Case for Climate Optimism</title>
      </Head>

      <header className="relative flex w-full min-h-screen items-center justify-center p-8">
        <Image
          src={imgBlobs}
          alt="Aerial view of a solar farm"
          placeholder="blur"
          className="absolute inset-0 object-cover object-center w-full h-full z-0"
        />
        <div className="bg-opacity-80 bg-white bg-blend-saturation shadow-2xl rounded-3xl p-8 md:p-12 sticky max-w-3xl text-center">
          <h1 className="text-6xl font-bold max-w-3xl">
            If there’s one reason to be{' '}
            <span className="text-amber-500">optimistic</span> about climate
            change, it’s <span className="text-amber-500">solar power</span>.
          </h1>
          <p className="mt-5 text-2xl mx-auto text-gray-600 max-w-lg">
            Without massive action, it’s true we’re facing crisis. But there’s
            too many narratives of doom: we are taking action, & crucially, each
            of the critical steps is getting cheaper & easier.
          </p>

          <p className="text-gray-500 text-lg mt-8">
            {'By '}
            <a
              href="https://lachlanjc.com"
              className="hover:underline text-pink-600"
            >
              @lachlanjc
            </a>
            {', October 2022'}
          </p>
        </div>
      </header>

      <SolarPrice />
      <RealTime todayData={todayData} />

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

export const getStaticProps = async () => {
  const todayData = await fetch(
    'https://api.misoenergy.org/MISORTWDDataBroker/DataBrokerServices.asmx?messageType=getSolarActual&returnType=json'
  ).then((res) => res.json())
  return { props: { todayData } }
}
