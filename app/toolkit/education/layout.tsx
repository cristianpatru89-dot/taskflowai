import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education AI Toolkit',
  description: '10 AI workflows for teachers and educators — lesson plans, assessments, parent communications, differentiation, report comments, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
