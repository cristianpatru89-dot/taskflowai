'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'financial_report',
    number: '01',
    name: 'Financial Report Analyzer',
    tagline: 'Extract the signal from any financial report',
    phase: 'Analyze',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'After receiving any P&L, balance sheet, or earnings release',
    description: 'Turns raw financial data into a structured analysis with ratios, trends, and red flags.',
    inputs: [
      { id: 'report_text', label: 'Paste financial data or report text', placeholder: 'Paste revenue figures, P&L summary, or key metrics here...', type: 'textarea' },
      { id: 'company_type', label: 'Company type', placeholder: '', type: 'select', options: ['Public company', 'Private SaaS', 'Manufacturing / product', 'Services business', 'Startup / pre-revenue', 'Non-profit'] },
      { id: 'period', label: 'Reporting period', placeholder: 'e.g. Q1 2026, FY2025, H1 2025', type: 'text' },
      { id: 'prior_period', label: 'Prior period for comparison (optional)', placeholder: 'e.g. Q1 2025, FY2024', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a senior financial analyst. Be direct — say when numbers are good, when they are bad, and when they are ambiguous. No hedging.

Company type: ${inputs.company_type || '[company type]'}
Period: ${inputs.period || '[period]'}
Comparison period: ${inputs.prior_period || 'not provided'}

Analyze this financial data and produce:

1. EXECUTIVE SUMMARY (3 sentences): What happened, what it means, what to watch.

2. REVENUE ANALYSIS:
   - Growth rate vs prior period
   - Revenue mix shifts
   - Any acceleration or deceleration — and why

3. MARGIN ANALYSIS:
   - Gross margin trend and drivers
   - Operating margin
   - Net margin
   - Flag any margin compression or expansion

4. BALANCE SHEET HEALTH:
   - Cash position and runway
   - Debt levels and coverage
   - Working capital situation

5. KEY RATIOS (calculate where data allows):
   - Revenue growth rate
   - Gross margin %
   - Operating margin %
   - Current ratio
   - Debt-to-equity
   - For SaaS: ARR, NRR, CAC payback if data available

6. 3 QUESTIONS THIS REPORT RAISES that management hasn't answered.

7. VERDICT: In one sentence — is this business getting stronger, weaker, or holding steady?

Financial data:
${inputs.report_text || '[paste data here]'}`
  },
  {
    id: 'investor_memo',
    number: '02',
    name: 'Investor Memo Writer',
    tagline: 'Tell your financial story compellingly',
    phase: 'Communicate',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'Before any investor meeting, board update, or fundraising conversation',
    description: 'Drafts a structured investor memo that communicates performance, strategy, and opportunity clearly.',
    inputs: [
      { id: 'company', label: 'Company and stage', placeholder: 'e.g. SaaS startup, Series A, €2M ARR, 40% YoY growth', type: 'textarea' },
      { id: 'key_metrics', label: 'Key metrics to highlight', placeholder: 'e.g. ARR: €2.1M, Growth: 40% YoY, Gross margin: 78%, NRR: 112%, Burn: €80k/month, Runway: 18 months', type: 'textarea' },
      { id: 'narrative', label: 'Main narrative / what you want investors to understand', placeholder: 'e.g. We are the only vertical SaaS for airport billing, with 3 new enterprise contracts signed this quarter', type: 'textarea' },
      { id: 'ask', label: 'What are you asking for? (optional)', placeholder: 'e.g. €3M Series A to hire 5 engineers and expand to 3 new markets', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an investor relations expert and financial storyteller. Write a memo that makes sophisticated investors understand the opportunity quickly.

Company: ${inputs.company || '[company description]'}
Key metrics: ${inputs.key_metrics || '[metrics]'}
Narrative: ${inputs.narrative || '[narrative]'}
Ask: ${inputs.ask || 'not specified'}

Write a structured investor memo:

1. THE OPPORTUNITY (2 sentences): Why this market, why now, why this company.

2. BUSINESS PERFORMANCE:
   - Key metrics: ${inputs.key_metrics || '[metrics]'}
   - What the numbers tell us about business health
   - Trend direction and momentum

3. WHAT DROVE THIS QUARTER / PERIOD:
   - 3 specific things that happened
   - What they signal about the business model

4. WHERE WE ARE GOING:
   - Near-term priorities (next 90 days)
   - Key milestones that will prove the model

5. THE ASK (if applicable): ${inputs.ask ? `${inputs.ask} — explain what this capital unlocks` : 'Not applicable for this memo.'}

6. RISKS AND HOW WE ARE MANAGING THEM: 2-3 honest risks with mitigation plans.

Tone: Confident but honest. Investors respect transparency over spin. Under 400 words.`
  },
  {
    id: 'board_deck',
    number: '03',
    name: 'Board Deck Narrative',
    tagline: 'Turn your numbers into a story the board will remember',
    phase: 'Communicate',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'Before every board meeting',
    description: 'Writes the narrative for each board deck slide — so your numbers tell a story, not just show data.',
    inputs: [
      { id: 'company', label: 'Company name', placeholder: 'e.g. Acme SRL', type: 'text' },
      { id: 'period', label: 'Reporting period', placeholder: 'e.g. Q2 2026', type: 'text' },
      { id: 'key_numbers', label: 'Key financial figures', placeholder: 'e.g. Revenue: €850k (+32% YoY), Gross margin: 74%, Burn: €95k/month, Cash: €1.8M, New customers: 12', type: 'textarea' },
      { id: 'vs_plan', label: 'Performance vs plan', placeholder: 'e.g. Revenue 8% ahead of plan, gross margin in line, burn 12% over budget due to unexpected AWS costs', type: 'textarea' },
      { id: 'decisions', label: 'Decisions needed from the board', placeholder: 'e.g. Approve €200k marketing budget increase, sign off on new office lease', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an executive communication expert. Boards respect honesty and directness — never spin bad news.

Company: ${inputs.company || '[company]'}
Period: ${inputs.period || '[period]'}
Key figures: ${inputs.key_numbers || '[numbers]'}
vs Plan: ${inputs.vs_plan || '[vs plan]'}
Board decisions needed: ${inputs.decisions || '[decisions]'}

Write board deck narrative for each section:

SLIDE 1 — OPENING FRAME:
One sentence that honestly frames the quarter. Not cheerleading, not doom — just the truth.

SLIDE 2 — FINANCIAL HIGHLIGHTS:
3 bullet points — the numbers that matter most and why. For each: the number, the trend, and the implication.

SLIDE 3 — PERFORMANCE vs PLAN:
For each item in "${inputs.vs_plan || '[vs plan]'}":
- What beat / missed
- The real reason (not the polished reason)
- What we are doing about it

SLIDE 4 — FORWARD OUTLOOK:
- What we are confident about and why
- What we are watching closely
- Key assumption that must hold for us to hit plan

SLIDE 5 — DECISIONS REQUIRED:
For each decision in "${inputs.decisions || '[decisions]'}":
- Context (why this decision now)
- Options considered
- Recommendation with rationale
- What you need from the board

Tone: Confident and transparent. No passive voice. No hedging.`
  },
  {
    id: 'budget_narrative',
    number: '04',
    name: 'Budget Narrative Builder',
    tagline: 'Explain your budget request so it gets approved',
    phase: 'Plan',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Annual or quarterly budget planning',
    description: 'Turns your budget numbers into a compelling narrative that connects spend to business outcomes.',
    inputs: [
      { id: 'department', label: 'Department or team', placeholder: 'e.g. Engineering, Marketing, Operations', type: 'text' },
      { id: 'budget_request', label: 'Budget being requested', placeholder: 'e.g. €450,000 for FY2026 — up 25% from €360,000 in FY2025', type: 'text' },
      { id: 'breakdown', label: 'Budget breakdown', placeholder: 'e.g. Personnel: €280k (3 new hires), Tools & software: €60k, Marketing campaigns: €80k, Travel: €30k', type: 'textarea' },
      { id: 'outcomes', label: 'Business outcomes this budget enables', placeholder: 'e.g. Ship 4 major features, reduce infrastructure costs by 20%, expand to 2 new markets', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a CFO-level communicator. Write a budget narrative that connects every euro to a business outcome — not just a line item.

Department: ${inputs.department || '[department]'}
Total request: ${inputs.budget_request || '[budget]'}
Breakdown: ${inputs.breakdown || '[breakdown]'}
Business outcomes: ${inputs.outcomes || '[outcomes]'}

Write a budget narrative:

1. EXECUTIVE SUMMARY (2 sentences): What this budget enables and why it is the right investment.

2. WHAT WE ARE INVESTING IN:
   For each major category in "${inputs.breakdown || '[breakdown]'}":
   - What it is
   - Why it is necessary (not "nice to have")
   - What happens if we don't fund it

3. BUSINESS OUTCOMES ENABLED:
   For each outcome in "${inputs.outcomes || '[outcomes]'}":
   - The specific outcome
   - How this budget line enables it
   - How we will measure success

4. ROI FRAMING: What is the expected return on this investment? Even if not precisely quantifiable — make the case.

5. WHAT IS NOT IN THIS BUDGET: What did we cut or defer, and why?

6. RISK OF UNDERFUNDING: If this budget is cut by 20%, what breaks first?

Keep it under 350 words. Decision-makers read the first and last paragraph most carefully — make those count.`
  },
  {
    id: 'due_diligence_financial',
    number: '05',
    name: 'Financial Due Diligence Guide',
    tagline: 'Know the financial reality before you commit',
    phase: 'Analyze',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before acquiring, investing in, or partnering with any company',
    description: 'Generates a structured financial due diligence framework with key questions and red flags.',
    inputs: [
      { id: 'target', label: 'Target company description', placeholder: 'e.g. 5-year-old SaaS company, €3M ARR, 60 employees, raises Series B', type: 'textarea' },
      { id: 'deal_type', label: 'Type of transaction', placeholder: '', type: 'select', options: ['Full acquisition', 'Minority investment', 'Strategic partnership', 'Merger', 'Asset purchase'] },
      { id: 'deal_size', label: 'Approximate deal size', placeholder: 'e.g. €5M acquisition', type: 'text' },
      { id: 'red_flags', label: 'Any known concerns?', placeholder: 'e.g. Revenue growth slowed last quarter, key customer represents 40% of ARR', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a financial due diligence expert. Be thorough and skeptical — your job is to find what is hidden, not to validate the deal.

Target: ${inputs.target || '[target]'}
Deal type: ${inputs.deal_type || '[deal type]'}
Deal size: ${inputs.deal_size || '[size]'}
Known concerns: ${inputs.red_flags || 'none specified'}

Generate a financial due diligence framework:

1. REVENUE QUALITY ANALYSIS:
   - Revenue recognition policies — any aggressive accounting?
   - Customer concentration risk
   - Recurring vs one-time revenue breakdown
   - Churn rate and NRR trends
   - Pipeline quality and conversion rates

2. COST STRUCTURE REVIEW:
   - COGS and gross margin trend — is it improving or declining?
   - Fixed vs variable cost breakdown
   - Hidden costs (deferred maintenance, underfunded pensions, etc.)
   - Vendor concentration and contract terms

3. CASH FLOW ANALYSIS:
   - Cash conversion cycle
   - Working capital requirements
   - CapEx requirements going forward
   - Deferred revenue obligations

4. BALANCE SHEET RISKS:
   - Off-balance sheet liabilities
   - Goodwill and intangible asset quality
   - Related-party transactions
   - Tax exposures and contingent liabilities

5. SPECIFICALLY ABOUT: "${inputs.red_flags || 'general red flags'}":
   - Targeted questions to get to the truth
   - What the numbers would look like if the concern is real

6. DEAL-BREAKER CHECKLIST:
   🚨 What findings would make you walk away entirely?

7. INFORMATION REQUEST LIST: Top 10 documents to request immediately.`
  },
  {
    id: 'cashflow_forecast',
    number: '06',
    name: 'Cash Flow Forecast Builder',
    tagline: 'Know when you will run out of money before it happens',
    phase: 'Plan',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Monthly financial planning and board reporting',
    description: 'Builds a structured cash flow forecasting prompt with scenario analysis and early warning indicators.',
    inputs: [
      { id: 'current_cash', label: 'Current cash position', placeholder: 'e.g. €850,000 in bank as of June 1', type: 'text' },
      { id: 'monthly_burn', label: 'Current monthly burn rate', placeholder: 'e.g. €95,000/month (€70k personnel, €15k tools, €10k office)', type: 'textarea' },
      { id: 'revenue', label: 'Expected revenue (next 6 months)', placeholder: 'e.g. Month 1: €80k, Month 2: €85k, Month 3: €90k, Month 4-6: €95k/month', type: 'textarea' },
      { id: 'big_items', label: 'Known large upcoming expenses', placeholder: 'e.g. New hire starts July 1 (+€8k/month), AWS contract renewal in August (€25k), office expansion in September (€40k)', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a CFO building a cash flow forecast. Be conservative on revenue, realistic on costs, and flag risks early.

Current cash: ${inputs.current_cash || '[cash]'}
Monthly burn: ${inputs.monthly_burn || '[burn]'}
Expected revenue: ${inputs.revenue || '[revenue]'}
Large upcoming items: ${inputs.big_items || '[big items]'}

Build a 6-month cash flow analysis:

1. BASELINE FORECAST (month by month):
   For each month:
   - Opening cash balance
   - Revenue received (conservative estimate)
   - Operating costs
   - One-time items
   - Closing cash balance
   - Runway remaining at this burn rate

2. THREE SCENARIOS:
   - Base case: Revenue as planned, costs as budgeted
   - Bear case: Revenue 20% below plan, 10% cost overrun
   - Bull case: Revenue 15% above plan, costs controlled

3. RUNWAY ANALYSIS:
   - At current burn, how many months of runway?
   - What revenue level achieves cash flow breakeven?
   - What burn reduction achieves 18-month runway?

4. EARLY WARNING INDICATORS:
   - What metric, if it drops, triggers a cash review?
   - At what cash balance do you need to act (cut costs or raise)?

5. RECOMMENDED ACTIONS:
   - If bear case materializes in month 2, what do you do first?
   - What is the one lever that has the biggest impact on runway?`
  },
  {
    id: 'pricing_analysis',
    number: '07',
    name: 'Pricing Strategy Analyzer',
    tagline: 'Find the price that maximizes revenue without killing growth',
    phase: 'Analyze',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'When setting, reviewing, or changing pricing',
    description: 'Analyzes your pricing model and produces recommendations on structure, levels, and positioning.',
    inputs: [
      { id: 'product', label: 'Product or service description', placeholder: 'e.g. Airport billing SaaS — monthly subscription per airport, includes invoicing, contracts, and reporting modules', type: 'textarea' },
      { id: 'current_pricing', label: 'Current pricing (if any)', placeholder: 'e.g. €2,500/month flat fee per airport, no tiers', type: 'text' },
      { id: 'customer', label: 'Customer profile', placeholder: 'e.g. Regional airports with 1-5M passengers/year, finance teams of 3-8 people, budget owner is CFO', type: 'textarea' },
      { id: 'competitors', label: 'Competitor pricing (if known)', placeholder: 'e.g. Competitor A charges €1,800-3,500/month, Competitor B is project-based €50k/year', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a SaaS pricing strategist. Analyze this pricing situation and make specific, defensible recommendations.

Product: ${inputs.product || '[product]'}
Current pricing: ${inputs.current_pricing || 'not yet set'}
Customer profile: ${inputs.customer || '[customer]'}
Competitor pricing: ${inputs.competitors || 'unknown'}

Produce a pricing strategy analysis:

1. PRICING MODEL ASSESSMENT:
   - Is the current model (${inputs.current_pricing || 'to be defined'}) aligned with value delivered?
   - What pricing model best fits this product: per seat, per usage, per outcome, flat fee, tiered?

2. VALUE-BASED PRICING ANALYSIS:
   - What is the economic value this product creates for the customer?
   - What would customers pay for this outcome if they didn't have it?
   - What is the "pain of alternatives" (manual work, other tools)?

3. RECOMMENDED PRICING STRUCTURE:
   - Tier 1: [name, price, what's included, who it's for]
   - Tier 2: [name, price, what's included, who it's for]
   - Tier 3: [name, price, what's included, who it's for]
   - Enterprise: [custom, what triggers this conversation]

4. COMPETITIVE POSITIONING:
   vs "${inputs.competitors || '[competitors]'}" — where should we sit and why?

5. PRICING PAGE PSYCHOLOGY:
   - Which tier to highlight as "most popular"
   - What to include as anchoring in the highest tier
   - What to leave out of the lowest tier to drive upgrades

6. RISKS OF CURRENT/PROPOSED PRICING:
   - What will customers push back on?
   - What will sales hate about this?
   - What is the churn risk of a price increase?`
  },
  {
    id: 'unit_economics',
    number: '08',
    name: 'Unit Economics Calculator',
    tagline: 'Know if your business model actually works',
    phase: 'Analyze',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Monthly review or before any fundraising conversation',
    description: 'Calculates and interprets your core unit economics with benchmarks and improvement recommendations.',
    inputs: [
      { id: 'business_model', label: 'Business model', placeholder: '', type: 'select', options: ['SaaS / subscription', 'Marketplace', 'E-commerce', 'Professional services', 'Hardware + software', 'Freemium'] },
      { id: 'metrics', label: 'Paste your key metrics', placeholder: 'e.g. ACV: €24,000, CAC: €8,000, Gross margin: 78%, Churn: 8%/year, Sales cycle: 45 days, Avg contract: 2 years', type: 'textarea' },
      { id: 'stage', label: 'Company stage', placeholder: '', type: 'select', options: ['Pre-revenue', 'Early (< €500k ARR)', 'Growing (€500k–€5M ARR)', 'Scaling (€5M+ ARR)'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a VC-level financial analyst who specializes in unit economics. Be honest about what the numbers say.

Business model: ${inputs.business_model || '[model]'}
Key metrics: ${inputs.metrics || '[metrics]'}
Stage: ${inputs.stage || '[stage]'}

Calculate and interpret unit economics:

1. CORE METRICS (calculate from provided data):
   - LTV (Customer Lifetime Value)
   - CAC (Customer Acquisition Cost)
   - LTV:CAC ratio
   - CAC Payback Period (months)
   - Gross Margin
   - Net Revenue Retention (if data available)

2. BENCHMARK COMPARISON for ${inputs.business_model || '[model]'} at ${inputs.stage || '[stage]'}:
   - How do these metrics compare to industry benchmarks?
   - What is "good" vs "great" vs "concerning" for each metric?

3. VERDICT:
   - Is this business model working? Direct answer.
   - What is the one metric most in need of improvement?

4. IMPROVEMENT LEVERS:
   For each weak metric:
   - What drives it
   - What specifically to do to improve it
   - Expected impact of a 20% improvement

5. INVESTOR READINESS:
   - Which metrics will investors focus on?
   - What story do these numbers tell?
   - What needs to improve before the next fundraise?`
  },
  {
    id: 'financial_model',
    number: '09',
    name: 'Financial Model Builder',
    tagline: 'Build a model that reflects reality, not wishful thinking',
    phase: 'Plan',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Annual planning, fundraising, or scenario analysis',
    description: 'Structures a financial model framework with the right assumptions, drivers, and scenarios for your business.',
    inputs: [
      { id: 'business', label: 'Business description', placeholder: 'e.g. B2B SaaS, 25 customers, €1.2M ARR, selling to mid-market manufacturing companies', type: 'textarea' },
      { id: 'horizon', label: 'Forecast horizon', placeholder: '', type: 'select', options: ['6 months', '12 months', '18 months', '3 years', '5 years'] },
      { id: 'purpose', label: 'Purpose of the model', placeholder: '', type: 'select', options: ['Internal planning', 'Series A fundraising', 'Series B fundraising', 'Board reporting', 'Acquisition target', 'Budget approval'] },
      { id: 'key_drivers', label: 'What drives your revenue?', placeholder: 'e.g. Number of new logos per month × ACV, expansion revenue from existing customers, partner referrals', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a CFO and financial modelling expert. Build a model framework that is rigorous but not over-engineered.

Business: ${inputs.business || '[business]'}
Horizon: ${inputs.horizon || '[horizon]'}
Purpose: ${inputs.purpose || '[purpose]'}
Revenue drivers: ${inputs.key_drivers || '[drivers]'}

Design a financial model framework:

1. MODEL ARCHITECTURE:
   - What tabs/sheets should this model have?
   - What is the logical flow from assumptions to outputs?

2. KEY ASSUMPTIONS TO BUILD IN:
   Revenue drivers: ${inputs.key_drivers || '[drivers]'}
   - New customer acquisition rate and trend
   - ACV and pricing assumptions
   - Churn / expansion assumptions
   - Headcount plan and timing

3. REVENUE BUILD:
   - Month-by-month ARR waterfall structure
   - New ARR + Expansion ARR - Churned ARR = Net New ARR
   - How to model seasonality

4. COST MODEL:
   - COGS structure for gross margin
   - S&M costs tied to new customer targets
   - R&D costs tied to headcount plan
   - G&A as % of revenue (benchmark for ${inputs.purpose || '[purpose]'})

5. THREE SCENARIOS:
   - Base, Bear, Bull — what assumption changes between them?
   - Which single input has the most impact on the output?

6. KEY OUTPUTS FOR ${inputs.purpose || '[purpose]'}:
   - Which metrics matter most for this audience?
   - What does the model need to show to achieve the goal?

7. COMMON MODELLING MISTAKES TO AVOID for this type of business.`
  },
  {
    id: 'kpi_dashboard',
    number: '10',
    name: 'KPI Dashboard Designer',
    tagline: 'Track what actually moves the business',
    phase: 'Plan',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'When setting up or redesigning financial reporting',
    description: 'Designs a KPI framework with the right metrics, targets, and reporting cadence for your business stage.',
    inputs: [
      { id: 'business', label: 'Business type and stage', placeholder: 'e.g. B2B SaaS, Series A, €2M ARR, 3 years old', type: 'text' },
      { id: 'audience', label: 'Who is this dashboard for?', placeholder: '', type: 'select', options: ['CEO / Founder', 'Board of Directors', 'Department heads', 'Investors', 'Full company'] },
      { id: 'current_metrics', label: 'Metrics you currently track', placeholder: 'e.g. Revenue, headcount, burn rate — but we don\'t track NRR, CAC payback, or pipeline coverage', type: 'textarea' },
      { id: 'biggest_question', label: 'What is the most important question this dashboard should answer?', placeholder: 'e.g. Are we on track to hit €3M ARR by December? / Are we growing efficiently?', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a VC-backed CFO designing a KPI framework. Every metric must earn its place — if it doesn't drive a decision, remove it.

Business: ${inputs.business || '[business]'}
Audience: ${inputs.audience || '[audience]'}
Currently tracking: ${inputs.current_metrics || '[current metrics]'}
Key question: ${inputs.biggest_question || '[question]'}

Design a KPI dashboard framework:

1. NORTH STAR METRIC: The single number that best captures business health for "${inputs.biggest_question || '[question]'}". Why this one?

2. TIER 1 — WEEKLY METRICS (4-6 max):
   Metrics that change week-to-week and require action if they move.
   For each: metric name, why it matters, target range, what triggers a response.

3. TIER 2 — MONTHLY METRICS (6-8):
   Metrics reviewed monthly for trend analysis.
   For each: metric name, benchmark for ${inputs.business || '[business]'}, current gap.

4. TIER 3 — QUARTERLY METRICS (4-6):
   Strategic metrics reviewed with the board.

5. METRICS TO STOP TRACKING:
   From "${inputs.current_metrics || '[current metrics]'}" — which metrics are vanity metrics that don't drive decisions?

6. MISSING METRICS:
   What important metrics are NOT being tracked that should be?

7. DASHBOARD LAYOUT for ${inputs.audience || '[audience]'}:
   - What goes at the top (most important)
   - What context/commentary to include
   - Red/amber/green thresholds for each metric

8. REPORTING CADENCE: Who sees what, when, and in what format?`
  },
]

const phases = ['All', 'Analyze', 'Communicate', 'Plan']

export default function FinanceToolkit() {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null)
  const [inputs, setInputs] = useState<Record<string, Record<string, string>>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [activePhase, setActivePhase] = useState('All')

  const activeW = workflows.find(w => w.id === activeWorkflow)

  const handleInput = (workflowId: string, inputId: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [workflowId]: { ...(prev[workflowId] || {}), [inputId]: value }
    }))
  }

  const handleGenerate = () => {
    if (!activeW) return
    const workflowInputs = inputs[activeW.id] || {}
    const prompt = activeW.prompt(workflowInputs)
    setGeneratedPrompt(prompt)
    setCopied(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filtered = activePhase === 'All' ? workflows : workflows.filter(w => w.phase === activePhase)

  return (
    <div className="min-h-screen bg-white">

      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <a href="/" className="text-base font-medium">
          TaskFlow<span className="text-blue-600">AI</span>
        </a>
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">Finance Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Finance Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Analyze faster. Communicate clearer. Decide with confidence.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for finance professionals, CFOs, and founders — from financial analysis to investor memos, budget narratives, and KPI design.
          </p>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {phases.map(p => (
            <button
              key={p}
              onClick={() => setActivePhase(p)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activePhase === p
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="space-y-3">
            {filtered.map(w => (
              <div
                key={w.id}
                onClick={() => { setActiveWorkflow(w.id); setGeneratedPrompt('') }}
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  activeWorkflow === w.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-gray-300 mt-0.5 w-6 flex-shrink-0">{w.number}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900">{w.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${w.phaseColor}`}>{w.phase}</span>
                      </div>
                      <p className="text-xs text-gray-500">{w.tagline}</p>
                      <p className="text-xs text-gray-400 mt-1 italic">{w.context}</p>
                    </div>
                  </div>
                  <span className="text-gray-300 flex-shrink-0">→</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            {!activeWorkflow ? (
              <div className="border border-dashed border-gray-200 rounded-xl p-8 text-center">
                <p className="text-sm text-gray-400 mb-1">Select a workflow to get started</p>
                <p className="text-xs text-gray-300">Fill in your context → generate your prompt → paste into any AI</p>
              </div>
            ) : activeW ? (
              <div className="border border-gray-100 rounded-xl overflow-hidden">

                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${activeW.phaseColor}`}>{activeW.phase}</span>
                    <span className="text-xs text-gray-400">{activeW.context}</span>
                  </div>
                  <h2 className="text-base font-medium text-gray-900">{activeW.name}</h2>
                  <p className="text-xs text-gray-500 mt-1">{activeW.description}</p>
                </div>

                <div className="px-5 py-4 space-y-4 border-b border-gray-100">
                  {activeW.inputs.map(input => (
                    <div key={input.id}>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        {input.label}
                      </label>
                      {input.type === 'textarea' ? (
                        <textarea
                          value={inputs[activeW.id]?.[input.id] || ''}
                          onChange={e => handleInput(activeW.id, input.id, e.target.value)}
                          placeholder={input.placeholder}
                          rows={3}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:border-gray-400 resize-none"
                        />
                      ) : input.type === 'select' ? (
                        <select
                          value={inputs[activeW.id]?.[input.id] || ''}
                          onChange={e => handleInput(activeW.id, input.id, e.target.value)}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 bg-white"
                        >
                          <option value="">Select...</option>
                          {input.options?.map(o => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={inputs[activeW.id]?.[input.id] || ''}
                          onChange={e => handleInput(activeW.id, input.id, e.target.value)}
                          placeholder={input.placeholder}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 placeholder-gray-300 focus:outline-none focus:border-gray-400"
                        />
                      )}
                    </div>
                  ))}

                  <button
                    onClick={handleGenerate}
                    className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Generate prompt
                  </button>
                </div>

                {generatedPrompt && (
                  <div className="px-5 py-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-medium text-gray-700">Your prompt — paste into ChatGPT, Claude, or Gemini</p>
                      <button
                        onClick={handleCopy}
                        className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                          copied
                            ? 'bg-green-50 text-green-600 border-green-200'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                        {generatedPrompt}
                      </pre>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Tip: Use workflow 01 to analyze current performance, then 02 or 03 to communicate it to stakeholders.
                    </p>
                  </div>
                )}

              </div>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  )
}