import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Healthcare AI Toolkit',
  description: '10 AI workflows for healthcare professionals — clinical note summarization, patient communication, medical literature review, and more.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
