import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finance AI Toolkit',
  description: '10 AI workflows for finance professionals — financial report analysis, investor memos, board deck narratives, budget planning, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
