import { motion } from 'framer-motion'
import Chart from './chart'

export default function FullSource() {
  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center  w-full overflow-y-hidden">
      <div
        className="bg-gradient-to-b w-full absolute z-0 bottom-0 left-1/2 translate-y-3/4 -translate-x-2/4 from-orange-200 pointer-events-none"
        style={{
          height: '66vh',
          backgroundImage: 'radial-gradient(var(--tw-gradient-stops) 80%)',
          zIndex: 0,
          opacity: 0.75,
        }}
      />

      <div className="w-full max-w-3xl mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-6xl leading-none">
          What would it take to use solar for{' '}
          <span className="text-orange-500">all electricity</span>?
        </h2>
        <p className="text-xl max-w-2xl leading-normal text-stone-700 dark:text-stone-400 mt-6">
          While not a feasible grid strategy, as solar is intermittent, here’s a
          thought experiment for the potential scale of solar in an
          energy-abundant world.
        </p>
      </div>

      <Chart />

      <motion.a
        href="https://www.bloomberg.com/graphics/2021-energy-land-use-economy/?leadSource=uverify%20wall"
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
        className="border-2 border-orange-500 text-orange-500 text-lg font-bold shadow-md shadow-orange-300 leading-none rounded-full py-3 px-4 text-center mt-8 md:mt-12"
      >
        Want to dig way more into renewables’ land use? ↗
      </motion.a>
    </section>
  )
}
