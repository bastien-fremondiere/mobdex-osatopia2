import Image from 'next/image'
import Gallery from './gallery'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className=' uppercase font-bold tracking-wide p-16 text-2xl'>MobDex Osatopia 2</h1>
      <Gallery />
    </main>
  )
}
