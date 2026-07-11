'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'board_communication',
    number: '01',
    name: 'Board Communication Writer',
    tagline: 'Write board updates that get read and acted on',
    phase: 'Communicate',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before every board meeting or major update',
    description: 'Drafts board-ready communications that are direct, honest, and decision-focused.',
    inputs: [
      { id: 'company', label: 'Company name and stage', placeholder: 'e.g. Acme SRL, Series A, 45 employees', type: 'text' },
      { id: 'update_type', label: 'Type of communication', placeholder: '', type: 'select', options: ['Monthly board update', 'Quarterly board pack narrative', 'Emergency / crisis update', 'Major decision request', 'Strategic pivot announcement'] },
      { id: 'key_messages', label: 'Key messages to land (2-3)', placeholder: 'e.g. Q2 revenue 12% ahead of plan. Engineering team at full capacity — need to discuss hiring plan. Competitor X just raised €10M.', type: 'textarea' },
      { id: 'decisions', label: 'Decisions needed from the board', placeholder: 'e.g. Approve €300k additional engineering headcount, sign off on new pricing model', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an executive communication expert. Boards have limited time and high stakes — every word must earn its place.

Company: ${inputs.company || '[company]'}
Communication type: ${inputs.update_type || '[type]'}
Key messages: ${inputs.key_messages || '[messages]'}
Decisions needed: ${inputs.decisions || '[decisions]'}

Write a board communication with this structure:

1. OPENING FRAME (2 sentences): What is the overall state of the business right now? Be honest — not cheerleading, not catastrophizing.

2. KEY UPDATES:
   For each message in "${inputs.key_messages || '[messages]'}":
   - The fact
   - What it means for the business
   - What we are doing about it (if action required)

3. DECISIONS REQUIRED:
   For each decision in "${inputs.decisions || '[decisions]'}":
   - Context: why this decision now
   - Options considered with trade-offs
   - Management recommendation with rationale
   - What we need: a yes/no/input by [date]

4. WHAT TO EXPECT NEXT: 3 specific things that will happen before the next board touch.

5. WHAT KEEPS ME UP AT NIGHT: One honest paragraph — the risk the CEO is most focused on.

Tone: Direct, confident, transparent. No spin. Boards respect executives who tell the truth clearly.
Under 400 words.`
  },
  {
    id: 'strategic_memo',
    number: '02',
    name: 'Strategic Memo Writer',
    tagline: 'Turn a strategic decision into a crisp one-pager',
    phase: 'Decide',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Before any major strategic decision',
    description: 'Structures a strategic memo that frames the decision, presents options, and makes a clear recommendation.',
    inputs: [
      { id: 'decision', label: 'What decision needs to be made?', placeholder: 'e.g. Should we expand to the UK market in Q3 or focus on deepening penetration in Romania and Poland?', type: 'textarea' },
      { id: 'context', label: 'Business context', placeholder: 'e.g. We have €1.2M ARR in Romania and Poland, 18 months runway, 2 inbound UK leads, and a competitor just launched in the UK', type: 'textarea' },
      { id: 'audience', label: 'Who is this memo for?', placeholder: '', type: 'select', options: ['CEO only', 'Executive team', 'Board of Directors', 'Investors', 'All leadership'] },
      { id: 'deadline', label: 'Decision deadline', placeholder: 'e.g. Must decide by June 30 to affect Q3 planning', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a strategic advisor to a CEO. Write a memo that makes the decision clear, not complicated.

Decision: ${inputs.decision || '[decision]'}
Context: ${inputs.context || '[context]'}
Audience: ${inputs.audience || '[audience]'}
Deadline: ${inputs.deadline || '[deadline]'}

Write a strategic decision memo:

1. THE DECISION (1 sentence): Exactly what needs to be decided, by when.

2. WHY NOW: What has changed that makes this decision urgent? What happens if we delay?

3. CONTEXT & FACTS: The 5 most relevant facts about the situation. Numbers only — no interpretation yet.

4. OPTIONS ANALYSIS:
   Option A: [describe]
   - Upside:
   - Downside:
   - Key assumption that must be true:
   - Reversibility: Easy / Hard / Irreversible

   Option B: [describe]
   - Same structure

   Option C (if relevant): Do nothing / delay
   - What does inaction cost us?

5. RECOMMENDATION: What management recommends and the single strongest reason why.

6. WHAT WE ARE NOT DOING and why.

7. IF WE ARE WRONG: What is the early signal that tells us to reverse course?

Under 500 words. No jargon. Every sentence should make the reader smarter about this decision.`
  },
  {
    id: 'okr_framework',
    number: '03',
    name: 'OKR Framework Builder',
    tagline: 'Set goals that align your whole company',
    phase: 'Plan',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Quarterly or annual planning cycles',
    description: 'Builds a cascading OKR framework from company level to team level, with measurable key results.',
    inputs: [
      { id: 'company_stage', label: 'Company stage and focus', placeholder: 'e.g. Series A SaaS, primary focus: revenue growth and product-market fit in enterprise segment', type: 'textarea' },
      { id: 'quarter', label: 'Quarter and year', placeholder: 'e.g. Q3 2026', type: 'text' },
      { id: 'top_priority', label: 'Single most important priority this quarter', placeholder: 'e.g. Expand to UK market with first 3 paying customers', type: 'text' },
      { id: 'teams', label: 'Teams that need OKRs', placeholder: 'e.g. Product, Engineering, Sales, Marketing, Customer Success', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a seasoned Chief of Staff and OKR expert. Build a framework that drives focus, not bureaucracy.

Company: ${inputs.company_stage || '[company]'}
Quarter: ${inputs.quarter || '[quarter]'}
Top priority: ${inputs.top_priority || '[priority]'}
Teams: ${inputs.teams || '[teams]'}

Build a cascading OKR framework:

COMPANY LEVEL OKRs (2-3 max):
For each Objective:
- Objective: Qualitative, inspiring, directional
- KR1: Quantitative, with baseline and target
- KR2: Quantitative, with baseline and target
- KR3: Quantitative, with baseline and target

Rules:
- Objectives must be achievable but uncomfortable
- KRs must be outcome-based, not activity-based ("increase NRR from 95% to 110%" not "launch 3 features")
- If you can't measure it by the end of the quarter, it's not a KR

TEAM-LEVEL OKRs for each team in "${inputs.teams || '[teams]'}":
Show how each team's OKRs ladder up to the company OKRs.
1-2 objectives per team maximum.

SPECIFICALLY ABOUT "${inputs.top_priority || '[priority]'}":
Which team owns this? What are the KRs that prove we achieved it?

OKR HEALTH CHECK:
- Are any KRs activity-based (need to be rewritten)?
- Are any objectives too easy (not worth setting)?
- What cross-team dependencies exist that need coordination?

CADENCE RECOMMENDATION:
Weekly check-in format, monthly review structure, end-of-quarter grading approach.`
  },
  {
    id: 'crisis_comms',
    number: '04',
    name: 'Crisis Communication Kit',
    tagline: 'Lead through a crisis without losing trust',
    phase: 'Communicate',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'When something goes seriously wrong',
    description: 'Drafts crisis communications for employees, customers, and press — honest, calm, and trust-preserving.',
    inputs: [
      { id: 'crisis', label: 'What happened?', placeholder: 'e.g. We had a data breach affecting 2,400 customer records. Discovered Tuesday morning. Root cause: misconfigured cloud storage bucket. Now fixed.', type: 'textarea' },
      { id: 'known_facts', label: 'What do you know for certain?', placeholder: 'e.g. We know what data was exposed, when it happened, and that it is now fixed. We do not yet know if data was accessed.', type: 'text' },
      { id: 'audience', label: 'Who needs to be communicated to first?', placeholder: '', type: 'select', options: ['Employees first, then customers', 'Customers and employees simultaneously', 'Regulators first, then customers', 'All audiences at the same time'] },
      { id: 'action_taken', label: 'What action have you taken?', placeholder: 'e.g. Fixed the vulnerability, engaged cybersecurity firm, notified relevant authorities, set up dedicated support line', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a crisis communications expert. In a crisis, the two things that matter most are: telling the truth and moving fast. Never speculate. Never minimize. Never go silent.

Crisis: ${inputs.crisis || '[crisis]'}
Known facts: ${inputs.known_facts || '[facts]'}
Communication order: ${inputs.audience || '[audience]'}
Actions taken: ${inputs.action_taken || '[actions]'}

Write crisis communications for each audience:

INTERNAL — EMPLOYEE COMMUNICATION:
Subject: [Direct, honest subject line]
- What happened (facts only, no spin)
- What we know and what we don't know yet
- What we have done / are doing
- What employees should do (especially customer-facing staff)
- When they will hear from us next
- Who to contact with questions
Under 200 words.

EXTERNAL — CUSTOMER COMMUNICATION:
Subject: [Direct subject line — do not hide the news in vague language]
- Acknowledge directly what happened
- What it means for them specifically
- What we have done to fix it
- What we are doing to prevent recurrence
- What they should do (if anything)
- How to contact us
Under 250 words.

PRESS STATEMENT (if needed):
- 3 sentences maximum
- Facts only
- One quote from CEO
- Contact for press inquiries

WHAT NOT TO SAY: Flag any language that sounds defensive, minimizing, or that creates legal risk.`
  },
  {
    id: 'allhands_speech',
    number: '05',
    name: 'All-Hands Speech Builder',
    tagline: 'Say something people actually remember',
    phase: 'Communicate',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Company all-hands, town halls, team kickoffs',
    description: 'Writes an all-hands speech that lands — not a slide read-out, but something that moves people.',
    inputs: [
      { id: 'occasion', label: 'Occasion', placeholder: '', type: 'select', options: ['Quarterly all-hands', 'Annual kickoff', 'After a difficult quarter', 'Major company announcement', 'Team milestone celebration', 'Restructuring / layoffs announcement'] },
      { id: 'mood', label: 'What is the team mood right now?', placeholder: 'e.g. Anxious after missing Q2 targets. Some high performers are looking around. Need to restore confidence.', type: 'textarea' },
      { id: 'messages', label: '2-3 key messages to land', placeholder: 'e.g. We know what went wrong in Q2. Here is the plan. We need everyone\'s best for H2.', type: 'textarea' },
      { id: 'length', label: 'Speech length', placeholder: '', type: 'select', options: ['5 minutes (opening only)', '10 minutes', '20 minutes', '30 minutes'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a speechwriter for a CEO. Write a speech that sounds like a real human talking — not a corporate announcement.

Occasion: ${inputs.occasion || '[occasion]'}
Team mood: ${inputs.mood || '[mood]'}
Key messages: ${inputs.messages || '[messages]'}
Length: ${inputs.length || '10 minutes'}

Write the speech with this structure:

OPENING (not "thank you for being here"):
Start with something real — a moment, an observation, a story from the last few weeks. Something that shows you are paying attention to what is actually happening. 2-3 minutes.

THE HONEST MIDDLE:
Address the mood directly: "${inputs.mood || '[mood]'}"
Do not pretend everything is fine if it is not.
Do not catastrophize if it is not that bad.
Just tell the truth, clearly.

KEY MESSAGES:
For each message in "${inputs.messages || '[messages]'}":
- State it plainly
- Give one specific piece of evidence
- Explain what it means for the team

THE ASK:
What specifically do you need from people? Be concrete — not "give 110%", but the actual behaviors and decisions you need.

THE CLOSE:
End with something that sticks. Not "thank you" — a sentence or image that people carry with them after they leave the room.

Mark with [INSERT PERSONAL STORY] where a specific anecdote would land well.
Mark with [INSERT DATA POINT] where a specific number would strengthen the message.
Write in first person, conversational tone.`
  },
  {
    id: 'ma_communication',
    number: '06',
    name: 'M&A Communication Planner',
    tagline: 'Manage the human side of a deal',
    phase: 'Decide',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'When announcing an acquisition, merger, or being acquired',
    description: 'Plans and drafts the full communication sequence for M&A announcements — employees, customers, press.',
    inputs: [
      { id: 'deal_type', label: 'Type of deal', placeholder: '', type: 'select', options: ['We are acquiring another company', 'We are being acquired', 'Merger of equals', 'We are acquiring a team (acqui-hire)'] },
      { id: 'deal_details', label: 'Key deal details (shareable)', placeholder: 'e.g. We are acquiring TechCo, a 20-person team based in Bucharest, who built a document automation platform. Deal closes July 1.', type: 'textarea' },
      { id: 'employee_impact', label: 'Impact on employees', placeholder: 'e.g. All TechCo employees join our team. No redundancies planned. They will form a new document automation squad.', type: 'text' },
      { id: 'rationale', label: 'Why this deal?', placeholder: 'e.g. Accelerates our document processing roadmap by 18 months. Adds 20 engineers with deep NLP expertise.', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an M&A communications expert. These announcements are high-stakes — employees, customers, and press will read between every line.

Deal type: ${inputs.deal_type || '[deal type]'}
Deal details: ${inputs.deal_details || '[details]'}
Employee impact: ${inputs.employee_impact || '[impact]'}
Rationale: ${inputs.rationale || '[rationale]'}

Create a complete M&A communication plan:

1. COMMUNICATION SEQUENCING:
   Who hears first, second, third — and why this order matters.

2. INTERNAL ANNOUNCEMENT — EXISTING EMPLOYEES:
   - Lead with the human reality, not the business case
   - Address the fear directly: "what does this mean for me?"
   - Be specific about what changes and what doesn't
   - FAQ section: the 5 questions they will ask immediately
   Under 300 words.

3. INTERNAL ANNOUNCEMENT — ACQUIRED/JOINING TEAM:
   - Welcome message that makes them feel chosen, not absorbed
   - What they can expect in the first 30 days
   Under 200 words.

4. CUSTOMER COMMUNICATION:
   - What they need to know (not everything)
   - What stays the same
   - Who to contact with questions
   Under 150 words.

5. PRESS RELEASE:
   - Headline
   - Lead paragraph (who, what, when)
   - Rationale quote from CEO
   - Background on acquired company
   - Boilerplate for both companies

6. THINGS NOT TO SAY: Language that creates fear, legal risk, or sounds like corporate non-speak.`
  },
  {
    id: 'performance_conversation',
    number: '07',
    name: 'Difficult Conversation Planner',
    tagline: 'Have the hard conversation the right way',
    phase: 'Lead',
    phaseColor: 'bg-red-50 text-red-600',
    context: 'Before any high-stakes conversation with a direct report, peer, or board member',
    description: 'Prepares you for difficult leadership conversations — performance issues, exits, disagreements, feedback.',
    inputs: [
      { id: 'conversation_type', label: 'Type of conversation', placeholder: '', type: 'select', options: ['Performance improvement discussion', 'Termination / letting someone go', 'Delivering critical feedback', 'Disagreement with a board member', 'Addressing team conflict', 'Negotiating with a difficult stakeholder'] },
      { id: 'situation', label: 'Describe the situation', placeholder: 'e.g. Senior engineer has missed 3 sprint commitments, pushes back on all feedback, and two teammates have raised concerns about collaboration', type: 'textarea' },
      { id: 'desired_outcome', label: 'What outcome do you want from this conversation?', placeholder: 'e.g. Clear agreement on specific behavior changes with a 30-day timeline, or mutual agreement to part ways', type: 'text' },
      { id: 'history', label: 'What has already been tried?', placeholder: 'e.g. Two informal chats in the last month, written feedback in last performance review, reassigned to a different squad', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an executive coach with deep experience in high-stakes leadership conversations. Help the leader prepare to have this conversation with clarity, care, and directness.

Conversation type: ${inputs.conversation_type || '[type]'}
Situation: ${inputs.situation || '[situation]'}
Desired outcome: ${inputs.desired_outcome || '[outcome]'}
What has been tried: ${inputs.history || '[history]'}

Prepare a complete conversation guide:

1. YOUR MINDSET GOING IN:
   What is the most useful frame for this conversation? What do you need to let go of (defensiveness, need to be liked, anger)?

2. THE OPENING (exact words):
   How to start the conversation in a way that is direct but not aggressive. Script the first 2-3 sentences.

3. THE CORE MESSAGE:
   What is the one thing this person must leave this conversation understanding?
   State it in one clear sentence — no softening language.

4. EVIDENCE TO REFERENCE:
   Based on "${inputs.situation || '[situation]'}", what specific examples should you cite? (Behaviors, not character judgments)

5. HOW THEY MIGHT RESPOND — AND WHAT TO SAY:
   3 likely responses (defensive, emotional, dismissive) and how to handle each without escalating.

6. THE AGREEMENT / NEXT STEPS:
   What specific commitment are you asking for? By when? How will you follow up?

7. IF IT GOES BADLY:
   What is your fallback if they shut down or become hostile?

8. WHAT NOT TO SAY: Language that escalates, confuses, or creates legal risk.`
  },
  {
    id: 'hiring_exec',
    number: '08',
    name: 'Executive Hiring Guide',
    tagline: 'Hire a C-suite or VP-level leader without getting it wrong',
    phase: 'Lead',
    phaseColor: 'bg-red-50 text-red-600',
    context: 'When hiring your first or next executive',
    description: 'Structures the entire executive hiring process — from role definition to reference checks to onboarding.',
    inputs: [
      { id: 'role', label: 'Role you are hiring', placeholder: 'e.g. First VP of Sales, CTO to replace a technical founder, CFO for Series B', type: 'text' },
      { id: 'company_stage', label: 'Company stage', placeholder: 'e.g. 40-person SaaS company, €2M ARR, recently closed Series A, scaling from founder-led sales', type: 'textarea' },
      { id: 'must_have', label: 'Non-negotiable requirements', placeholder: 'e.g. Has scaled a B2B SaaS sales team from €1M to €10M+ ARR, experience in enterprise sales cycles 6+ months', type: 'textarea' },
      { id: 'failure_modes', label: 'What does failure look like in this role?', placeholder: 'e.g. Brings a big-company playbook that doesn\'t fit our stage, can\'t sell personally while building the team, alienates the engineering team', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an executive search expert and CEO advisor. Executive mis-hires are the most expensive mistakes a company makes — design a process that reduces that risk.

Role: ${inputs.role || '[role]'}
Company stage: ${inputs.company_stage || '[stage]'}
Non-negotiables: ${inputs.must_have || '[requirements]'}
Failure modes: ${inputs.failure_modes || '[failure modes]'}

Design a complete executive hiring process:

1. ROLE DEFINITION:
   - The 3 outcomes this executive must achieve in year 1
   - The management philosophy required for this stage
   - Culture fit requirements (specific to "${inputs.company_stage || '[stage]'}")

2. SCORECARD (not job description):
   - Mission: Why this role exists
   - Outcomes: 3 measurable year-1 results
   - Competencies: 5 specific capabilities with behavioral definitions
   - Red flags: Signs during interview that predict the failure modes in "${inputs.failure_modes || '[failure modes]'}"

3. INTERVIEW PROCESS (4-5 stages):
   For each stage:
   - Who interviews
   - What they are assessing
   - Key question to ask

4. THE 5 INTERVIEW QUESTIONS that reveal whether they can succeed at your specific stage.

5. REFERENCE CHECK APPROACH:
   - Who to call (not the references they give you)
   - The 3 questions that get past rehearsed answers

6. DECISION CRITERIA:
   How to make the final call when you have 2 strong candidates.

7. EXECUTIVE ONBOARDING PLAN:
   First 90 days — what does success look like and how do you set them up to achieve it?`
  },
  {
    id: 'company_narrative',
    number: '09',
    name: 'Company Narrative Builder',
    tagline: 'Tell the story of your company in a way that moves people',
    phase: 'Communicate',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Fundraising, recruiting, partnerships, or rebranding',
    description: 'Builds your core company narrative — the story that makes investors invest, employees join, and customers buy.',
    inputs: [
      { id: 'company', label: 'What does your company do?', placeholder: 'e.g. We build billing and operations software for airports — the back-office systems that run 200+ airports globally', type: 'textarea' },
      { id: 'origin', label: 'Why does this company exist? (the real reason)', placeholder: 'e.g. Our founder ran airport finance for 10 years and spent 30% of their time fixing billing errors because every airport was using Excel', type: 'textarea' },
      { id: 'audience', label: 'Who is this narrative for?', placeholder: '', type: 'select', options: ['Series A investors', 'Enterprise customers', 'Top talent / recruiting', 'Strategic partners', 'Press / media', 'General public'] },
      { id: 'differentiator', label: 'What makes you genuinely different?', placeholder: 'e.g. Only vertical SaaS for airport billing. Deep domain expertise. 200+ airports as customers. Built by people who ran airports.', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a brand storyteller and pitch coach. Build a narrative that is specific, honest, and impossible to ignore.

Company: ${inputs.company || '[company]'}
Origin story: ${inputs.origin || '[origin]'}
Audience: ${inputs.audience || '[audience]'}
Differentiator: ${inputs.differentiator || '[differentiator]'}

Build the company narrative:

1. THE HOOK (1 sentence): The most interesting true thing about this company. Not what you do — why it matters.

2. THE PROBLEM (2-3 sentences): Paint the world as it is without your solution. Make the pain tangible.

3. THE INSIGHT: What did you see that others missed? What is the non-obvious truth that led to this company?

4. THE SOLUTION: What you built and why it is the right answer to this specific problem.

5. THE PROOF: The 2-3 facts that make someone believe you are actually solving this.

6. THE VISION: Where does this go? What does the world look like if you win?

7. WHY YOU: What gives you the right to solve this problem that others haven't?

VERSIONS FOR DIFFERENT FORMATS:
- The 30-second elevator pitch
- The 2-minute investor pitch opening
- The "what do you do?" answer at a dinner party
- The careers page opening paragraph
- The cold email subject line

For audience: ${inputs.audience || '[audience]'} — what angle resonates most?`
  },
  {
    id: 'leadership_principles',
    number: '10',
    name: 'Leadership Principles Designer',
    tagline: 'Define how your company makes decisions when you are not in the room',
    phase: 'Plan',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'When scaling past 20-30 people or defining company culture',
    description: 'Creates a set of leadership principles that are specific, memorable, and actually guide behavior.',
    inputs: [
      { id: 'company', label: 'Company description', placeholder: 'e.g. B2B SaaS, 45 people, engineering-led culture, selling to enterprise', type: 'text' },
      { id: 'current_culture', label: 'How would your best employees describe the culture?', placeholder: 'e.g. High autonomy, direct feedback, small teams with real ownership, move fast but care about quality, no politics', type: 'textarea' },
      { id: 'anti_culture', label: 'What behaviors do you want to explicitly reject?', placeholder: 'e.g. Blame culture, endless meetings, asking permission for everything, prioritizing optics over outcomes', type: 'textarea' },
      { id: 'stage_challenge', label: 'Biggest cultural challenge at your current stage', placeholder: 'e.g. We are growing fast and new hires don\'t have the context that early employees had. Decisions are getting slower.', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a culture designer and organizational expert. Leadership principles only work if they are specific enough to be useful in a real decision. Generic ones are useless.

Company: ${inputs.company || '[company]'}
Current culture: ${inputs.current_culture || '[culture]'}
What to reject: ${inputs.anti_culture || '[anti-culture]'}
Stage challenge: ${inputs.stage_challenge || '[challenge]'}

Design 6-8 leadership principles:

For each principle:
1. THE PRINCIPLE: A short, memorable phrase (3-6 words). Not generic ("customer obsession") — specific to your company.

2. WHAT IT MEANS: 2-3 sentences explaining the principle in plain language.

3. WHAT IT LOOKS LIKE IN PRACTICE: One concrete example of this principle in action at your stage.

4. WHAT IT EXPLICITLY REJECTS: The opposite behavior this principle rules out — from "${inputs.anti_culture || '[anti-culture]'}".

5. HOW TO USE IT: "When you are deciding between X and Y, this principle says..."

SPECIFICALLY ADDRESS "${inputs.stage_challenge || '[challenge]'}":
Which principle most directly solves this? What behavior change does it drive?

PRINCIPLES HEALTH CHECK:
- Are any of these generic enough that Amazon or Apple could use them? Rewrite those.
- Do any of these conflict with each other? Flag them.
- Which one will be hardest for the team to live by? That's probably the most important one.`
  },
]

const phases = ['All', 'Communicate', 'Decide', 'Plan', 'Lead']

export default function ExecutiveToolkit() {
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
          <span className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full">Executive Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Executive Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Lead clearly. Communicate at the speed of thought.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for executives and senior leaders — board communications, strategic memos, crisis comms, all-hands speeches, and more.
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
                      Tip: Start with workflow 09 (Company Narrative) — it makes every other communication sharper.
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