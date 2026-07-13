'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'pitch_deck',
    number: '01',
    name: 'Pitch Deck Narrative Builder',
    tagline: 'Tell your startup story in a way investors fund',
    phase: 'Fundraise',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before any investor meeting or pitch',
    description: 'Creates the narrative for each pitch deck slide — from problem to ask — that makes investors lean forward.',
    inputs: [
      { id: 'startup', label: 'What does your startup do?', placeholder: 'e.g. We build AI-powered billing software for airports — replacing Excel and legacy systems used by 90% of the industry', type: 'textarea' },
      { id: 'traction', label: 'Key traction metrics', placeholder: 'e.g. €800k ARR, 12 paying airports, 40% MoM growth, NRR 118%, €0 marketing spend', type: 'textarea' },
      { id: 'ask', label: 'Funding ask', placeholder: 'e.g. Raising €3M Series A to hire 5 engineers and expand sales in Europe', type: 'text' },
      { id: 'stage', label: 'Funding stage', placeholder: '', type: 'select', options: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Growth'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a pitch deck expert who has helped startups raise over €500M. Great pitches tell a story — they do not list features.

Startup: ${inputs.startup || '[startup]'}
Traction: ${inputs.traction || '[traction]'}
Ask: ${inputs.ask || '[ask]'}
Stage: ${inputs.stage || '[stage]'}

Write the narrative for each pitch deck slide:

SLIDE 1 — COVER:
Company name + one-line description that is specific and intriguing. Not "AI for enterprise."

SLIDE 2 — THE PROBLEM:
Make the pain visceral and real. Use a specific scenario, not abstract statistics.
"Imagine you are a finance manager at Heathrow Airport..."

SLIDE 3 — THE MARKET:
TAM / SAM / SOM — but bottom-up, not top-down. Show the math.

SLIDE 4 — THE SOLUTION:
Show, do not tell. The product in one screenshot or diagram + 3 key capabilities.

SLIDE 5 — TRACTION:
${inputs.traction || '[traction]'}
Chart the curve. Investors fund momentum.

SLIDE 6 — BUSINESS MODEL:
How you make money, unit economics, why it gets better at scale.

SLIDE 7 — GO-TO-MARKET:
How you acquire customers — specific channels, CAC, payback period.

SLIDE 8 — COMPETITION:
Not a 2x2 matrix where you win every quadrant. Honest positioning.

SLIDE 9 — THE TEAM:
Why you specifically will win this market. Domain expertise + execution track record.

SLIDE 10 — THE ASK:
${inputs.ask || '[ask]'}
Use of funds (specific %). Milestones this capital achieves.

For each slide: WHAT TO SAY (talking points) + WHAT NOT TO SAY (common mistakes).`
  },
  {
    id: 'investor_update',
    number: '02',
    name: 'Investor Update Writer',
    tagline: 'Keep investors informed and engaged between rounds',
    phase: 'Fundraise',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Monthly investor updates',
    description: 'Writes compelling monthly investor updates that build trust and prime your next round.',
    inputs: [
      { id: 'month', label: 'Month and year', placeholder: 'e.g. June 2026', type: 'text' },
      { id: 'metrics', label: 'Key metrics this month', placeholder: 'e.g. ARR: €950k (+8% MoM), New customers: 3, Churn: 0, Burn: €85k, Runway: 16 months', type: 'textarea' },
      { id: 'wins', label: 'Top 3 wins this month', placeholder: 'e.g. Closed largest deal ever (€120k ACV), launched new module, hired VP Sales', type: 'textarea' },
      { id: 'challenges', label: 'Top challenge and how addressing it', placeholder: 'e.g. Sales cycle longer than expected — hiring an SDR to increase pipeline volume', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a founder who writes investor updates that investors actually read and forward to other investors. Be honest — investors respect transparency above everything.

Month: ${inputs.month || '[month]'}
Metrics: ${inputs.metrics || '[metrics]'}
Wins: ${inputs.wins || '[wins]'}
Challenges: ${inputs.challenges || '[challenges]'}

Write a monthly investor update:

SUBJECT: [Company] — ${inputs.month || '[month]'} Update | ARR: [X] | [One emoji that captures the month]

THE HEADLINE (2 sentences):
What is the most important thing that happened this month and what does it mean for the trajectory?

📊 THE NUMBERS:
${inputs.metrics || '[metrics]'}
vs last month: [trend for each metric]
vs plan: [are we ahead or behind?]

🚀 WINS:
${inputs.wins || '[wins]'}
For each: what happened + why it matters

⚠️ CHALLENGE:
${inputs.challenges || '[challenges]'}
Be direct — what is hard, what we are doing about it, what help we need.

🎯 NEXT MONTH FOCUS:
3 specific things we will accomplish. We will report back.

🙏 ASK:
One specific thing investors can help with — introductions, advice, a connection.

KEEP IT:
- Under 300 words
- Honest (especially about challenges)
- Specific (numbers over adjectives)
- Forward-looking (what comes next)`
  },
  {
    id: 'term_sheet',
    number: '03',
    name: 'Term Sheet Analyzer',
    tagline: 'Understand what you are signing before you sign it',
    phase: 'Fundraise',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'When reviewing any investment term sheet',
    description: 'Analyzes key term sheet clauses in plain English — economics, control, and founder protections.',
    inputs: [
      { id: 'term_sheet', label: 'Paste term sheet or key terms', placeholder: 'Paste the term sheet or key clauses here...', type: 'textarea' },
      { id: 'round_size', label: 'Round size and valuation', placeholder: 'e.g. €3M raise at €12M pre-money valuation', type: 'text' },
      { id: 'your_concern', label: 'What concerns you most?', placeholder: 'e.g. The liquidation preference, anti-dilution provisions, board composition', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a startup lawyer and VC veteran. Analyze this term sheet in plain English. Flag founder-unfriendly terms and explain what they actually mean.

Round: ${inputs.round_size || '[round]'}
Main concern: ${inputs.your_concern || '[concern]'}

Analyze this term sheet:

1. ECONOMICS SUMMARY:
   - Pre-money valuation and what it implies
   - Founder dilution after this round
   - Option pool: before or after? (this matters enormously)
   - Liquidation preference: 1x non-participating is standard. Anything else — explain the real impact.

2. CONTROL PROVISIONS:
   - Board composition: who controls the board?
   - Protective provisions: what can investors block?
   - Drag-along rights: under what conditions can they force a sale?

3. FOUNDER PROTECTIONS:
   - Vesting terms and acceleration provisions
   - Anti-dilution: broad-based weighted average (fair) vs. full ratchet (very founder-unfriendly)
   - Pro-rata rights in future rounds

4. RED FLAGS:
   Terms that are outside market standard and why they matter.

5. SPECIFICALLY ABOUT "${inputs.your_concern || '[concern]'}":
   Plain English explanation and whether it is fair.

6. NEGOTIATION PRIORITIES:
   What to push back on (in order of importance) and what is standard / not worth fighting.

7. QUESTIONS FOR YOUR LAWYER:
   Specific clauses to review with legal counsel before signing.

Term sheet:
${inputs.term_sheet || '[paste term sheet here]'}

Note: This is AI analysis, not legal advice. Always have a qualified startup lawyer review before signing.`
  },
  {
    id: 'culture_doc',
    number: '04',
    name: 'Culture & Values Document',
    tagline: 'Define your culture before it defines itself',
    phase: 'Build',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'When scaling past 10-15 people',
    description: 'Creates a culture document that is specific enough to guide decisions and authentic enough to recruit great people.',
    inputs: [
      { id: 'company', label: 'Company description', placeholder: 'e.g. 18-person B2B SaaS startup, fully remote, Series A, building airport operations software', type: 'text' },
      { id: 'founding_team', label: 'How would you describe how the founding team works?', placeholder: 'e.g. We ship fast, argue openly, never blame, take ownership of mistakes, prioritize clarity over consensus', type: 'textarea' },
      { id: 'anti_values', label: 'What behaviors would get someone fired?', placeholder: 'e.g. Blaming others, hiding problems, asking permission for everything, optimizing for optics, being dishonest', type: 'textarea' },
      { id: 'hiring_bar', label: 'What do your best hires have in common?', placeholder: 'e.g. All have shipped things independently before, all are direct communicators, all get uncomfortable with bureaucracy', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a culture designer who knows that generic values ("integrity", "innovation") are worthless. Create values that are specific enough to use in a hiring decision.

Company: ${inputs.company || '[company]'}
How founding team works: ${inputs.founding_team || '[founding team]'}
Behaviors that get people fired: ${inputs.anti_values || '[anti-values]'}
What best hires share: ${inputs.hiring_bar || '[best hires]'}

Create a startup culture document:

OPENING: Why we wrote this document and how to use it.

OUR CULTURE IN ONE PARAGRAPH:
Honest, specific, not aspirational fluff. What is it actually like to work here?

OUR VALUES (5-7):
For each value:
NAME: A short phrase that is specific to us — not "customer obsession"
WHAT IT MEANS: 2-3 sentences in plain language
WHAT IT LOOKS LIKE: One concrete example of this value in action
WHAT IT REJECTS: The opposite behavior we do not tolerate
HOW WE HIRE FOR IT: The question we ask to assess this

Based on:
- Founding team behavior: "${inputs.founding_team || '[founding team]'}"
- Anti-values: "${inputs.anti_values || '[anti-values]'}"
- Best hire pattern: "${inputs.hiring_bar || '[best hires]'}"

HOW WE MAKE DECISIONS:
The framework anyone should use when they are unsure what to do.

HOW WE COMMUNICATE:
Async vs sync. Writing culture. Meeting norms. Feedback expectations.

WHAT SUCCESS LOOKS LIKE HERE:
How we measure and recognize great work.

WHAT THIS IS NOT:
What we explicitly do not value or do.

End with: A section written directly to candidates — "If this sounds like you, we want to talk."`
  },
  {
    id: 'hiring_plan',
    number: '05',
    name: 'Startup Hiring Plan Builder',
    tagline: 'Hire the right people in the right order',
    phase: 'Build',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'After closing a funding round or quarterly planning',
    description: 'Creates a sequenced hiring plan that matches headcount to milestones — not just to budget.',
    inputs: [
      { id: 'stage', label: 'Current stage and team', placeholder: 'e.g. Just closed Series A, 12 people, €3M to deploy over 18 months. Currently: 4 engineers, 2 sales, 1 PM, 2 CS, 3 founders.', type: 'textarea' },
      { id: 'milestones', label: 'Key milestones to hit with this capital', placeholder: 'e.g. €2M ARR, 30 enterprise customers, launch in UK market, series B ready in 18 months', type: 'textarea' },
      { id: 'budget', label: 'Annual hiring budget', placeholder: 'e.g. €800k for salaries in year 1, €1.2M year 2', type: 'text' },
      { id: 'bottleneck', label: 'Current biggest bottleneck', placeholder: 'e.g. Engineering can not keep up with product demand, sales team is too small to hit revenue targets', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a startup scaling expert. Hiring wrong at this stage is the most expensive mistake a startup makes — wrong person, wrong role, wrong order.

Stage: ${inputs.stage || '[stage]'}
Milestones: ${inputs.milestones || '[milestones]'}
Budget: ${inputs.budget || '[budget]'}
Bottleneck: ${inputs.bottleneck || '[bottleneck]'}

Build a sequenced hiring plan:

1. BOTTLENECK FIRST:
   Address "${inputs.bottleneck || '[bottleneck]'}" — what is the first hire that unblocks everything else?

2. MILESTONE-TO-HIRE MAPPING:
   For each milestone in "${inputs.milestones || '[milestones]'}":
   - Which hire(s) enable this milestone?
   - In what order must they be made?
   - What happens if this hire takes 3 months longer than expected?

3. SEQUENCED HIRING PLAN (by quarter):

   Q1: [Roles] — Why these first? What do they unlock?
   Q2: [Roles] — What must be true before hiring these?
   Q3: [Roles] — Strategic hires for next stage
   Q4: [Roles] — Series B prep

4. BUDGET ALLOCATION:
   ${inputs.budget || '[budget]'}
   Role-by-role salary estimate and total headcount cost by end of each quarter.

5. MAKE vs BUY ANALYSIS:
   For each role: Is this better as a hire, a contractor, or an agency until you can hire?

6. HIRING ORDER MISTAKES TO AVOID:
   Common startup hiring mistakes at this stage — what not to do.

7. FIRST 3 JOB DESCRIPTIONS TO WRITE:
   The 3 most urgent roles with title, seniority, and the one thing that matters most in the hire.`
  },
  {
    id: 'go_to_market',
    number: '06',
    name: 'Go-To-Market Strategy Builder',
    tagline: 'Build a GTM that gets you to first 100 customers',
    phase: 'Grow',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'Pre-launch or when entering a new market',
    description: 'Creates a GTM strategy with ICP definition, channels, messaging, and 90-day launch plan.',
    inputs: [
      { id: 'product', label: 'Product and value proposition', placeholder: 'e.g. AI-powered contract management for mid-market law firms — reduces contract review time by 70%', type: 'textarea' },
      { id: 'target', label: 'Who is your ideal customer?', placeholder: 'e.g. Law firms with 20-100 lawyers, heavy M&A practice, currently using Word + email for contracts', type: 'textarea' },
      { id: 'current_customers', label: 'Current customers (if any)', placeholder: 'e.g. 5 pilot customers, all referrals from founder network, all mid-size London law firms', type: 'text' },
      { id: 'gtm_constraint', label: 'Main GTM constraint', placeholder: '', type: 'select', options: ['No brand awareness yet', 'Long sales cycles (6+ months)', 'Hard to reach decision makers', 'High CAC vs LTV', 'Competitive market'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a GTM strategist who has helped B2B startups go from 0 to 100 customers. Build a strategy that is specific and executable, not generic marketing advice.

Product: ${inputs.product || '[product]'}
Target: ${inputs.target || '[target]'}
Current customers: ${inputs.current_customers || '[customers]'}
Constraint: ${inputs.gtm_constraint || '[constraint]'}

Build a GTM strategy:

1. ICP (Ideal Customer Profile) — BE SPECIFIC:
   Not "mid-market law firms" but:
   - Company size: [employees / revenue]
   - Industry / sub-vertical
   - Tech stack signals (what tools they use that indicate fit)
   - Trigger events (what makes them ready to buy NOW)
   - Decision maker: title, priorities, how they buy
   - Economic buyer vs champion vs blocker

2. POSITIONING FOR THIS ICP:
   One sentence: For [ICP] who [problem], [product] is the [category] that [benefit] unlike [alternative].

3. CHANNEL STRATEGY (prioritized):
   Given "${inputs.gtm_constraint || '[constraint]'}", rank channels by fit:
   For each channel: effort, expected CAC, time to results, why it fits/doesn't.

4. FIRST 10 CUSTOMERS PLAYBOOK:
   The exact steps to close the first 10 customers — before you have brand or marketing.

5. 90-DAY LAUNCH PLAN:
   Month 1: Foundation (what to build/test)
   Month 2: Activate (first campaigns/outreach)
   Month 3: Learn and double down (what to scale)

6. METRICS TO TRACK:
   The 5 metrics that tell you if GTM is working.

7. WHAT NOT TO DO:
   The GTM mistakes most common at this stage.`
  },
  {
    id: 'okr_startup',
    number: '07',
    name: 'Startup OKR Builder',
    tagline: 'Focus your whole team on what actually matters',
    phase: 'Build',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Quarterly planning',
    description: 'Creates focused, startup-appropriate OKRs that drive the right behavior without bureaucracy.',
    inputs: [
      { id: 'stage', label: 'Stage and focus', placeholder: 'e.g. Post-Series A, primary focus: prove we can scale sales motion and hit €2M ARR by December', type: 'textarea' },
      { id: 'quarter', label: 'Quarter', placeholder: 'e.g. Q3 2026', type: 'text' },
      { id: 'team', label: 'Teams or functions', placeholder: 'e.g. Product, Engineering, Sales, Marketing, Customer Success', type: 'text' },
      { id: 'last_quarter', label: 'What did NOT get done last quarter?', placeholder: 'e.g. Did not hit MQL target, product roadmap slipped 3 weeks, CS team overwhelmed', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a startup OKR coach. Startup OKRs must be ruthlessly focused — 3 company OKRs max, not 10. If everything is a priority, nothing is.

Stage: ${inputs.stage || '[stage]'}
Quarter: ${inputs.quarter || '[quarter]'}
Teams: ${inputs.team || '[teams]'}
Last quarter gaps: ${inputs.last_quarter || '[last quarter]'}

Build startup OKRs for ${inputs.quarter || '[quarter]'}:

COMPANY NORTH STAR for this quarter (1 sentence):
The single most important thing. Everything else is secondary.

COMPANY OKRs (2-3 MAX):

OBJECTIVE 1: [Inspiring, directional — what does winning look like?]
KR1: [Metric] from [baseline] to [target] by [date]
KR2: [Metric] from [baseline] to [target] by [date]
KR3: [Metric] from [baseline] to [target] by [date]

[Repeat for 1-2 more objectives]

TEAM OKRs — show how each team in "${inputs.team || '[teams]'}" contributes:
For each team: 1 objective + 2 KRs max. Show the link to company OKRs.

SPECIFICALLY ADDRESS last quarter's gaps:
"${inputs.last_quarter || '[gaps]'}" — how do this quarter's OKRs prevent this from happening again?

OKR HEALTH CHECK:
- Which KRs are activity-based? (rewrite as outcomes)
- Which objectives overlap or conflict?
- What is NOT an OKR this quarter that teams might expect to be?

WEEKLY CHECK-IN TEMPLATE:
5-minute format for Monday team standup against OKRs.`
  },
  {
    id: 'board_update_startup',
    number: '08',
    name: 'Board Update Writer',
    tagline: 'Run board meetings that help you, not the other way around',
    phase: 'Fundraise',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before every board meeting',
    description: 'Creates a board update that shows momentum, surfaces real challenges, and gets useful help from investors.',
    inputs: [
      { id: 'metrics', label: 'Current metrics vs last board meeting', placeholder: 'e.g. ARR: €950k (was €720k), Burn: €85k (was €90k), Runway: 16 months, New customers: 8 this quarter', type: 'textarea' },
      { id: 'wins', label: 'Key wins since last meeting', placeholder: 'e.g. Closed €120k ACV deal (largest ever), launched new module, VP Sales started', type: 'textarea' },
      { id: 'challenges', label: 'Real challenges to discuss', placeholder: 'e.g. Sales cycle lengthening, one enterprise deal at risk, engineering behind on Q3 roadmap', type: 'textarea' },
      { id: 'decisions', label: 'Decisions needed from the board', placeholder: 'e.g. Approval to hire 2 additional engineers, guidance on UK market entry timing, introductions to 3 enterprise prospects', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a founder coach who helps founders run board meetings that actually move the company forward. Boards are most useful when you are honest about challenges — not when you only show wins.

Metrics: ${inputs.metrics || '[metrics]'}
Wins: ${inputs.wins || '[wins]'}
Challenges: ${inputs.challenges || '[challenges]'}
Decisions needed: ${inputs.decisions || '[decisions]'}

Write a board update package:

PRE-READ (sent 48 hours before):

1. METRICS DASHBOARD:
   ${inputs.metrics || '[metrics]'}
   Present as: Metric | Now | Last Board | Target | Trend (↑↓→)

2. KEY DEVELOPMENTS:
   WINS: ${inputs.wins || '[wins]'}
   CHALLENGES: ${inputs.challenges || '[challenges]'}
   For challenges: what we tried, what we learned, what we need.

3. DECISIONS REQUIRED:
   ${inputs.decisions || '[decisions]'}
   For each: context, options, recommendation, what you need from the board.

BOARD MEETING AGENDA:
- 5 min: Metrics review (no presentation — pre-read)
- 20 min: Deep dive on [biggest challenge]
- 20 min: [Strategic decision]
- 10 min: Help wanted / intros needed
- 5 min: Actions and close

WHAT TO ASK THE BOARD:
Specific, actionable asks — not "any feedback?" but "Can you each send me 3 names of enterprise procurement leaders by Friday?"

WHAT NOT TO BRING TO THE BOARD:
Operational details that belong in a management meeting, not a board meeting.`
  },
  {
    id: 'customer_interview_startup',
    number: '09',
    name: 'Customer Development Interview Kit',
    tagline: 'Talk to customers in a way that reveals truth',
    phase: 'Discover',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Continuous customer discovery',
    description: 'Creates a Mom Test-inspired interview guide that gets honest feedback without leading the witness.',
    inputs: [
      { id: 'hypothesis', label: 'What hypothesis are you testing?', placeholder: 'e.g. Mid-market law firms spend 20+ hours/week on contract review and would pay €2,000+/month to reduce this by 70%', type: 'textarea' },
      { id: 'customer_type', label: 'Who are you interviewing?', placeholder: 'e.g. Partners and associates at mid-size law firms (20-100 lawyers), UK-based', type: 'text' },
      { id: 'stage', label: 'Product stage', placeholder: '', type: 'select', options: ['Pre-product (idea stage)', 'MVP / beta', 'Early product (paying customers)', 'Scaling'] },
      { id: 'what_you_think_you_know', label: 'What you think you know (to challenge)', placeholder: 'e.g. We think contract review is their biggest pain. We think they would pay €2k/month. We think associates are the champion.', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a customer discovery expert trained in The Mom Test. Design interviews that get honest answers — not validation of what the founder wants to hear.

Hypothesis: ${inputs.hypothesis || '[hypothesis]'}
Customer type: ${inputs.customer_type || '[customer]'}
Stage: ${inputs.stage || '[stage]'}
Assumptions to challenge: ${inputs.what_you_think_you_know || '[assumptions]'}

Create a customer development interview guide:

THE MOM TEST RULES (remind yourself before every interview):
- Ask about their life, not your idea
- Ask about specifics in the past, not hypotheticals about the future
- Never pitch — listen

PRE-INTERVIEW SETUP:
How to introduce yourself without biasing responses.

INTERVIEW QUESTIONS:

CONTEXT BUILDERS (5 min):
3 questions to understand their world without mentioning your product.

PROBLEM EXPLORATION (15 min):
5 questions to understand the pain — specifically challenging "${inputs.what_you_think_you_know || '[assumptions]'}".
All questions must be about past behavior and specific situations, not hypotheticals.

CURRENT SOLUTION DEEP DIVE (10 min):
4 questions about how they solve the problem today.
Listen for: workarounds, tools, time spent, emotional frustration.

WILLINGNESS TO PAY SIGNALS (5 min):
How to probe budget without asking "would you pay for this?" (which always gets a yes).

CLOSING (5 min):
The most important question: "Who else should I talk to?"

SYNTHESIS TEMPLATE:
Fill in after each interview:
- Most surprising thing they said
- Assumption confirmed / challenged
- Quote worth keeping
- Follow-up question for next interview

RED FLAGS: Things interviewees say that sound good but mean nothing.`
  },
  {
    id: 'fundraising_narrative',
    number: '10',
    name: 'Fundraising Narrative Builder',
    tagline: 'Craft the story that gets you from meeting to term sheet',
    phase: 'Fundraise',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before starting a fundraising process',
    description: 'Builds your fundraising narrative — the story you tell consistently across every investor meeting.',
    inputs: [
      { id: 'company', label: 'Company in one paragraph', placeholder: 'e.g. We are building the operating system for airport finance teams. Airports process billions in transactions using Excel. We replace that with AI-powered billing, contracts, and reporting software.', type: 'textarea' },
      { id: 'why_now', label: 'Why is now the right time?', placeholder: 'e.g. Airports are under pressure to modernize after COVID. AI makes it possible to automate complex billing rules for the first time. The first mover is capturing the market.', type: 'textarea' },
      { id: 'traction', label: 'Traction that proves the thesis', placeholder: 'e.g. 12 paying airports, €800k ARR, 40% MoM growth, NRR 118%, closed first €100k ACV deal last month', type: 'textarea' },
      { id: 'round', label: 'Round details', placeholder: 'e.g. Raising €3M Series A. Have €500k soft-circled. Looking for a lead investor who has done infrastructure SaaS.', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a fundraising coach who has helped founders raise from top-tier VCs. The best fundraising narratives make investors feel they will miss a generational opportunity if they pass.

Company: ${inputs.company || '[company]'}
Why now: ${inputs.why_now || '[why now]'}
Traction: ${inputs.traction || '[traction]'}
Round: ${inputs.round || '[round]'}

Build a complete fundraising narrative:

1. THE HOOK (30 seconds):
   The opening you say when an investor asks "what do you do?"
   Specific, intriguing, makes them want to hear more.

2. THE FULL NARRATIVE (2 minutes):
   The story you tell in every first meeting.
   Structure: World before → The insight → What you built → Why it works → Where it goes

3. WHY NOW (this is the most important slide investors look at):
   ${inputs.why_now || '[why now]'}
   What has changed in the world that makes this the right moment?
   What window are you racing to capture?

4. THE TRACTION STORY:
   ${inputs.traction || '[traction]'}
   Do not just list metrics — tell the story of the growth curve.
   "In January we had 3 customers. Here is what we learned that got us to 12."

5. THE VISION (where does this go?):
   If you win — what does the world look like in 10 years?
   What category do you own?

6. HANDLING THE HARDEST QUESTIONS:
   - "Why won't [big company] just build this?"
   - "What happens if X competitor raises €10M?"
   - "Your market seems small — how does it get big?"
   - "Why are you the right team?"

7. THE ASK AND USE OF FUNDS:
   ${inputs.round || '[round]'}
   Specific milestones this capital achieves. What does Series B look like?`
  },
]

const phases = ['All', 'Fundraise', 'Build', 'Grow', 'Discover']

export default function StartupToolkit() {
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
          <span className="text-xs px-2 py-1 bg-violet-50 text-violet-700 rounded-full">Startup Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Startup Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Build faster. Raise smarter. Scale with confidence.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for founders — pitch decks, investor updates, term sheet analysis, culture docs, GTM strategy, OKRs, and more.
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
                      Tip: Start with workflow 09 (Customer Interviews) before building anything — validate before you pitch.
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