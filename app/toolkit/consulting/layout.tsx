import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consulting AI Toolkit',
  description: '10 AI workflows for consultants and freelancers — project proposals, SOWs, client updates, findings reports, workshops, case studies, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
