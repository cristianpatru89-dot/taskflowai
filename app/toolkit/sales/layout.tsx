import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sales AI Toolkit',
  description: '10 AI workflows for sales professionals — cold emails, discovery calls, proposals, objection handling, negotiation, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
