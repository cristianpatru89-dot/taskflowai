'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'opportunity',
    number: '01',
    name: 'Opportunity Assessor',
    tagline: 'Turn a raw idea into a strategic brief',
    phase: 'Discovery',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Early stage — before any design or engineering time is spent',
    description: 'Takes a raw feature idea or customer complaint and produces a rigorous strategic assessment in minutes.',
    inputs: [
      { id: 'raw_idea', label: 'Raw idea or customer request', placeholder: 'e.g. Customers keep asking for a bulk export feature. Sales is pushing it hard but we have no data on usage.', type: 'textarea' },
      { id: 'company_type', label: 'Company type', placeholder: '', type: 'select', options: ['B2B SaaS product company', 'B2C product company', 'Outsourcing / agency', 'Enterprise software', 'Startup pre-PMF'] },
      { id: 'stage', label: 'Product stage', placeholder: '', type: 'select', options: ['Pre-launch / MVP', 'Early growth (0–100 customers)', 'Scaling (100–1000 customers)', 'Mature product'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an elite Product Strategy Consultant and Principal Product Manager at a ${inputs.company_type || 'B2B SaaS product company'} at the ${inputs.stage || 'early growth'} stage.

Analyze this raw product idea: "${inputs.raw_idea || '[paste your idea here]'}"

Produce an Opportunity Assessment structured exactly as follows:

1. THE CRITICAL PROBLEM: Define the core customer pain point in 2-3 direct sentences. What is the customer trying to accomplish and why is the current workaround failing?

2. TARGET AUDIENCE: Profile the primary user persona and the economic buyer.

3. VALUE PROPOSITION: One sentence — no jargon, no buzzwords.

4. BUSINESS IMPACT: Which core metric does this drive (LTV, Churn, Activation, CAC)? Explain the exact mechanism.

5. RISKS & ASSUMPTIONS: 3 critical assumptions that must be true for this to succeed.

6. MVP SCOPE: The absolute smallest thing we could build in 2 weeks to validate this.

Be direct and critical. Do not use: leverage, seamless, synergy, disruptive, innovative.`
  },
  {
    id: 'interview',
    number: '02',
    name: 'User Interview Kit',
    tagline: 'Run unbiased research sessions that actually reveal truth',
    phase: 'Discovery',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before writing a single requirement',
    description: 'Generates a complete interview guide and synthesis template to validate your assumptions with real users.',
    inputs: [
      { id: 'hypothesis', label: 'Core hypothesis to validate', placeholder: 'e.g. Finance managers waste 3+ hours/week manually reconciling invoices because our export format doesn\'t match their ERP system.', type: 'textarea' },
      { id: 'participant', label: 'Who are you interviewing?', placeholder: 'e.g. Finance manager at a 50-200 person B2B company', type: 'text' },
      { id: 'num_interviews', label: 'Number of interviews planned', placeholder: '', type: 'select', options: ['3–5 interviews', '6–10 interviews', '10+ interviews'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an expert User Researcher who designs interviews that extract facts about real behavior, not opinions about hypothetical features.

Core hypothesis I need to validate: "${inputs.hypothesis || '[your hypothesis]'}"
Participant profile: "${inputs.participant || '[participant description]'}"
Planned sessions: ${inputs.num_interviews || '5'}

Create a complete User Interview Guide containing:

1. SCREENER QUESTIONS (2): To confirm the participant fits the profile before starting.

2. RAPPORT BUILDERS (2 min): 3 warm-up questions about their day-to-day routine.

3. BEHAVIOR EXPLORATION (15 min): 5 deep-dive questions about how they currently solve the problem. Every question must ask about past or current behavior — never about hypothetical features. Use "Tell me about the last time you..." format.

4. PROBES & DRILL-DOWNS: 4 follow-up triggers for vague answers.

5. SYNTHESIS TEMPLATE: Markdown-formatted with fields for: Key Quotes, Current Workarounds, Friction Points, Surprise Insights.

Never ask "Would you like a feature that..." — only ask about real past behavior.`
  },
  {
    id: 'prd',
    number: '03',
    name: 'PRD Generator',
    tagline: 'From validated idea to engineering-ready document',
    phase: 'Definition',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'After discovery — before design or engineering kickoff',
    description: 'Produces a comprehensive PRD that engineering can estimate directly from, with zero ambiguity.',
    inputs: [
      { id: 'feature_name', label: 'Feature name', placeholder: 'e.g. Bulk Invoice Export', type: 'text' },
      { id: 'target_user', label: 'Target user', placeholder: 'e.g. Finance manager at mid-market B2B company', type: 'text' },
      { id: 'core_problem', label: 'Validated problem statement', placeholder: 'e.g. Finance managers spend 3+ hours/week manually copying invoice data into their ERP because our CSV export format is missing 4 required fields.', type: 'textarea' },
      { id: 'constraints', label: 'Constraints', placeholder: 'e.g. Must ship in 3 sprints, cannot change database schema, no new third-party integrations', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a meticulous Principal Product Manager at a high-performing B2B SaaS company. You write PRDs that are crisp, direct, and completely free of ambiguity.

Write a comprehensive PRD for: "${inputs.feature_name || '[feature name]'}"

Target user: ${inputs.target_user || '[target user]'}
Core problem: ${inputs.core_problem || '[problem statement]'}
Constraints: ${inputs.constraints || '[constraints]'}

Structure the PRD with these exact sections:

1. DOCUMENT METADATA: Title, Target Release, Lead PM, Status (Draft)

2. PROBLEM STATEMENT & CONTEXT: Why we are building this, with quantitative or qualitative evidence.

3. GOALS & NON-GOALS:
   - Goals: Max 3, each measurable
   - Non-Goals: Explicit out-of-scope items to prevent scope creep

4. FUNCTIONAL REQUIREMENTS: Table format:
   | ID | User Story | Priority (P0/P1/P2) | Technical Notes |

5. KEY USER FLOWS: Step-by-step happy path from the user's perspective.

6. EDGE CASES & ERROR HANDLING: Missing inputs, network failures, authorization errors.

7. METRICS & TELEMETRY: Which exact events must be instrumented to measure success.

8. OPEN QUESTIONS: Unresolved architectural or business questions.

No passive voice. No marketing language. Keep every requirement actionable.`
  },
  {
    id: 'competitive',
    number: '04',
    name: 'Competitive Whitespace Analyzer',
    tagline: 'Find the gap no competitor is filling',
    phase: 'Definition',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'After writing your PRD — before finalizing positioning',
    description: 'Maps your feature against competitors to find unique positioning and strategic weaknesses to exploit.',
    inputs: [
      { id: 'our_product', label: 'Your product description', placeholder: 'e.g. Airport billing platform that handles airline invoicing, ground services contracts, and revenue reconciliation for regional airports', type: 'textarea' },
      { id: 'competitors', label: 'Competitors (comma separated)', placeholder: 'e.g. Salesforce, HubSpot, Zoho', type: 'text' },
      { id: 'feature_focus', label: 'Feature you\'re comparing', placeholder: 'e.g. Bulk invoice export with ERP field mapping', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a Competitive Intelligence Officer and Tech Industry Analyst. You look past marketing pages to analyze functional capabilities and strategic weaknesses.

Our product: "${inputs.our_product || '[product description]'}"
Feature we are introducing: "${inputs.feature_focus || '[feature]'}"
Competitors: ${inputs.competitors || '[competitor list]'}

Generate:

1. FEATURE CAPABILITY MATRIX: Markdown table comparing our feature against each competitor.
   Columns: Feature capability | Us | [each competitor]
   Values: Yes / No / Partial / Unknown

2. COMPETITOR WEAKNESS ANALYSIS: For each competitor, 1-2 known structural gaps or common user complaints we can exploit.

3. DIFFERENTIATION STRATEGY: How should we position our approach to make the competitor's solution look outdated or overly complex?

4. THE WHITESPACE OPPORTUNITY: One paragraph — the strategic gap none of them are addressing, and how we lean into it.

Base your analysis on known public information, G2/Capterra reviews, and common industry patterns.`
  },
  {
    id: 'userstories',
    number: '05',
    name: 'User Story Builder',
    tagline: 'PRD requirements → sprint-ready Jira tickets',
    phase: 'Execution',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'After PRD approval — before sprint planning',
    description: 'Breaks your PRD into independent, testable user stories with Gherkin acceptance criteria ready for QA.',
    inputs: [
      { id: 'requirements', label: 'Paste your PRD functional requirements', placeholder: 'Paste Section 4 and 5 from your PRD here...', type: 'textarea' },
      { id: 'team_type', label: 'Team type', placeholder: '', type: 'select', options: ['Full-stack team', 'Separate frontend/backend', 'Outsourced development', 'Mixed in-house + outsourced'] },
      { id: 'sprint_length', label: 'Sprint length', placeholder: '', type: 'select', options: ['1 week', '2 weeks', '3 weeks'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an expert Technical Product Manager and Agile Scrum Master. You use the INVEST framework (Independent, Negotiable, Valuable, Estimable, Small, Testable).

Team type: ${inputs.team_type || 'full-stack'}
Sprint length: ${inputs.sprint_length || '2 weeks'}

Based on these PRD requirements:
${inputs.requirements || '[paste your PRD requirements here]'}

Break the work into sprint-ready user stories. For each story output:

1. STORY TITLE: Action-oriented (e.g., "Billing: CSV Export Field Mapping Configuration")

2. USER STORY: "As a [role], I want to [action] so that [business value]"

3. ACCEPTANCE CRITERIA (Gherkin format):
   - Given [pre-condition]
   - When [user action]
   - Then [expected system behavior]

4. EDGE CASE SCENARIO: At least 1 negative path (failed validation, bad input, timeout)

5. COMPLEXITY: T-shirt size (S/M/L) with technical justification

6. DEPENDENCIES: Upstream/downstream blockers, migrations required

Group stories by epic where there are more than 4.`
  },
  {
    id: 'rice',
    number: '06',
    name: 'RICE Prioritization Engine',
    tagline: 'Defend your roadmap with math, not opinions',
    phase: 'Execution',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Quarterly planning or when stakeholders push competing priorities',
    description: 'Scores and ranks your backlog using RICE, with a strategic commentary on quick wins, deferred items, and trade-offs.',
    inputs: [
      { id: 'features', label: 'Features to prioritize (one per line)', placeholder: 'Bulk invoice export\nCustom field mapping\nAutomated reconciliation\nMulti-currency support\nAudit trail export', type: 'textarea' },
      { id: 'quarterly_goals', label: 'Quarterly goals', placeholder: 'e.g. Reduce customer support tickets by 30%, increase trial-to-paid conversion by 5%', type: 'textarea' },
      { id: 'capacity', label: 'Team capacity', placeholder: 'e.g. 2 frontend + 2 backend developers, 6-week cycle', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a data-driven Chief Product Officer. You make priority decisions based on quantitative metrics, not the loudest voice in the room.

Features to evaluate:
${inputs.features || '[list your features]'}

Quarterly goals: ${inputs.quarterly_goals || '[quarterly goals]'}
Team capacity: ${inputs.capacity || '[team capacity]'}

For each feature calculate:

1. REACH (1–1000+): Users impacted in 90 days. State your assumption.
2. IMPACT (0.25–3): 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal
3. CONFIDENCE (50–100%): 100%=data-backed, 80%=medium, 50%=speculative
4. EFFORT (person-weeks): Development time estimate
5. RICE SCORE: (Reach × Impact × Confidence) / Effort

Output:
- Ranked leaderboard table with all scores
- STRATEGIC COMMENTARY:
  • Quick win: highest score, lowest effort
  • Strategic exception: low RICE but critical for compliance/infrastructure
  • Cut list: features to defer given capacity constraints`
  },
  {
    id: 'stakeholder',
    number: '07',
    name: 'Stakeholder Update Writer',
    tagline: 'Executive updates that get read in 60 seconds',
    phase: 'Alignment',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'Weekly — for C-suite, VP, or client reporting',
    description: 'Translates raw status notes into a crisp executive update that communicates health, risks, and decisions needed.',
    inputs: [
      { id: 'project_name', label: 'Project name', placeholder: 'e.g. Billing Module v2', type: 'text' },
      { id: 'status', label: 'Project status', placeholder: '', type: 'select', options: ['🟢 Green — on track', '🟡 Yellow — at risk', '🔴 Red — off track'] },
      { id: 'completed', label: 'What was completed this week', placeholder: 'e.g. Finalized PRD, completed API design, shipped invoice export to staging', type: 'textarea' },
      { id: 'risks', label: 'Risks or blockers', placeholder: 'e.g. Backend API delayed 3 days due to dependency on auth team. Risk to launch date.', type: 'textarea' },
      { id: 'decisions', label: 'Decisions needed from leadership', placeholder: 'e.g. Approve $8k budget for third-party ERP connector by Friday', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an executive communication expert. Senior executives have 60 seconds — respect their time.

Project: ${inputs.project_name || '[project name]'}
Status: ${inputs.status || 'Green'}
Completed: ${inputs.completed || '[completions]'}
Risks: ${inputs.risks || '[risks]'}
Decisions needed: ${inputs.decisions || '[decisions]'}

Write an executive stakeholder update under 200 words using this exact structure:

📌 EXECUTIVE SUMMARY: 2 sentences — project health and whether launch date is secure.

🚀 KEY ACHIEVEMENTS: 3 bullets — concrete, outcome-oriented. No "ongoing" or "working on".

⚠️ RISK & MITIGATION: The single largest blocker, its timeline impact, and the concrete plan to resolve it.

⚡ DECISION REQUIRED: Clear ask with a response deadline highlighted.

📅 LOOKING AHEAD: What ships next week — concrete outcomes only.

Tone: direct, objective, transparent. Never sugarcoat bad news.`
  },
  {
    id: 'no_email',
    number: '08',
    name: '"No" Email Generator',
    tagline: 'Decline requests without burning relationships',
    phase: 'Alignment',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'When sales, stakeholders, or customers push features that aren\'t on roadmap',
    description: 'Writes a professional, empathetic decline that validates the request, explains the strategy, and preserves the relationship.',
    inputs: [
      { id: 'requester', label: 'Who is asking?', placeholder: 'e.g. Sarah, Enterprise Sales Lead', type: 'text' },
      { id: 'feature', label: 'What are they requesting?', placeholder: 'e.g. Custom white-label dashboard for one enterprise client', type: 'textarea' },
      { id: 'reason', label: 'Real reason for declining', placeholder: 'e.g. 100% of Q2 engineering capacity is committed to platform security compliance', type: 'textarea' },
      { id: 'alternative', label: 'Alternative or next step', placeholder: 'e.g. We can review this in Q3 planning, or offer a workaround via our API', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a diplomatic product leader. Your goal: deliver a definitive "no" while preserving the professional relationship and building trust in the product process.

Requester: ${inputs.requester || '[name and role]'}
Requested feature: ${inputs.feature || '[feature request]'}
Real reason for declining: ${inputs.reason || '[strategic reason]'}
Alternative offered: ${inputs.alternative || '[alternative or timeline]'}

Write a professional email under 150 words with this exact structure:

1. GRACEFUL APPRECIATION: Validate why their request makes sense contextually (1-2 sentences).

2. THE CLEAR "NO": State it directly. No "unfortunately", no "we hope to look at it later", no passive phrasing.

3. THE STRATEGIC WHY: Frame the refusal as prioritizing something of greater value — not just refusing their idea.

4. THE BRIDGE: Offer the alternative, workaround, or future review timeline.

5. WARM CLOSE: Brief, collaborative, forward-looking.

Do not exceed 150 words total.`
  },
  {
    id: 'outsource',
    number: '09',
    name: 'Outsourcing Brief Generator',
    tagline: 'Brief an external team without losing control of the outcome',
    phase: 'Execution',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'When working with outsourced or agency development teams',
    description: 'Creates a watertight development brief that minimizes misunderstanding and protects scope when working with external teams.',
    inputs: [
      { id: 'feature', label: 'Feature to outsource', placeholder: 'e.g. Invoice PDF generation with custom branding per airport client', type: 'textarea' },
      { id: 'tech_stack', label: 'Tech stack constraints', placeholder: 'e.g. React frontend, Node.js backend, PostgreSQL, must use existing REST API', type: 'text' },
      { id: 'timeline', label: 'Timeline and budget', placeholder: 'e.g. 3 weeks, fixed price $8,000', type: 'text' },
      { id: 'handoff', label: 'How will you review their work?', placeholder: '', type: 'select', options: ['Daily standups', 'Weekly demos', 'Milestone-based reviews', 'Async via GitHub PRs only'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a Senior Technical Product Manager experienced in managing outsourced development teams. You know that ambiguity costs money.

Feature to build: ${inputs.feature || '[feature description]'}
Tech stack: ${inputs.tech_stack || '[tech stack]'}
Timeline and budget: ${inputs.timeline || '[timeline]'}
Review cadence: ${inputs.handoff || '[review method]'}

Write a complete outsourcing development brief containing:

1. FEATURE OVERVIEW: Plain-English description of what needs to be built and why.

2. TECHNICAL REQUIREMENTS: Specific, unambiguous requirements the team must follow (API contracts, data models, naming conventions).

3. ACCEPTANCE CRITERIA: Exactly how you will determine if the work is done correctly. Written as testable pass/fail statements.

4. OUT OF SCOPE: Explicit list of what they should NOT build or touch.

5. DELIVERABLES: What must be handed over (code, tests, documentation, deployment notes).

6. REVIEW CHECKPOINTS: When and how you will review progress.

7. RISK FLAGS: What would cause you to reject the work and require rework.

Be unambiguous. Every sentence should have exactly one interpretation.`
  },
  {
    id: 'retro',
    number: '10',
    name: 'Sprint Retrospective Facilitator',
    tagline: 'Run retros that actually improve how your team works',
    phase: 'Alignment',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'End of each sprint or milestone',
    description: 'Generates a structured retrospective agenda with targeted questions, action item templates, and a team health pulse.',
    inputs: [
      { id: 'sprint_goal', label: 'What was this sprint\'s goal?', placeholder: 'e.g. Ship invoice export feature to staging and complete QA', type: 'text' },
      { id: 'what_happened', label: 'What actually happened?', placeholder: 'e.g. Export shipped but QA found 3 critical bugs. Delayed 4 days. Team morale low due to overtime.', type: 'textarea' },
      { id: 'team_size', label: 'Team size and type', placeholder: '', type: 'select', options: ['Solo PM', '2–4 person team', '5–10 person team', '10+ person team', 'Distributed / remote team'] },
      { id: 'format', label: 'Retro format preference', placeholder: '', type: 'select', options: ['Start / Stop / Continue', 'What went well / What didn\'t / Actions', '4Ls (Liked, Learned, Lacked, Longed for)', 'Mad / Sad / Glad'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an expert Agile Coach and team facilitator. You run retrospectives that produce real behavior change, not just venting sessions.

Sprint goal: ${inputs.sprint_goal || '[sprint goal]'}
What happened: ${inputs.what_happened || '[actual outcome]'}
Team: ${inputs.team_size || '[team size]'}
Format: ${inputs.format || 'Start / Stop / Continue'}

Generate a complete retrospective facilitation guide:

1. OPENING (5 min): A brief, honest framing of the sprint — what the goal was vs. what happened. No blame, no spin.

2. DATA REVIEW (5 min): 3 objective questions to ground the team in facts before opinions.

3. ${inputs.format || 'START / STOP / CONTINUE'} EXERCISE (20 min):
   - 4 targeted questions for this sprint specifically (not generic)
   - Facilitation tips to prevent one person dominating

4. ROOT CAUSE DRILL (10 min): For the top issue identified — a 5-Whys template to find the real cause.

5. ACTION ITEMS TEMPLATE: For each action: Owner | What | By When | How we measure success

6. TEAM HEALTH PULSE (5 min): 3 anonymous pulse questions to measure team morale and psychological safety.

7. CLOSE: One sentence each person says to end the session positively.

Total session time: 45–60 minutes.`
  },
]

const phases = ['All', 'Discovery', 'Definition', 'Execution', 'Alignment']

export default function PMToolkit() {
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

      {/* Nav */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <a href="/" className="text-base font-medium">
          TaskFlow<span className="text-blue-600">AI</span>
        </a>
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">PM Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Product Manager Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            From raw idea to shipped product
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows covering the full PM lifecycle — discovery, definition, execution, and alignment. Works for product companies and outsourcing teams.
          </p>
        </div>

        {/* Phase filter */}
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

          {/* Left — workflow list */}
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

          {/* Right — active workflow */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            {!activeWorkflow ? (
              <div className="border border-dashed border-gray-200 rounded-xl p-8 text-center">
                <p className="text-sm text-gray-400 mb-1">Select a workflow to get started</p>
                <p className="text-xs text-gray-300">Fill in your context → generate your prompt → paste into any AI</p>
              </div>
            ) : activeW ? (
              <div className="border border-gray-100 rounded-xl overflow-hidden">

                {/* Workflow header */}
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${activeW.phaseColor}`}>{activeW.phase}</span>
                    <span className="text-xs text-gray-400">{activeW.context}</span>
                  </div>
                  <h2 className="text-base font-medium text-gray-900">{activeW.name}</h2>
                  <p className="text-xs text-gray-500 mt-1">{activeW.description}</p>
                </div>

                {/* Inputs */}
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

                {/* Generated prompt */}
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
                      Tip: For best results, run workflows 01 → 02 → 03 in sequence and paste the output of each as input for the next.
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