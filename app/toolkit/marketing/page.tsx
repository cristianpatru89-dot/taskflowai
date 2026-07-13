'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'campaign_brief',
    number: '01',
    name: 'Campaign Brief Generator',
    tagline: 'Brief your team so they execute without constant questions',
    phase: 'Strategy',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before any marketing campaign starts',
    description: 'Creates a complete campaign brief that aligns your team on goals, audience, message, and success metrics.',
    inputs: [
      { id: 'campaign_goal', label: 'Campaign goal', placeholder: 'e.g. Generate 500 trial signups in Q3, increase brand awareness among mid-market CFOs, launch new product to existing customers', type: 'textarea' },
      { id: 'audience', label: 'Target audience', placeholder: 'e.g. CFOs at 100-500 person B2B companies in DACH region, currently using Excel for financial reporting', type: 'textarea' },
      { id: 'budget', label: 'Budget and timeline', placeholder: 'e.g. €15,000 budget, 6-week campaign, launch September 1', type: 'text' },
      { id: 'channels', label: 'Channels to use', placeholder: 'e.g. LinkedIn ads, email nurture sequence, landing page, webinar', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a senior marketing strategist. Write a campaign brief that is specific enough that a team member could execute without asking clarifying questions.

Goal: ${inputs.campaign_goal || '[goal]'}
Audience: ${inputs.audience || '[audience]'}
Budget and timeline: ${inputs.budget || '[budget]'}
Channels: ${inputs.channels || '[channels]'}

Write a complete campaign brief:

1. CAMPAIGN OVERVIEW (2 sentences): What this campaign is and what winning looks like.

2. GOAL AND SUCCESS METRICS:
   Primary goal: ${inputs.campaign_goal || '[goal]'}
   KPIs: [specific numbers — not "increase awareness" but "reach 50,000 impressions"]
   Secondary metrics: [supporting indicators]

3. TARGET AUDIENCE:
   Primary: ${inputs.audience || '[audience]'}
   - Demographics and firmographics
   - Current situation (what are they dealing with right now?)
   - Pain point this campaign addresses
   - Where they spend time online

4. KEY MESSAGE (one sentence): What is the single most important thing this audience should take away?

5. MESSAGING HIERARCHY:
   - Hero message (headline level)
   - Supporting messages (3 bullet points)
   - Proof points (specific numbers or customer stories)
   - Call to action

6. CHANNEL PLAN for ${inputs.channels || '[channels]'}:
   For each channel:
   - Role in the campaign (awareness / consideration / conversion)
   - Content needed
   - Budget allocation
   - Success metric

7. TIMELINE: Week-by-week execution plan.

8. WHAT SUCCESS DOES NOT LOOK LIKE: What metrics we are NOT optimizing for.`
  },
  {
    id: 'content_strategy',
    number: '02',
    name: 'Content Strategy Builder',
    tagline: 'Build a content plan that attracts your ideal customer',
    phase: 'Strategy',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Quarterly content planning',
    description: 'Creates a content strategy with pillars, formats, distribution, and a 90-day editorial calendar.',
    inputs: [
      { id: 'business', label: 'Your business and audience', placeholder: 'e.g. B2B SaaS for airport operations, targeting airport operations directors and CFOs', type: 'textarea' },
      { id: 'goal', label: 'Content goal', placeholder: 'e.g. Generate organic inbound leads, build authority in airport tech space, support sales team with enablement content', type: 'text' },
      { id: 'channels', label: 'Content channels', placeholder: 'e.g. Company blog, LinkedIn, email newsletter, YouTube', type: 'text' },
      { id: 'resources', label: 'Content resources available', placeholder: 'e.g. 1 content marketer, 2 hours/week from subject matter experts, €3k/month budget', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a B2B content strategist. Build a content strategy that drives business outcomes, not just traffic.

Business: ${inputs.business || '[business]'}
Goal: ${inputs.goal || '[goal]'}
Channels: ${inputs.channels || '[channels]'}
Resources: ${inputs.resources || '[resources]'}

Build a 90-day content strategy:

1. CONTENT MISSION STATEMENT: One sentence — what content you create, for whom, and the outcome it drives.

2. CONTENT PILLARS (3-4):
   For each pillar:
   - Topic area
   - Why it matters to your audience
   - Business outcome it supports
   - Example content ideas (3 per pillar)

3. AUDIENCE CONTENT NEEDS BY FUNNEL STAGE:
   - Awareness: What problems are they searching for?
   - Consideration: What are they comparing and evaluating?
   - Decision: What proof do they need to buy?

4. CONTENT FORMATS for ${inputs.channels || '[channels]'}:
   For each channel: best format, optimal length/frequency, distribution approach.

5. 90-DAY EDITORIAL CALENDAR:
   Month 1: [8-10 pieces — topic, format, channel, goal]
   Month 2: [8-10 pieces]
   Month 3: [8-10 pieces]

6. CONTENT REPURPOSING MATRIX:
   One long-form piece → how many derivative pieces across channels?

7. SUCCESS METRICS: What to measure monthly to know if content is working.

8. RESOURCE ALLOCATION: Given "${inputs.resources || '[resources]'}", what to prioritize and what to cut.`
  },
  {
    id: 'email_sequence',
    number: '03',
    name: 'Email Sequence Builder',
    tagline: 'Nurture leads into customers with email that converts',
    phase: 'Convert',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'For lead nurture, onboarding, or re-engagement campaigns',
    description: 'Creates a complete email sequence with subject lines, body copy, and CTAs for any nurture goal.',
    inputs: [
      { id: 'sequence_type', label: 'Sequence type', placeholder: '', type: 'select', options: ['Lead nurture (new subscriber)', 'Trial onboarding', 'Post-demo follow-up', 'Customer re-engagement / winback', 'Product launch', 'Event follow-up'] },
      { id: 'audience', label: 'Who receives this sequence?', placeholder: 'e.g. People who downloaded our CFO guide but have not booked a demo', type: 'text' },
      { id: 'goal', label: 'Sequence goal', placeholder: 'e.g. Book a discovery call, activate trial account, upgrade to paid plan', type: 'text' },
      { id: 'sequence_length', label: 'Number of emails', placeholder: '', type: 'select', options: ['3 emails over 1 week', '5 emails over 2 weeks', '7 emails over 3 weeks', '10 emails over 4 weeks'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an email marketing expert who writes sequences that convert without feeling manipulative. Every email must earn its place.

Sequence type: ${inputs.sequence_type || '[type]'}
Audience: ${inputs.audience || '[audience]'}
Goal: ${inputs.goal || '[goal]'}
Length: ${inputs.sequence_length || '5 emails over 2 weeks'}

Write a complete email sequence:

For each email:
EMAIL [N] — Day [X]
SUBJECT LINE: (2-3 options, A/B testable)
PREVIEW TEXT: (under 90 characters)
OPENING LINE: (hook — not "I hope this email finds you well")
BODY: (the value this email delivers — specific, useful, relevant)
CTA: (one clear action — not multiple options)
WORD COUNT TARGET: [based on email type]

EMAIL 1: Welcome / Orient — set expectations, deliver immediate value
EMAIL 2: Educate — address their most common question or misconception
EMAIL 3: Social proof — a specific customer story relevant to them
EMAIL 4: Value add — a tool, template, or insight they can use now
EMAIL 5: Direct ask — the clearest path to "${inputs.goal || '[goal]'}"

If sequence is longer, add:
EMAIL 6-7: Objection handling emails
EMAIL 8-10: Re-engagement / urgency sequence

Rules: No "just checking in". No "I wanted to reach out". Every email delivers something worth reading even if they never buy.`
  },
  {
    id: 'ad_copy',
    number: '04',
    name: 'Ad Copy Generator',
    tagline: 'Write ads that stop the scroll and drive clicks',
    phase: 'Acquire',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'For LinkedIn, Google, Meta, or display advertising',
    description: 'Generates multiple ad copy variants for testing across different platforms and audiences.',
    inputs: [
      { id: 'platform', label: 'Ad platform', placeholder: '', type: 'select', options: ['LinkedIn (B2B)', 'Google Search', 'Meta (Facebook/Instagram)', 'Twitter/X', 'Display / programmatic'] },
      { id: 'audience', label: 'Target audience', placeholder: 'e.g. HR Directors at companies with 200+ employees who are struggling with high turnover', type: 'text' },
      { id: 'offer', label: 'What are you offering?', placeholder: 'e.g. Free 14-day trial of our employee engagement platform', type: 'text' },
      { id: 'key_benefit', label: 'Single most compelling benefit', placeholder: 'e.g. Companies using us reduce turnover by 34% in the first year', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a performance marketing copywriter. Write ad copy that is specific, benefit-led, and designed to drive clicks from the right audience.

Platform: ${inputs.platform || '[platform]'}
Audience: ${inputs.audience || '[audience]'}
Offer: ${inputs.offer || '[offer]'}
Key benefit: ${inputs.key_benefit || '[benefit]'}

Generate ad copy variants:

FOR ${inputs.platform?.toUpperCase() || '[PLATFORM]'}:

VARIANT A — PROBLEM-LED:
Headline 1 (30 chars): [address their pain directly]
Headline 2 (30 chars): [your solution]
Headline 3 (30 chars): [CTA or benefit]
Description (90 chars): [expand on the benefit]

VARIANT B — BENEFIT-LED:
Same structure, lead with "${inputs.key_benefit || '[benefit]'}"

VARIANT C — SOCIAL PROOF-LED:
Same structure, lead with a number or customer result

VARIANT D — QUESTION-LED:
Open with a question that makes your audience self-identify

For each variant also provide:
- AUDIENCE FIT: Why this message works for "${inputs.audience || '[audience]'}"
- LANDING PAGE ALIGNMENT: What the landing page headline should say to match this ad

Rules: No superlatives ("best", "leading", "revolutionary"). No vague claims. Every word must earn its place. Be specific — numbers beat adjectives every time.`
  },
  {
    id: 'seo_brief',
    number: '05',
    name: 'SEO Content Brief',
    tagline: 'Brief content that ranks and converts',
    phase: 'Attract',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Before writing any SEO-focused content',
    description: 'Creates a detailed SEO content brief with keyword strategy, structure, and conversion goals.',
    inputs: [
      { id: 'keyword', label: 'Primary keyword or topic', placeholder: 'e.g. "airport billing software" or "how to automate invoice processing"', type: 'text' },
      { id: 'audience', label: 'Who is searching for this?', placeholder: 'e.g. Airport finance managers looking for a software solution to replace their manual billing process', type: 'text' },
      { id: 'intent', label: 'Search intent', placeholder: '', type: 'select', options: ['Informational (learning about a topic)', 'Commercial (comparing solutions)', 'Transactional (ready to buy)', 'Navigational (looking for a specific brand)'] },
      { id: 'business_goal', label: 'Business goal for this content', placeholder: 'e.g. Generate demo requests, capture email addresses, rank for competitive keyword', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an SEO content strategist. Write a brief that helps a writer create content that ranks, engages, and converts.

Primary keyword: ${inputs.keyword || '[keyword]'}
Audience: ${inputs.audience || '[audience]'}
Search intent: ${inputs.intent || '[intent]'}
Business goal: ${inputs.business_goal || '[goal]'}

Create a complete SEO content brief:

1. CONTENT GOAL: Rank for "${inputs.keyword || '[keyword]'}" and drive ${inputs.business_goal || '[goal]'}.

2. SEARCH INTENT ANALYSIS: What is the searcher actually trying to accomplish? What do they need to see to feel satisfied?

3. RECOMMENDED CONTENT TYPE: [Blog post / Landing page / Guide / Comparison page / etc.] — and why.

4. SUGGESTED TITLE OPTIONS (3):
   - Include primary keyword
   - Signal the value clearly
   - Under 60 characters ideally

5. CONTENT STRUCTURE (H2s and H3s):
   Full outline with suggested headings that address search intent and include semantic keywords.

6. KEYWORD STRATEGY:
   - Primary keyword: ${inputs.keyword || '[keyword]'}
   - Secondary keywords: [5-8 related terms to include naturally]
   - LSI keywords: [semantic terms that signal topical authority]

7. CONTENT SPECIFICATIONS:
   - Recommended word count: [based on intent]
   - Reading level: [based on audience]
   - Tone: [based on audience]

8. CONVERSION ELEMENTS:
   - CTA placement and copy
   - Lead magnet or next step
   - Internal linking opportunities

9. COMPETITOR GAPS: What existing content on this topic misses that yours should cover.`
  },
  {
    id: 'positioning',
    number: '06',
    name: 'Brand Positioning Builder',
    tagline: 'Define how your market sees you — before they decide for you',
    phase: 'Strategy',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'When launching, repositioning, or entering a new market',
    description: 'Creates a positioning framework with category design, differentiation, and messaging that sticks.',
    inputs: [
      { id: 'company', label: 'Your company and what you do', placeholder: 'e.g. We build financial automation software for mid-market manufacturers', type: 'textarea' },
      { id: 'competitors', label: 'Who you are compared to (and why that is wrong)', placeholder: 'e.g. People compare us to Excel and generic ERP systems, but we are actually closer to a CFO intelligence layer', type: 'textarea' },
      { id: 'best_customers', label: 'Your 3 best customers and why they chose you', placeholder: 'e.g. All 3 were frustrated with the reporting limitations of SAP, all had a new CFO who wanted real-time data', type: 'textarea' },
      { id: 'unique', label: 'What you do that no one else does', placeholder: 'e.g. We are the only tool built specifically for manufacturers with complex cost-center structures', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a brand positioning expert trained in Category Design (Play Bigger) and April Dunford's Obviously Awesome framework. Build positioning that creates a category, not just differentiates within one.

Company: ${inputs.company || '[company]'}
Current comparisons: ${inputs.competitors || '[competitors]'}
Best customers: ${inputs.best_customers || '[customers]'}
Unique capability: ${inputs.unique || '[unique]'}

Build a positioning framework:

1. COMPETITIVE ALTERNATIVE: What do customers do if you don't exist? (Not your competitors — the actual behavior)

2. UNIQUE ATTRIBUTES: What do you have that alternatives don't? (Features, approach, data, team, technology)

3. VALUE FOR TARGET CUSTOMER: What does that uniqueness enable for them? (Outcomes, not features)

4. TARGET CUSTOMER PROFILE: Who gets the most value? Be specific — not "mid-market companies" but a pattern from "${inputs.best_customers || '[customers]'}"

5. MARKET CATEGORY: What category should you define or redefine? What is the frame that makes your differentiation obvious?

6. POSITIONING STATEMENT (fill in the blank):
   For [target customer] who [has this problem], [your product] is the [category] that [key benefit] unlike [alternative] because [unique reason to believe].

7. MESSAGING PILLARS (3):
   The 3 things that must be true for your positioning to land. Each becomes a message track.

8. WHAT TO STOP SAYING: The current messaging that is confusing or positioning you wrong.`
  },
  {
    id: 'landing_page',
    number: '07',
    name: 'Landing Page Copy Writer',
    tagline: 'Write landing pages that convert visitors into leads',
    phase: 'Convert',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'For any campaign landing page or website section',
    description: 'Generates full landing page copy with headline, hero, benefits, social proof, and CTA sections.',
    inputs: [
      { id: 'offer', label: 'What is the offer on this page?', placeholder: 'e.g. Free trial signup, demo booking, guide download, webinar registration', type: 'text' },
      { id: 'audience', label: 'Who lands on this page?', placeholder: 'e.g. Finance managers at manufacturing companies who clicked a LinkedIn ad about reducing month-end close time', type: 'textarea' },
      { id: 'main_benefit', label: 'The single most compelling benefit', placeholder: 'e.g. Cut your month-end close from 5 days to 1 day', type: 'text' },
      { id: 'proof', label: 'Social proof available', placeholder: 'e.g. 200+ customers, "Reduced our close time by 80%" — Sarah M, CFO at Acme, G2 rating 4.8/5', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a conversion copywriter. Write landing page copy that converts — specific, benefit-led, and built around the visitor's job-to-be-done.

Offer: ${inputs.offer || '[offer]'}
Audience: ${inputs.audience || '[audience]'}
Main benefit: ${inputs.main_benefit || '[benefit]'}
Social proof: ${inputs.proof || '[proof]'}

Write complete landing page copy:

HERO SECTION:
H1 Headline (under 10 words): [The single most compelling benefit — "${inputs.main_benefit || '[benefit]'}"]
Subheadline (under 20 words): [Expand on who this is for and what they get]
CTA Button: [Action-oriented, specific — not "Submit" or "Learn More"]
Hero supporting copy (2 sentences): [What happens after they click]

SOCIAL PROOF BAR:
3 logos or stats from: "${inputs.proof || '[proof]'}"

PROBLEM SECTION:
Headline: [Name the pain they arrived with]
3 bullet points: [The specific frustrations your audience feels]

SOLUTION SECTION:
Headline: [Introduce the solution, not the product]
3-4 benefit blocks: For each: [Benefit headline] + [2-sentence explanation]

SOCIAL PROOF SECTION:
1 full customer quote from: "${inputs.proof || '[proof]'}"
Format: Quote + Name + Title + Company + Result achieved

FAQ SECTION:
5 objections as questions + direct answers

FINAL CTA SECTION:
Headline: [Restate the main benefit]
CTA: [Same as hero, or stronger urgency version]
Risk reversal: [What removes the fear of clicking?]`
  },
  {
    id: 'social_content',
    number: '08',
    name: 'Social Media Content Planner',
    tagline: 'Build a social presence that attracts your ideal customer',
    phase: 'Attract',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Weekly or monthly social media planning',
    description: 'Creates a month of social content across platforms — varied formats, consistent voice, business-focused.',
    inputs: [
      { id: 'brand', label: 'Brand and audience', placeholder: 'e.g. B2B SaaS for HR teams — audience is HR Directors and CHROs at mid-market companies', type: 'text' },
      { id: 'platforms', label: 'Platforms', placeholder: '', type: 'select', options: ['LinkedIn only', 'LinkedIn + Twitter/X', 'LinkedIn + Instagram', 'All platforms'] },
      { id: 'voice', label: 'Brand voice', placeholder: 'e.g. Direct and opinionated, like a trusted advisor — not corporate, not casual. We share strong points of view.', type: 'text' },
      { id: 'content_themes', label: 'Content themes or pillars', placeholder: 'e.g. HR trends, employee retention, people analytics, behind-the-scenes, customer stories', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a B2B social media strategist. Create content that builds authority and attracts ideal customers — not vanity metrics.

Brand: ${inputs.brand || '[brand]'}
Platforms: ${inputs.platforms || '[platforms]'}
Voice: ${inputs.voice || '[voice]'}
Themes: ${inputs.content_themes || '[themes]'}

Create a 4-week social content plan:

WEEK 1-4 CONTENT CALENDAR:
For each week, create 5 posts (Mon-Fri):

POST FORMAT OPTIONS (vary throughout the month):
- Hot take: A strong, contrarian opinion in your space
- How-to: A practical tip your audience can use today
- Data insight: A stat + your interpretation
- Customer story: A specific result (no fluff)
- Behind the scenes: How you think / work / build
- Question: Genuinely ask your audience something
- Trend reaction: React to something happening in their world

For each post provide:
PLATFORM: [LinkedIn/Twitter/etc.]
FORMAT: [text / image / carousel / video script]
HOOK (first line — must stop the scroll):
BODY (the content):
CTA: (question, link, or tag)
ESTIMATED ENGAGEMENT TYPE: [comments / shares / saves]

Voice to maintain throughout: "${inputs.voice || '[voice]'}"

End with: WHAT NOT TO POST — content types that would undermine this brand.`
  },
  {
    id: 'pr_pitch',
    number: '09',
    name: 'PR Pitch Writer',
    tagline: 'Get journalists to actually write about you',
    phase: 'Acquire',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'When pitching journalists, podcasters, or media',
    description: 'Writes a targeted PR pitch that is newsworthy, relevant, and respects the journalist\'s time.',
    inputs: [
      { id: 'news_hook', label: 'What is the news hook?', placeholder: 'e.g. We just raised €5M Series A, we have data showing 67% of airports still use spreadsheets for billing, we are launching the first AI-powered airport operations platform', type: 'textarea' },
      { id: 'target_media', label: 'Target publication or journalist', placeholder: 'e.g. TechCrunch enterprise reporter, Aviation Week editor, local business journal', type: 'text' },
      { id: 'audience_angle', label: 'Why does their audience care?', placeholder: 'e.g. Their readers are tech investors who care about B2B SaaS infrastructure plays in overlooked verticals', type: 'text' },
      { id: 'exclusive', label: 'What can you offer exclusively?', placeholder: 'e.g. Exclusive data, first interview with CEO, early access to product, customer access for quotes', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a PR expert who understands that journalists receive 500 pitches a week. Write a pitch that respects their time and is genuinely newsworthy.

News hook: ${inputs.news_hook || '[hook]'}
Target: ${inputs.target_media || '[target]'}
Audience angle: ${inputs.audience_angle || '[angle]'}
Exclusive offer: ${inputs.exclusive || '[exclusive]'}

Write a PR pitch:

SUBJECT LINE (under 8 words): [The news, not the ask. Specific.]

EMAIL BODY (under 150 words):

OPENING (1 sentence): Why you are pitching THIS journalist at THIS publication — specific reference to their recent work.

THE NEWS (2-3 sentences): What happened, why it matters, why now.
Hook: "${inputs.news_hook || '[hook]'}"

WHY THEIR AUDIENCE CARES (1-2 sentences): "${inputs.audience_angle || '[angle]'}"

THE OFFER (1 sentence): What you can give them exclusively: "${inputs.exclusive || '[exclusive]'}"

THE ASK (1 sentence): Specific — not "I'd love to connect". A specific story angle or 15-minute call.

Also provide:
- FOLLOW-UP EMAIL (Day 5 if no response): Under 50 words, different angle
- WHAT NOT TO INCLUDE: Common pitch mistakes that kill coverage chances`
  },
  {
    id: 'marketing_report',
    number: '10',
    name: 'Marketing Report Writer',
    tagline: 'Report on marketing in a way leadership actually understands',
    phase: 'Measure',
    phaseColor: 'bg-indigo-50 text-indigo-600',
    context: 'Monthly or quarterly marketing reporting',
    description: 'Transforms marketing data into a narrative report that connects activities to business outcomes.',
    inputs: [
      { id: 'period', label: 'Reporting period', placeholder: 'e.g. Q2 2026, June 2026', type: 'text' },
      { id: 'metrics', label: 'Key metrics for this period', placeholder: 'e.g. Website visits: 12,400 (+23%), MQLs: 87 (+15%), Pipeline generated: €340,000, CAC: €1,850, 3 campaign launches', type: 'textarea' },
      { id: 'vs_goal', label: 'Performance vs goal', placeholder: 'e.g. MQL target was 100 (87% achieved), pipeline target was €400k (85% achieved), CAC target €2,000 (beat by 8%)', type: 'textarea' },
      { id: 'audience', label: 'Report audience', placeholder: '', type: 'select', options: ['CEO / Founder', 'Board of Directors', 'CMO / Marketing leadership', 'Full company', 'Investors'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a marketing analytics expert. Write a report that connects marketing activities to business outcomes — not a vanity metrics dump.

Period: ${inputs.period || '[period]'}
Metrics: ${inputs.metrics || '[metrics]'}
vs Goal: ${inputs.vs_goal || '[vs goal]'}
Audience: ${inputs.audience || '[audience]'}

Write a marketing performance report:

1. EXECUTIVE SUMMARY (3 sentences): What happened, what it means for the business, what we are doing about it. For ${inputs.audience || '[audience]'} — no marketing jargon.

2. HEADLINE NUMBERS:
   For each metric in "${inputs.metrics || '[metrics]'}":
   - The number
   - vs goal: "${inputs.vs_goal || '[vs goal]'}"
   - vs prior period
   - What the trend means (not just the number)

3. WHAT DROVE RESULTS:
   - What worked and why (specific)
   - What did not work and why (honest)
   - External factors that affected performance

4. PIPELINE AND REVENUE IMPACT:
   How did marketing activity this period translate to pipeline, opportunities, and revenue? Connect the dots explicitly.

5. CHANNEL PERFORMANCE:
   Top 3 performing channels this period with ROI or efficiency metrics.

6. NEXT PERIOD PLAN:
   Based on what we learned — what are we changing, doubling down on, or stopping?

7. ASK FROM LEADERSHIP (if any):
   Budget, resources, or decisions needed.

No vanity metrics. If a number does not connect to revenue or pipeline, do not lead with it.`
  },
]

const phases = ['All', 'Strategy', 'Attract', 'Acquire', 'Convert', 'Measure']

export default function MarketingToolkit() {
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
          <span className="text-xs px-2 py-1 bg-pink-50 text-pink-700 rounded-full">Marketing Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Marketing Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Attract the right customers. Convert them faster.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for marketers — campaign briefs, content strategy, email sequences, ad copy, SEO briefs, landing pages, and more.
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
                      Tip: Start with workflow 06 (Brand Positioning) — it makes every other marketing output sharper.
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