import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Executive AI Toolkit',
  description: '10 AI workflows for executives and senior leaders — board communications, strategic memos, crisis communications, all-hands speeches, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
