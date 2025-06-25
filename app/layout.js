import './globals.css'
import { Geist, Geist_Mono, Lato, Saira } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })
const saira = Saira({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })

export const metadata = {
  title: {
    default: 'NextBot Panel',
    template: '%s | NextBot Panel',
  },
  description: 'Welcome to NextBot',
  keywords: ['dcbot', 'discordbot', 'nocodebot', 'freebot', 'freehostbot', 'freehost'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${saira.className} ${lato.className}`}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
