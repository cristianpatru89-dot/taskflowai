'use client'

import Navbar from '@/components/navbar';
import { useState } from 'react'

const workflows = [
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
  const [showMoreAI, setShowMoreAI] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
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
      <Navbar active="toolkits" />

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
            {filtered.map((w, index) => {
              const isLocked = index >= 3
              return (
                <div
                  key={w.id}
                  onClick={() => { if (isLocked) { setShowUpgrade(true); return; } setActiveWorkflow(w.id); setGeneratedPrompt(''); }}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    isLocked
                      ? 'border-gray-100 bg-gray-50 opacity-60'
                      : activeWorkflow === w.id
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
              )
            })}
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
                      <p className="text-xs font-medium text-gray-700">Your prompt</p>
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
                    <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto mb-4">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                        {generatedPrompt}
                      </pre>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs text-gray-500 mb-2">Open in your AI tool:</p>
                      <div className="flex flex-wrap gap-2">
                        <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-lg bg-green-50 text-green-700 border-green-100 hover:opacity-80">
                          🤖 ChatGPT
                        </a>
                        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-lg bg-orange-50 text-orange-700 border-orange-100 hover:opacity-80">
                          ⚡ Claude
                        </a>
                        <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-lg bg-blue-50 text-blue-700 border-blue-100 hover:opacity-80">
                          ✨ Gemini
                        </a>
                        <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-lg bg-indigo-50 text-indigo-700 border-indigo-100 hover:opacity-80">
                          🪟 Copilot
                        </a>
                        <div className="relative">
                          <button
                            onClick={() => setShowMoreAI(!showMoreAI)}
                            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100"
                          >
                            More {showMoreAI ? '▲' : '▾'}
                          </button>
                          {showMoreAI && (
                            <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-100 rounded-xl shadow-lg p-2 z-10 w-44">
                              {[
                                { name: 'Perplexity', url: 'https://perplexity.ai', emoji: '🔍' },
                                { name: 'Mistral', url: 'https://chat.mistral.ai', emoji: '🌊' },
                                { name: 'Grok', url: 'https://grok.com', emoji: 'X' },
                                { name: 'DeepSeek', url: 'https://chat.deepseek.com', emoji: '🐳' },
                                { name: 'Poe', url: 'https://poe.com', emoji: '💬' },
                                { name: 'You.com', url: 'https://you.com', emoji: '🔎' },
                                { name: 'HuggingChat', url: 'https://huggingface.co/chat', emoji: '🤗' },
                                { name: 'Cohere', url: 'https://coral.cohere.com', emoji: '🪸' },
                              ].map(tool => (
                                <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-lg"
                                  onClick={() => setShowMoreAI(false)}>
                                  {tool.emoji} {tool.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Copy your prompt first, then open the AI tool and paste.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
            <div className="text-3xl mb-4">🔒</div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Unlock all 10 workflows</h2>
            <p className="text-sm text-gray-500 mb-6">
              The first 3 workflows are free. Unlock all 10 with a one-time purchase.
            </p>
            <div className="flex flex-col gap-3">
              <a href="https://taskflowai.lemonsqueezy.com/checkout/buy/e5533ac5-a283-4ad4-9ab2-8ab1e329ea01" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
                Unlock Healthcare Toolkit — $99
              </a>
              <a href="https://taskflowai.lemonsqueezy.com/checkout/buy/8b2db765-2683-40c9-834c-ee53c8be8504" target="_blank" rel="noopener noreferrer" className="w-full py-3 border border-gray-200 text-gray-700 text-sm rounded-xl hover:bg-gray-50 transition-colors">
                Get all 12 toolkits — $299
              </a>
              <button onClick={() => setShowUpgrade(false)} className="text-xs text-gray-400 hover:text-gray-600 mt-1">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}