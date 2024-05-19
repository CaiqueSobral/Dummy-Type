import type { Metadata } from 'next'
import { Red_Hat_Mono } from 'next/font/google'
import './globals.css'

const font = Red_Hat_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dummy Type',
  description: 'Just a typing app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
