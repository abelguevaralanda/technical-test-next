import NavLinks from '@/app/ui/components/molecules/nav-links/nav-links'
import { signOut } from '@/auth'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { FaPowerOff } from 'react-icons/fa'

const SIGN_OUT_TEXT = 'Sign Out'

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href="/"
      >
        <Image
          src="/logo.png"
          alt="Your movies app logo"
          className="mb-2 flex h-  items-end justify-start rounded-md shadow-2xl hover:opacity-80"
          width={300}
          height={50}
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/login' })
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <FaPowerOff />
            <div className="hidden md:block">{SIGN_OUT_TEXT}</div>
          </button>
        </form>
      </div>
    </aside>
  )
}
