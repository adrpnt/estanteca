import { Geist, Geist_Mono, Literata } from 'next/font/google'

export const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
})

export const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})
