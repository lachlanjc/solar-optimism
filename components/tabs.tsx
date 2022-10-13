import { Tab } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import clsx from 'clsx'
import Link from 'next/link'

export function TabBar({
  tabs,
  selectedTabIndex,
}: {
  tabs: { name: string; href: string; steps: any[] }[]
  selectedTabIndex: number
}) {
  return (
    <div className="flex overflow-auto mb-6 -mx-4 sm:-mx-6">
      <div className="flex-none min-w-full px-4 sm:px-6">
        <ul className="border-b border-slate-200 space-x-6 flex whitespace-nowrap dark:border-slate-200/5">
          {tabs.map((tab, tabIndex) => (
            <li key={tab.name}>
              <h2>
                <Link href={tab.href} scroll={false}>
                  <a
                    className={clsx(
                      'flex text-sm leading-6 font-semibold pt-3 pb-2.5 border-b-2 -mb-px',
                      tabIndex === selectedTabIndex
                        ? 'text-sky-500 border-current'
                        : 'text-slate-900 border-transparent hover:border-slate-300 dark:text-slate-200 dark:hover:border-slate-700'
                    )}
                  >
                    {tab.name}
                  </a>
                </Link>
              </h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}