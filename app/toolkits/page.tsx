'use client'

import { useState } from 'react'

const toolkits = [
  {
    name: 'Product Manager',
    desc: 'PRDs, user stories, prioritization, stakeholder updates.',
    longDesc: 'From raw idea to sprint-ready backlog. 10 workflows covering discovery, definition, execution, and alignment.',
    tools: 10,
    price: '$79',
    icon: '⚡',
    iconBg: 'bg-blue-50',
    priceColor: 'text-blue-600',
    link: '/toolkit/pm',
    industry: 'Tech',
    badge: 'Most popular',
  },
  {
    name: 'Legal',
    desc: 'Contract review, NDA drafting, GDPR, due diligence.',
    longDesc: 'Review faster, draft smarter. 10 workflows for lawyers, paralegals, and compliance officers.',
    tools: 10,
    price: '$129',
    icon: '⚖️',
    iconBg: 'bg-green-50',
    priceColor: 'text-green-700',
    link: '/toolkit/legal',
    industry: 'Legal',
    badge: 'Highest value',
  },
  {
    name: 'Recruiting',
    desc: 'Job descriptions, interviews, scorecards, offer letters.',
    longDesc: 'Hire the right people in half the time. 10 workflows covering the full hiring lifecycle.',
    tools: 10,
    price: '$69',
    icon: '👥',
    iconBg: 'bg-amber-50',
    priceColor: 'text-amber-600',
    link: '/toolkit/recruiting',
    industry: 'HR',
    badge: '',
  },
  {
    name: 'Finance',
    desc: 'Report analysis, investor memos, board narratives.',
    longDesc: 'Analyze faster, communicate clearer. 10 workflows for CFOs, analysts, and finance teams.',
    tools: 10,
    price: '$99',
    icon: '📊',
    iconBg: 'bg-red-50',
    priceColor: 'text-red-600',
    link: '/toolkit/finance',
    industry: 'Finance',
    badge: '',
  },
  {
    name: 'Healthcare',
    desc: 'Clinical notes, patient comms, medical literature.',
    longDesc: 'Less admin, more care. 10 workflows for clinicians, health tech PMs, and medical writers.',
    tools: 10,
    price: '$99',
    icon: '🏥',
    iconBg: 'bg-purple-50',
    priceColor: 'text-purple-600',
    link: '/toolkit/healthcare',
    industry: 'Healthcare',
    badge: '',
  },
  {
    name: 'Executive',
    desc: 'Board decks, crisis comms, all-hands speeches.',
    longDesc: 'Lead clearly, communicate at the speed of thought. 10 workflows for C-suite and senior leaders.',
    tools: 10,
    price: '$149',
    icon: '🎯',
    iconBg: 'bg-teal-50',
    priceColor: 'text-teal-600',
    link: '/toolkit/executive',
    industry: 'Leadership',
    badge: 'Premium',
  },
  {
    name: 'Sales',
    desc: 'Cold emails, proposals, objection handling, negotiation.',
    longDesc: 'Close more deals in less time. 10 workflows covering the full sales cycle.',
    tools: 10,
    price: '$79',
    icon: '💼',
    iconBg: 'bg-orange-50',
    priceColor: 'text-orange-600',
    link: '/toolkit/sales',
    industry: 'Sales',
    badge: '',
  },
  {
    name: 'Marketing',
    desc: 'Campaign briefs, content strategy, email sequences, ads.',
    longDesc: 'Attract the right customers, convert them faster. 10 workflows for marketers and growth teams.',
    tools: 10,
    price: '$79',
    icon: '📣',
    iconBg: 'bg-pink-50',
    priceColor: 'text-pink-600',
    link: '/toolkit/marketing',
    industry: 'Marketing',
    badge: '',
  },
  {
    name: 'Education',
    desc: 'Lesson plans, assessments, parent comms, report comments.',
    longDesc: 'Less admin, more teaching. 10 workflows for teachers and educators.',
    tools: 10,
    price: '$59',
    icon: '📚',
    iconBg: 'bg-yellow-50',
    priceColor: 'text-yellow-600',
    link: '/toolkit/education',
    industry: 'Education',
    badge: 'Best value',
  },
  {
    name: 'Consulting',
    desc: 'Proposals, SOWs, client updates, findings reports.',
    longDesc: 'Win more projects, deliver with confidence. 10 workflows for consultants and freelancers.',
    tools: 10,
    price: '$99',
    icon: '🔍',
    iconBg: 'bg-slate-50',
    priceColor: 'text-slate-600',
    link: '/toolkit/consulting',
    industry: 'Consulting',
    badge: '',
  },
  {
    name: 'Startup',
    desc: 'Pitch decks, investor updates, GTM strategy, OKRs.',
    longDesc: 'Build faster, raise smarter. 10 workflows for founders at every stage.',
    tools: 10,
    price: '$99',
    icon: '🚀',
    iconBg: 'bg-violet-50',
    priceColor: 'text-violet-600',
    link: '/toolkit/startup',
    industry: 'Startup',
    badge: '',
  },
  {
    name: 'Real Estate',
    desc: 'Listings, valuations, market analysis, investment analysis.',
    longDesc: 'List faster, sell better. 10 workflows for estate agents and property professionals.',
    tools: 10,
    price: '$79',
    icon: '🏠',
    iconBg: 'bg-emerald-50',
    priceColor: 'text-emerald-600',
    link: '/toolkit/realestate',
    industry: 'Real Estate',
    badge: '',
  },
]

const industries = ['All', 'Tech', 'Legal', 'HR', 'Finance', 'Healthcare', 'Leadership', 'Sales', 'Marketing', 'Education', 'Consulting', 'Startup', 'Real Estate']

const priceRanges = ['All prices', 'Under $80', '$80–$100', 'Over $100']

export default function ToolkitsPage() {
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('All')
  const [priceRange, setPriceRange] = useState('All prices')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = toolkits.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase()) ||
      t.industry.toLowerCase().includes(search.toLowerCase())
    const matchesIndustry = industry === 'All' || t.industry === industry
    const price = parseInt(t.price.replace('$', ''))
    const matchesPrice = priceRange === 'All prices' ||
      (priceRange === 'Under $80' && price < 80) ||
      (priceRange === '$80–$100' && price >= 80 && price <= 100) ||
      (priceRange === 'Over $100' && price > 100)
    return matchesSearch && matchesIndustry && matchesPrice
  })

  return (
    <div className="min-h-screen bg-white">

      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <a href="/" className="text-base font-medium">
          TaskFlow<span className="text-blue-600">AI</span>
        </a>
        <div className="flex gap-5 items-center">
          <a href="/toolkits" className="text-sm text-gray-900 font-medium">Toolkits</a>
          <a href="/how-to-use" className="text-sm text-gray-500 hover:text-gray-900">How to use AI</a>
          <a href="/about" className="text-sm text-gray-500 hover:text-gray-900">About</a>
          <a href="/#pricing" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg font-medium">
            Get started
          </a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">All toolkits</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">Find your toolkit</h1>
          <p className="text-base text-gray-500">12 toolkits, 120 workflows. Built for professionals who have real work to do.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8">

          {/* Search */}
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by profession or task..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
            )}
          </div>

          {/* Industry filter */}
          <div className="flex flex-wrap gap-2">
            {industries.map(i => (
              <button
                key={i}
                onClick={() => setIndustry(i)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  industry === i
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {i}
              </button>
            ))}
          </div>

          {/* Price filter + view toggle */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {priceRanges.map(p => (
                <button
                  key={p}
                  onClick={() => setPriceRange(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    priceRange === p
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setView('grid')}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${view === 'grid' ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'}`}
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${view === 'list' ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'}`}
              >
                ☰ List
              </button>
            </div>
          </div>

        </div>

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-4">
          {filtered.length} toolkit{filtered.length !== 1 ? 's' : ''} {search || industry !== 'All' || priceRange !== 'All prices' ? 'found' : 'available'}
        </p>

        {/* Grid view */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(t => (
              
              <a  key={t.name}
                href={t.link}
                className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 hover:shadow-sm transition-all block"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${t.iconBg}`}>
                    {t.icon}
                  </div>
                  {t.badge && (
                    <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-full">
                      {t.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-sm font-medium text-gray-900 mb-1">{t.name}</h2>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{t.longDesc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{t.tools} workflows</span>
                  <span className={`text-sm font-medium ${t.priceColor}`}>{t.price}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* List view */}
        {view === 'list' && (
          <div className="space-y-3">
            {filtered.map(t => (
              
              <a  key={t.name}
                href={t.link}
                className="flex items-center gap-4 border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all block"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${t.iconBg}`}>
                  {t.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-sm font-medium text-gray-900">{t.name}</h2>
                    {t.badge && <span className="text-xs px-2 py-0.5 bg-gray-50 text-gray-500 border border-gray-100 rounded-full">{t.badge}</span>}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{t.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-sm font-medium ${t.priceColor}`}>{t.price}</div>
                  <div className="text-xs text-gray-400">{t.tools} workflows</div>
                </div>
              </a>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400 mb-2">No toolkits found for "{search}"</p>
            <button onClick={() => { setSearch(''); setIndustry('All'); setPriceRange('All prices') }} className="text-xs text-blue-600">
              Clear all filters
            </button>
          </div>
        )}

      </div>

      <footer className="border-t border-gray-100 py-8 px-6 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm font-medium text-gray-900">
            TaskFlow<span className="text-blue-600">AI</span>
            <p className="text-xs text-gray-400 font-normal mt-1">AI toolkits for professionals who have real work to do.</p>
          </div>
          <div className="flex items-center gap-5">
            <a href="mailto:taskflowaiapp@gmail.com" className="text-xs text-gray-500 hover:text-gray-900">✉️ Email</a>
            <a href="https://www.linkedin.com/company/taskflowai-app/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-900">💼 LinkedIn</a>
            <a href="https://www.instagram.com/taskflowaiapp/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-900">📸 Instagram</a>
            <a href="/about" className="text-xs text-gray-500 hover:text-gray-900">About</a>
          </div>
        </div>
      </footer>

    </div>
  )
}