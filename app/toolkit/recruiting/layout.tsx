import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recruiting AI Toolkit',
  description: '10 AI workflows for recruiters and HR professionals — job descriptions, interview questions, candidate scorecards, offer letters, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
