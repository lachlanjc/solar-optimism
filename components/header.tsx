import { motion, useViewportScroll, useTransform } from 'framer-motion'
import Image from 'next/future/image'
import imgFarm from '../public/farm.jpg'

export default function Header() {
  const { scrollYProgress } = useViewportScroll()
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -980])

  return (
    <header className="relative flex w-full min-h-screen items-center justify-center p-8">
      <Image
        src={imgFarm}
        alt="Aerial view of a solar farm"
        placeholder="blur"
        className="absolute inset-0 object-cover object-center w-full h-full z-0"
      />
      <motion.div
        className="backdrop-blur-lg bg-white dark:bg-stone-800 bg-blend-saturation shadow-2xl rounded-3xl p-8 md:p-12 sticky max-w-3xl"
        // @ts-expect-error custom property
        style={{ '--tw-bg-opacity': 0.85, translateY }}
      >
        <h1 className="text-6xl font-bold max-w-3xl">
          If there’s one reason to be{' '}
          <span className="text-lime-500">optimistic</span> about climate
          change, it’s <span className="text-amber-500">solar power</span>.
        </h1>
        <p className="mt-5 text-2xl text-stone-600 dark:text-stone-400 max-w-lg">
          Switching off fossil fuels for electricity is the most critical step
          in our transition to a net-zero carbon world. Solar power is leading
          here—here’s why.
        </p>

        <p className="text-stone-500 dark:text-stone-400 text-lg mt-8">
          {'By '}
          <a
            href="https://lachlanjc.com"
            className="underline underline-offset-3 text-amber-500"
          >
            @lachlanjc
          </a>
          {', October 2022'}
        </p>
      </motion.div>
    </header>
  )
}
