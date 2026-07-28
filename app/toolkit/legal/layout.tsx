import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal AI Toolkit',
  description: '10 AI workflows for lawyers and legal professionals — contract review, NDA drafting, GDPR compliance, due diligence, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
