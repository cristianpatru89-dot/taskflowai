import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate AI Toolkit',
  description: '10 AI workflows for estate agents and property professionals — property descriptions, valuations, market analysis, investment analysis, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
