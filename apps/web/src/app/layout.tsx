import type { Metadata } from 'next'
import { THEME_SCRIPT } from '@/lib/theme'
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
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
