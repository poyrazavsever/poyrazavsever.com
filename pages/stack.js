import React from 'react'
import TechStack from '@/components/TechStack'
import { tech } from '@/data/tech'

const Stack = () => {
  return (
    <div className='flex flex-col items-start gap-8 w-full py-8 md:py-16'>
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Kullandığım Teknolojiler</h2>
        <TechStack />
    </div>
  )
}

export default Stack