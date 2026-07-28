import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketing AI Toolkit',
  description: '10 AI workflows for marketers — campaign briefs, content strategy, email sequences, ad copy, SEO briefs, landing pages, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
