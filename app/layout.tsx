import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aman Bharti (RA2111003011304)',
  description: 'Aman Bharti',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <div className='bg-black flex justify-center'>
          <div className='bg-[#18181b] w-[1200px] ring-1 ring-zinc-300/20 sm:px-20 px-4 sm:py-28 py-16 space-y-16 min-h-screen h-fit overflow-hidden'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
