'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'project_proposal',
    number: '01',
    name: 'Project Proposal Writer',
    tagline: 'Write proposals that win projects',
    phase: 'Win',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before sending any proposal to a client',
    description: 'Creates a compelling project proposal that speaks to client outcomes, not deliverables.',
    inputs: [
      { id: 'client', label: 'Client and their situation', placeholder: 'e.g. Mid-size logistics company, 300 employees, struggling with inefficient procurement process costing them €200k/year in waste', type: 'textarea' },
      { id: 'solution', label: 'Your proposed solution', placeholder: 'e.g. 8-week procurement process redesign including stakeholder interviews, process mapping, and implementation roadmap', type: 'textarea' },
      { id: 'fee', label: 'Fee and structure', placeholder: 'e.g. €28,000 fixed fee, 50% upfront, 50% on delivery', type: 'text' },
      { id: 'outcomes', label: 'Outcomes you will deliver', placeholder: 'e.g. Documented current-state process, redesigned process saving estimated €150k/year, implementation roadmap with quick wins in first 30 days', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a senior consultant who wins projects by focusing on client outcomes, not consulting jargon. Write a proposal that makes the client think "they understand our problem".

Client: ${inputs.client || '[client]'}
Solution: ${inputs.solution || '[solution]'}
Fee: ${inputs.fee || '[fee]'}
Outcomes: ${inputs.outcomes || '[outcomes]'}

Write a project proposal:

1. EXECUTIVE SUMMARY (the only section the CEO reads):
   - Their situation in 2 sentences (show you listened)
   - What you are proposing
   - The outcome in one number or statement

2. YOUR SITUATION (mirror their problem back):
   Write this in their language. Show you understand the real cost and impact of their problem.

3. OUR PROPOSED APPROACH:
   Not a list of activities — a story of how you solve the problem.
   Phase by phase: what happens, what it produces, why it matters.

4. WHAT YOU WILL HAVE AT THE END:
   Specific deliverables for each outcome in "${inputs.outcomes || '[outcomes]'}".
   Frame as: "You will have [deliverable] which means [business outcome]."

5. INVESTMENT:
   ${inputs.fee || '[fee]'}
   ROI framing: what does this cost vs what does the problem cost?

6. WHY US:
   One paragraph — specific to this client's situation. Not generic credentials.

7. NEXT STEPS:
   Specific — a decision date, a kick-off date, what happens when they say yes.

Never use: "leverage", "synergies", "best practices", "holistic approach". Write like a trusted advisor.`
  },
  {
    id: 'sow',
    number: '02',
    name: 'Statement of Work Builder',
    tagline: 'Define scope so clearly that scope creep becomes impossible',
    phase: 'Deliver',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Before any project starts',
    description: 'Creates a watertight SOW with scope, deliverables, timelines, and change management process.',
    inputs: [
      { id: 'project', label: 'Project description', placeholder: 'e.g. Digital transformation strategy for retail chain, 12-week engagement', type: 'text' },
      { id: 'deliverables', label: 'Specific deliverables', placeholder: 'e.g. Current state assessment report, future state design, 3-year roadmap, executive presentation, implementation playbook', type: 'textarea' },
      { id: 'timeline', label: 'Timeline and milestones', placeholder: 'e.g. Week 1-2: Discovery, Week 3-6: Analysis, Week 7-10: Design, Week 11-12: Presentation and handover', type: 'textarea' },
      { id: 'exclusions', label: 'What is explicitly OUT of scope', placeholder: 'e.g. Implementation of any recommendations, IT system selection, vendor negotiation, change management execution', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a consulting contracts expert. Write a SOW that protects both parties and makes scope crystal clear.

Project: ${inputs.project || '[project]'}
Deliverables: ${inputs.deliverables || '[deliverables]'}
Timeline: ${inputs.timeline || '[timeline]'}
Out of scope: ${inputs.exclusions || '[exclusions]'}

Write a complete Statement of Work:

1. PROJECT OVERVIEW:
   Purpose, objectives, and success criteria in plain language.

2. SCOPE OF WORK:
   What is included — specific activities and deliverables.
   For each deliverable in "${inputs.deliverables || '[deliverables]'}":
   - Deliverable name
   - Description (what it contains)
   - Format (document, presentation, workshop, etc.)
   - Acceptance criteria (how the client knows it meets quality)

3. OUT OF SCOPE:
   Explicit list: "${inputs.exclusions || '[exclusions]'}"
   Why this matters: "Any work outside this scope requires a formal Change Order."

4. PROJECT TIMELINE:
   ${inputs.timeline || '[timeline]'}
   Key milestones and dependencies.
   Client responsibilities at each milestone.

5. CLIENT RESPONSIBILITIES:
   What the client must provide for the project to succeed.
   (Access to stakeholders, data, decisions, approvals)

6. CHANGE MANAGEMENT PROCESS:
   How scope changes are requested, evaluated, priced, and approved.

7. ACCEPTANCE PROCESS:
   How deliverables are reviewed and formally accepted.

8. ASSUMPTIONS:
   What must be true for this SOW to hold.

Add: "DRAFT — Review with legal counsel before execution."`
  },
  {
    id: 'client_update',
    number: '03',
    name: 'Client Status Update Writer',
    tagline: 'Keep clients confident without drowning them in detail',
    phase: 'Deliver',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Weekly or biweekly client communication',
    description: 'Writes crisp client updates that show progress, manage expectations, and maintain trust.',
    inputs: [
      { id: 'project', label: 'Project name', placeholder: 'e.g. Procurement Process Redesign — Week 4 of 8', type: 'text' },
      { id: 'status', label: 'Project status', placeholder: '', type: 'select', options: ['🟢 On track', '🟡 At risk — minor issues', '🔴 Off track — needs attention'] },
      { id: 'progress', label: 'What was completed this week', placeholder: 'e.g. Completed 12 stakeholder interviews, mapped 3 core procurement processes, identified 5 major bottlenecks', type: 'textarea' },
      { id: 'risks', label: 'Issues or risks', placeholder: 'e.g. CFO interview not yet scheduled — this is on the critical path for Week 5 analysis', type: 'textarea' },
      { id: 'next_week', label: 'Next week plan', placeholder: 'e.g. Complete remaining 4 interviews, begin current-state analysis, share preliminary findings with project sponsor', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a client relationship expert. Write updates that keep clients confident and informed without wasting their time.

Project: ${inputs.project || '[project]'}
Status: ${inputs.status || '[status]'}
Completed: ${inputs.progress || '[progress]'}
Risks: ${inputs.risks || '[risks]'}
Next week: ${inputs.next_week || '[next week]'}

Write a client status update (under 200 words):

SUBJECT: [Project name] — Week [X] Update | [Status emoji]

📌 STATUS: ${inputs.status || '[status]'}

🚀 THIS WEEK:
${inputs.progress || '[progress]'}
(3 bullet points — concrete outcomes, not activities)

⚠️ WATCH ITEM (if applicable):
${inputs.risks || '[risks]'}
What we need from you: [specific client action if needed]

📅 NEXT WEEK:
${inputs.next_week || '[next week]'}

Any questions — happy to jump on a call.

[Name]

Rules:
- Never say "we are working on" — say what was completed
- Be honest about risks — clients trust consultants who flag problems early
- If status is 🔴: be direct about impact and what you need from client
- Under 200 words — clients are busy`
  },
  {
    id: 'findings_report',
    number: '04',
    name: 'Findings Report Structurer',
    tagline: 'Turn your analysis into a report clients actually read',
    phase: 'Deliver',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'When presenting research, analysis, or recommendations',
    description: 'Structures consulting findings into a compelling narrative with clear insights and actionable recommendations.',
    inputs: [
      { id: 'project_context', label: 'Project context', placeholder: 'e.g. 8-week procurement audit for logistics company. Interviewed 15 stakeholders, analyzed 6 months of purchase data, benchmarked against 3 industry peers.', type: 'textarea' },
      { id: 'key_findings', label: 'Key findings (bullet points)', placeholder: 'e.g. 43% of purchases bypass the approved vendor list, average PO approval takes 12 days vs industry benchmark of 3 days, €180k/year in maverick spend', type: 'textarea' },
      { id: 'recommendations', label: 'Your recommendations', placeholder: 'e.g. Implement digital approval workflow, reduce approved vendor list from 340 to 80 strategic vendors, mandate 3-quote process for purchases over €5k', type: 'textarea' },
      { id: 'audience', label: 'Report audience', placeholder: 'e.g. CEO and CFO, executive summary only. Operations team, detailed findings.', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a McKinsey-trained consultant who knows that the best consulting reports lead with the answer, not the methodology.

Context: ${inputs.project_context || '[context]'}
Findings: ${inputs.key_findings || '[findings]'}
Recommendations: ${inputs.recommendations || '[recommendations]'}
Audience: ${inputs.audience || '[audience]'}

Structure a consulting findings report:

EXECUTIVE SUMMARY (what ${inputs.audience || '[audience]'} reads — 1 page):
- Situation: What was the problem?
- Complication: What did we find that makes it urgent?
- Resolution: What do we recommend?
Lead with the answer, then the evidence.

FINDINGS SECTION:
For each finding in "${inputs.key_findings || '[findings]'}":
- Finding headline (1 sentence — the insight, not the observation)
- Supporting evidence (the data)
- So what? (why this matters to the business)
- Root cause (if identifiable)

RECOMMENDATIONS:
For each recommendation in "${inputs.recommendations || '[recommendations]'}":
- Recommendation (specific action)
- Business case (what problem it solves + quantified impact)
- Implementation complexity: LOW / MEDIUM / HIGH
- Priority: Do now / Do next / Do later

IMPLEMENTATION ROADMAP:
Quick wins (0-30 days): [specific actions]
Medium term (30-90 days): [specific actions]
Strategic (90+ days): [specific actions]

APPENDIX STRUCTURE:
What supporting detail to include for those who want the methodology.`
  },
  {
    id: 'workshop_design',
    number: '05',
    name: 'Workshop Facilitator Guide',
    tagline: 'Design workshops that produce decisions, not just discussions',
    phase: 'Deliver',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Before any client workshop or working session',
    description: 'Creates a detailed facilitation guide with activities, timing, and techniques to drive outcomes.',
    inputs: [
      { id: 'workshop_goal', label: 'Workshop goal', placeholder: 'e.g. Align leadership team on 3 strategic priorities for next year. By end of session: have a ranked list of priorities with owner and timeline for each.', type: 'textarea' },
      { id: 'participants', label: 'Participants', placeholder: 'e.g. 8 people — CEO, CFO, COO, 3 VPs, 2 Directors. Mixed opinions on direction. CEO and CFO have different priorities.', type: 'textarea' },
      { id: 'duration', label: 'Workshop duration', placeholder: '', type: 'select', options: ['2 hours', 'Half day (3-4 hours)', 'Full day (6-7 hours)', '2 days'] },
      { id: 'challenge', label: 'Known challenges or dynamics', placeholder: 'e.g. CEO dominates discussions, two VPs have a conflict, group tends to avoid making decisions', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an expert facilitator who designs workshops that produce real decisions and alignment — not just good discussions.

Goal: ${inputs.workshop_goal || '[goal]'}
Participants: ${inputs.participants || '[participants]'}
Duration: ${inputs.duration || '[duration]'}
Challenges: ${inputs.challenge || '[challenges]'}

Design a complete workshop facilitation guide:

1. WORKSHOP OBJECTIVE:
   What participants will have agreed on or produced by the end.
   Success looks like: [specific output]

2. PRE-WORK (to send participants in advance):
   What they should think about or prepare — so the session time is for deciding, not catching up.

3. SESSION PLAN (with timing):

   OPENING (10%):
   Not "let's go around and introduce ourselves." An activity that establishes psychological safety and shared purpose.

   DIVERGE (30%):
   Activity to surface all perspectives — especially from quieter voices.
   Technique: [specific method — dot voting, 1-2-4-all, silent brainstorm, etc.]

   CONVERGE (40%):
   Activity to move from many ideas to clear decisions.
   Technique: [specific method — affinity mapping, priority matrix, etc.]

   CLOSE + COMMIT (20%):
   Capture decisions, assign owners, set next steps.
   Every action: Who + What + By When.

4. FACILITATION TECHNIQUES for challenges:
   "${inputs.challenge || '[challenges]'}" — specific moves to manage these dynamics.

5. MATERIALS NEEDED: Everything to run the session.

6. RISK PLAN: If the session goes off-track, what to do.`
  },
  {
    id: 'case_study',
    number: '06',
    name: 'Case Study Writer',
    tagline: 'Turn client wins into stories that sell your next project',
    phase: 'Win',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'After a successful project completion',
    description: 'Writes a compelling case study that showcases your methodology and results without revealing confidential details.',
    inputs: [
      { id: 'client_type', label: 'Client type (anonymized)', placeholder: 'e.g. Mid-size logistics company, 300 employees, Northern Europe', type: 'text' },
      { id: 'challenge', label: 'The client\'s challenge', placeholder: 'e.g. Procurement costs 40% above industry benchmark, no visibility into spend, 12-day approval process', type: 'textarea' },
      { id: 'approach', label: 'Your approach', placeholder: 'e.g. 8-week engagement: stakeholder interviews, process mapping, spend analysis, redesign, roadmap', type: 'textarea' },
      { id: 'results', label: 'Results achieved', placeholder: 'e.g. Approval time reduced from 12 to 3 days, €180k annual savings identified, 340 vendors consolidated to 80', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a marketing consultant who writes case studies that make prospects think "we have the same problem — I need to call them."

Client: ${inputs.client_type || '[client type]'}
Challenge: ${inputs.challenge || '[challenge]'}
Approach: ${inputs.approach || '[approach]'}
Results: ${inputs.results || '[results]'}

Write a compelling case study:

HEADLINE: [Result achieved] — not "How we helped a logistics company." Be specific.

THE SITUATION (2 paragraphs):
Paint the picture of the problem so vividly that a similar prospect sees themselves.
"${inputs.client_type || '[client]'}" was facing a common challenge in their industry:
${inputs.challenge || '[challenge]'}
The cost of inaction: [quantify what the problem was costing them]

THE APPROACH (3-4 paragraphs):
Walk through ${inputs.approach || '[approach]'} in a way that shows your methodology — not just activities, but thinking.
For each phase: what we did + what we found + what decision it enabled.

THE RESULTS:
${inputs.results || '[results]'}
Present as: Before → After → Business impact.
Use numbers wherever possible.

THE CLIENT PERSPECTIVE:
Write a plausible quote that a client might say about this engagement (clearly mark as illustrative if not a real quote).

WHY IT WORKED:
One paragraph — what made this engagement successful that other consultants might miss.

WHAT THIS MEANS FOR YOU:
If you recognize this situation, here is what we would do for your organization.
CTA: [specific next step]`
  },
  {
    id: 'invoice_narrative',
    number: '07',
    name: 'Invoice & Fee Narrative Writer',
    tagline: 'Invoice in a way that reinforces your value',
    phase: 'Operate',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'When issuing invoices or explaining fees',
    description: 'Writes invoice narratives and fee explanations that remind clients of value delivered.',
    inputs: [
      { id: 'invoice_period', label: 'Invoice period or milestone', placeholder: 'e.g. Month 2 of 3, Milestone 1 completion, Final invoice', type: 'text' },
      { id: 'work_completed', label: 'Work completed this period', placeholder: 'e.g. Completed 15 stakeholder interviews, delivered current-state process map, facilitated 2-day leadership workshop', type: 'textarea' },
      { id: 'fee', label: 'Fee amount', placeholder: 'e.g. €14,000 (second of three milestone payments)', type: 'text' },
      { id: 'value_delivered', label: 'Value or progress toward outcomes', placeholder: 'e.g. Identified €180k in annual savings opportunities, stakeholder alignment achieved on 3 priority areas', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a consulting business expert who knows that invoices are a client touchpoint — an opportunity to reinforce value, not just request payment.

Period: ${inputs.invoice_period || '[period]'}
Work completed: ${inputs.work_completed || '[work]'}
Fee: ${inputs.fee || '[fee]'}
Value delivered: ${inputs.value_delivered || '[value]'}

Write an invoice narrative and cover note:

INVOICE COVER EMAIL:

Subject: Invoice [Number] — [Project Name] | [Period]

[Client name],

Attached is invoice [number] for ${inputs.fee || '[fee]'} covering ${inputs.invoice_period || '[period]'}.

THIS PERIOD'S WORK:
${inputs.work_completed || '[work]'}

PROGRESS TOWARD YOUR OUTCOMES:
${inputs.value_delivered || '[value]'}
[Connect this back to the original project goals]

NEXT STEPS:
What happens next in the engagement — keep them looking forward.

Payment terms: [X days]. If you have any questions about this invoice, please reach out before the due date.

[Name]

ALSO PROVIDE:
INVOICE LINE ITEM DESCRIPTIONS (professional narrative for each line item):
Not "Consulting fees — Week 5-8" but specific descriptions that remind them what they received.`
  },
  {
    id: 'scope_change',
    number: '08',
    name: 'Scope Change Request Handler',
    tagline: 'Get paid for work outside the original scope',
    phase: 'Deliver',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'When a client requests work outside the agreed scope',
    description: 'Handles scope change requests professionally — acknowledging the need, pricing the change, and protecting the relationship.',
    inputs: [
      { id: 'original_scope', label: 'Original scope (brief summary)', placeholder: 'e.g. 8-week procurement process redesign for the European operations team only', type: 'text' },
      { id: 'change_requested', label: 'What the client is requesting', placeholder: 'e.g. Client now wants to include the North American operations team and add an implementation phase', type: 'textarea' },
      { id: 'impact', label: 'Impact on time and cost', placeholder: 'e.g. Additional 4 weeks, estimated €18,000 additional fee', type: 'text' },
      { id: 'relationship', label: 'Relationship context', placeholder: 'e.g. Strong relationship, client is happy with progress, this is a growth opportunity', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a consulting relationship expert. Scope changes handled well become opportunities — handled badly, they damage relationships and margins.

Original scope: ${inputs.original_scope || '[scope]'}
Change requested: ${inputs.change_requested || '[change]'}
Impact: ${inputs.impact || '[impact]'}
Relationship: ${inputs.relationship || '[relationship]'}

Write a scope change response:

EMAIL RESPONSE TO CLIENT:

ACKNOWLEDGE (without committing):
Express that you understand the request and see the value — without saying yes yet.

RECAP ORIGINAL SCOPE:
Gently clarify what was agreed: "${inputs.original_scope || '[scope]'}"
"This would be outside our current scope of work."

THE CHANGE ORDER OFFER:
"We would be happy to include this. Here is what that would involve:"
- Additional work: [specific description]
- Timeline impact: [additional weeks]
- Investment: ${inputs.impact || '[impact]'}

THE BRIDGE:
Frame this positively — this is a natural extension of the work, not a complaint.

NEXT STEP:
A specific ask — approve the change order, schedule a call, or confirm in writing.

ALSO PROVIDE:
FORMAL CHANGE ORDER DOCUMENT:
- Change Order Number
- Date
- Original SOW reference
- Description of change
- Fee and timeline impact
- Signature lines

Rules: Never say yes without pricing it. Never be apologetic about charging for additional work.`
  },
  {
    id: 'referral_request',
    number: '09',
    name: 'Referral & Testimonial Requester',
    tagline: 'Ask for referrals in a way that actually gets them',
    phase: 'Grow',
    phaseColor: 'bg-teal-50 text-teal-700',
    context: 'After project completion or at key relationship moments',
    description: 'Crafts referral and testimonial requests that feel natural and make it easy for clients to say yes.',
    inputs: [
      { id: 'client', label: 'Client name/role', placeholder: 'e.g. Sarah, COO at Müller Logistics', type: 'text' },
      { id: 'project_result', label: 'Key result from the project', placeholder: 'e.g. Reduced procurement costs by €180k annually, approval time from 12 days to 3 days', type: 'text' },
      { id: 'request_type', label: 'What you are asking for', placeholder: '', type: 'select', options: ['Written testimonial', 'LinkedIn recommendation', 'Referral to a specific contact', 'Open referral to peers', 'Case study participation', 'Reference call with prospect'] },
      { id: 'ideal_referral', label: 'Who would be the ideal referral? (if referral request)', placeholder: 'e.g. Other logistics companies in DACH region, or their contact at the industry association', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a client relationship expert. Referrals and testimonials are the lifeblood of consulting — but most requests are either too pushy or too vague. Write a request that is easy to say yes to.

Client: ${inputs.client || '[client]'}
Project result: ${inputs.project_result || '[result]'}
Request type: ${inputs.request_type || '[request]'}
Ideal referral: ${inputs.ideal_referral || '[ideal referral]'}

Write a referral/testimonial request:

TIMING: Acknowledge this is a great moment to ask — project just delivered strong results.

THE ASK (specific and easy):
For ${inputs.request_type || '[request]'}:

If TESTIMONIAL/RECOMMENDATION:
"I would love to ask a favour — would you be willing to write a brief LinkedIn recommendation? I have drafted something based on our work together that you can use or modify completely: [draft recommendation in their voice that they can approve or edit]"

If REFERRAL:
"If you know anyone facing similar challenges — particularly ${inputs.ideal_referral || '[ideal referral]'} — I would really appreciate an introduction. It would mean a lot coming from you."
Make it easy: offer to draft the intro email they can forward.

If CASE STUDY:
"Would you be open to being featured in a brief case study? I would write it and send it to you for full approval before publishing anything."

THE CONTEXT:
Reference the result: "${inputs.project_result || '[result]'}" — remind them of the value they received.

THE NO-PRESSURE CLOSE:
Make it absolutely fine to say no or not now.

DRAFT TESTIMONIAL (write it for them to approve):
[A genuine, specific testimonial in their voice that they can copy-paste or edit]`
  },
  {
    id: 'pitch_deck_narrative',
    number: '10',
    name: 'Consulting Pitch Deck Narrative',
    tagline: 'Structure a pitch that wins the project in the room',
    phase: 'Win',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before any new business presentation',
    description: 'Creates the narrative and talking points for a consulting pitch that differentiates on insight, not credentials.',
    inputs: [
      { id: 'prospect', label: 'Prospect and their situation', placeholder: 'e.g. CFO of a 500-person manufacturer, struggling with 3-month budget cycles that are always wrong, losing confidence of the board', type: 'textarea' },
      { id: 'your_solution', label: 'What you are proposing', placeholder: 'e.g. 10-week FP&A transformation — driver-based model, rolling forecast process, CFO dashboard', type: 'text' },
      { id: 'why_you', label: 'Why you specifically', placeholder: 'e.g. Have done this at 4 manufacturers in last 3 years, average time to first rolling forecast: 8 weeks', type: 'textarea' },
      { id: 'presentation_length', label: 'Presentation length', placeholder: '', type: 'select', options: ['15 minutes', '30 minutes', '45 minutes', '60 minutes'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a business development expert for consulting firms. Great pitches lead with insight about the client's situation — not credentials and case studies.

Prospect: ${inputs.prospect || '[prospect]'}
Solution: ${inputs.your_solution || '[solution]'}
Why you: ${inputs.why_you || '[differentiator]'}
Length: ${inputs.presentation_length || '[length]'}

Design a ${inputs.presentation_length || '[length]'} pitch narrative:

SLIDE 1 — OPEN WITH INSIGHT (not "About Us"):
A sharp observation about their situation that makes them think "they really understand us."
Based on: "${inputs.prospect || '[prospect]'}"

SLIDE 2 — THEIR SITUATION:
The problem in their language. Quantify the cost or risk. Show you did your homework.

SLIDE 3 — THE CHALLENGE BENEATH THE CHALLENGE:
What is the real issue underneath the presenting problem? The non-obvious insight that separates great consultants from average ones.

SLIDE 4 — OUR APPROACH:
${inputs.your_solution || '[solution]'}
Not a methodology slide — a story of how you solve the specific problem they have.

SLIDE 5 — WHAT YOU WILL HAVE:
Specific outcomes. Frame as: "In 10 weeks, you will have..."

SLIDE 6 — WHY US:
${inputs.why_you || '[differentiator]'}
One relevant proof point — specific, not generic.

SLIDE 7 — NEXT STEPS:
The specific ask — not "let us know if you have questions."

TALKING POINTS for each slide: What to say out loud (not just what is on the slide).

LIKELY OBJECTIONS and how to handle them in the room.`
  },
]

const phases = ['All', 'Win', 'Deliver', 'Operate', 'Grow']

export default function ConsultingToolkit() {
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
          <span className="text-xs px-2 py-1 bg-slate-50 text-slate-700 rounded-full">Consulting Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Consulting Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Win more projects. Deliver with confidence.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for consultants and freelancers — proposals, SOWs, client updates, findings reports, workshops, case studies, and more.
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
                      Tip: Start with workflow 01 (Proposal) to win the project, then 02 (SOW) to protect your scope.
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
