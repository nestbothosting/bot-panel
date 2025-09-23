import './globals.css'
import { Geist, Geist_Mono, Lato, Saira } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })
const saira = Saira({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })

export const metadata = {
  title: {
    default: 'NestBot - Free Discord Bot Hosting & Automation',
    template: '%s | NestBot Panel',
  },
  description:
    'NestBot is a no-code Discord bot platform that lets you create, manage, and host your bots for free. Build powerful bots effortlessly using our simple control panel.',
  keywords: [
    'NestBot',
    'nest bot',
    'nest bot hosting',
    'Nest Bot Discord',
    'no-code discord bot',
    'discord bot hosting',
    'free discord bot hosting',
    'discord bot builder',
    'discord bot panel',
    'discord bot dashboard',
    'no-code bot builder',
    'visual discord bot editor',
    'discord bot creator',
    'drag and drop discord bot',
    'NextBot',
    'discord bot automation',
    'bot deployment platform',
    'build discord bot without coding',
    'discord bot maker for beginners',
    '24/7 discord bot hosting',
    'cloud discord bot runner',
    'free bot hosting with dashboard',
  ],
  metadataBase: new URL('https://nestbot.xyz'),
  openGraph: {
    title: 'NestBot Panel - Free Discord Bot Hosting & Automation',
    description:
      'Create, manage, and host your Discord bots with NestBot for free. No coding required. Just plug and play.',
    url: 'https://nestbot.xyz',
    siteName: 'NestBot Panel',
    type: 'website',
    images: [
      {
        url: 'https://nestbot.xyz/image/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NestBot Preview',
      },
    ],
  },
  authors: [{ name: 'NestBot Team', url: 'https://nestbot.xyz' }],
  themeColor: 'rgba(0, 0, 0, 0)',
  creator: 'NestBot Team',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: 'https://nestbot.xyz',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${saira.className} ${lato.className}`}>
      {/* <head>
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_CLIENT_ID}`}
          crossorigin="anonymous"></script>
      </head> */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
