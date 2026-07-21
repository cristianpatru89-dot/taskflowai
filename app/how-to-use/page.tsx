export default function HowToUse() {
  return (
    <div className="min-h-screen bg-white">

      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <a href="/" className="text-base font-medium">
          TaskFlow<span className="text-blue-600">AI</span>
        </a>
        <div className="flex gap-5 items-center">
          <a href="/#toolkits" className="text-sm text-gray-500 hover:text-gray-900">Toolkits</a>
          <a href="/how-to-use" className="text-sm text-gray-900 font-medium">How to use AI</a>
          <a href="/about" className="text-sm text-gray-500 hover:text-gray-900">About</a>
          <a href="/#pricing" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg font-medium">
            Get started
          </a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">

        <div className="mb-12">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Guide</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-4">How to use AI effectively</h1>
          <p className="text-base text-gray-500 leading-relaxed">
            TaskFlowAI generates prompts — structured instructions you paste into any AI tool to get professional outputs. This guide shows you how to get the best results.
          </p>
        </div>

        <div className="space-y-12">

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">Step 1 — Pick your AI tool</h2>
            <p className="text-sm text-gray-500 mb-6">All major AI tools work with TaskFlowAI prompts. Here are the ones we recommend:</p>

            <div className="grid grid-cols-1 gap-3 mb-6">
              <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">🤖</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">ChatGPT</div>
                  <div className="text-xs text-gray-500">Best for: writing, analysis, general tasks. Free + paid plans.</div>
                </div>
                <span className="text-xs text-gray-400">chat.openai.com →</span>
              </a>

              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">⚡</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Claude</div>
                  <div className="text-xs text-gray-500">Best for: long documents, nuanced writing, research. Free + paid plans.</div>
                </div>
                <span className="text-xs text-gray-400">claude.ai →</span>
              </a>

              <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">✨</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Gemini</div>
                  <div className="text-xs text-gray-500">Best for: Google Workspace integration, research. Free + paid plans.</div>
                </div>
                <span className="text-xs text-gray-400">gemini.google.com →</span>
              </a>

              <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">🪟</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Microsoft Copilot</div>
                  <div className="text-xs text-gray-500">Best for: Microsoft 365 users, Office integration. Free + paid plans.</div>
                </div>
                <span className="text-xs text-gray-400">copilot.microsoft.com →</span>
              </a>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-700 mb-3">Other AI tools that work with our prompts</p>
              <div className="flex flex-wrap gap-2">
                {['Perplexity', 'Mistral', 'Llama', 'Grok', 'DeepSeek', 'Cohere', 'Poe', 'You.com'].map(tool => (
                  <span key={tool} className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-600">{tool}</span>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">Step 2 — Use the workflow</h2>
            <div className="space-y-4">
              {[
                { num: '01', title: 'Choose your toolkit', desc: 'Go to the toolkit for your profession — PM, Legal, Sales, etc.' },
                { num: '02', title: 'Select a workflow', desc: 'Pick the workflow that matches what you need to do right now.' },
                { num: '03', title: 'Fill in your context', desc: 'Complete the input fields with your specific situation. The more detail, the better the output.' },
                { num: '04', title: 'Generate your prompt', desc: 'Click "Generate prompt" — your custom prompt is ready.' },
                { num: '05', title: 'Copy and paste', desc: 'Click "Copy" and paste the prompt into your AI tool of choice.' },
                { num: '06', title: 'Review and refine', desc: 'Read the AI output. If you want to go deeper, ask follow-up questions in the same conversation.' },
              ].map(step => (
                <div key={step.num} className="flex gap-4">
                  <span className="text-xs font-mono text-gray-300 mt-0.5 w-6 flex-shrink-0">{step.num}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{step.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">Step 3 — Get better results</h2>
            <div className="space-y-4">
              {[
                { title: 'Be specific in the input fields', desc: 'Vague inputs produce vague outputs. Instead of "a marketing email", write "a cold email to a CFO at a 200-person manufacturing company about reducing invoice processing time".' },
                { title: 'Use the follow-up conversation', desc: 'After pasting the prompt, you can keep talking to the AI. Ask it to make something shorter, more formal, add a specific example, or try a different angle.' },
                { title: 'Try multiple AI tools', desc: 'Different AI tools have different strengths. If you are not happy with the output from one, paste the same prompt into another.' },
                { title: 'Iterate — not just once', desc: 'The best professionals use AI in loops. Generate, review, refine, generate again. The first output is a starting point, not the final version.' },
                { title: 'Add your own context', desc: 'AI does not know your specific company, clients, or situation. After generating, add the context that makes it specific to you.' },
              ].map((tip, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-900 mb-1">{tip.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="bg-gray-900 rounded-xl p-6 text-center">
            <h2 className="text-base font-medium text-white mb-2">Ready to try it?</h2>
            <p className="text-sm text-gray-400 mb-4">Pick a toolkit and run your first workflow in under 2 minutes.</p>
            <a href="/#toolkits" className="inline-block px-5 py-2.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Browse toolkits
            </a>
          </div>

        </div>
      </div>

      <footer className="border-t border-gray-100 py-8 text-center mt-12">
        <div className="text-sm font-medium text-gray-900 mb-1">
          TaskFlow<span className="text-blue-600">AI</span>
        </div>
        <div className="text-xs text-gray-400">AI toolkits for professionals who have real work to do.</div>
      </footer>

    </div>
  )
}