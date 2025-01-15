import { abel } from '@/app/ui/fonts'
import Link from 'next/link'
import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import Image from 'next/image'

const WELCOME_TEXT = 'Welcome to your movie app.'
const LOGIN_TEXT = 'Log in'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/movie-desktop.webp"
            width={1000}
            height={760}
            className="hidden md:block rounded-lg shadow-2xl hover:opacity-80"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/movie-mobile.webp"
            width={560}
            height={620}
            className="block md:hidden rounded-lg shadow-2xl hover:opacity-80"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
        <div
          className="flex flex-col justify-center gap-6 rounded-lg  px-6 py-10 md:w-2/5 md:px-20"
        >
          <p className={`${abel.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>{WELCOME_TEXT}</strong>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>{LOGIN_TEXT}</span>
            {' '}
            <FiLogIn className="ml-auto h-5 w-5 text-gray-50" />
          </Link>
        </div>
      </div>
    </main>

  )
}
