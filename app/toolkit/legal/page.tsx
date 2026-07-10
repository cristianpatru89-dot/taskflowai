'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'contract_review',
    number: '01',
    name: 'Contract Reviewer',
    tagline: 'Identify risks before signing anything',
    phase: 'Review',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before sending any contract to counsel',
    description: 'Flags risky clauses, missing protections, and key obligations in any contract — in minutes.',
    inputs: [
      { id: 'contract_text', label: 'Paste contract text', placeholder: 'Paste the contract or key sections here...', type: 'textarea' },
      { id: 'your_role', label: 'Your role in this contract', placeholder: '', type: 'select', options: ['Buyer / Client', 'Seller / Vendor', 'Service provider', 'Employee', 'Employer', 'Partner'] },
      { id: 'jurisdiction', label: 'Jurisdiction (if known)', placeholder: 'e.g. Romania, UK, EU, USA — Delaware', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a detail-oriented legal reviewer. Flag risks conservatively — it is better to over-flag than to miss something. Do not give legal advice — summarize and flag for review by qualified counsel.

Your role in this contract: ${inputs.your_role || '[your role]'}
Jurisdiction: ${inputs.jurisdiction || 'not specified'}

Review this contract and produce:

1. PLAIN-ENGLISH SUMMARY: One paragraph — what does this agreement actually do?

2. KEY OBLIGATIONS: Bullet points for each party — what must each side do?

3. RISK FLAGS: Clauses that are unusual, one-sided, vague, or potentially problematic.
   For each flag: quote the specific clause + explain why it's a risk.

4. MISSING PROTECTIONS: Standard clauses that are absent:
   - Limitation of liability
   - Indemnification
   - Dispute resolution / arbitration
   - Termination for convenience
   - Force majeure
   - IP ownership

5. QUESTIONS FOR COUNSEL: Top 5 questions to ask your lawyer before signing.

Contract text:
${inputs.contract_text || '[paste contract here]'}

Note: This is a pre-review tool. Always have a qualified lawyer review before signing.`
  },
  {
    id: 'nda_generator',
    number: '02',
    name: 'NDA Generator',
    tagline: 'Draft a mutual or one-way NDA in minutes',
    phase: 'Draft',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Before any sensitive business conversation',
    description: 'Generates a first-draft NDA ready for legal review — mutual or one-way, any jurisdiction.',
    inputs: [
      { id: 'nda_type', label: 'NDA type', placeholder: '', type: 'select', options: ['Mutual (both parties share confidential info)', 'One-way (only one party shares info)'] },
      { id: 'party_a', label: 'Party A (your company)', placeholder: 'e.g. Acme SRL, Romania', type: 'text' },
      { id: 'party_b', label: 'Party B (other company)', placeholder: 'e.g. TechCorp Ltd, UK', type: 'text' },
      { id: 'purpose', label: 'Purpose of the NDA', placeholder: 'e.g. Evaluating a potential software development partnership', type: 'text' },
      { id: 'duration', label: 'Duration of confidentiality', placeholder: 'e.g. 2 years from signing', type: 'text' },
      { id: 'jurisdiction', label: 'Governing law', placeholder: 'e.g. Romanian law, English law', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a commercial lawyer drafting a Non-Disclosure Agreement. Use clear, professional language. Flag any clause where jurisdiction-specific advice is recommended.

Type: ${inputs.nda_type || 'Mutual NDA'}
Party A: ${inputs.party_a || '[Party A]'}
Party B: ${inputs.party_b || '[Party B]'}
Purpose: ${inputs.purpose || '[purpose]'}
Duration: ${inputs.duration || '2 years'}
Governing law: ${inputs.jurisdiction || '[jurisdiction]'}

Draft a complete NDA including:

1. PARTIES AND RECITALS: Who is involved and why this agreement exists.

2. DEFINITION OF CONFIDENTIAL INFORMATION: Broad but clear — what is and isn't covered.

3. OBLIGATIONS OF RECEIVING PARTY: What they must and must not do with the information.

4. EXCLUSIONS: What is NOT confidential (public domain, independently developed, etc.)

5. PERMITTED DISCLOSURES: When disclosure is allowed (legal requirement, court order).

6. TERM AND TERMINATION: Duration and what happens to information after termination.

7. RETURN OR DESTRUCTION: Obligations to return or destroy confidential materials.

8. REMEDIES FOR BREACH: Acknowledgment that breach may cause irreparable harm.

9. GENERAL PROVISIONS: Governing law (${inputs.jurisdiction || '[jurisdiction]'}), entire agreement, amendments.

10. SIGNATURE BLOCK: Both parties.

Add at the top: "DRAFT — For legal review only. Not for execution without qualified legal counsel."
Add jurisdiction-specific notes where relevant.`
  },
  {
    id: 'gdpr_checker',
    number: '03',
    name: 'GDPR Compliance Checker',
    tagline: 'Find compliance gaps before your DPO does',
    phase: 'Compliance',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Before launching any feature that processes personal data',
    description: 'Reviews a feature, process, or policy against GDPR principles and produces a prioritized gap analysis.',
    inputs: [
      { id: 'description', label: 'Describe the feature or process', placeholder: 'e.g. We collect email, name, and browsing behavior from users who sign up for our newsletter. We share this with Mailchimp for email campaigns and Google Analytics for tracking.', type: 'textarea' },
      { id: 'data_types', label: 'Personal data types involved', placeholder: 'e.g. Name, email, IP address, location, payment data, health data', type: 'text' },
      { id: 'user_location', label: 'Where are your users located?', placeholder: '', type: 'select', options: ['EU / EEA only', 'EU + UK', 'Global (including EU)', 'Outside EU only'] },
      { id: 'company_size', label: 'Company size', placeholder: '', type: 'select', options: ['Under 250 employees', '250–1000 employees', '1000+ employees'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a GDPR compliance specialist. Review this for compliance gaps and produce an actionable report.

Feature/process description: ${inputs.description || '[description]'}
Personal data types: ${inputs.data_types || '[data types]'}
User location: ${inputs.user_location || '[location]'}
Company size: ${inputs.company_size || '[size]'}

Check against these GDPR principles and for each state: Compliant / Partially Compliant / Gap Found:

1. LAWFUL BASIS: Is there a clear legal basis for processing? (consent, contract, legitimate interest, legal obligation)

2. DATA MINIMIZATION: Are you collecting only what you need?

3. PURPOSE LIMITATION: Is data used only for the stated purpose?

4. STORAGE LIMITATION: Is there a defined retention period?

5. DATA SUBJECT RIGHTS: Can users access, correct, delete, port their data?

6. SECURITY MEASURES: Are appropriate technical/organizational measures in place?

7. THIRD-PARTY PROCESSORS: Are Mailchimp, Google Analytics etc. covered by Data Processing Agreements?

8. BREACH NOTIFICATION: Is there a process to detect and report breaches within 72 hours?

For each GAP found:
- Specific risk (legal/reputational/financial)
- Recommended fix
- Priority: HIGH / MEDIUM / LOW

End with: TOP 3 THINGS TO FIX FIRST`
  },
  {
    id: 'due_diligence',
    number: '04',
    name: 'Due Diligence Checklist',
    tagline: 'Know what you\'re buying before you commit',
    phase: 'Review',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'M&A, vendor onboarding, or strategic partnership evaluation',
    description: 'Generates a tailored due diligence checklist with risk flags and priority items.',
    inputs: [
      { id: 'dd_type', label: 'Due diligence type', placeholder: '', type: 'select', options: ['M&A — acquiring a company', 'Vendor / supplier onboarding', 'Strategic partnership', 'Investment / funding round', 'Outsourcing a critical function'] },
      { id: 'context', label: 'Brief context', placeholder: 'e.g. We are acquiring a 30-person SaaS company in Romania with €2M ARR', type: 'textarea' },
      { id: 'industry', label: 'Industry or sector', placeholder: 'e.g. SaaS, healthcare, fintech, manufacturing', type: 'text' },
      { id: 'timeline', label: 'Timeline for completion', placeholder: 'e.g. 3 weeks', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a corporate lawyer and due diligence specialist. Create a tailored checklist for this specific situation.

Type: ${inputs.dd_type || '[type]'}
Context: ${inputs.context || '[context]'}
Industry: ${inputs.industry || '[industry]'}
Timeline: ${inputs.timeline || '[timeline]'}

Generate a due diligence checklist organized by category:

1. CORPORATE & LEGAL
   - Entity structure, incorporation documents, subsidiaries
   - Licenses, permits, regulatory approvals
   - Litigation history (current and past 5 years)
   - Material contracts and change of control clauses

2. FINANCIAL
   - Audited financial statements (last 3 years)
   - Revenue recognition policies
   - Debt, liabilities, off-balance sheet items
   - Tax compliance and outstanding obligations

3. INTELLECTUAL PROPERTY
   - IP ownership (trademarks, patents, copyright, trade secrets)
   - Open source usage and license compliance
   - IP created by employees/contractors — assignment agreements

4. DATA & PRIVACY
   - GDPR / data protection compliance
   - Data breach history
   - Customer data ownership and portability

5. EMPLOYMENT
   - Key person dependencies and retention risk
   - Employment contracts and notice periods
   - Equity / option pool obligations

6. OPERATIONAL
   - Key vendor and customer concentration risk
   - Technology infrastructure and technical debt
   - Cybersecurity posture

For each item: note WHY it matters in one sentence.
Flag TOP 5 HIGHEST RISK items with 🚨
Include: IMMEDIATE RED FLAGS that would stop the deal entirely.`
  },
  {
    id: 'policy_summarizer',
    number: '05',
    name: 'Policy Summarizer',
    tagline: 'Understand what any policy actually says',
    phase: 'Review',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before agreeing to any terms of service, privacy policy, or internal policy',
    description: 'Translates complex legal policies into plain English with key points, obligations, and red flags.',
    inputs: [
      { id: 'policy_text', label: 'Paste the policy text', placeholder: 'Paste the terms of service, privacy policy, or internal policy here...', type: 'textarea' },
      { id: 'policy_type', label: 'Policy type', placeholder: '', type: 'select', options: ['Terms of Service', 'Privacy Policy', 'Data Processing Agreement', 'Employment Policy', 'Vendor Agreement', 'Internal Compliance Policy'] },
      { id: 'your_concern', label: 'What are you most concerned about?', placeholder: 'e.g. Data ownership, auto-renewal clauses, liability limits, termination rights', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a legal analyst who specializes in translating complex legal documents into plain English. Be direct and highlight what actually matters.

Policy type: ${inputs.policy_type || '[policy type]'}
Main concern: ${inputs.your_concern || '[concern]'}

Analyze this policy and produce:

1. WHAT THIS DOCUMENT IS: One sentence — what it governs and who it applies to.

2. PLAIN ENGLISH SUMMARY: 3–5 bullet points — what this policy actually means for someone who has to comply with it.

3. KEY OBLIGATIONS: What are you agreeing to do (or not do)?

4. YOUR RIGHTS: What rights does this policy give you?

5. RED FLAGS: Clauses that are unusual, aggressive, or potentially harmful:
   - Auto-renewal or hard-to-cancel terms
   - Broad IP assignment or license grants
   - Unilateral amendment rights
   - Limitation of liability that heavily favors one party
   - Data sharing you might not expect

6. SPECIFICALLY ABOUT "${inputs.your_concern || '[your concern]'}": Direct answer to what they asked about.

7. QUESTIONS TO ASK BEFORE AGREEING: 3 clarifying questions worth raising.

Policy text:
${inputs.policy_text || '[paste policy here]'}`
  },
  {
    id: 'client_update',
    number: '06',
    name: 'Client Legal Update Writer',
    tagline: 'Keep clients informed without creating confusion',
    phase: 'Communicate',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'After a legal development that affects a client matter',
    description: 'Drafts clear, professional client updates that explain legal developments in plain language.',
    inputs: [
      { id: 'matter', label: 'What is the legal matter?', placeholder: 'e.g. Employment dispute, contract negotiation, regulatory compliance, litigation', type: 'text' },
      { id: 'development', label: 'What happened / what is the update?', placeholder: 'e.g. Court ruled in our favor on the preliminary injunction. The other party has 14 days to respond.', type: 'textarea' },
      { id: 'next_steps', label: 'What are the next steps?', placeholder: 'e.g. We will file a response brief by March 15. We need your approval on the settlement offer by Friday.', type: 'textarea' },
      { id: 'client_type', label: 'Client sophistication level', placeholder: '', type: 'select', options: ['Non-legal professional (explain everything)', 'Business executive (some legal literacy)', 'In-house counsel (full legal detail ok)'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a client-facing lawyer who values clarity over legal jargon. Write an update that the client will actually understand and act on.

Matter: ${inputs.matter || '[matter]'}
Development: ${inputs.development || '[update]'}
Next steps: ${inputs.next_steps || '[next steps]'}
Client level: ${inputs.client_type || '[client type]'}

Write a client update email with:

1. SUBJECT LINE: Clear, specific — not "Update on your matter"

2. OPENING: One sentence framing — is this good news, neutral, or a challenge?

3. WHAT HAPPENED: Plain explanation of the development. Adjust complexity for ${inputs.client_type || '[client level]'} — avoid unexplained legal terms.

4. WHAT THIS MEANS FOR YOU: The practical impact on the client's situation.

5. NEXT STEPS: Numbered list — what WE are doing, what WE NEED FROM YOU, and by when.

6. TIMELINE: Key upcoming dates the client should be aware of.

7. CLOSE: Brief, professional — offer to discuss by phone if needed.

Under 300 words. No legal jargon without explanation.`
  },
  {
    id: 'ip_assignment',
    number: '07',
    name: 'IP Assignment Agreement',
    tagline: 'Make sure you own what your contractors build',
    phase: 'Draft',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'Before any contractor, freelancer, or consultant starts work',
    description: 'Drafts an IP assignment agreement ensuring your company owns all work product created by external parties.',
    inputs: [
      { id: 'company', label: 'Your company name', placeholder: 'e.g. Acme SRL', type: 'text' },
      { id: 'contractor', label: 'Contractor / freelancer name', placeholder: 'e.g. John Smith, individual / DevShop SRL', type: 'text' },
      { id: 'work_type', label: 'Type of work being done', placeholder: 'e.g. Mobile app development, logo design, marketing copy, data analysis', type: 'text' },
      { id: 'jurisdiction', label: 'Governing law', placeholder: 'e.g. Romanian law', type: 'text' },
      { id: 'existing_ip', label: 'Any pre-existing IP the contractor brings?', placeholder: 'e.g. They will use their own component library — we need a license, not assignment', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a commercial IP lawyer. Draft an IP assignment agreement that protects the company's ownership of all work product.

Company: ${inputs.company || '[company]'}
Contractor: ${inputs.contractor || '[contractor]'}
Work type: ${inputs.work_type || '[work type]'}
Governing law: ${inputs.jurisdiction || '[jurisdiction]'}
Pre-existing IP: ${inputs.existing_ip || 'none specified'}

Draft an IP Assignment Agreement covering:

1. PARTIES AND RECITALS: Who is involved and what is being built.

2. DEFINITION OF WORK PRODUCT: Everything created in connection with this engagement.

3. ASSIGNMENT: Clear, irrevocable assignment of all IP rights to ${inputs.company || '[company]'} — including copyright, patents, trade secrets, moral rights waiver.

4. PRE-EXISTING IP: ${inputs.existing_ip ? `License grant (not assignment) for: "${inputs.existing_ip}"` : 'Contractor warrants no pre-existing IP will be incorporated without prior written consent.'}

5. CONTRACTOR WARRANTIES:
   - Work is original
   - No third-party IP infringement
   - No open source with incompatible licenses
   - Has right to assign

6. WORK MADE FOR HIRE: Acknowledge as work made for hire where applicable under ${inputs.jurisdiction || '[jurisdiction]'} law.

7. COOPERATION: Contractor agrees to sign further documents to perfect the assignment.

8. GOVERNING LAW: ${inputs.jurisdiction || '[jurisdiction]'}

Add: "DRAFT — For legal review only."
Flag any clauses where local law (${inputs.jurisdiction || '[jurisdiction]'}) may require specific language.`
  },
  {
    id: 'employment_contract',
    number: '08',
    name: 'Employment Contract Checklist',
    tagline: 'Review any employment contract before signing',
    phase: 'Review',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before signing or issuing an employment contract',
    description: 'Reviews key employment contract clauses and flags anything unusual, missing, or potentially harmful.',
    inputs: [
      { id: 'contract_text', label: 'Paste the employment contract', placeholder: 'Paste the employment contract text here...', type: 'textarea' },
      { id: 'perspective', label: 'Reviewing from whose perspective?', placeholder: '', type: 'select', options: ['Employee (reviewing before signing)', 'Employer (reviewing before issuing)', 'HR / Legal review'] },
      { id: 'seniority', label: 'Role seniority', placeholder: '', type: 'select', options: ['Junior / entry level', 'Mid-level', 'Senior / specialist', 'Manager / team lead', 'Executive / C-suite'] },
      { id: 'jurisdiction', label: 'Country / jurisdiction', placeholder: 'e.g. Romania, UK, Germany', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an employment lawyer reviewing this contract from the perspective of: ${inputs.perspective || '[perspective]'}

Seniority: ${inputs.seniority || '[seniority]'}
Jurisdiction: ${inputs.jurisdiction || '[jurisdiction]'}

Review this employment contract and produce:

1. KEY TERMS SUMMARY:
   - Salary and compensation structure
   - Working hours and location
   - Notice period (both sides)
   - Probation period and conditions
   - Benefits and entitlements

2. CLAUSES TO SCRUTINIZE:
   - Non-compete scope and duration — is it enforceable in ${inputs.jurisdiction || '[jurisdiction]'}?
   - Non-solicitation of clients and employees
   - IP assignment — what does the employee assign to the employer?
   - Confidentiality obligations — scope and duration
   - Termination conditions — what triggers dismissal?

3. RED FLAGS for ${inputs.perspective || '[perspective]'}:
   - Overly broad restrictions
   - Missing protections
   - Unusual clauses not standard in ${inputs.jurisdiction || '[jurisdiction]'}

4. MISSING CLAUSES: What should be in this contract but isn't?

5. NEGOTIATION POINTS: For ${inputs.seniority || '[seniority]'} level — what is reasonable to push back on?

Contract text:
${inputs.contract_text || '[paste contract here]'}

Always recommend qualified employment legal advice before signing.`
  },
  {
    id: 'legal_research',
    number: '09',
    name: 'Legal Research Summarizer',
    tagline: 'Get to the legal answer faster',
    phase: 'Research',
    phaseColor: 'bg-indigo-50 text-indigo-600',
    context: 'When you need to quickly understand a legal topic or precedent',
    description: 'Structures a legal research prompt to get clear, organized analysis on any legal question.',
    inputs: [
      { id: 'question', label: 'What is your legal question?', placeholder: 'e.g. Can we include a non-compete clause for a remote employee based in Romania? What are the limits?', type: 'textarea' },
      { id: 'jurisdiction', label: 'Relevant jurisdiction(s)', placeholder: 'e.g. Romanian law, EU law, UK law', type: 'text' },
      { id: 'context', label: 'Business context', placeholder: 'e.g. SaaS company, 50 employees, selling to enterprise clients in Europe', type: 'text' },
      { id: 'urgency', label: 'What decision does this research inform?', placeholder: 'e.g. Deciding whether to include this clause in all new employment contracts starting next month', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a legal researcher providing a structured analysis. Be clear about what is settled law, what is uncertain, and where professional legal advice is essential.

Legal question: ${inputs.question || '[question]'}
Jurisdiction: ${inputs.jurisdiction || '[jurisdiction]'}
Business context: ${inputs.context || '[context]'}
Decision to inform: ${inputs.urgency || '[decision]'}

Provide a structured legal research summary:

1. DIRECT ANSWER: In 2-3 sentences — what is the answer to the question under ${inputs.jurisdiction || '[jurisdiction]'} law?

2. LEGAL FRAMEWORK: What laws, regulations, or directives govern this area?

3. KEY PRINCIPLES: 3-5 bullet points — the core legal rules that apply.

4. PRACTICAL IMPLICATIONS for "${inputs.context || '[context]'}": What does this mean in practice for this specific situation?

5. GRAY AREAS & UNCERTAINTY: What is not clearly settled? Where do courts or regulators have discretion?

6. RECENT DEVELOPMENTS: Any notable recent cases, regulatory updates, or changes in this area (note your knowledge cutoff).

7. DECISION GUIDANCE for "${inputs.urgency || '[decision]'}": Based on the research, what should they consider before deciding?

8. WHEN TO GET A LAWYER: Flag the specific aspects where professional legal advice is non-negotiable.

Always note: This is AI-assisted research, not legal advice. Consult qualified counsel before acting.`
  },
  {
    id: 'dispute_letter',
    number: '10',
    name: 'Dispute & Demand Letter Generator',
    tagline: 'Assert your rights clearly and professionally',
    phase: 'Communicate',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'When a contract has been breached or a dispute needs to be formalized',
    description: 'Drafts a professional demand or dispute letter that clearly states the issue, the legal basis, and the remedy sought.',
    inputs: [
      { id: 'sender', label: 'Sender (your company/name)', placeholder: 'e.g. Acme SRL', type: 'text' },
      { id: 'recipient', label: 'Recipient (other party)', placeholder: 'e.g. TechVendor SRL', type: 'text' },
      { id: 'dispute_type', label: 'Type of dispute', placeholder: '', type: 'select', options: ['Contract breach — non-payment', 'Contract breach — non-delivery', 'IP infringement', 'Employment dispute', 'Service quality failure', 'Refund / warranty claim', 'Other contract dispute'] },
      { id: 'facts', label: 'Key facts of the dispute', placeholder: 'e.g. We signed a contract on Jan 15 for €15,000 of software development. Delivery was due March 1. It is now April 10 and nothing has been delivered. Emails on March 5, 20, and April 1 went unanswered.', type: 'textarea' },
      { id: 'remedy', label: 'What remedy are you seeking?', placeholder: 'e.g. Full refund of €8,000 deposit within 14 days, or delivery of contracted work by April 30', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a commercial lawyer drafting a formal demand letter. The tone must be firm, professional, and legally precise — not aggressive, not apologetic.

Sender: ${inputs.sender || '[sender]'}
Recipient: ${inputs.recipient || '[recipient]'}
Dispute type: ${inputs.dispute_type || '[dispute type]'}
Facts: ${inputs.facts || '[facts]'}
Remedy sought: ${inputs.remedy || '[remedy]'}

Draft a formal demand letter:

1. HEADER: Date, sender details, recipient details, subject line (clear reference to the dispute).

2. OPENING: Purpose of the letter — one direct sentence.

3. BACKGROUND & FACTS: Chronological summary of the key facts. Dates, amounts, and specific events only — no emotional language.

4. LEGAL BASIS: What contractual or legal obligation has been breached? Reference the specific contract clause or legal principle.

5. HARM CAUSED: What has the sender suffered as a result?

6. REMEDY DEMANDED: ${inputs.remedy || '[remedy]'} — specific, with a clear deadline (typically 14 days).

7. CONSEQUENCE OF NON-COMPLIANCE: What action will be taken if the demand is not met (legal proceedings, regulatory complaint, etc.) — stated factually, not as a threat.

8. CLOSING: Professional close, signed by sender.

Add: "DRAFT — Review with qualified legal counsel before sending."
Tone: Firm and factual. No emotional language. No empty threats.`
  },
]

const phases = ['All', 'Review', 'Draft', 'Compliance', 'Communicate', 'Research']

export default function LegalToolkit() {
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
          <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full">Legal Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Legal Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Review faster. Draft smarter. Bill more.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for legal professionals and business owners — contract review, NDA drafting, GDPR compliance, due diligence, and more.
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
                      Tip: Always have a qualified lawyer review AI-generated legal documents before use.
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