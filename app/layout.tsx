import { abel } from '@/app/ui/fonts'
import React from 'react'
import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Your movies App',
  description: 'Application to show a list of movies',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Your movies app</title>
      </head>
      <body
        className={`${abel.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
