'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'clinical_note',
    number: '01',
    name: 'Clinical Note Summarizer',
    tagline: 'Turn lengthy clinical notes into structured summaries',
    phase: 'Documentation',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'After any patient encounter or record review',
    description: 'Converts unstructured clinical notes into clear, structured summaries ready for handoff or filing.',
    inputs: [
      { id: 'note_text', label: 'Paste clinical note or encounter text', placeholder: 'Paste the clinical note, discharge summary, or encounter notes here...', type: 'textarea' },
      { id: 'note_type', label: 'Note type', placeholder: '', type: 'select', options: ['GP / Primary care encounter', 'Specialist consultation', 'Emergency department note', 'Discharge summary', 'Nursing handoff note', 'Surgical note'] },
      { id: 'audience', label: 'Who is this summary for?', placeholder: '', type: 'select', options: ['Referring physician', 'Specialist', 'Nursing team', 'Patient / family', 'Administrative filing', 'Multidisciplinary team'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a clinical documentation specialist. Summarize this medical note accurately and clearly. Never add clinical information not present in the original. Never interpret or diagnose beyond what is stated.

Note type: ${inputs.note_type || '[note type]'}
Audience: ${inputs.audience || '[audience]'}

Summarize this clinical note with the following structure:

1. PATIENT OVERVIEW (2-3 sentences): Age, relevant background, reason for encounter.

2. PRESENTING COMPLAINT / REASON FOR VISIT: What brought the patient in — in plain terms.

3. KEY CLINICAL FINDINGS: Vital signs, examination findings, test results — bullet points only.

4. ASSESSMENT: Diagnosis or working diagnosis as stated in the note.

5. MANAGEMENT PLAN: Medications prescribed, referrals made, follow-up arranged.

6. PENDING ITEMS: Tests awaited, referrals outstanding, decisions deferred.

7. FOLLOW-UP: When and with whom.

Adjust language complexity for: ${inputs.audience || '[audience]'}
If audience is patient/family: use plain English, avoid medical jargon.
If audience is clinical: maintain clinical terminology.

Original note:
${inputs.note_text || '[paste note here]'}

Important: Only summarize what is in the note. Do not add clinical interpretation.`
  },
  {
    id: 'patient_communication',
    number: '02',
    name: 'Patient Communication Writer',
    tagline: 'Write patient letters and messages that are actually understood',
    phase: 'Communication',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'When communicating a diagnosis, results, or care plan to patients',
    description: 'Drafts clear, empathetic patient communications at the right reading level — from results letters to care instructions.',
    inputs: [
      { id: 'communication_type', label: 'Type of communication', placeholder: '', type: 'select', options: ['Test results letter', 'Diagnosis explanation', 'Care plan / discharge instructions', 'Appointment reminder with prep instructions', 'Referral explanation letter', 'Medication instructions'] },
      { id: 'clinical_content', label: 'Clinical content to communicate', placeholder: 'e.g. Blood test results show HbA1c of 7.8%. Patient has Type 2 diabetes, newly diagnosed. Starting metformin 500mg twice daily with meals. Follow-up in 3 months.', type: 'textarea' },
      { id: 'patient_context', label: 'Patient context (optional)', placeholder: 'e.g. 58-year-old, low health literacy, prefers simple language, speaks English as second language', type: 'text' },
      { id: 'tone', label: 'Tone', placeholder: '', type: 'select', options: ['Warm and reassuring', 'Clear and direct', 'Formal / official', 'Simple and plain language'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a healthcare communication specialist. Write patient communications that are empathetic, clear, and actionable. Use plain language — aim for a Grade 6-8 reading level unless specified otherwise.

Communication type: ${inputs.communication_type || '[type]'}
Clinical content: ${inputs.clinical_content || '[content]'}
Patient context: ${inputs.patient_context || 'not specified'}
Tone: ${inputs.tone || 'warm and clear'}

Write a patient communication that includes:

1. GREETING: Warm, personal (use [Patient Name] as placeholder).

2. CLEAR OPENING: State the purpose of this communication in the first sentence. Do not bury the key message.

3. THE MAIN MESSAGE: Communicate "${inputs.clinical_content || '[content]'}" in plain English.
   - Avoid medical jargon — explain any unavoidable terms
   - Use short sentences
   - Use "you" language, not passive voice

4. WHAT THIS MEANS FOR YOU: Practical implications for the patient's daily life.

5. WHAT TO DO NEXT: Numbered list of specific actions the patient should take.

6. WHEN TO SEEK HELP: Clear instructions on warning signs or when to call.

7. CONTACT INFORMATION: Placeholder for clinic name, phone, and hours.

8. WARM CLOSE: Reassuring, supportive closing sentence.

Patient context to consider: ${inputs.patient_context || 'general adult patient'}
Never include clinical speculation. Only communicate what has been confirmed.`
  },
  {
    id: 'literature_review',
    number: '03',
    name: 'Medical Literature Reviewer',
    tagline: 'Get to the clinical evidence faster',
    phase: 'Research',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'When reviewing evidence for a clinical question or protocol update',
    description: 'Structures a medical literature review prompt to extract key findings, quality assessment, and clinical implications.',
    inputs: [
      { id: 'clinical_question', label: 'Clinical question (PICO format if possible)', placeholder: 'e.g. In adult patients with Type 2 diabetes (P), does GLP-1 agonist therapy (I) compared to metformin (C) reduce cardiovascular events (O)?', type: 'textarea' },
      { id: 'literature_text', label: 'Paste abstract or article text (optional)', placeholder: 'Paste the abstract or key sections of the paper here if you have specific literature to review...', type: 'textarea' },
      { id: 'purpose', label: 'Purpose of this review', placeholder: '', type: 'select', options: ['Clinical decision for individual patient', 'Protocol / guideline update', 'Journal club presentation', 'Grant application background', 'Patient question answer'] },
      { id: 'specialty', label: 'Clinical specialty', placeholder: 'e.g. General practice, cardiology, oncology, paediatrics', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a clinical research analyst. Provide evidence-based analysis with appropriate caveats about evidence quality. Always note your knowledge cutoff and recommend checking current guidelines.

Clinical question: ${inputs.clinical_question || '[question]'}
Purpose: ${inputs.purpose || '[purpose]'}
Specialty: ${inputs.specialty || '[specialty]'}

${inputs.literature_text ? `Review this specific literature:\n${inputs.literature_text}\n\nAnd also provide:` : 'Provide:'}

1. CLINICAL QUESTION REFRAMED: State the PICO clearly if not already in that format.

2. CURRENT EVIDENCE SUMMARY:
   - What does the evidence show?
   - Level of evidence (RCT, meta-analysis, cohort, expert opinion)?
   - Key studies or guidelines (note: verify currency with current databases)

3. EVIDENCE QUALITY ASSESSMENT:
   - Strength of evidence (strong / moderate / weak / insufficient)
   - Key limitations or confounders
   - Applicability to the specific patient population

4. CLINICAL IMPLICATIONS for ${inputs.specialty || '[specialty]'}:
   - What does this mean in practice?
   - What does it change (if anything)?

5. AREAS OF UNCERTAINTY: Where evidence is conflicting or insufficient.

6. RECOMMENDED NEXT STEPS: Current guidelines to check, databases to search, specialists to consult.

Important disclaimer: This is AI-assisted research support. Always verify with current peer-reviewed sources and clinical guidelines. AI knowledge has a cutoff date.`
  },
  {
    id: 'referral_letter',
    number: '04',
    name: 'Referral Letter Generator',
    tagline: 'Write referrals that get the right specialist response',
    phase: 'Documentation',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'When referring a patient to a specialist or service',
    description: 'Drafts a structured, complete referral letter that gives the specialist everything they need.',
    inputs: [
      { id: 'patient_summary', label: 'Patient summary', placeholder: 'e.g. 65-year-old male, hypertension, Type 2 diabetes, non-smoker. Presenting with 3-month history of exertional chest pain, relieved by rest. ECG shows ST changes.', type: 'textarea' },
      { id: 'referral_to', label: 'Referring to', placeholder: 'e.g. Cardiology, Orthopaedics, Dermatology, Mental Health', type: 'text' },
      { id: 'reason', label: 'Reason for referral', placeholder: 'e.g. Query stable angina — for further investigation and management. Request exercise stress test and specialist review.', type: 'textarea' },
      { id: 'urgency', label: 'Urgency', placeholder: '', type: 'select', options: ['Routine (weeks to months)', 'Soon (1-2 weeks)', 'Urgent (within days)', 'Emergency (same day)'] },
      { id: 'current_management', label: 'Current medications and management', placeholder: 'e.g. Aspirin 100mg daily, Metformin 1g BD, Ramipril 5mg daily, Atorvastatin 40mg nocte', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a GP or specialist writing a referral letter. The receiving specialist needs complete, relevant information — nothing more, nothing less.

Referring to: ${inputs.referral_to || '[specialty]'}
Urgency: ${inputs.urgency || '[urgency]'}

Write a professional referral letter:

Dear [Specialist Name / Team],

1. REASON FOR REFERRAL (opening sentence): Why you are writing and what you are asking for. State urgency: ${inputs.urgency || '[urgency]'}.

2. PATIENT OVERVIEW:
   ${inputs.patient_summary || '[patient summary]'}

3. PRESENTING COMPLAINT AND HISTORY:
   - Duration and character of symptoms
   - Relevant positive and negative findings
   - Functional impact

4. INVESTIGATIONS TO DATE:
   - Results available (with dates if provided)
   - Investigations pending

5. CURRENT MANAGEMENT:
   ${inputs.current_management || '[current medications and management]'}

6. SPECIFIC REQUEST: Exactly what you are asking the specialist to do.
   ${inputs.reason || '[reason for referral]'}

7. RELEVANT PAST HISTORY: Conditions, surgeries, allergies relevant to this referral.

8. SOCIAL HISTORY (if relevant): Occupation, living situation, support — only if clinically relevant.

9. CLOSING: Available for discussion, contact details placeholder.

Yours sincerely,
[Referring Clinician Name]
[Practice / Hospital]
[Contact]

Keep under 400 words. Include only clinically relevant information.`
  },
  {
    id: 'hipaa_review',
    number: '05',
    name: 'HIPAA Compliance Reviewer',
    tagline: 'Check your processes against HIPAA requirements',
    phase: 'Compliance',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Before launching any process, tool, or communication that handles patient data',
    description: 'Reviews a healthcare process or technology against HIPAA requirements and produces a gap analysis.',
    inputs: [
      { id: 'process', label: 'Describe the process or tool to review', placeholder: 'e.g. We want to use a third-party messaging app to send appointment reminders to patients that include their name, appointment time, and clinic location.', type: 'textarea' },
      { id: 'phi_involved', label: 'What Protected Health Information (PHI) is involved?', placeholder: 'e.g. Patient name, date of appointment, clinic name, diagnosis codes', type: 'text' },
      { id: 'org_type', label: 'Organization type', placeholder: '', type: 'select', options: ['Hospital / health system', 'Private practice / clinic', 'Health tech company', 'Insurance / payer', 'Pharmacy', 'Mental health provider'] },
      { id: 'specific_concern', label: 'Specific concern (optional)', placeholder: 'e.g. Worried about using WhatsApp for patient communication, or sending emails with appointment details', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a HIPAA compliance specialist. Be thorough and conservative — the consequences of HIPAA violations are severe.

Process to review: ${inputs.process || '[process]'}
PHI involved: ${inputs.phi_involved || '[PHI]'}
Organization type: ${inputs.org_type || '[org type]'}
Specific concern: ${inputs.specific_concern || 'general review'}

Review against HIPAA requirements:

1. PHI IDENTIFICATION: Confirm what constitutes PHI in this scenario and what the obligations are.

2. PRIVACY RULE COMPLIANCE:
   - Minimum necessary standard — are you sharing only what is needed?
   - Patient authorization — is consent required for this use?
   - Notice of Privacy Practices — does this process require patient notification?

3. SECURITY RULE COMPLIANCE:
   - Is PHI being transmitted securely (encryption in transit and at rest)?
   - Access controls — who can see this information?
   - Audit trails — is access being logged?

4. THIRD-PARTY / BUSINESS ASSOCIATE ANALYSIS:
   - Is a Business Associate Agreement (BAA) required?
   - Do third-party tools (${inputs.specific_concern || 'tools mentioned'}) have HIPAA-compliant configurations?

5. SPECIFICALLY ABOUT: "${inputs.specific_concern || '[concern]'}":
   - Is this compliant as described?
   - What would need to change to make it compliant?

6. GAP SUMMARY:
   For each gap: Risk level (HIGH/MEDIUM/LOW) + Recommended fix

7. TOP 3 ACTIONS TO TAKE FIRST

Note: This is AI-assisted compliance review. Always consult a qualified HIPAA compliance officer or legal counsel before implementation.`
  },
  {
    id: 'care_plan',
    number: '06',
    name: 'Care Plan Builder',
    tagline: 'Create structured care plans that patients actually follow',
    phase: 'Documentation',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'After diagnosis or at care plan review',
    description: 'Builds a clear, patient-centered care plan with goals, actions, and monitoring parameters.',
    inputs: [
      { id: 'condition', label: 'Primary condition or diagnosis', placeholder: 'e.g. Type 2 Diabetes Mellitus, newly diagnosed', type: 'text' },
      { id: 'patient_profile', label: 'Patient profile', placeholder: 'e.g. 55-year-old female, overweight (BMI 31), sedentary job, no previous medical history, motivated to make lifestyle changes', type: 'textarea' },
      { id: 'goals', label: 'Clinical goals', placeholder: 'e.g. HbA1c < 7% within 6 months, weight loss 5-10%, blood pressure < 130/80', type: 'textarea' },
      { id: 'complexity', label: 'Care complexity', placeholder: '', type: 'select', options: ['Simple — single condition, motivated patient', 'Moderate — 2-3 conditions, some barriers', 'Complex — multiple conditions, social factors, low health literacy'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are a chronic disease management specialist. Build a care plan that is evidence-based, realistic, and patient-centered.

Condition: ${inputs.condition || '[condition]'}
Patient profile: ${inputs.patient_profile || '[profile]'}
Clinical goals: ${inputs.goals || '[goals]'}
Complexity: ${inputs.complexity || '[complexity]'}

Build a structured care plan:

1. CARE PLAN OVERVIEW:
   - Primary diagnosis: ${inputs.condition || '[condition]'}
   - Care plan date: [Date]
   - Review date: [Date + 3 months]
   - Care team: [GP / Specialist / Nurse / Allied Health]

2. PATIENT GOALS (in the patient's own language):
   What does the patient want to achieve? Frame clinical goals as patient-relevant outcomes.

3. CLINICAL TARGETS:
   ${inputs.goals || '[goals]'}
   For each target: current baseline → target → timeline

4. ACTION PLAN — WHAT WE WILL DO:
   Medical management:
   - Medications (leave specific doses as [CONFIRM WITH PRESCRIBER])
   - Investigations and monitoring schedule
   - Referrals

5. ACTION PLAN — WHAT THE PATIENT WILL DO:
   Lifestyle changes (specific and realistic for ${inputs.patient_profile || '[profile]'}):
   - Nutrition changes (specific, achievable)
   - Physical activity (specific, graded)
   - Self-monitoring (what to check, how often, what to do with results)

6. WARNING SIGNS: When to seek urgent medical attention.

7. SUPPORT RESOURCES: Community programs, apps, support groups relevant to ${inputs.condition || '[condition]'}.

8. NEXT REVIEW: Date and what will be assessed.

Write the patient-facing sections in plain language. Clinical sections can use standard terminology.`
  },
  {
    id: 'health_tech_prd',
    number: '07',
    name: 'Health Tech PRD Builder',
    tagline: 'Build healthcare products that clinicians actually use',
    phase: 'Product',
    phaseColor: 'bg-indigo-50 text-indigo-600',
    context: 'Before any health tech feature development',
    description: 'Creates a healthcare-specific PRD that addresses clinical workflow, regulatory requirements, and patient safety.',
    inputs: [
      { id: 'feature', label: 'Feature or product to build', placeholder: 'e.g. Automated medication reminder system that sends SMS alerts to patients and notifies their GP if doses are repeatedly missed', type: 'textarea' },
      { id: 'clinical_setting', label: 'Clinical setting', placeholder: 'e.g. Primary care, hospital inpatient, aged care, mental health, chronic disease management', type: 'text' },
      { id: 'users', label: 'Who uses this? (clinical and non-clinical)', placeholder: 'e.g. Patients (primary user), GPs (monitor adherence), practice nurses (configure alerts), family carers (secondary)', type: 'textarea' },
      { id: 'regulatory', label: 'Regulatory considerations', placeholder: 'e.g. EU MDR (Medical Device Regulation), HIPAA, GDPR, TGA (Australia), FDA', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a Health Tech Product Manager with clinical and regulatory expertise. Build a PRD that balances clinical utility, patient safety, and regulatory compliance.

Feature: ${inputs.feature || '[feature]'}
Clinical setting: ${inputs.clinical_setting || '[setting]'}
Users: ${inputs.users || '[users]'}
Regulatory framework: ${inputs.regulatory || '[regulatory]'}

Write a Health Tech PRD:

1. CLINICAL PROBLEM STATEMENT:
   - What clinical problem does this solve?
   - What is the current workaround and why is it failing?
   - What is the patient safety or care quality risk if this is not solved?

2. USERS AND CLINICAL WORKFLOWS:
   For each user type in "${inputs.users || '[users]'}":
   - Current workflow (before this feature)
   - How this feature fits into their workflow
   - What they must NOT have to do differently (workflow disruption = non-adoption)

3. CLINICAL REQUIREMENTS (P0 = must have for patient safety):
   | ID | Requirement | Clinical Rationale | Priority |
   
4. REGULATORY REQUIREMENTS for ${inputs.regulatory || '[regulatory framework]'}:
   - Is this a medical device? (classification)
   - Data privacy obligations for health data
   - Clinical validation required before launch
   - Audit trail and documentation requirements

5. PATIENT SAFETY CONSIDERATIONS:
   - What are the failure modes and their clinical consequences?
   - What alerts, warnings, or failsafes are required?
   - What human override must always be possible?

6. CLINICAL VALIDATION PLAN:
   - How will you test with clinicians before launch?
   - What clinical outcomes will you measure?
   - Minimum viable evidence required before wider rollout

7. NON-GOALS: What this does NOT replace (clinical judgment, emergency services, etc.)

8. OPEN QUESTIONS FOR CLINICAL ADVISORS`
  },
  {
    id: 'clinical_audit',
    number: '08',
    name: 'Clinical Audit Framework',
    tagline: 'Run audits that actually improve patient care',
    phase: 'Quality',
    phaseColor: 'bg-red-50 text-red-600',
    context: 'When planning or reporting a clinical audit',
    description: 'Designs a clinical audit framework with clear standards, data collection, and improvement cycle.',
    inputs: [
      { id: 'audit_topic', label: 'Audit topic', placeholder: 'e.g. Appropriate prescribing of antibiotics for upper respiratory tract infections in primary care', type: 'text' },
      { id: 'standard', label: 'Clinical standard or guideline being audited against', placeholder: 'e.g. WHO antibiotic prescribing guidelines, NICE guideline CG69, local hospital protocol', type: 'text' },
      { id: 'setting', label: 'Clinical setting', placeholder: 'e.g. General practice, hospital ward, emergency department', type: 'text' },
      { id: 'sample', label: 'Data sample available', placeholder: 'e.g. Last 100 patient encounters with URTI diagnosis, past 6 months', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a clinical quality improvement specialist. Design an audit that produces actionable findings, not just data.

Audit topic: ${inputs.audit_topic || '[topic]'}
Standard: ${inputs.standard || '[standard]'}
Setting: ${inputs.setting || '[setting]'}
Sample: ${inputs.sample || '[sample]'}

Design a complete clinical audit framework:

1. AUDIT TITLE AND AIM: Clear statement of what is being measured and why.

2. AUDIT CRITERIA (what "good" looks like):
   Based on "${inputs.standard || '[standard]'}":
   - Criterion 1: [Measurable statement of best practice]
   - Criterion 2: [Measurable statement]
   - Criterion 3: [Measurable statement]
   For each criterion: target standard (e.g. 95% compliance)

3. DATA COLLECTION TOOL:
   Fields to collect for each case:
   - Patient identifier (anonymized)
   - Date
   - Criterion 1: Met / Not Met / Not Applicable
   - Criterion 2: Met / Not Met / Not Applicable
   - Notes field

4. INCLUSION / EXCLUSION CRITERIA: Which cases to include and which to exclude.

5. ANALYSIS PLAN:
   - How to calculate compliance rates
   - How to present results (table, run chart)
   - Statistical approach if needed

6. FINDINGS TEMPLATE:
   - Overall compliance rate: X%
   - Criterion-by-criterion breakdown
   - Cases meeting all criteria: X%
   - Most common reason for non-compliance

7. IMPROVEMENT CYCLE (PDSA):
   - Plan: What change will be made?
   - Do: How will it be implemented?
   - Study: How will impact be measured?
   - Act: Re-audit timeline (recommend: 3-6 months)

8. REPORTING FORMAT for ${inputs.setting || '[setting]'} governance.`
  },
  {
    id: 'med_education',
    number: '09',
    name: 'Medical Education Content Builder',
    tagline: 'Create teaching materials that actually teach',
    phase: 'Education',
    phaseColor: 'bg-teal-50 text-teal-700',
    context: 'When creating educational content for students, trainees, or patients',
    description: 'Builds structured medical education content — case studies, teaching points, or patient education materials.',
    inputs: [
      { id: 'topic', label: 'Educational topic', placeholder: 'e.g. Acute management of ST-elevation MI, diabetic ketoacidosis recognition, hand hygiene technique', type: 'text' },
      { id: 'audience', label: 'Target audience', placeholder: '', type: 'select', options: ['Medical students (years 1-2)', 'Medical students (clinical years)', 'Junior doctors / residents', 'Nurses and allied health', 'Patients and carers', 'General public'] },
      { id: 'format', label: 'Content format', placeholder: '', type: 'select', options: ['Clinical case study with teaching points', 'Quick reference summary', 'Step-by-step procedure guide', 'Patient education leaflet', 'Quiz / knowledge check', 'Simulation scenario'] },
      { id: 'learning_objectives', label: 'Learning objectives (what should learners be able to do?)', placeholder: 'e.g. Recognise STEMI on ECG, initiate dual antiplatelet therapy, activate cath lab pathway within 90 minutes', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a medical educator with expertise in adult learning and clinical education. Create content that is accurate, engaging, and immediately applicable.

Topic: ${inputs.topic || '[topic]'}
Audience: ${inputs.audience || '[audience]'}
Format: ${inputs.format || '[format]'}
Learning objectives: ${inputs.learning_objectives || '[objectives]'}

Create ${inputs.format || '[format]'} on "${inputs.topic || '[topic]'}" for ${inputs.audience || '[audience]'}:

LEARNING OBJECTIVES (to be met by this content):
${inputs.learning_objectives || '[objectives]'}

${inputs.format === 'Clinical case study with teaching points' ? `
CLINICAL CASE:
- Presentation: Age, setting, chief complaint, history
- Examination findings (relevant positives and negatives)
- Initial investigations (ECG, bloods, imaging as relevant)

CLINICAL DECISION POINTS:
For each key decision in the case:
- The decision point
- Options available
- Correct action and rationale
- Common errors to avoid

TEACHING POINTS (5-7 key learning messages):
Each point: the principle + a memorable clinical pearl

SUMMARY TABLE: Key facts, thresholds, and mnemonics

SELF-ASSESSMENT QUESTIONS (3): With answers` : `
CONTENT STRUCTURE:
Organised logically for ${inputs.audience || '[audience]'}
Use headers, bullet points, and tables for scannability
Include clinical pearls and key numbers
Avoid jargon without explanation for non-clinical audiences`}

Always base content on established clinical guidelines. Note if content should be verified against local protocols.`
  },
  {
    id: 'incident_report',
    number: '10',
    name: 'Clinical Incident Report Writer',
    tagline: 'Document incidents clearly to drive learning, not blame',
    phase: 'Quality',
    phaseColor: 'bg-red-50 text-red-600',
    context: 'After any adverse event, near miss, or clinical incident',
    description: 'Structures a clinical incident report focused on system factors, learning, and improvement — not individual blame.',
    inputs: [
      { id: 'incident_type', label: 'Type of incident', placeholder: '', type: 'select', options: ['Medication error', 'Fall / patient injury', 'Diagnostic delay or error', 'Communication failure', 'Equipment failure', 'Infection control breach', 'Near miss (no harm occurred)', 'Complaint / patient concern'] },
      { id: 'what_happened', label: 'What happened? (facts only)', placeholder: 'e.g. Patient received 10mg methotrexate daily instead of weekly. Error discovered after 5 days when patient presented with mouth ulcers. Pharmacy dispensed as prescribed; prescription error by junior doctor.', type: 'textarea' },
      { id: 'harm_level', label: 'Harm level', placeholder: '', type: 'select', options: ['No harm (near miss)', 'Minor harm — no treatment required', 'Moderate harm — treatment required', 'Severe harm — permanent impact', 'Catastrophic / death'] },
      { id: 'immediate_actions', label: 'Immediate actions taken', placeholder: 'e.g. Drug stopped, patient assessed, haematology review requested, family notified, pharmacy alerted', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a clinical risk and patient safety specialist. Write an incident report that supports learning and system improvement — not blame of individuals.

Incident type: ${inputs.incident_type || '[type]'}
What happened: ${inputs.what_happened || '[facts]'}
Harm level: ${inputs.harm_level || '[harm]'}
Immediate actions: ${inputs.immediate_actions || '[actions]'}

Write a structured clinical incident report:

1. INCIDENT SUMMARY:
   - Date/time: [To be completed]
   - Location: [To be completed]
   - Incident type: ${inputs.incident_type || '[type]'}
   - Harm level: ${inputs.harm_level || '[harm]'}

2. CHRONOLOGICAL ACCOUNT (facts only, no interpretation):
   Based on: "${inputs.what_happened || '[facts]'}"
   - What happened, in sequence
   - Who was involved (roles, not names)
   - When each event occurred

3. IMMEDIATE ACTIONS TAKEN:
   ${inputs.immediate_actions || '[actions]'}

4. CONTRIBUTING FACTORS ANALYSIS (systems thinking):
   Consider each category — which factors contributed?
   - Patient factors
   - Task and technology factors
   - Individual staff factors
   - Team and communication factors
   - Work environment factors
   - Organisational and management factors

5. ROOT CAUSE ANALYSIS:
   What was the underlying system failure that allowed this to happen?
   Use "5 Whys" format.

6. RECOMMENDED ACTIONS:
   For each contributing factor:
   - Specific action
   - Responsible person/team
   - Timeline
   - How effectiveness will be measured

7. LEARNING POINTS: What should the whole organisation learn from this?

8. DISCLOSURE CONSIDERATIONS: If patient/family communication is required — what needs to be communicated and by whom.

Focus on system factors. Avoid language that assigns personal blame.`
  },
]

const phases = ['All', 'Documentation', 'Communication', 'Research', 'Compliance', 'Product', 'Quality', 'Education']

export default function HealthcareToolkit() {
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
          <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full">Healthcare Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Healthcare Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Less admin. More care.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for healthcare professionals — clinical documentation, patient communication, literature review, compliance, and quality improvement.
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
                      Important: AI-generated clinical content must always be reviewed by a qualified clinician before use.
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