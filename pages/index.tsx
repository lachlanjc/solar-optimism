import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/future/image'
import imgHero from '../public/hero.jpg'

import RenewablesMix from '../components/renewables-mix'
import SolarPrice from '../components/solar-price'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>The Case for Climate Optimism</title>
      </Head>

      <header className="flex w-full min-h-screen flex-col md:flex-row md:px-8 gap-8 md:gap-12 items-center justify-center border-bottom">
        <div
          className="bg-gradient-to-b w-full h-screen absolute z-0 top-0 left-1/2 -translate-y-2/4 -translate-x-2/4 from-lime-100"
          style={{
            backgroundImage: 'radial-gradient(var(--tw-gradient-stops) 80%)',
            zIndex: -1,
          }}
        />
        <Image
          src={imgHero}
          alt="DALL-E rendering of solarpunk city skyline on sunny day, with trees and wind turbines in distance"
          placeholder="blur"
          className="h-auto w-auto md:h-96"
        />
        <div className="sm:px-8 md:px-0 py-16">
          <h1 className="text-7xl font-bold max-w-2xl">
            I’m <span className="text-lime-500">optimistic</span> about climate
            change.
          </h1>
          <p className="mt-5 text-2xl text-gray-600 max-w-lg">
            Without massive action, it’s true we’re facing crisis. But there’s
            too many narratives of doom: we are taking action, & crucially, each
            of the critical steps is getting cheaper & easier.
          </p>
        </div>
      </header>

      <RenewablesMix />
      <SolarPrice />

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
