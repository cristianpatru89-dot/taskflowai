'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'cold_email',
    number: '01',
    name: 'Cold Email Generator',
    tagline: 'Write cold emails that actually get replies',
    phase: 'Prospect',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before any outbound prospecting campaign',
    description: 'Generates personalized cold emails that are short, relevant, and focused on the prospect — not you.',
    inputs: [
      { id: 'prospect', label: 'Who are you emailing?', placeholder: 'e.g. VP of Operations at a 200-person logistics company in Germany', type: 'text' },
      { id: 'your_product', label: 'What do you sell?', placeholder: 'e.g. Route optimization software that reduces delivery costs by 15-20%', type: 'text' },
      { id: 'trigger', label: 'Personalization trigger (why now?)', placeholder: 'e.g. They just expanded to 3 new cities, saw their job post for a Fleet Manager, read their LinkedIn post about rising fuel costs', type: 'text' },
      { id: 'outcome', label: 'One outcome you deliver', placeholder: 'e.g. Our customers reduce fuel costs by an average of 18% in the first 90 days', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a B2B sales expert who writes cold emails with a 40%+ reply rate. Your emails are short, relevant, and all about the prospect — not the sender.

Prospect: ${inputs.prospect || '[prospect]'}
Product: ${inputs.your_product || '[product]'}
Personalization trigger: ${inputs.trigger || '[trigger]'}
Key outcome: ${inputs.outcome || '[outcome]'}

Write 3 cold email variants (A/B/C test):

For each variant:
SUBJECT LINE: Under 6 words. No clickbait. No "Quick question". Specific to their situation.

EMAIL BODY (under 75 words):
- Line 1: Personalized opener using "${inputs.trigger || '[trigger]'}" — show you did your homework
- Line 2: One relevant outcome: "${inputs.outcome || '[outcome]'}"
- Line 3: Social proof (one customer example or number)
- CTA: One specific ask — not "let me know if you're interested". A specific question or 15-min call ask.

Variant A: Problem-led (lead with their pain)
Variant B: Outcome-led (lead with the result)
Variant C: Curiosity-led (lead with an insight or question)

Rules: No "I hope this email finds you well". No "My name is X and I work at Y". No features list. No attachments mentioned. Under 75 words each.`
  },
  {
    id: 'discovery_call',
    number: '02',
    name: 'Discovery Call Planner',
    tagline: 'Run discovery calls that advance deals',
    phase: 'Qualify',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Before any first sales call',
    description: 'Prepares a structured discovery call guide that uncovers real pain, budget, and decision process.',
    inputs: [
      { id: 'prospect_company', label: 'Prospect company and role', placeholder: 'e.g. Head of Finance at a 500-person manufacturing company, €50M revenue', type: 'text' },
      { id: 'your_solution', label: 'What you sell', placeholder: 'e.g. Financial reporting automation software for mid-market manufacturers', type: 'text' },
      { id: 'known_context', label: 'What you already know about them', placeholder: 'e.g. They replied to our cold email about manual reporting. They use SAP. They have a finance team of 8.', type: 'textarea' },
      { id: 'call_length', label: 'Call length', placeholder: '', type: 'select', options: ['20 minutes', '30 minutes', '45 minutes', '60 minutes'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a B2B sales expert trained in MEDDIC and Challenger Sale. Design a discovery call that uncovers real pain and advances the deal.

Prospect: ${inputs.prospect_company || '[prospect]'}
Your solution: ${inputs.your_solution || '[solution]'}
Known context: ${inputs.known_context || '[context]'}
Call length: ${inputs.call_length || '30 minutes'}

Design a ${inputs.call_length || '30-minute'} discovery call guide:

1. PRE-CALL RESEARCH CHECKLIST:
   What to know before you dial (company news, LinkedIn, recent funding, job posts).

2. OPENING (2 min):
   How to start — not "tell me about your business". A specific, confident opener based on what you know.

3. SITUATION QUESTIONS (5 min):
   3 questions to understand their current state. Already know some answers from: "${inputs.known_context || '[context]'}"

4. PROBLEM QUESTIONS (10 min):
   5 questions to uncover the pain behind the surface problem.
   Use "Tell me about the last time..." format.
   Probe: financial impact, time wasted, risk exposure.

5. IMPLICATION QUESTIONS (5 min):
   3 questions that help them feel the cost of inaction.
   "What happens if this isn't solved by end of year?"

6. MEDDIC QUALIFICATION:
   Questions to uncover: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion.

7. NEXT STEP CLOSE:
   How to end with a specific next step — not "I'll send you some info". A concrete commitment.

8. RED FLAGS TO LISTEN FOR: Signs this deal won't close.`
  },
  {
    id: 'proposal',
    number: '03',
    name: 'Sales Proposal Writer',
    tagline: 'Write proposals that close deals',
    phase: 'Propose',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'After discovery — before sending any proposal',
    description: 'Creates a compelling, personalized proposal that speaks to their specific pain and ROI.',
    inputs: [
      { id: 'company', label: 'Prospect company name', placeholder: 'e.g. Müller Logistics GmbH', type: 'text' },
      { id: 'pain_points', label: 'Pain points uncovered in discovery', placeholder: 'e.g. Spending 3 days/month on manual route planning, fuel costs up 22% this year, lost 2 key dispatchers to competitors', type: 'textarea' },
      { id: 'solution_fit', label: 'How your solution solves their specific problem', placeholder: 'e.g. Our AI routing reduces planning time from 3 days to 2 hours and cuts fuel costs 15-20%', type: 'textarea' },
      { id: 'pricing', label: 'Pricing structure', placeholder: 'e.g. €2,400/month for up to 50 vehicles, includes implementation and 12-month support', type: 'text' },
      { id: 'roi', label: 'ROI calculation for their situation', placeholder: 'e.g. At 40 vehicles and €0.18/km fuel cost, projected savings: €85,000/year vs €28,800/year cost', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a senior B2B sales consultant. Write a proposal that is about them, not about you.

Prospect: ${inputs.company || '[company]'}
Their pain: ${inputs.pain_points || '[pain points]'}
Your solution fit: ${inputs.solution_fit || '[solution]'}
Pricing: ${inputs.pricing || '[pricing]'}
ROI: ${inputs.roi || '[ROI]'}

Write a sales proposal:

1. EXECUTIVE SUMMARY (the only section the CEO will read):
   - Their situation in 2 sentences (show you listened)
   - The outcome you are proposing
   - The business case in one number

2. YOUR SITUATION (mirror their pain back):
   Based on "${inputs.pain_points || '[pain]'}" — write this section in their language, not yours.

3. THE PROPOSED SOLUTION:
   Not a feature list. How specifically does ${inputs.solution_fit || '[solution]'} solve each pain point they told you about?

4. THE BUSINESS CASE:
   ROI calculation: ${inputs.roi || '[ROI]'}
   - Investment: ${inputs.pricing || '[pricing]'}
   - Return: [calculated]
   - Payback period: [calculated]
   - 3-year value: [calculated]

5. IMPLEMENTATION PLAN:
   Week 1-2: Setup and data migration
   Week 3-4: Training and go-live
   Month 2+: Optimization and support

6. WHY US, WHY NOW:
   One paragraph — what makes us the right choice and why this quarter specifically.

7. NEXT STEPS:
   Specific — not "let us know". A decision date, a meeting to review, a pilot proposal.

Never use: "best-in-class", "cutting-edge", "synergy", "leverage". Write like a trusted advisor, not a salesperson.`
  },
  {
    id: 'objection_handler',
    number: '04',
    name: 'Objection Handler',
    tagline: 'Turn objections into deal-advancing conversations',
    phase: 'Negotiate',
    phaseColor: 'bg-red-50 text-red-600',
    context: 'When a prospect raises a concern or objection',
    description: 'Prepares thoughtful, non-pushy responses to the most common sales objections.',
    inputs: [
      { id: 'objection', label: 'The objection (exact words if possible)', placeholder: 'e.g. "Your price is 3x what we pay now" or "We already have something that does this" or "Now is not a good time"', type: 'textarea' },
      { id: 'your_product', label: 'What you sell', placeholder: 'e.g. Enterprise cybersecurity platform', type: 'text' },
      { id: 'deal_stage', label: 'Deal stage', placeholder: '', type: 'select', options: ['Cold outreach (before first call)', 'After first discovery call', 'After demo / presentation', 'During proposal / negotiation', 'Final close stage'] },
      { id: 'context', label: 'Any context that makes this objection unique?', placeholder: 'e.g. They just renewed with a competitor, they had a bad experience with a similar tool, their budget was just cut', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a sales coach who has handled thousands of objections. Your approach: acknowledge, explore, respond — never argue or push.

Objection: "${inputs.objection || '[objection]'}"
Product: ${inputs.your_product || '[product]'}
Deal stage: ${inputs.deal_stage || '[stage]'}
Context: ${inputs.context || 'no additional context'}

Handle this objection:

1. WHAT THIS OBJECTION REALLY MEANS:
   Most objections are not what they seem. What is the real concern behind "${inputs.objection || '[objection]'}"?

2. WHAT NOT TO DO:
   The instinctive response that kills deals. Avoid this.

3. THE ACKNOWLEDGE + EXPLORE RESPONSE:
   First response — not defending, not pitching. A question that opens the conversation.
   Script: exact words to say.

4. THREE RESPONSE STRATEGIES:
   Strategy A: Reframe — change how they see the problem
   Strategy B: Evidence — a specific story or number that addresses the concern
   Strategy C: Concede and redirect — agree with part of the objection, then pivot

5. THE FOLLOW-UP QUESTION:
   After your response, what question advances the conversation?

6. IF THEY REPEAT THE OBJECTION:
   This is usually a signal it is a blocker, not a question. How to read it and what to do.

7. WHEN TO WALK AWAY:
   Signs this objection means the deal is not real.`
  },
  {
    id: 'follow_up',
    number: '05',
    name: 'Follow-Up Sequence Builder',
    tagline: 'Stay top of mind without being annoying',
    phase: 'Nurture',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'When a prospect goes quiet or a deal stalls',
    description: 'Creates a multi-touch follow-up sequence that adds value at every contact and keeps deals moving.',
    inputs: [
      { id: 'situation', label: 'What happened before the silence?', placeholder: 'e.g. Had a great demo 2 weeks ago, they said they needed to check with their CFO. Sent a proposal. No response since.', type: 'textarea' },
      { id: 'prospect', label: 'Prospect role and company', placeholder: 'e.g. IT Director at a 300-person retail company', type: 'text' },
      { id: 'value_prop', label: 'Your main value proposition', placeholder: 'e.g. We reduce IT ticket resolution time by 60%', type: 'text' },
      { id: 'sequence_length', label: 'How many touches?', placeholder: '', type: 'select', options: ['3 touches over 2 weeks', '5 touches over 3 weeks', '7 touches over 4 weeks', '10 touches over 6 weeks'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a sales expert who understands that follow-up is where most deals are won or lost. Every touch must add value — never follow up just to "check in".

Situation: ${inputs.situation || '[situation]'}
Prospect: ${inputs.prospect || '[prospect]'}
Value proposition: ${inputs.value_prop || '[value prop]'}
Sequence: ${inputs.sequence_length || '5 touches over 3 weeks'}

Build a follow-up sequence:

For each touch, provide:
- CHANNEL: Email / LinkedIn / Phone / Text
- TIMING: Day X after last contact
- SUBJECT LINE (if email)
- MESSAGE (under 60 words for email, under 30 words for LinkedIn)
- VALUE ADD: What new value or insight does this touch deliver?
- CTA: One specific ask

TOUCH 1 (Day 3): Soft check-in with a value add
TOUCH 2 (Day 7): Share a relevant insight, case study, or industry news
TOUCH 3 (Day 12): Different angle — address a potential concern
TOUCH 4 (Day 18): Social proof — a specific customer story relevant to them
TOUCH 5 (Day 25): The honest break-up email

For the break-up email specifically:
- Acknowledge the silence without guilt-tripping
- Give them an easy out
- Leave the door open
- Under 50 words

Rules: Never say "just following up" or "checking in". Every message must earn a read.`
  },
  {
    id: 'linkedin_outreach',
    number: '06',
    name: 'LinkedIn Outreach Builder',
    tagline: 'Connect requests and messages that get accepted',
    phase: 'Prospect',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'For LinkedIn prospecting and social selling',
    description: 'Creates LinkedIn connection requests and message sequences that feel human, not spammy.',
    inputs: [
      { id: 'prospect', label: 'Who are you reaching out to?', placeholder: 'e.g. COO at a Series B SaaS company, 150 employees, based in Amsterdam', type: 'text' },
      { id: 'your_offer', label: 'What do you offer?', placeholder: 'e.g. Fractional CFO services for B2B SaaS companies preparing for Series B', type: 'text' },
      { id: 'connection', label: 'Any mutual connection or common ground?', placeholder: 'e.g. We both attended SaaS Summit Berlin, we are both in the ProductLed Growth community, mutual connection: Sarah at Acme', type: 'text' },
      { id: 'trigger', label: 'Why are you reaching out now?', placeholder: 'e.g. They just posted about their Series B plans, their company just hit 100 employees, they shared a post about CFO challenges', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a LinkedIn social selling expert. LinkedIn outreach fails because it is too sales-y too fast. Build connection and curiosity first.

Prospect: ${inputs.prospect || '[prospect]'}
Your offer: ${inputs.your_offer || '[offer]'}
Common ground: ${inputs.connection || '[connection]'}
Trigger: ${inputs.trigger || '[trigger]'}

Create a LinkedIn outreach sequence:

CONNECTION REQUEST NOTE (under 200 characters):
- Reference something specific: "${inputs.connection || '[common ground]'}" or "${inputs.trigger || '[trigger]'}"
- No pitch. Just a human reason to connect.
- 3 variants (A/B/C)

MESSAGE 1 — After they accept (Day 1-2):
- Thank them naturally (1 sentence max)
- Add genuine value: an insight, article, or observation relevant to their world
- No pitch. End with a question about them.
- Under 80 words.

MESSAGE 2 — If no reply (Day 7):
- Different angle
- A specific result or case study relevant to "${inputs.trigger || '[trigger]'}"
- Soft CTA: "Would this be relevant for you?"
- Under 60 words.

MESSAGE 3 — If no reply (Day 14):
- The honest message: "I've reached out a couple of times..."
- Give them an easy out
- One last value add
- Under 50 words.

Rules: No "I came across your profile". No "I'd love to pick your brain". No pitching in the connection request.`
  },
  {
    id: 'demo_script',
    number: '07',
    name: 'Demo Script Builder',
    tagline: 'Run demos that sell outcomes, not features',
    phase: 'Qualify',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Before any product demonstration',
    description: 'Structures a demo that focuses on the prospect\'s specific pain — not a feature walkthrough.',
    inputs: [
      { id: 'prospect_pain', label: 'Pain points uncovered in discovery', placeholder: 'e.g. Finance team spends 2 days each month reconciling invoices manually. CFO wants real-time visibility on cash position. Current tool crashes with large datasets.', type: 'textarea' },
      { id: 'product', label: 'Product you are demoing', placeholder: 'e.g. Financial automation platform for mid-market companies', type: 'text' },
      { id: 'demo_length', label: 'Demo length', placeholder: '', type: 'select', options: ['20 minutes', '30 minutes', '45 minutes', '60 minutes'] },
      { id: 'attendees', label: 'Who is in the room?', placeholder: 'e.g. CFO (economic buyer), Finance Manager (champion), IT Manager (technical evaluator)', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a sales engineer and demo expert. Great demos are not feature tours — they are stories about the prospect's future.

Pain points: ${inputs.prospect_pain || '[pain]'}
Product: ${inputs.product || '[product]'}
Duration: ${inputs.demo_length || '30 minutes'}
Attendees: ${inputs.attendees || '[attendees]'}

Design a ${inputs.demo_length || '30-minute'} demo script:

1. OPENING (3 min):
   - Confirm agenda and time
   - Recap what you heard in discovery: "${inputs.prospect_pain || '[pain]'}"
   - Ask: "Is that still the priority today, or has anything changed?"
   - Frame the demo: "I'm going to show you specifically how we solve X, Y, Z — not a general walkthrough"

2. THE STORY SETUP (2 min):
   Introduce a persona that mirrors their situation. Not your product — their world, before your product.

3. THE DEMO FLOW (structured by their pain, not your features):
   For each pain point in "${inputs.prospect_pain || '[pain]'}":
   - Name the pain: "You mentioned that [pain]..."
   - Show the solution: the specific screen/feature that addresses it
   - Show the outcome: "This means [specific result]"
   - Pause for reaction: "Does this solve what you described?"

4. THE WOW MOMENT:
   The one thing to show that makes them lean forward. What is it for this specific prospect?

5. ROI BRIDGE (3 min):
   Connect what they just saw to their numbers. Specific to ${inputs.attendees || '[attendees]'}.

6. OBJECTION PREVENTION:
   2 likely objections from ${inputs.attendees || '[attendees]'} and how to preemptively address them in the demo.

7. CLOSE (5 min):
   - "What did you see that was most relevant?"
   - Next step proposal
   - Do NOT end with "any questions?"`
  },
  {
    id: 'negotiation_prep',
    number: '08',
    name: 'Negotiation Prep Guide',
    tagline: 'Negotiate deals that close without destroying margin',
    phase: 'Negotiate',
    phaseColor: 'bg-red-50 text-red-600',
    context: 'Before any pricing or contract negotiation',
    description: 'Prepares your negotiation strategy with positions, concessions, and walk-away points.',
    inputs: [
      { id: 'deal_context', label: 'Deal context', placeholder: 'e.g. €85,000 annual contract, 3-year term. Prospect is asking for 20% discount and extended payment terms (90 days instead of 30).', type: 'textarea' },
      { id: 'your_position', label: 'Your starting position and limits', placeholder: 'e.g. List price €85k. Can go to €72k minimum. Can offer 60-day payment terms but not 90. Cannot discount year 1 but can add free onboarding (worth €8k).', type: 'textarea' },
      { id: 'their_motivation', label: 'What do you know about their priorities?', placeholder: 'e.g. CFO is under pressure to cut costs this year. IT wants fast implementation. Champion is measured on time-to-value.', type: 'textarea' },
      { id: 'competition', label: 'Competitive situation', placeholder: 'e.g. We are competing with one other vendor priced 15% lower but with less functionality', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a B2B sales negotiation expert. Good negotiators protect margin while making the other side feel they won.

Deal: ${inputs.deal_context || '[deal]'}
Your position: ${inputs.your_position || '[position]'}
Their priorities: ${inputs.their_motivation || '[motivation]'}
Competition: ${inputs.competition || '[competition]'}

Prepare a negotiation strategy:

1. WHAT THEY ACTUALLY WANT:
   Behind the stated ask ("${inputs.deal_context || '[their ask]'}"), what is the real need?
   Separate: must-haves vs nice-to-haves vs bargaining chips.

2. YOUR NEGOTIATION POSITIONS:
   - Opening position (anchor high)
   - Target position (where you want to land)
   - Walk-away point (BATNA)

3. CONCESSION STRATEGY:
   What to give up, in what order, and what to get in return for each concession.
   Rule: Never give a concession without getting something back.
   
   Concession 1: [what] — in exchange for [what]
   Concession 2: [what] — in exchange for [what]
   Concession 3: [what] — in exchange for [what]

4. VALUE ADDS INSTEAD OF DISCOUNTS:
   Based on "${inputs.your_position || '[limits]'}" — what can you add that costs you little but is valuable to them?

5. HOW TO RESPOND TO:
   - "Your competitor is 15% cheaper"
   - "We need 20% off or we can't do this"
   - "Can you do a pilot first?"

6. CLOSING MOVES:
   How to create urgency without being pushy.
   What final close to use based on their decision process.

7. WALK-AWAY SCRIPT:
   If they push past your limit — exact words to use.`
  },
  {
    id: 'account_plan',
    number: '09',
    name: 'Account Plan Builder',
    tagline: 'Turn a customer into a long-term partner',
    phase: 'Grow',
    phaseColor: 'bg-teal-50 text-teal-700',
    context: 'For key accounts — existing customers with expansion potential',
    description: 'Creates a strategic account plan to grow revenue, deepen relationships, and reduce churn risk.',
    inputs: [
      { id: 'account', label: 'Account name and size', placeholder: 'e.g. Acme Corp — current ARR €45,000, 200 users, 3-year customer, manufacturing sector', type: 'text' },
      { id: 'current_status', label: 'Current relationship status', placeholder: 'e.g. Champion is our main contact (Ops Manager). CFO does not know us. NPS score 8/10. Renewal in 6 months.', type: 'textarea' },
      { id: 'expansion_opportunity', label: 'Expansion opportunities', placeholder: 'e.g. They have 3 other divisions not using us. New product line launching in Q3 that our tool supports. CFO mentioned interest in analytics module.', type: 'textarea' },
      { id: 'risks', label: 'Churn or relationship risks', placeholder: 'e.g. Champion is leaving next month. Competitor pitched them last quarter. They have complained about response times.', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a strategic account manager. Build a plan that grows revenue, deepens relationships, and makes this account impossible to churn.

Account: ${inputs.account || '[account]'}
Current status: ${inputs.current_status || '[status]'}
Expansion opportunity: ${inputs.expansion_opportunity || '[opportunity]'}
Risks: ${inputs.risks || '[risks]'}

Build a 6-month account plan:

1. ACCOUNT SNAPSHOT:
   - Current ARR and relationship health
   - Key stakeholders and their relationship to us (Champion / Neutral / Risk)
   - Upcoming dates: renewal, QBR, contract milestones

2. RISK MITIGATION (address first):
   For each risk in "${inputs.risks || '[risks]'}":
   - Severity: HIGH / MEDIUM / LOW
   - Action to take
   - Owner and timeline

3. RELATIONSHIP EXPANSION MAP:
   Who else in the account should we know?
   - Economic Buyer: [current relationship vs target]
   - Other departments: [who, why, how to get introduced]

4. EXPANSION STRATEGY:
   For each opportunity in "${inputs.expansion_opportunity || '[opportunity]'}":
   - Revenue potential
   - Who owns this decision?
   - Path to proposal
   - Timeline

5. 90-DAY ACTION PLAN:
   Month 1: [specific actions]
   Month 2: [specific actions]
   Month 3: [specific actions]

6. SUCCESS METRICS:
   - ARR target: [current] → [target in 6 months]
   - Relationship health: [current NPS/status] → [target]
   - Stakeholders engaged: [current] → [target]

7. QBR AGENDA TEMPLATE: For the next quarterly business review with this account.`
  },
  {
    id: 'win_loss_review',
    number: '10',
    name: 'Win/Loss Review Framework',
    tagline: 'Learn from every deal — won or lost',
    phase: 'Learn',
    phaseColor: 'bg-indigo-50 text-indigo-600',
    context: 'After any deal closes — win or loss',
    description: 'Structures a win/loss review that extracts real insights to improve your sales process and positioning.',
    inputs: [
      { id: 'outcome', label: 'Deal outcome', placeholder: '', type: 'select', options: ['We won — closed the deal', 'We lost — to a competitor', 'We lost — no decision (status quo)', 'We lost — budget cut / frozen', 'Deal stalled — still open but no progress'] },
      { id: 'deal_details', label: 'Deal details', placeholder: 'e.g. €65,000 annual contract, 6-month sales cycle, 3 people involved in decision, competed against Vendor X', type: 'textarea' },
      { id: 'what_happened', label: 'What happened in the deal?', placeholder: 'e.g. Strong discovery, good demo, proposal submitted. Then 4 weeks of silence. Lost to competitor who offered a lower price and faster implementation.', type: 'textarea' },
      { id: 'their_feedback', label: 'What did the prospect/customer say? (if known)', placeholder: 'e.g. They said we were more expensive and the competitor already had an integration with their ERP', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a sales performance analyst. Win/loss reviews only have value if they are brutally honest and produce specific actions.

Outcome: ${inputs.outcome || '[outcome]'}
Deal: ${inputs.deal_details || '[deal]'}
What happened: ${inputs.what_happened || '[what happened]'}
Their feedback: ${inputs.their_feedback || '[feedback]'}

Conduct a thorough win/loss analysis:

1. DEAL TIMELINE RECONSTRUCTION:
   Map the key moments: first contact → discovery → demo → proposal → decision.
   At each stage: what went well, what was a warning sign we missed?

2. ROOT CAUSE ANALYSIS:
   For outcome: "${inputs.outcome || '[outcome]'}"
   
   Was this lost/won because of:
   - Product fit (did we have what they needed?)
   - Pricing and value perception
   - Sales process (how we sold, not what we sold)
   - Competition (specific competitor advantages)
   - Timing and urgency (was it the right time?)
   - Relationship (did we have the right stakeholders?)
   - Internal factors (their budget, politics, priorities changed)

3. WHAT THEIR FEEDBACK REVEALS:
   "${inputs.their_feedback || '[feedback]'}" — what is the real message here?
   What are they NOT saying?

4. WHAT WE SHOULD HAVE DONE DIFFERENTLY:
   3 specific moments where a different action could have changed the outcome.

5. PROCESS IMPROVEMENTS:
   Based on this deal — what should we change in our:
   - Qualification criteria
   - Discovery questions
   - Demo approach
   - Proposal structure
   - Competitive positioning

6. WHAT TO REPLICATE (if a win):
   What specifically drove this win that we should do in every deal?

7. ONE ACTION: The single most impactful change to make immediately.`
  },
]

const phases = ['All', 'Prospect', 'Qualify', 'Propose', 'Negotiate', 'Nurture', 'Grow', 'Learn']

export default function SalesToolkit() {
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
          <span className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded-full">Sales Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Sales Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Close more deals. In less time.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows covering the full sales cycle — from cold outreach to negotiation, account growth, and win/loss analysis.
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
                      Tip: Start with workflow 01 (Cold Email) to open the door, then use 02 (Discovery) to qualify fast.
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