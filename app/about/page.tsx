export default function About() {
  return (
    <div className="min-h-screen bg-white">

      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <a href="/" className="text-base font-medium">
          TaskFlow<span className="text-blue-600">AI</span>
        </a>
        <div className="flex gap-5 items-center">
          <a href="/#toolkits" className="text-sm text-gray-500 hover:text-gray-900">Toolkits</a>
          <a href="/how-to-use" className="text-sm text-gray-500 hover:text-gray-900">How to use AI</a>
          <a href="/about" className="text-sm text-gray-900 font-medium">About</a>
          <a href="/#pricing" className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg font-medium">
            Get started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-2xl mx-auto px-6 py-16">

        <div className="mb-16">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Our story</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-6 leading-snug">
            Built by a product manager who got tired of doing the same things the hard way
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            TaskFlowAI was not born in a boardroom. It was born at 11pm, during a sprint planning session, when Cristian realized he had written the same stakeholder update email for the fourth time that month — and wondered why.
          </p>
        </div>

        {/* Founder */}
        <div className="flex items-start gap-5 mb-12 p-6 bg-gray-50 rounded-2xl">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 text-xl font-medium">
  CP
<div className="mb-12 p-6 bg-gray-50 rounded-2xl">
  <div className="text-sm font-medium text-gray-900 mb-0.5">Cristian Patru</div>
  <div className="text-xs text-gray-500 mb-3">Founder · Senior Product Manager · Cluj-Napoca, Romania</div>
  <div className="flex gap-2 flex-wrap">
    {['Product strategy', 'AI/ML integration', 'Aviation tech', 'UX design'].map(tag => (
      <span key={tag} className="text-xs px-2 py-0.5 bg-white border border-gray-200 rounded-full text-gray-600">{tag}</span>
    ))}
  </div>
</div>

        {/* Story */}
        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

          <div>
            <h2 className="text-base font-medium text-gray-900 mb-3">The problem I kept running into</h2>
            <p>
              I have spent over 6 years as a Product Manager — at AirportLabs building billing systems for airports around the world, at Fortech leading product strategy and AI/ML ideation, and before that in UX and product design. I have facilitated over 50 ideation workshops, built high-fidelity prototypes, written hundreds of PRDs, and managed teams of 7+ PMs and POs.
            </p>
            <p className="mt-3">
              And in all of that time, one thing never changed: the most valuable professionals I worked with — lawyers, recruiters, finance leads, clinicians, executives — were spending enormous amounts of their time on tasks that were important but repetitive. Writing the same types of documents. Structuring the same types of analyses. Communicating the same types of updates.
            </p>
            <p className="mt-3">
              Not because they were inefficient. But because no one had given them a better way.
            </p>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-900 mb-3">What AI changed — and what it did not</h2>
            <p>
              When large language models became genuinely useful, I was one of the first people in every room I sat in to start experimenting. Not because I was a technologist chasing the next trend — but because I am a product manager, and I recognized a tool that could change the way professionals work.
            </p>
            <p className="mt-3">
              But I also noticed something that most people were missing: AI alone does not make you more effective. A blank prompt box is like a blank page — it helps the people who already know what to write. For everyone else, it is just another thing to figure out.
            </p>
            <p className="mt-3">
              The professionals who got the most out of AI were not the ones who were the best at prompting. They were the ones who understood their own work deeply enough to direct the AI precisely. The tool amplified their expertise. It did not replace it.
            </p>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-900 mb-3">Built with practitioners, not just for them</h2>
            <p>
              I did not build TaskFlowAI alone, and I did not build it from assumptions.
            </p>
            <p className="mt-3">
              Before writing a single workflow, I spent months talking to the professionals who would use it — sitting with lawyers reviewing contracts at midnight, with recruiters drowning in job descriptions, with finance managers wrestling with board decks, with teachers spending their Sundays writing report comments.
            </p>
            <p className="mt-3">
              I asked them not what features they wanted, but what jobs they needed to get done. I asked them what took too long, what they wished they had a shortcut for, and what they would never want a machine to decide for them.
            </p>
            <p className="mt-3">
              Their answers shaped every workflow in this product. The PM toolkit reflects 6 years of my own experience shipping products. The legal toolkit was validated with practicing lawyers. The healthcare workflows were reviewed with clinicians. The sales sequences were built with people who close deals for a living.
            </p>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-900 mb-3">What TaskFlowAI is — and is not</h2>
            <p>
              TaskFlowAI is not here to replace professionals. It is here to give them back the hours they spend on the parts of their job that are necessary but not where their real value lies.
            </p>
            <p className="mt-3">
              A lawyer's value is not in drafting the first version of an NDA at 10pm — it is in the judgment they bring to what goes in it. A recruiter's value is not in writing a job description — it is in knowing which candidate is actually right for the team. A product manager's value is not in formatting a PRD — it is in understanding the problem deeply enough to know what to build.
            </p>
            <p className="mt-3">
              Every toolkit in TaskFlowAI is built around one principle: <strong className="font-medium text-gray-900">AI should accelerate your expertise, not substitute for it.</strong> The output of every workflow is a starting point — something you complete, refine, and make your own. Not something you outsource your judgment to.
            </p>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-900 mb-3">Where we are going</h2>
            <p>
              We are at the beginning. Twelve toolkits, 120 workflows, and a community of professionals who are finding better ways to work — that is what exists today.
            </p>
            <p className="mt-3">
              What comes next is built on the same foundation: talking to the people who do the work, understanding what slows them down, and building the specific tools that help them move faster without losing the quality and judgment that makes their work valuable.
            </p>
            <p className="mt-3">
              If you are a professional who has found TaskFlowAI useful — or one who thinks we are missing something important for your field — I want to hear from you.
            </p>
          </div>

        </div>

        {/* Values */}
        <div className="mt-16 mb-16">
          <h2 className="text-base font-medium text-gray-900 mb-6">What we believe</h2>
          <div className="space-y-3">
            {[
              { principle: 'AI amplifies expertise — it does not replace it', desc: 'The best outputs come from professionals who use AI to go further with what they already know, not from people who outsource their thinking to a machine.' },
              { principle: 'Context is everything', desc: 'A generic prompt produces a generic output. Every workflow in TaskFlowAI is built around your specific situation — because the details are where the value is.' },
              { principle: 'Time is the most valuable professional resource', desc: 'We build for the professional who has the expertise but not the time. Every workflow should give you back hours, not minutes.' },
              { principle: 'Built with practitioners, not for them', desc: 'Every toolkit is validated with the people who use it in real work. We do not ship anything we have not tested with practitioners in that field.' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-900 mb-1">{item.principle}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
{/* Contact */}
<div className="border border-gray-100 rounded-2xl p-6 mb-16">
  <h2 className="text-base font-medium text-gray-900 mb-2">Get in touch</h2>
  <p className="text-sm text-gray-500 mb-4">Have feedback, a partnership idea, or want to suggest a toolkit for your field? I read every message personally.</p>
  <div className="flex flex-col gap-2">
    <a href="mailto:taskflowaiapp@gmail.com" className="text-sm text-blue-600 hover:underline">
      taskflowaiapp@gmail.com
    </a>
    <a href="https://www.linkedin.com/company/135156482/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
      TaskFlowAI on LinkedIn
    </a>
  </div>
</div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-base font-medium text-white mb-2">Ready to work smarter?</h2>
          <p className="text-sm text-gray-400 mb-5">120 workflows across 12 professions. Built by a practitioner, for practitioners.</p>
          <a href="/#toolkits" className="inline-block px-5 py-2.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Explore the toolkits
          </a>
        </div>

      </div>

      <footer className="border-t border-gray-100 py-8 text-center">
        <div className="text-sm font-medium text-gray-900 mb-1">
          TaskFlow<span className="text-blue-600">AI</span>
        </div>
        <div className="text-xs text-gray-400">AI toolkits for professionals who have real work to do.</div>
      </footer>

    </div>
  )
}