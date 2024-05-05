'use client'
import { FaSpotify } from 'react-icons/fa'
import { PiWaveformBold } from 'react-icons/pi'
import { RiUserHeartFill } from 'react-icons/ri'
import useSWR from 'swr'
import Link from '@/components/Link'
import Image from '@/components/Image'

interface SongData {
  isPlaying: boolean
  title: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
}

export default function SpotifyPlayerBox() {
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const { data }: { data: SongData } = useSWR('/api/spotify', fetcher)

  return (
    <div
      className={`card bg-pink-blue-animated animation-delay-1 flex-center flex-grow overflow-hidden p-2`}
    >
      {data?.isPlaying && (
        <Link href={data.songUrl} className="flex flex-col space-y-1 px-3">
          <section className="mx-auto flex items-center space-x-1 text-primary-600">
            <PiWaveformBold size={12} />
            <span className="whitespace-nowrap font-sans text-xs">Now playing...</span>
          </section>
          <section className="relative mx-auto h-24 w-24">
            <Image
              src={`/api/imageProxy?url=${encodeURIComponent(data.albumImageUrl)}`}
              alt={data.album}
              width={375}
              height={375}
            />
            <div className="text-primary absolute right-0 top-0 p-1">
              <FaSpotify size={21} />
            </div>
          </section>
          <h2 className="text-xl text-white">{data.title}</h2>
          <section className="flex items-center space-x-1 text-white">
            <RiUserHeartFill size={16} />
            <h5 className="text-sm ">{data.artist}</h5>
          </section>
        </Link>
      )}

      {!data?.isPlaying && (
        <section className="flex flex-col items-center justify-center">
          <div className="text-primary ">
            <FaSpotify size={42} />
          </div>

          <h1 className="text-xl font-extrabold text-white">Not Playing</h1>
        </section>
      )}
    </div>
  )
}