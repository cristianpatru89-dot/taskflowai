'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'property_description',
    number: '01',
    name: 'Property Description Writer',
    tagline: 'Write listings that sell properties faster',
    phase: 'List',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before listing any property',
    description: 'Creates compelling property descriptions that highlight the right features for the right buyer.',
    inputs: [
      { id: 'property_details', label: 'Property details', placeholder: 'e.g. 3-bed, 2-bath semi-detached house, 120sqm, built 2005, south-facing garden, new kitchen 2023, garage, quiet cul-de-sac', type: 'textarea' },
      { id: 'location', label: 'Location and nearby amenities', placeholder: 'e.g. Floreasca, Bucharest — 5 min walk to metro, next to Floreasca Park, top-rated schools within 500m', type: 'textarea' },
      { id: 'target_buyer', label: 'Target buyer', placeholder: '', type: 'select', options: ['Young professional / couple', 'Family with children', 'Investor / buy-to-let', 'Downsizer / retiree', 'Luxury buyer'] },
      { id: 'price', label: 'Asking price', placeholder: 'e.g. €285,000', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a luxury real estate copywriter. Write property descriptions that make buyers feel the lifestyle, not just read the specs.

Property: ${inputs.property_details || '[details]'}
Location: ${inputs.location || '[location]'}
Target buyer: ${inputs.target_buyer || '[buyer]'}
Price: ${inputs.price || '[price]'}

Write a compelling property listing:

HEADLINE (under 10 words):
Not "3-bed house in Floreasca" — something that evokes the lifestyle this property offers.

OPENING PARAGRAPH (3-4 sentences):
Paint the picture of life in this property. Write for "${inputs.target_buyer || '[buyer]'}".
Make them imagine themselves there before they have seen it.

THE PROPERTY (2-3 paragraphs):
Walk through the property in a logical, visual sequence.
Lead with the best features. Use sensory language.
${inputs.property_details || '[details]'}

THE LOCATION (1 paragraph):
${inputs.location || '[location]'}
Sell the neighbourhood, not just the address.

THE OPPORTUNITY:
One sentence that creates gentle urgency without being pushy.

BULLET POINT SUMMARY (for portal listings):
8-10 key features in scannable format.

Rules:
- No "must-see", "rare opportunity", "dream home" clichés
- Specific details beat adjectives ("south-facing garden" beats "beautiful garden")
- Write for the buyer, not the seller
- Under 400 words total`
  },
  {
    id: 'buyer_email',
    number: '02',
    name: 'Buyer Communication Kit',
    tagline: 'Communicate with buyers at every stage of the process',
    phase: 'Sell',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'Throughout the buying process',
    description: 'Creates professional buyer communications for every stage — first enquiry to completion.',
    inputs: [
      { id: 'communication_type', label: 'Communication type', placeholder: '', type: 'select', options: ['First response to enquiry', 'Viewing confirmation', 'Post-viewing follow-up', 'Offer received notification', 'Sale agreed confirmation', 'Completion day message', 'Referral request after sale'] },
      { id: 'context', label: 'Specific context', placeholder: 'e.g. Buyer enquired about 3-bed in Floreasca, seems serious, asked specific questions about parking and school catchment', type: 'textarea' },
      { id: 'tone', label: 'Tone', placeholder: '', type: 'select', options: ['Professional and warm', 'Luxury / high-end', 'Friendly and accessible', 'Corporate / formal'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a top real estate agent known for client communication that builds trust and moves deals forward.

Communication: ${inputs.communication_type || '[type]'}
Context: ${inputs.context || '[context]'}
Tone: ${inputs.tone || '[tone]'}

Write the communication:

SUBJECT LINE (if email): Specific and relevant — not "RE: Property Enquiry"

OPENING: Personal, acknowledges their specific situation.

MAIN MESSAGE:
For ${inputs.communication_type || '[type]'}:

If FIRST RESPONSE: Acknowledge their interest specifically, answer any questions they asked, propose next step (viewing) with 2 specific time options.

If POST-VIEWING: Ask what they thought, address any concerns they raised, keep door open without pressure.

If OFFER RECEIVED: Acknowledge promptly, set timeline for response, manage expectations on process.

If SALE AGREED: Celebrate the milestone, set out clear next steps, provide key contacts (solicitor, mortgage broker if needed).

If COMPLETION: Warm congratulations, practical information (keys, utilities), invite review/referral.

NEXT STEP: One clear, specific next action.

CLOSING: Warm, professional, accessible.

Rules:
- Always respond to specific questions they asked
- Never leave them wondering what happens next
- Under 200 words
- ${inputs.tone || '[tone]'} tone throughout`
  },
  {
    id: 'market_analysis',
    number: '03',
    name: 'Market Analysis Report',
    tagline: 'Give clients the market insight that builds your credibility',
    phase: 'Advise',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'For valuation appointments or client market updates',
    description: 'Structures a local market analysis report that positions you as the area expert.',
    inputs: [
      { id: 'area', label: 'Area or postcode', placeholder: 'e.g. Floreasca district, Bucharest / SW11, London / District 1, Cluj-Napoca', type: 'text' },
      { id: 'property_type', label: 'Property type focus', placeholder: 'e.g. 2-3 bed apartments, family houses, new build developments', type: 'text' },
      { id: 'market_data', label: 'Market data you have', placeholder: 'e.g. Average sold price: €185k, 23 sales last quarter, average days to sell: 34, 12% price increase YoY, 45 current listings', type: 'textarea' },
      { id: 'audience', label: 'Report audience', placeholder: '', type: 'select', options: ['Seller considering listing', 'Buyer researching the area', 'Landlord / investor', 'General market update newsletter'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a market analyst and local property expert. Write a report that demonstrates deep local knowledge and positions you as the go-to agent in this area.

Area: ${inputs.area || '[area]'}
Property type: ${inputs.property_type || '[type]'}
Market data: ${inputs.market_data || '[data]'}
Audience: ${inputs.audience || '[audience]'}

Write a local market analysis report:

HEADLINE: [Area] Property Market — [Quarter/Month] [Year] | Key Insights for ${inputs.audience || '[audience]'}

MARKET SNAPSHOT:
${inputs.market_data || '[data]'}
Present as: clear metrics with context — not just numbers, but what they mean.

WHAT IS HAPPENING IN THE MARKET:
3 key trends affecting ${inputs.area || '[area]'} right now.
For each: the trend, the evidence, and what it means for buyers/sellers.

PRICE ANALYSIS:
Current price levels for ${inputs.property_type || '[type]'}.
YoY change and what is driving it.
Value hotspots within the area (if data allows).

DEMAND AND SUPPLY:
How quickly are properties selling?
Is it a buyer's or seller's market right now?
What is driving demand in this area?

SPECIFICALLY FOR ${inputs.audience?.toUpperCase() || '[AUDIENCE]'}:
What these market conditions mean for their specific situation.
Practical advice based on the data.

OUTLOOK:
What to watch in the next 3-6 months.

ABOUT THE AGENT:
3 sentences — your local expertise, recent sales in the area, why they should work with you.`
  },
  {
    id: 'valuation_report',
    number: '04',
    name: 'Property Valuation Report',
    tagline: 'Present valuations that clients trust and accept',
    phase: 'Advise',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'After a valuation appointment',
    description: 'Creates a professional valuation report with comparable evidence and strategic pricing recommendation.',
    inputs: [
      { id: 'property', label: 'Property being valued', placeholder: 'e.g. 3-bed semi-detached, 120sqm, good condition, south garden, garage, Floreasca area', type: 'textarea' },
      { id: 'comparables', label: 'Comparable sales', placeholder: 'e.g. Similar 3-bed sold at €290k in Feb (120sqm, no garage), €310k in Jan (130sqm, renovated), €265k in Dec (110sqm, needs work)', type: 'textarea' },
      { id: 'recommended_price', label: 'Your recommended asking price', placeholder: 'e.g. €285,000 — €295,000', type: 'text' },
      { id: 'market_context', label: 'Current market context', placeholder: 'e.g. Market is active, average 34 days to sell, well-priced properties getting multiple offers', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a senior estate agent presenting a professional valuation. The goal is to give an honest, evidence-based price recommendation that the client trusts.

Property: ${inputs.property || '[property]'}
Comparables: ${inputs.comparables || '[comparables]'}
Recommended price: ${inputs.recommended_price || '[price]'}
Market context: ${inputs.market_context || '[market]'}

Write a professional valuation report:

1. PROPERTY SUMMARY:
   Key features and condition of ${inputs.property || '[property]'}.
   What adds value vs what might reduce value.

2. COMPARABLE EVIDENCE:
   ${inputs.comparables || '[comparables]'}
   For each comparable:
   - Address/description
   - Sale price and date
   - Key similarities to subject property
   - Key differences (and price adjustment)

3. MARKET CONTEXT:
   ${inputs.market_context || '[market]'}
   How current market conditions affect pricing strategy.

4. PRICING RECOMMENDATION:
   Recommended asking price: ${inputs.recommended_price || '[price]'}
   
   Why this price:
   - Evidence base (from comparables)
   - Market positioning (where this sits vs competition)
   - Expected buyer profile at this price

5. PRICING STRATEGY OPTIONS:
   Option A: [Recommended price] — Expected outcome
   Option B: [Higher price] — Risk and reward
   Option C: [Lower price] — When this makes sense

6. NEXT STEPS:
   What happens if they choose to list with you.
   Timeline from instruction to market.`
  },
  {
    id: 'landlord_letter',
    number: '05',
    name: 'Landlord & Tenancy Communications',
    tagline: 'Handle landlord and tenant communications professionally',
    phase: 'Manage',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'For property management communications',
    description: 'Creates professional communications for common landlord-tenant situations.',
    inputs: [
      { id: 'communication_type', label: 'Communication type', placeholder: '', type: 'select', options: ['Tenancy offer letter', 'Rent increase notice', 'Maintenance request response', 'Lease renewal offer', 'Notice to vacate / end of tenancy', 'Late rent notice', 'Property inspection notice'] },
      { id: 'context', label: 'Specific situation', placeholder: 'e.g. Tenant has been in property 2 years, excellent tenant, proposing 5% rent increase from €900 to €945/month on renewal', type: 'textarea' },
      { id: 'jurisdiction', label: 'Country / jurisdiction', placeholder: 'e.g. Romania, UK, Germany, Spain', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a property management expert. Write communications that are professional, legally appropriate, and maintain good landlord-tenant relationships.

Communication: ${inputs.communication_type || '[type]'}
Context: ${inputs.context || '[context]'}
Jurisdiction: ${inputs.jurisdiction || '[jurisdiction]'}

Write a professional ${inputs.communication_type || '[type]'}:

[Generate the appropriate communication based on the type selected]

For RENT INCREASE: Include current rent, new rent, effective date, notice period, and a warm acknowledgment of the tenancy.

For MAINTENANCE: Acknowledge the issue, confirm action being taken, set realistic timeline.

For RENEWAL: Express value of the tenancy, clear terms, deadline for response.

For NOTICE TO VACATE: Clear timeline, condition expectations, deposit return process.

For LATE RENT: Firm but not aggressive, clear payment deadline, consequence if not resolved.

IMPORTANT NOTES:
- Flag any specific legal requirements for ${inputs.jurisdiction || '[jurisdiction]'} that must be checked
- Note where specific notice periods or legal language is required
- Add: "Please verify compliance with local tenancy law before sending"

Tone: Professional, clear, firm where needed but always respectful of the tenancy relationship.`
  },
  {
    id: 'negotiation_real_estate',
    number: '06',
    name: 'Offer & Negotiation Guide',
    tagline: 'Negotiate property deals that satisfy both sides',
    phase: 'Sell',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'When an offer is received or when making an offer',
    description: 'Prepares negotiation strategy and scripts for both buyer and seller situations.',
    inputs: [
      { id: 'situation', label: 'Negotiation situation', placeholder: '', type: 'select', options: ['Seller received an offer below asking', 'Buyer wants to make a below-asking offer', 'Multiple offers situation (seller)', 'Buyer in a bidding war', 'Deal at risk of falling through'] },
      { id: 'details', label: 'Key details', placeholder: 'e.g. Asking price €285k. Offer received: €260k. Property has been on market 6 weeks. Seller needs to move in 3 months. Buyer seems motivated.', type: 'textarea' },
      { id: 'your_role', label: 'Your role', placeholder: '', type: 'select', options: ['Agent representing the seller', 'Agent representing the buyer', 'Agent representing both (dual agency)', 'Private seller', 'Private buyer'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an experienced real estate negotiator. Good negotiation in property leaves both sides feeling they got a fair deal.

Situation: ${inputs.situation || '[situation]'}
Details: ${inputs.details || '[details]'}
Your role: ${inputs.your_role || '[role]'}

Prepare a negotiation strategy:

1. SITUATION ANALYSIS:
   What does each party want vs what do they need?
   What is each party's BATNA (best alternative to negotiated agreement)?

2. LEVERAGE ASSESSMENT:
   Who has more leverage and why?
   Time pressure, motivation, alternatives for each party.

3. NEGOTIATION STRATEGY:
   Based on "${inputs.situation || '[situation]'}" — what is the recommended approach?

4. OPENING MOVE:
   What to say first and how to say it.
   Exact scripts for the key conversation.

5. COUNTER-OFFER FRAMEWORK:
   If offer is low: how to counter without insulting the buyer.
   If buyer pushes back: what concessions to make and in what order.

6. NON-PRICE NEGOTIATION LEVERS:
   What else can be negotiated beyond price?
   (Completion date, fixtures/fittings, legal fees, surveys)

7. CLOSING THE DEAL:
   When and how to move to verbal agreement.
   What to confirm in writing immediately.

8. WALK-AWAY POINT:
   At what point does this deal not make sense?
   How to exit without burning the relationship.`
  },
  {
    id: 'open_house',
    number: '07',
    name: 'Open House Planner',
    tagline: 'Run viewings that convert browsers into buyers',
    phase: 'List',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before any property viewing or open house',
    description: 'Creates a complete open house plan with preparation checklist, viewing script, and follow-up strategy.',
    inputs: [
      { id: 'property', label: 'Property details', placeholder: 'e.g. 3-bed family home, recently renovated kitchen, large garden, quiet street', type: 'text' },
      { id: 'target_buyer', label: 'Expected buyer profile', placeholder: 'e.g. Families with young children, looking in €250-300k range, likely first-time movers from apartments', type: 'text' },
      { id: 'key_selling_points', label: 'Top 3 selling points', placeholder: 'e.g. School catchment area, south-facing garden, new kitchen', type: 'text' },
      { id: 'known_objections', label: 'Likely objections to prepare for', placeholder: 'e.g. Road noise from nearby street, smaller third bedroom, no off-street parking', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a top-performing estate agent. Plan a viewing experience that turns interested buyers into motivated buyers.

Property: ${inputs.property || '[property]'}
Target buyer: ${inputs.target_buyer || '[buyer]'}
Key selling points: ${inputs.key_selling_points || '[points]'}
Known objections: ${inputs.known_objections || '[objections]'}

Create a complete viewing plan:

PRE-VIEWING PREPARATION CHECKLIST:
Property presentation: [specific things to do]
Agent preparation: [what to know and bring]
Atmosphere: [lighting, temperature, scent, music]

VIEWING ROUTE:
The optimal order to show rooms — ending on the strongest feature.
For each room: what to highlight, what to say, what NOT to draw attention to.

KEY SELLING POINTS TO LAND:
For each point in "${inputs.key_selling_points || '[points]'}":
- When to mention it
- Exactly how to phrase it (show, do not tell)
- Question to ask buyer to engage them

OBJECTION HANDLING:
For each objection in "${inputs.known_objections || '[objections]'}":
- Acknowledge honestly (never deny a real issue)
- Reframe positively
- Give them the information to make their own decision

QUALIFYING QUESTIONS TO ASK:
5 questions to understand how serious this buyer is and what they need.
(Without being pushy or invasive)

POST-VIEWING FOLLOW-UP SEQUENCE:
- Same day: [message]
- Day 3: [message]
- Day 7: [message]
Each: what to say and what information to include.`
  },
  {
    id: 'investment_analysis',
    number: '08',
    name: 'Property Investment Analyzer',
    tagline: 'Analyze any property investment in minutes',
    phase: 'Invest',
    phaseColor: 'bg-indigo-50 text-indigo-600',
    context: 'When evaluating a buy-to-let or investment property',
    description: 'Creates a structured investment analysis with yield calculations, cash flow, and risk assessment.',
    inputs: [
      { id: 'property', label: 'Property details', placeholder: 'e.g. 2-bed apartment, asking price €180,000, estimated rental €900/month, service charge €120/month, area: Floreasca, Bucharest', type: 'textarea' },
      { id: 'purchase_costs', label: 'Purchase costs and financing', placeholder: 'e.g. 25% deposit (€45,000), mortgage rate 6.5%, arrangement fee €1,500, legal fees €2,000, stamp duty/tax €3,600', type: 'textarea' },
      { id: 'investor_goal', label: 'Investment goal', placeholder: '', type: 'select', options: ['Rental yield / monthly income', 'Capital growth over 5-10 years', 'Both yield and growth', 'Short-term flip / renovation'] },
      { id: 'market_context', label: 'Local market context', placeholder: 'e.g. Floreasca has seen 8% capital growth YoY, high rental demand from young professionals, low vacancy rates', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a property investment analyst. Provide an honest, thorough analysis — including the risks, not just the upside.

Property: ${inputs.property || '[property]'}
Purchase costs: ${inputs.purchase_costs || '[costs]'}
Investment goal: ${inputs.investor_goal || '[goal]'}
Market context: ${inputs.market_context || '[market]'}

Analyze this investment:

1. PURCHASE COST SUMMARY:
   Total investment required (deposit + all costs):
   [Calculate from: "${inputs.purchase_costs || '[costs]'}"]

2. YIELD ANALYSIS:
   Gross rental yield: (Annual rent / Purchase price) × 100 = X%
   Net rental yield: (Annual rent - annual costs) / Purchase price × 100 = X%
   Monthly cash flow: Rent - Mortgage - Costs = €X/month

3. CASH FLOW PROJECTION (Year 1):
   Income: Rent × 12 (with 5% void allowance)
   Costs: Mortgage + Service charge + Insurance + Maintenance (1% of value) + Management (if applicable)
   Net cash flow: Income - Costs

4. CAPITAL GROWTH SCENARIO (5-year):
   Conservative (3% p.a.): Value in year 5 = €X
   Moderate (6% p.a.): Value in year 5 = €X
   Based on: "${inputs.market_context || '[market]'}"

5. TOTAL RETURN ANALYSIS:
   Cash flow over 5 years + Capital growth = Total return
   Return on investment (ROI) on cash deployed

6. RISK ASSESSMENT:
   - Void risk: How quickly does this area re-let?
   - Interest rate risk: Impact of +2% rate rise on cash flow
   - Maintenance risk: Age and condition flags
   - Market risk: What could negatively affect values?

7. VERDICT for goal "${inputs.investor_goal || '[goal]'}":
   Does this investment make sense? What are the conditions under which it does or does not?

Note: Always recommend professional financial and tax advice before investing.`
  },
  {
    id: 'social_media_real_estate',
    number: '09',
    name: 'Real Estate Social Media Kit',
    tagline: 'Build your personal brand as the local property expert',
    phase: 'Market',
    phaseColor: 'bg-pink-50 text-pink-600',
    context: 'Weekly social media content creation',
    description: 'Creates a week of social content that builds your reputation as the go-to agent in your area.',
    inputs: [
      { id: 'agent_profile', label: 'Your profile and specialty', placeholder: 'e.g. Estate agent specializing in Floreasca and Dorobanți areas, Bucharest. 8 years experience. Focus on family homes.', type: 'text' },
      { id: 'recent_activity', label: 'Recent activity to feature', placeholder: 'e.g. Just sold a property above asking in 12 days, recently listed a stunning penthouse, completed 5 sales this month', type: 'text' },
      { id: 'platforms', label: 'Social platforms', placeholder: '', type: 'select', options: ['Instagram + Facebook', 'LinkedIn only', 'All platforms', 'Instagram only', 'TikTok + Instagram'] },
      { id: 'market_insight', label: 'One market insight to share', placeholder: 'e.g. Properties in Floreasca are selling 15% faster this month vs last year, first-time buyers are struggling with mortgage rates', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a real estate social media strategist. Build content that makes local homeowners think of this agent first when they decide to sell.

Agent: ${inputs.agent_profile || '[agent]'}
Recent activity: ${inputs.recent_activity || '[activity]'}
Platforms: ${inputs.platforms || '[platforms]'}
Market insight: ${inputs.market_insight || '[insight]'}

Create a week of social content:

POST 1 — MONDAY (Market Insight):
Share: "${inputs.market_insight || '[insight]'}"
Format: Data + your interpretation + what it means for homeowners
Hook: [First line that stops the scroll]
Body: [The insight in plain language]
CTA: [Invite engagement — not "call me"]

POST 2 — TUESDAY (Property Spotlight):
Feature: a recent listing or sale from "${inputs.recent_activity || '[activity]'}"
Format: Property story — not just specs
What made this property special, why it sold quickly, what buyers loved

POST 3 — WEDNESDAY (Education / Value Add):
Topic: One thing homeowners in your area need to know right now
Format: Practical tip or myth-busting
Position you as the expert, not the salesperson

POST 4 — THURSDAY (Behind the Scenes):
Show the work — a day in your life, a challenge you solved, a market observation
Makes you human and relatable

POST 5 — FRIDAY (Social Proof):
A result, a client story (anonymized if needed), a milestone
Format: Before → Process → Result
Specific numbers wherever possible

For each post:
- Platform-specific format for ${inputs.platforms || '[platforms]'}
- Hashtag suggestions (5-8, mix of local and broad)
- Best time to post`
  },
  {
    id: 'referral_network',
    number: '10',
    name: 'Referral Network Builder',
    tagline: 'Build the professional network that sends you deals',
    phase: 'Market',
    phaseColor: 'bg-pink-50 text-pink-600',
    context: 'Building your referral pipeline',
    description: 'Creates outreach templates and a referral strategy to build relationships with solicitors, mortgage brokers, and other referral sources.',
    inputs: [
      { id: 'agent_profile', label: 'Your profile and area', placeholder: 'e.g. Independent estate agent, Floreasca/Dorobanți specialist, 8 years experience, 40+ sales in last 12 months', type: 'text' },
      { id: 'referral_target', label: 'Who do you want referrals from?', placeholder: '', type: 'select', options: ['Solicitors / conveyancers', 'Mortgage brokers / financial advisors', 'Letting agents', 'Developers / builders', 'Corporate relocation companies', 'All of the above'] },
      { id: 'your_offer', label: 'What value can you offer them?', placeholder: 'e.g. Fast sales track record (avg 34 days to sell), client referrals back to them, market data and updates, joint events', type: 'textarea' },
      { id: 'current_network', label: 'Current referral network status', placeholder: 'e.g. Have 2 solicitors who send occasional referrals, no relationships with mortgage brokers yet', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a business development expert for estate agents. Build a referral strategy that creates consistent deal flow without advertising spend.

Agent profile: ${inputs.agent_profile || '[profile]'}
Target referral sources: ${inputs.referral_target || '[target]'}
Value you offer: ${inputs.your_offer || '[value]'}
Current network: ${inputs.current_network || '[current]'}

Build a referral network strategy:

1. REFERRAL SOURCE ANALYSIS:
   For ${inputs.referral_target || '[target]'}:
   - Why they are valuable as a referral source
   - What they need from an agent partner
   - How to find the right contacts

2. INITIAL OUTREACH EMAIL:
   To: [Target professional]
   Subject: [Not "Let's connect" — something specific and valuable]
   
   Body: (under 150 words)
   - Why you are reaching out specifically to them
   - What value you bring to their clients
   - Specific ask (coffee meeting / call / share market data)
   
   NOT: "I would love to pick your brain"
   YES: "I have data on [area] property values that might be useful for your clients considering equity release"

3. RELATIONSHIP MAINTENANCE CALENDAR:
   Month 1: First meeting / coffee
   Month 2: Send something valuable (market data, interesting case study)
   Month 3: Check in — any clients you can help?
   Ongoing: Quarterly touchpoints that add value

4. RECIPROCAL VALUE SYSTEM:
   Based on "${inputs.your_offer || '[value]'}" — a specific structure for mutual referrals.

5. REFERRAL TRACKING:
   Simple system to track: who sent what, when to follow up, how to thank them.

6. THE THANK YOU PROCESS:
   How to acknowledge referrals in a way that gets you more of them.`
  },
]

const phases = ['All', 'List', 'Sell', 'Advise', 'Manage', 'Invest', 'Market']

export default function RealEstateToolkit() {
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
          <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">Real Estate Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Real Estate Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            List faster. Sell better. Build your reputation.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for estate agents and property professionals — listings, client communication, market analysis, valuations, investment analysis, and more.
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
                      Tip: Start with workflow 03 (Market Analysis) to build credibility, then 01 (Property Description) to win the listing.
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