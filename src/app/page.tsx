"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic'
const Gallery = dynamic(() => import('./gallery'), { ssr: false })

export default function Home() {
  const [hideSelected, setHideSelected] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className=' uppercase font-bold tracking-wide p-16 text-2xl'>MobDex Osatopia 2</h1>
      <div className="flex items-center mb-4">
        <input id="default-checkbox" type="checkbox" checked={hideSelected} onChange={(event) => setHideSelected(event.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hide selected</label>
      </div>
      <Gallery hideSelected={hideSelected} />
    </main>
  )
}
