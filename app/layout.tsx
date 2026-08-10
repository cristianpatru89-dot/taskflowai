import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'TaskFlowAI — AI Toolkits for Professionals',
    template: '%s | TaskFlowAI'
  },
  description: 'Ready-to-use AI workflows for product managers, lawyers, recruiters, finance professionals, healthcare workers, and more. Stop prompting. Start getting outcomes.',
  keywords: ['AI toolkit', 'AI prompts', 'product manager AI', 'legal AI tools', 'recruiting AI', 'ChatGPT prompts', 'professional AI workflows'],
  openGraph: {
    type: 'website',
    siteName: 'TaskFlowAI',
    title: 'TaskFlowAI — AI Toolkits for Professionals',
    description: 'Ready-to-use AI workflows for professionals. Stop prompting. Start getting outcomes.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}