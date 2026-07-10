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
  { name: "Product manager", desc: "PRDs, user stories, prioritization, stakeholder updates.", tools: 8, price: "$79", icon: "⚡", iconBg: "bg-blue-50", priceColor: "text-blue-600" },
  { name: "Legal", desc: "Contract review, NDA drafting, GDPR, due diligence.", tools: 7, price: "$129", icon: "⚖️", iconBg: "bg-green-50", priceColor: "text-green-700" },
  { name: "Recruiting", desc: "Job descriptions, interviews, scorecards, offer letters.", tools: 8, price: "$69", icon: "👥", iconBg: "bg-amber-50", priceColor: "text-amber-600" },
  { name: "Finance", desc: "Report analysis, investor memos, board narratives.", tools: 6, price: "$99", icon: "📊", iconBg: "bg-red-50", priceColor: "text-red-600" },
  { name: "Healthcare", desc: "Clinical notes, patient comms, medical literature.", tools: 6, price: "$99", icon: "🏥", iconBg: "bg-purple-50", priceColor: "text-purple-600" },
  { name: "Executive", desc: "Board decks, crisis comms, all-hands speeches.", tools: 6, price: "$149", icon: "🎯", iconBg: "bg-teal-50", priceColor: "text-teal-600" },
]

const steps = [
  { num: "Step 01", title: "Pick your toolkit", desc: "Choose the toolkit built for your profession and the job you need to do." },
  { num: "Step 02", title: "Fill in your context", desc: "Each tool has simple inputs — no prompt engineering required." },
  { num: "Step 03", title: "Get your output", desc: "Copy the result directly into your doc, email, or workflow. Done." },
]