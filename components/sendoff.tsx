import { motion, useViewportScroll, useTransform } from 'framer-motion'
import Image from 'next/future/image'
import imgBlobs from '../public/blobs.webp'

export default function Sendoff() {
  //   const { scrollYProgress } = useViewportScroll()
  //   const translateY = useTransform(scrollYProgress, [0, 1], [0, -768])

  return (
    <section className="relative flex w-full items-center justify-center py-32">
      <Image
        src={imgBlobs}
        alt="Aerial view of a solar farm"
        placeholder="blur"
        className="absolute inset-0 object-cover object-center dark:opacity-80 w-full h-full z-0"
      />
      <motion.div
        className="backdrop-blur-xs bg-white dark:bg-stone-700 shadow-2xl rounded-3xl relative p-8 md:px-12 md:py-14 max-w-3xl"
        // @ts-expect-error custom property
        style={{ '--tw-bg-opacity': 0.85 }}
      >
        <p className="mb-6 text-3xl text-stone-600 dark:text-stone-200 max-w-xl leading-snug">
          There’s many more technologies critical to a net-zero world we need to
          scale up & bring prices down: batteries, heat pumps, carbon removal, &
          water desalination, to name a few.
        </p>
        <h1 className="text-3xl max-w-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
          Solar power’s startling progress this decade shows the path for
          scaling our next climate solutions.
        </h1>
      </motion.div>
    </section>
  )
}
