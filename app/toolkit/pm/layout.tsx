import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Manager AI Toolkit',
  description: '10 AI workflows for product managers — PRD generator, user story builder, RICE prioritization, stakeholder updates, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
