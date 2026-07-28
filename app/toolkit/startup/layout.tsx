import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup AI Toolkit',
  description: '10 AI workflows for founders — pitch decks, investor updates, term sheet analysis, GTM strategy, OKRs, culture documents, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
