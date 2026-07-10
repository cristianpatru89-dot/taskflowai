'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'job_description',
    number: '01',
    name: 'Job Description Generator',
    tagline: 'Write job posts that attract the right people',
    phase: 'Attract',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before posting any role',
    description: 'Generates a clear, compelling job description that filters out wrong candidates and attracts the right ones.',
    inputs: [
      { id: 'job_title', label: 'Job title', placeholder: 'e.g. Senior Product Manager', type: 'text' },
      { id: 'company', label: 'Company type', placeholder: '', type: 'select', options: ['B2B SaaS startup', 'Enterprise company', 'Agency / outsourcing', 'Scale-up', 'Non-profit'] },
      { id: 'must_have', label: 'Must-have requirements (3–5)', placeholder: 'e.g. 3+ years PM experience, B2B SaaS background, strong data analysis skills', type: 'textarea' },
      { id: 'success', label: 'What does success look like in 90 days?', placeholder: 'e.g. Shipped first feature, built relationships with engineering team, defined Q3 roadmap', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a senior recruiter and employer branding expert. Write a job description that attracts the right candidates and filters out the wrong ones.

Role: ${inputs.job_title || '[job title]'}
Company type: ${inputs.company || '[company type]'}
Must-have requirements: ${inputs.must_have || '[requirements]'}
90-day success definition: ${inputs.success || '[success criteria]'}

Write a job description under 400 words with this structure:

1. COMPANY INTRO (2 sentences): What the company actually does — not a mission statement. Be specific.

2. THE ROLE (1 sentence): What this person owns and why it matters.

3. WHAT YOU'LL DO (4–5 bullets): Outcomes, not tasks. "You will own X" not "Responsibilities include Y".

4. WHAT WE'RE LOOKING FOR:
   - Must have: ${inputs.must_have || '[requirements]'}
   - Nice to have: 2–3 additional skills

5. WHAT SUCCESS LOOKS LIKE IN 90 DAYS: ${inputs.success || '[success criteria]'}

Do NOT use: "fast-paced environment", "team player", "wear many hats", "competitive salary", "passionate". Keep it under 400 words.`
  },
  {
    id: 'interview_scorecard',
    number: '02',
    name: 'Interview Question Builder',
    tagline: 'Questions that reveal how people actually work',
    phase: 'Screen',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Before any interview',
    description: 'Generates structured behavioral questions with follow-up probes and a scoring rubric for each competency.',
    inputs: [
      { id: 'role', label: 'Role you are hiring for', placeholder: 'e.g. Senior Frontend Engineer', type: 'text' },
      { id: 'competencies', label: 'Top 3 competencies for this role', placeholder: 'e.g. Problem solving, cross-functional collaboration, ownership mindset', type: 'textarea' },
      { id: 'culture', label: 'One culture value to test for', placeholder: 'e.g. We move fast and prefer done over perfect', type: 'text' },
      { id: 'interview_type', label: 'Interview type', placeholder: '', type: 'select', options: ['30-min phone screen', '60-min structured interview', 'Panel interview (3+ people)', 'Technical + behavioral combined'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an expert interviewer and talent assessor. Design an interview guide that reveals real capability, not interview performance.

Role: ${inputs.role || '[role]'}
Key competencies: ${inputs.competencies || '[competencies]'}
Culture value to test: ${inputs.culture || '[culture value]'}
Interview format: ${inputs.interview_type || '60-min structured interview'}

Generate a complete interview guide:

1. OPENING (2 min): One question to understand their career narrative — not "tell me about yourself" but something more specific.

2. COMPETENCY QUESTIONS (for each competency in: ${inputs.competencies || '[competencies]'}):
   - 1 behavioral question using "Tell me about a time when..." format
   - 2 follow-up probes to go deeper
   - What a strong answer looks like (2-3 sentences)
   - What a weak answer looks like (red flags)

3. CULTURE FIT QUESTION: One question that tests for "${inputs.culture || '[culture value]'}" without being obvious about it.

4. CANDIDATE QUESTIONS: 2 questions to invite the candidate to ask — that reveal their priorities and thinking.

5. SCORING RUBRIC: 1–4 scale for each competency with behavioral anchors.

Never ask hypothetical questions ("What would you do if...") — only ask about real past behavior.`
  },
  {
    id: 'candidate_scorecard',
    number: '03',
    name: 'Candidate Scorecard',
    tagline: 'Evaluate candidates objectively across your panel',
    phase: 'Evaluate',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'After each interview — before debrief',
    description: 'Creates a structured scorecard that reduces bias and gives your panel a consistent framework for comparison.',
    inputs: [
      { id: 'role', label: 'Role', placeholder: 'e.g. Head of Marketing', type: 'text' },
      { id: 'competencies', label: 'Competencies to evaluate (5–6)', placeholder: 'e.g. Strategic thinking, data fluency, team leadership, stakeholder management, communication', type: 'textarea' },
      { id: 'dealbreakers', label: 'Absolute deal-breakers', placeholder: 'e.g. No B2B experience, cannot work autonomously, missing technical background', type: 'textarea' },
      { id: 'panel_size', label: 'Panel size', placeholder: '', type: 'select', options: ['Solo interviewer', '2 interviewers', '3–4 interviewers', '5+ interviewers'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a talent assessment expert. Design a scorecard that allows ${inputs.panel_size || 'multiple interviewers'} to evaluate candidates consistently and reduce bias.

Role: ${inputs.role || '[role]'}
Competencies: ${inputs.competencies || '[competencies]'}
Deal-breakers: ${inputs.dealbreakers || '[deal-breakers]'}

Create a candidate evaluation scorecard:

1. CANDIDATE INFO SECTION: Name, date, interviewer, interview stage.

2. DEAL-BREAKER CHECK (before scoring anything):
   For each deal-breaker in "${inputs.dealbreakers || '[deal-breakers]'}":
   ☐ Present / ☐ Absent — if any are absent, stop scoring and mark as No Hire.

3. COMPETENCY SCORING (for each competency in: ${inputs.competencies || '[competencies]'}):
   - Rating: 1 (Poor) / 2 (Below bar) / 3 (Meets bar) / 4 (Exceptional)
   - What a 4 looks like for this role specifically
   - What a 1 looks like (red flags)
   - Evidence field: "Quote or specific example from interview"

4. OVERALL RECOMMENDATION:
   ☐ Strong Hire ☐ Hire ☐ No Hire ☐ Strong No Hire
   
5. KEY EVIDENCE: Top 2 things that drove this recommendation.

6. ONE THING THAT COULD CHANGE THIS: What information would make you reverse your decision?

Format so each interviewer fills it independently before the debrief.`
  },
  {
    id: 'rejection_email',
    number: '04',
    name: 'Rejection Email Generator',
    tagline: 'Say no without damaging your employer brand',
    phase: 'Close',
    phaseColor: 'bg-red-50 text-red-600',
    context: 'After any stage where a candidate is not moving forward',
    description: 'Writes warm, respectful rejection emails that protect your brand and leave candidates with a positive impression.',
    inputs: [
      { id: 'candidate_name', label: 'Candidate first name', placeholder: 'e.g. Maria', type: 'text' },
      { id: 'role', label: 'Role they applied for', placeholder: 'e.g. Senior Designer', type: 'text' },
      { id: 'stage', label: 'Stage they reached', placeholder: '', type: 'select', options: ['Application review (never interviewed)', 'Phone screen', 'First interview', 'Second interview', 'Final round'] },
      { id: 'positive', label: 'One genuine positive observation (optional)', placeholder: 'e.g. Strong portfolio, clearly thought about the problem space, great communication style', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a recruiter who cares about candidate experience. Write a rejection email that is honest, warm, and leaves the candidate with their dignity intact.

Candidate: ${inputs.candidate_name || '[name]'}
Role: ${inputs.role || '[role]'}
Stage reached: ${inputs.stage || '[stage]'}
Positive observation: ${inputs.positive || 'none provided'}

Write a rejection email under 120 words:

1. PERSONAL GREETING: Use their name.

2. THE DECISION: State it clearly in the first or second sentence. Do not bury it. Do not say "unfortunately" or "we regret to inform you".

3. BRIEF REASON: One honest sentence about why — "we're moving forward with candidates whose background more closely matches X" is fine. Never say "we'll keep your CV on file" unless true.

4. GENUINE POSITIVE (if provided): ${inputs.positive ? `Mention: "${inputs.positive}"` : 'Skip this section.'}

5. WARM CLOSE: Brief, human, not corporate.

Never use: "unfortunately", "we regret", "at this time", "we'll keep your CV on file" (unless true), "best of luck in your search".`
  },
  {
    id: 'offer_letter',
    number: '05',
    name: 'Offer Letter Generator',
    tagline: 'Make the offer feel like a welcome, not a contract',
    phase: 'Close',
    phaseColor: 'bg-red-50 text-red-600',
    context: 'When extending a job offer',
    description: 'Drafts a professional offer letter that is warm, complete, and ready for legal review.',
    inputs: [
      { id: 'candidate_name', label: 'Candidate full name', placeholder: 'e.g. Andrei Ionescu', type: 'text' },
      { id: 'role', label: 'Role offered', placeholder: 'e.g. Product Manager', type: 'text' },
      { id: 'start_date', label: 'Start date', placeholder: 'e.g. September 1, 2026', type: 'text' },
      { id: 'salary', label: 'Salary and currency', placeholder: 'e.g. €4,500/month gross', type: 'text' },
      { id: 'location', label: 'Work arrangement', placeholder: '', type: 'select', options: ['Full remote', 'Hybrid (3 days office)', 'Full on-site', 'Remote-first with quarterly meetups'] },
      { id: 'extras', label: 'Benefits or extras to mention', placeholder: 'e.g. 25 days PTO, health insurance, €1,000 learning budget', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are writing an offer letter that makes the candidate feel genuinely welcomed — not just processing paperwork.

Candidate: ${inputs.candidate_name || '[name]'}
Role: ${inputs.role || '[role]'}
Start date: ${inputs.start_date || '[date]'}
Salary: ${inputs.salary || '[salary]'}
Work arrangement: ${inputs.location || '[location]'}
Benefits: ${inputs.extras || '[benefits]'}

Write a professional offer letter with:

1. WARM OPENING: Express genuine excitement about them joining — specific to the role, not generic.

2. ROLE & START DATE: Clear confirmation of position and first day.

3. COMPENSATION: ${inputs.salary || '[salary]'}, ${inputs.location || '[arrangement]'}.

4. BENEFITS: ${inputs.extras || '[benefits]'}.

5. CONDITIONS: Note that the offer is subject to standard background checks and reference verification.

6. NEXT STEPS: How and by when to accept, who to contact with questions.

7. WARM CLOSE: Something that makes them excited to start.

Add at the bottom: "DRAFT — Subject to legal review before sending."
Keep tone professional but human. This should feel like a welcome letter, not a legal document.`
  },
  {
    id: 'onboarding',
    number: '06',
    name: '30-60-90 Day Onboarding Plan',
    tagline: 'Set new hires up to win from day one',
    phase: 'Onboard',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'Before the new hire starts',
    description: 'Creates a structured, outcome-oriented first 90 days so new hires ramp faster and feel supported.',
    inputs: [
      { id: 'role', label: 'Role and seniority', placeholder: 'e.g. Mid-level Backend Engineer', type: 'text' },
      { id: 'team', label: 'Team and context', placeholder: 'e.g. Joins the Payments squad, 6-person team, works closely with product and QA', type: 'textarea' },
      { id: 'goal', label: 'Main goal of the role', placeholder: 'e.g. Own the payments integration reliability and reduce transaction failure rate', type: 'text' },
      { id: 'company_type', label: 'Company type', placeholder: '', type: 'select', options: ['Product company', 'Outsourcing / agency', 'Startup', 'Enterprise', 'Scale-up'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an experienced people manager and onboarding specialist. Design a 30-60-90 day plan that sets this new hire up to succeed, not just survive.

Role: ${inputs.role || '[role]'}
Team context: ${inputs.team || '[team]'}
Main goal: ${inputs.goal || '[goal]'}
Company type: ${inputs.company_type || '[company type]'}

Create a 30-60-90 day onboarding plan:

DAYS 1–30 — LEARN:
- 5 concrete actions (meetings to have, docs to read, systems to access)
- 1 measurable success metric: "By day 30, I can..."
- 1 key relationship to build and why

DAYS 31–60 — CONTRIBUTE:
- 5 concrete actions (first real outputs expected)
- 1 measurable success metric: "By day 60, I have..."
- 1 key relationship to deepen

DAYS 61–90 — OWN:
- 5 concrete actions (taking full ownership of specific outcomes)
- 1 measurable success metric: "By day 90, I own..."
- 1 process or system to improve

END WITH:
3 questions the new hire should be able to answer confidently by day 90.

Format as a document they can actually use and refer to daily — not a generic HR checklist.`
  },
  {
    id: 'hiring_plan',
    number: '07',
    name: 'Hiring Plan Builder',
    tagline: 'Plan your headcount before leadership asks for it',
    phase: 'Plan',
    phaseColor: 'bg-indigo-50 text-indigo-600',
    context: 'Quarterly planning or when building a new team',
    description: 'Generates a structured hiring plan with role prioritization, timeline, and budget estimate.',
    inputs: [
      { id: 'team_goal', label: 'Team goal for next 6 months', placeholder: 'e.g. Launch mobile app, expand to 3 new markets, reduce infrastructure costs by 30%', type: 'textarea' },
      { id: 'current_team', label: 'Current team composition', placeholder: 'e.g. 2 engineers, 1 designer, 1 PM — all senior level', type: 'text' },
      { id: 'budget', label: 'Approximate hiring budget', placeholder: 'e.g. €150,000 annual salary budget for new hires', type: 'text' },
      { id: 'timeline', label: 'Hiring timeline', placeholder: '', type: 'select', options: ['Next 30 days (urgent)', 'Next 90 days', 'Next 6 months', 'Annual planning'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a Head of Talent and strategic workforce planner. Build a hiring plan that connects headcount to business outcomes.

Team goal: ${inputs.team_goal || '[goal]'}
Current team: ${inputs.current_team || '[current team]'}
Budget: ${inputs.budget || '[budget]'}
Timeline: ${inputs.timeline || '[timeline]'}

Generate a structured hiring plan:

1. CAPABILITY GAP ANALYSIS: What skills and capacity are missing to achieve "${inputs.team_goal || '[goal]'}" given the current team of "${inputs.current_team || '[team]'}"?

2. PRIORITIZED ROLES TO HIRE (ranked by impact):
   For each role:
   - Title and seniority level
   - Why this role unblocks the goal
   - Estimated salary range
   - Target start date
   - Dependencies (must hire X before Y)

3. HIRING TIMELINE: Month-by-month view of when to open, screen, and close each role.

4. BUDGET BREAKDOWN: Estimated total annual cost vs budget of ${inputs.budget || '[budget]'}.

5. RISKS: What happens if any role takes 60+ days longer than planned?

6. MAKE vs BUY: For each role, flag whether upskilling an existing team member could be faster than hiring externally.`
  },
  {
    id: 'employer_brand',
    number: '08',
    name: 'Employer Branding Kit',
    tagline: 'Make top candidates want to work for you',
    phase: 'Attract',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'When building or refreshing your talent brand',
    description: 'Generates your EVP, LinkedIn content, and candidate-facing messaging that attracts the right people.',
    inputs: [
      { id: 'company', label: 'What does your company do?', placeholder: 'e.g. We build airport operations software used by 200+ airports globally', type: 'textarea' },
      { id: 'culture', label: 'How would your best employees describe the culture?', placeholder: 'e.g. High autonomy, direct feedback, small teams with big impact, no bureaucracy', type: 'textarea' },
      { id: 'target_candidate', label: 'Who are you trying to attract?', placeholder: 'e.g. Senior engineers who are bored at big tech and want to own meaningful problems', type: 'text' },
      { id: 'differentiator', label: 'What makes you different as an employer?', placeholder: 'e.g. Every engineer ships to production in their first week, no permission needed', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an employer branding strategist. Create messaging that makes the right candidates choose you over competitors.

Company: ${inputs.company || '[company description]'}
Culture: ${inputs.culture || '[culture description]'}
Target candidate: ${inputs.target_candidate || '[target]'}
Differentiator: ${inputs.differentiator || '[differentiator]'}

Generate a complete employer branding kit:

1. EMPLOYEE VALUE PROPOSITION (EVP): One crisp paragraph — what you offer that others don't. Written for "${inputs.target_candidate || '[target candidate]'}". No generic claims.

2. LINKEDIN COMPANY PAGE TAGLINE: Under 20 words. Must be specific enough that a competitor couldn't copy it.

3. 3 LINKEDIN POSTS (different formats):
   - Post 1: A story about how someone did something meaningful at the company
   - Post 2: A behind-the-scenes culture moment
   - Post 3: A direct "we're hiring" post that doesn't sound like every other hiring post

4. CAREERS PAGE OPENING PARAGRAPH: What a candidate reads first when they visit your jobs page. Under 60 words.

5. WHAT TO AVOID: 3 clichés that are killing your employer brand right now (based on what you've shared).

Be specific. Generic employer branding is invisible.`
  },
  {
    id: 'reference_check',
    number: '09',
    name: 'Reference Check Guide',
    tagline: 'Get honest answers from references who want to be vague',
    phase: 'Evaluate',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Final stage — before extending an offer',
    description: 'Generates targeted reference check questions that get past polished answers and reveal real patterns.',
    inputs: [
      { id: 'role', label: 'Role you are hiring for', placeholder: 'e.g. Engineering Manager', type: 'text' },
      { id: 'concerns', label: 'Any specific concerns from interviews?', placeholder: 'e.g. Seemed defensive when challenged, unclear about a gap in employment, overstated their role on a project', type: 'textarea' },
      { id: 'reference_type', label: 'Who is the reference?', placeholder: '', type: 'select', options: ['Former direct manager', 'Former peer / colleague', 'Former direct report', 'Client or external stakeholder'] },
      { id: 'key_competency', label: 'Most important competency to validate', placeholder: 'e.g. Ability to manage conflict in a team', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an expert interviewer who knows that references want to be vague and positive. Design questions that get honest, specific answers.

Role: ${inputs.role || '[role]'}
Reference type: ${inputs.reference_type || '[reference type]'}
Specific concerns to probe: ${inputs.concerns || 'none specified'}
Key competency to validate: ${inputs.key_competency || '[competency]'}

Generate a reference check guide:

1. OPENING: How to frame the call so the reference feels comfortable being honest.

2. WARM-UP QUESTIONS (2): To establish context and get them talking naturally.

3. PERFORMANCE QUESTIONS (3): Specific, behavioral questions about real outcomes — not "was he a good employee?"

4. COMPETENCY DEEP-DIVE: 2 targeted questions to validate "${inputs.key_competency || '[competency]'}" with specific examples.

5. CONCERN PROBES (if applicable): ${inputs.concerns ? `Subtle questions to surface clarity on: "${inputs.concerns}"` : 'No specific concerns — ask open-ended growth questions.'}

6. THE CLOSE QUESTION: "If you had an open role on your team, would you hire [candidate] again? Why or why not?" — and how to read the hesitation in their answer.

7. RED FLAG SIGNALS: What vague or deflecting answers might actually mean.`
  },
  {
    id: 'performance_review',
    number: '10',
    name: 'Performance Review Writer',
    tagline: 'Write reviews that actually help people grow',
    phase: 'Onboard',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'End of probation or annual review cycle',
    description: 'Generates structured, honest performance reviews that balance recognition with clear development areas.',
    inputs: [
      { id: 'employee_name', label: 'Employee name and role', placeholder: 'e.g. Mihai, Junior Frontend Engineer', type: 'text' },
      { id: 'period', label: 'Review period', placeholder: 'e.g. Q1 2026 or First 90 days', type: 'text' },
      { id: 'wins', label: 'Key achievements this period', placeholder: 'e.g. Shipped 3 features on time, proactively fixed a critical bug, improved test coverage from 40% to 72%', type: 'textarea' },
      { id: 'gaps', label: 'Areas that need improvement', placeholder: 'e.g. Misses deadlines when blocked, avoids asking for help, documentation is inconsistent', type: 'textarea' },
      { id: 'overall', label: 'Overall rating', placeholder: '', type: 'select', options: ['Exceptional — exceeds all expectations', 'Strong — meets and often exceeds expectations', 'Solid — meets expectations', 'Developing — below expectations in key areas', 'Underperforming — significant gaps'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a direct, fair, and development-focused manager. Write a performance review that is honest, specific, and genuinely useful for the employee's growth.

Employee: ${inputs.employee_name || '[name and role]'}
Period: ${inputs.period || '[period]'}
Key wins: ${inputs.wins || '[achievements]'}
Development areas: ${inputs.gaps || '[gaps]'}
Overall rating: ${inputs.overall || '[rating]'}

Write a structured performance review:

1. OVERALL SUMMARY (2–3 sentences): Honest framing of the period — ${inputs.overall || '[rating]'}. Direct, not sugarcoated.

2. KEY ACHIEVEMENTS: For each win in "${inputs.wins || '[wins]'}":
   - What they did (specific)
   - Why it mattered (impact)
   - What it demonstrates about their capability

3. DEVELOPMENT AREAS: For each gap in "${inputs.gaps || '[gaps]'}":
   - What the pattern is (observable behavior, not personality judgment)
   - Why it matters for their role and growth
   - One specific, actionable change they can make

4. LOOKING AHEAD — NEXT 90 DAYS:
   - 2 specific goals with measurable outcomes
   - 1 skill to develop with a concrete way to do it

5. MANAGER COMMITMENT: What you as their manager will do to support their development.

Be specific. Avoid "great attitude" and "team player" — cite real examples.`
  },
]

const phases = ['All', 'Attract', 'Screen', 'Evaluate', 'Close', 'Onboard', 'Plan']

export default function RecruitingToolkit() {
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
          <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">Recruiting Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Recruiting Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Hire the right people. In half the time.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows covering the full recruiting lifecycle — from writing job descriptions to onboarding. Works for in-house recruiters, hiring managers, and HR teams.
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
                      Tip: Run workflows in order for best results — Job Description → Interview Questions → Scorecard → Offer Letter.
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