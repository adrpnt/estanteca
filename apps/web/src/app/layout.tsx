import type { Metadata } from 'next'
import { geist, geistMono, literata } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Estanteca',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      className={`${literata.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
