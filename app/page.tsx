'use client'

import React from 'react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">

      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <div className="text-base font-medium">
          TaskFlow<span className="text-blue-600">AI</span>
        </div>
        <div className="flex gap-5 items-center">
          <a href="#toolkits" className="text-sm text-gray-500 hover:text-gray-900">Toolkits</a>
          <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900">Pricing</a>
          <button className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg font-medium">
            Get started
          </button>
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-5">
          ✦ AI toolkits for professionals
        </div>
        <h1 className="text-4xl font-medium text-gray-900 leading-tight mb-4">
          Stop prompting.<br />
          Start <span className="text-blue-600">getting outcomes</span>.
        </h1>
        <p className="text-base text-gray-500 leading-relaxed mb-8">
          TaskFlowAI gives professionals ready-to-use AI toolkits — not generic prompts,
          but complete workflows that match the real jobs you do every day.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="#toolkits" className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg">
            Browse toolkits
          </a>
          <a href="#how" className="px-5 py-2.5 border border-gray-200 text-gray-900 text-sm rounded-lg">
            See how it works
          </a>
        </div>
      </section>

      <hr className="border-gray-100 mx-6" />

      <section id="toolkits" className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Toolkits</p>
          <h2 className="text-2xl font-medium text-gray-900 mb-3">Built for your profession</h2>
          <p className="text-sm text-gray-500">Each toolkit contains 6–10 outcome-focused tools with context and prompts built in.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {toolkits.map((t) => (
            <a href={t.link} key={t.name} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors cursor-pointer block">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 text-lg ${t.iconBg}`}>
                {t.icon}
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">{t.name}</div>
              <div className="text-xs text-gray-500 leading-relaxed mb-2">{t.desc}</div>
              <div className="text-xs text-gray-400">{t.tools} tools</div>
              <div className={`text-xs font-medium mt-2 ${t.priceColor}`}>{t.price}</div>
            </a>
          ))}
        </div>
      </section>

      <hr className="border-gray-100 mx-6" />

      <section id="how" className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">How it works</p>
          <h2 className="text-2xl font-medium text-gray-900">From task to output in 3 steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map((s) => (
            <div key={s.num} className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs font-medium text-blue-600 mb-2">{s.num}</div>
              <div className="text-sm font-medium text-gray-900 mb-1">{s.title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-100 mx-6" />

      <section id="pricing" className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Pricing</p>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Pay once, use forever</h2>
          <p className="text-sm text-gray-500">No subscriptions. Buy what you need and keep it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-sm font-medium text-gray-900 mb-1">Single toolkit</div>
            <div className="text-2xl font-medium text-gray-900 my-2">$69–$149</div>
            <div className="text-xs text-gray-500 mb-4">One profession, one-time</div>
            <ul className="space-y-1 mb-5">
              {["6–10 outcome tools", "Lifetime access", "Free updates"].map(f => (
                <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="text-green-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="#toolkits" className="block text-center text-sm py-2 border border-gray-200 rounded-lg text-gray-900">
              Browse toolkits
            </a>
          </div>
          <div className="bg-white border-2 border-blue-500 rounded-xl p-5">
            <div className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded inline-block mb-2">Most popular</div>
            <div className="text-sm font-medium text-gray-900 mb-1">All toolkits</div>
            <div className="text-2xl font-medium text-gray-900 my-2">$299</div>
            <div className="text-xs text-gray-500 mb-4">All 6 professions, forever</div>
            <ul className="space-y-1 mb-5">
              {["40+ outcome tools", "All future toolkits", "Priority support", "Team sharing"].map(f => (
                <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="text-green-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <button className="w-full text-sm py-2 bg-gray-900 text-white rounded-lg font-medium">
              Get all access
            </button>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-sm font-medium text-gray-900 mb-1">Teams</div>
            <div className="text-2xl font-medium text-gray-900 my-2">Custom</div>
            <div className="text-xs text-gray-500 mb-4">5+ seats, invoiced</div>
            <ul className="space-y-1 mb-5">
              {["All toolkits", "Custom onboarding", "Slack support", "Custom toolkits"].map(f => (
                <li key={f} className="text-xs text-gray-500 flex items-center gap-2">
                  <span className="text-green-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <button className="w-full text-sm py-2 border border-gray-200 rounded-lg text-gray-900">
              Contact us
            </button>
          </div>
        </div>
      </section>

{/* Email Capture Section */}
<section className="bg-gray-900 py-16 px-6">
  <div className="max-w-2xl mx-auto text-center">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Free access</p>
    <h2 className="text-2xl font-medium text-white mb-3">
      Get 3 free workflows — no credit card
    </h2>
    <p className="text-sm text-gray-400 mb-8">
      Enter your email and we will send you 3 hand-picked workflows from the PM, Legal, and Sales toolkits. Free forever.
    </p>
    <EmailForm />
  </div>
</section>

{/* Feedback Section */}
<section className="py-12 px-6 border-t border-gray-100">
  <div className="max-w-xl mx-auto text-center">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Feedback</p>
    <h2 className="text-xl font-medium text-gray-900 mb-2">How are we doing?</h2>
    <p className="text-sm text-gray-500 mb-6">Tell us what you think — it takes 30 seconds.</p>
    <FeedbackForm />
  </div>
</section>

      <footer className="border-t border-gray-100 py-8 text-center">
        <div className="text-sm font-medium text-gray-900 mb-1">
          TaskFlow<span className="text-blue-600">AI</span>
        </div>
        <div className="text-xs text-gray-400">AI toolkits for professionals who have real work to do.</div>
      </footer>

    </main>
  )
}

const toolkits = [
  { name: "Product Manager", desc: "PRDs, user stories, prioritization, stakeholder updates.", tools: 10, price: "$79", icon: "⚡", iconBg: "bg-blue-50", priceColor: "text-blue-600", link: "/toolkit/pm" },
  { name: "Legal", desc: "Contract review, NDA drafting, GDPR, due diligence.", tools: 10, price: "$129", icon: "⚖️", iconBg: "bg-green-50", priceColor: "text-green-700", link: "/toolkit/legal" },
  { name: "Recruiting", desc: "Job descriptions, interviews, scorecards, offer letters.", tools: 10, price: "$69", icon: "👥", iconBg: "bg-amber-50", priceColor: "text-amber-600", link: "/toolkit/recruiting" },
  { name: "Finance", desc: "Report analysis, investor memos, board narratives.", tools: 10, price: "$99", icon: "📊", iconBg: "bg-red-50", priceColor: "text-red-600", link: "/toolkit/finance" },
  { name: "Healthcare", desc: "Clinical notes, patient comms, medical literature.", tools: 10, price: "$99", icon: "🏥", iconBg: "bg-purple-50", priceColor: "text-purple-600", link: "/toolkit/healthcare" },
  { name: "Executive", desc: "Board decks, crisis comms, all-hands speeches.", tools: 10, price: "$149", icon: "🎯", iconBg: "bg-teal-50", priceColor: "text-teal-600", link: "/toolkit/executive" },
  { name: "Sales", desc: "Cold emails, proposals, objection handling, negotiation.", tools: 10, price: "$79", icon: "💼", iconBg: "bg-orange-50", priceColor: "text-orange-600", link: "/toolkit/sales" },
  { name: "Marketing", desc: "Campaign briefs, content strategy, email sequences, ads.", tools: 10, price: "$79", icon: "📣", iconBg: "bg-pink-50", priceColor: "text-pink-600", link: "/toolkit/marketing" },
  { name: "Education", desc: "Lesson plans, assessments, parent comms, report comments.", tools: 10, price: "$59", icon: "📚", iconBg: "bg-yellow-50", priceColor: "text-yellow-600", link: "/toolkit/education" },
  { name: "Consulting", desc: "Proposals, SOWs, client updates, findings reports.", tools: 10, price: "$99", icon: "🔍", iconBg: "bg-slate-50", priceColor: "text-slate-600", link: "/toolkit/consulting" },
  { name: "Startup", desc: "Pitch decks, investor updates, GTM strategy, OKRs.", tools: 10, price: "$99", icon: "🚀", iconBg: "bg-violet-50", priceColor: "text-violet-600", link: "/toolkit/startup" },
  { name: "Real Estate", desc: "Listings, valuations, market analysis, investment analysis.", tools: 10, price: "$79", icon: "🏠", iconBg: "bg-emerald-50", priceColor: "text-emerald-600", link: "/toolkit/realestate" },
]

const steps = [
  { num: "Step 01", title: "Pick your toolkit", desc: "Choose the toolkit built for your profession and the job you need to do." },
  { num: "Step 02", title: "Fill in your context", desc: "Each tool has simple inputs — no prompt engineering required." },
  { num: "Step 03", title: "Get your output", desc: "Copy the result directly into your doc, email, or workflow. Done." },
]

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypaY6OIg8J1MyXVYdFpZuQmC9QHh0iB9iqnUqPC0IFOV2bWe8gILaJyZ-aiBnb00V6/exec'

function EmailForm() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    
    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf1ImKJpyXl8p7p5xqsYDWisq41SgIaaiEDxX5Ilwjcd4U/formResponse'
    
    const formData = new FormData()
    formData.append('entry.644710253', email)
    
    try {
      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-gray-800 rounded-xl px-6 py-4 text-center">
        <p className="text-green-400 font-medium mb-1">✓ You are in!</p>
        <p className="text-gray-400 text-sm">Check your inbox — your free workflows are on the way.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gray-500"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-5 py-2.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? '...' : 'Get free workflows'}
      </button>
    </form>
  )
}

function FeedbackForm() {
  const [rating, setRating] = React.useState(0)
  const [comment, setComment] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) return
    setStatus('loading')

    const formData = new FormData()
    formData.append('type', 'feedback')
    formData.append('rating', String(rating))
    formData.append('comment', comment)
    formData.append('page', 'homepage')

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      setStatus('success')
    } catch {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-gray-50 rounded-xl px-6 py-4 text-center">
        <p className="text-green-600 font-medium mb-1">✓ Thank you!</p>
        <p className="text-gray-500 text-sm">Your feedback helps us build better toolkits.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl transition-transform hover:scale-110 ${star <= rating ? 'opacity-100' : 'opacity-30'}`}
          >
            ⭐
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="What would make TaskFlowAI better for you? (optional)"
        rows={2}
        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:border-gray-400 resize-none"
      />
      <button
        type="submit"
        disabled={!rating || status === 'loading'}
        className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-30 transition-colors"
      >
        {status === 'loading' ? 'Sending...' : 'Send feedback'}
      </button>
    </form>
  )
}