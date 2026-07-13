'use client'

import { useState } from 'react'

const workflows = [
  {
    id: 'lesson_plan',
    number: '01',
    name: 'Lesson Plan Builder',
    tagline: 'Design lessons that actually engage students',
    phase: 'Plan',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Before any lesson or unit',
    description: 'Creates a structured, outcome-focused lesson plan with activities, timing, and differentiation strategies.',
    inputs: [
      { id: 'subject', label: 'Subject and topic', placeholder: 'e.g. High school Biology — Cell Division (Mitosis)', type: 'text' },
      { id: 'grade', label: 'Grade level and age', placeholder: 'e.g. Grade 10, 15-16 year olds', type: 'text' },
      { id: 'duration', label: 'Lesson duration', placeholder: '', type: 'select', options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes', '2 hours'] },
      { id: 'objectives', label: 'Learning objectives', placeholder: 'e.g. Students will be able to identify the 4 phases of mitosis, explain why cell division is essential, and diagram the process', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an experienced educator and instructional designer. Create a lesson plan that maximizes student engagement and achieves clear learning outcomes.

Subject: ${inputs.subject || '[subject]'}
Grade: ${inputs.grade || '[grade]'}
Duration: ${inputs.duration || '[duration]'}
Objectives: ${inputs.objectives || '[objectives]'}

Create a complete lesson plan:

1. LESSON OVERVIEW:
   - Subject: ${inputs.subject || '[subject]'}
   - Duration: ${inputs.duration || '[duration]'}
   - Learning objectives: ${inputs.objectives || '[objectives]'}

2. MATERIALS NEEDED: List everything required to run this lesson.

3. LESSON STRUCTURE (with timing):

   HOOK / ENGAGE (10% of time):
   An activity or question that activates prior knowledge and creates curiosity.
   Avoid: "Today we are going to learn about X."

   DIRECT INSTRUCTION (25% of time):
   Core content delivery — how to present the key concepts clearly.
   Include: key vocabulary, visual aids, examples.

   GUIDED PRACTICE (30% of time):
   Students practice with teacher support.
   Specific activity with instructions.

   INDEPENDENT PRACTICE (25% of time):
   Students apply learning independently.
   Task description and success criteria.

   CLOSURE / REFLECT (10% of time):
   How students consolidate learning.
   Exit ticket or reflection prompt.

4. DIFFERENTIATION:
   - Support for struggling learners
   - Extension for advanced learners
   - EAL/ESL accommodations if relevant

5. ASSESSMENT: How will you know if students met the objectives?

6. POTENTIAL MISCONCEPTIONS: Common errors students make on this topic and how to address them.`
  },
  {
    id: 'assessment_design',
    number: '02',
    name: 'Assessment Designer',
    tagline: 'Create assessments that measure real understanding',
    phase: 'Assess',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'When designing any test, quiz, or assignment',
    description: 'Builds varied assessments aligned to learning objectives with a marking rubric.',
    inputs: [
      { id: 'topic', label: 'Topic being assessed', placeholder: 'e.g. Shakespeare\'s Macbeth — themes of ambition and power', type: 'text' },
      { id: 'grade', label: 'Grade level', placeholder: 'e.g. Year 12, IB students', type: 'text' },
      { id: 'assessment_type', label: 'Assessment type', placeholder: '', type: 'select', options: ['Multiple choice quiz', 'Short answer test', 'Essay assignment', 'Project-based assessment', 'Oral presentation rubric', 'Mixed format exam'] },
      { id: 'objectives', label: 'What should students demonstrate?', placeholder: 'e.g. Analyse how Shakespeare uses language to present ambition, compare Macbeth and Lady Macbeth, evaluate the role of the supernatural', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an assessment design expert using Bloom's Taxonomy. Create assessments that test genuine understanding, not just recall.

Topic: ${inputs.topic || '[topic]'}
Grade: ${inputs.grade || '[grade]'}
Type: ${inputs.assessment_type || '[type]'}
Objectives: ${inputs.objectives || '[objectives]'}

Design a complete assessment:

1. ASSESSMENT OVERVIEW:
   - Topic: ${inputs.topic || '[topic]'}
   - Type: ${inputs.assessment_type || '[type]'}
   - Learning objectives measured: ${inputs.objectives || '[objectives]'}
   - Bloom's Taxonomy levels addressed: [list]

2. THE ASSESSMENT:
   [Create the full assessment appropriate for ${inputs.assessment_type || '[type]'}]
   
   For multiple choice: 10-15 questions with 4 options, mix of knowledge and application
   For essay: question + word count + assessment criteria
   For project: brief + requirements + timeline
   For oral: criteria + question bank + structure

3. MARKING RUBRIC:
   For each assessment criterion:
   - Excellent (A): [specific descriptor]
   - Proficient (B): [specific descriptor]
   - Developing (C): [specific descriptor]
   - Beginning (D): [specific descriptor]

4. ANSWER KEY / MARKING GUIDE:
   [Full answers or model response for each question]

5. COMMON ERRORS TO WATCH FOR:
   Top 3 mistakes students make on this topic.

6. EXTENSION QUESTION:
   One additional challenge question for students who finish early.`
  },
  {
    id: 'parent_communication',
    number: '03',
    name: 'Parent Communication Writer',
    tagline: 'Communicate with parents clearly and professionally',
    phase: 'Communicate',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'For any parent letter, email, or report comment',
    description: 'Drafts professional, empathetic parent communications for any situation — progress, concerns, or celebrations.',
    inputs: [
      { id: 'communication_type', label: 'Communication type', placeholder: '', type: 'select', options: ['Progress update (positive)', 'Concern about academic performance', 'Behaviour concern', 'Report card comment', 'Meeting request', 'Celebration / achievement'] },
      { id: 'student_context', label: 'Student context (no names)', placeholder: 'e.g. Year 9 student, previously strong in Maths, performance has dropped significantly this term, seems disengaged in class', type: 'textarea' },
      { id: 'key_message', label: 'Key message to communicate', placeholder: 'e.g. Performance has dropped from B+ to D this term, we are concerned and want to meet to discuss support strategies', type: 'textarea' },
      { id: 'next_step', label: 'Desired next step', placeholder: 'e.g. Parent to contact school to arrange a meeting, parent to sign and return the attached form', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an experienced teacher who communicates with parents professionally and empathetically. Always assume good intent from parents and focus on the student's best interests.

Communication type: ${inputs.communication_type || '[type]'}
Student context: ${inputs.student_context || '[context]'}
Key message: ${inputs.key_message || '[message]'}
Next step: ${inputs.next_step || '[next step]'}

Write a professional parent communication:

SUBJECT LINE (if email): Clear and specific — not alarming, not vague.

OPENING: 
Warm, professional greeting. For concerns: acknowledge the relationship first.

MAIN MESSAGE:
Communicate "${inputs.key_message || '[message]'}" clearly.
- Use specific observations, not character judgments
- Focus on behavior/performance, not the child as a person
- For concerns: lead with what you have noticed, not with blame
- For positives: be specific about what the student did well

CONTEXT:
Brief background that helps the parent understand the situation.

PARTNERSHIP FRAMING:
Frame this as teacher and parent working together for the student — not teacher reporting to parent.

NEXT STEP:
Clear, specific ask: "${inputs.next_step || '[next step]'}"

CLOSING:
Professional, warm, open to further contact.

Rules:
- Never use jargon or education acronyms without explaining them
- Never compare to other students
- For sensitive concerns: assume the parent may not know and will be surprised
- Keep under 250 words`
  },
  {
    id: 'iep_support',
    number: '04',
    name: 'IEP & Learning Support Planner',
    tagline: 'Plan meaningful support for students with diverse needs',
    phase: 'Support',
    phaseColor: 'bg-purple-50 text-purple-600',
    context: 'When planning support for students with learning differences',
    description: 'Creates structured support plans with accommodations, modifications, and progress monitoring.',
    inputs: [
      { id: 'student_profile', label: 'Student learning profile', placeholder: 'e.g. Year 7 student with dyslexia and ADHD. Strong verbal skills, struggles with reading fluency and sustained focus. Motivated when given movement breaks.', type: 'textarea' },
      { id: 'subject', label: 'Subject or context', placeholder: 'e.g. English class, across all subjects, transition to high school', type: 'text' },
      { id: 'current_challenges', label: 'Current challenges', placeholder: 'e.g. Cannot read texts independently, loses focus after 10 minutes, avoids written tasks, falls behind in timed assessments', type: 'textarea' },
      { id: 'goals', label: 'Support goals', placeholder: 'e.g. Access grade-level texts with support, complete written tasks independently, participate in class discussions', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a special education specialist and learning support coordinator. Create a practical, dignified support plan focused on access and achievement.

Student profile: ${inputs.student_profile || '[profile]'}
Subject/context: ${inputs.subject || '[subject]'}
Current challenges: ${inputs.current_challenges || '[challenges]'}
Goals: ${inputs.goals || '[goals]'}

Create a learning support plan:

1. STUDENT STRENGTHS (lead with these):
   Based on "${inputs.student_profile || '[profile]'}" — what does this student do well? Build on strengths.

2. PRIORITY GOALS:
   For each goal in "${inputs.goals || '[goals]'}":
   - Specific, measurable goal statement
   - Timeline
   - How progress will be measured

3. CLASSROOM ACCOMMODATIONS (what stays the same, just accessed differently):
   - Instructional accommodations: how information is presented
   - Environmental accommodations: classroom setup, seating
   - Assessment accommodations: how student demonstrates knowledge

4. MODIFICATIONS (if needed — what is changed):
   Only if accommodations are not sufficient.

5. SPECIFIC STRATEGIES for each challenge in "${inputs.current_challenges || '[challenges]'}":
   - The challenge
   - 2-3 specific strategies the teacher can implement
   - Resources or tools that help

6. PROGRESS MONITORING:
   - How often to check progress
   - What to measure
   - When to adjust the plan

7. COMMUNICATION PLAN:
   - Who needs to know what
   - How to communicate with parents
   - Student involvement in their own plan

Always frame strategies as enabling access, not lowering expectations.`
  },
  {
    id: 'rubric_builder',
    number: '05',
    name: 'Rubric Builder',
    tagline: 'Create rubrics that give students clear expectations',
    phase: 'Assess',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'Before any major assignment or project',
    description: 'Builds detailed, student-friendly rubrics that make grading consistent and feedback meaningful.',
    inputs: [
      { id: 'assignment', label: 'Assignment description', placeholder: 'e.g. Year 10 History — 1,500-word essay arguing whether World War I was inevitable', type: 'text' },
      { id: 'grade_level', label: 'Grade level', placeholder: 'e.g. Year 10, Age 15-16', type: 'text' },
      { id: 'criteria', label: 'Assessment criteria (what matters most?)', placeholder: 'e.g. Argument quality, use of historical evidence, source analysis, writing quality, structure', type: 'textarea' },
      { id: 'scale', label: 'Grading scale', placeholder: '', type: 'select', options: ['4-point (Excellent/Proficient/Developing/Beginning)', 'A-F letter grades', 'Percentage (100-point)', 'IB scale (7-point)', 'Pass/Merit/Distinction'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an assessment expert. Create a rubric that gives students crystal-clear expectations and makes grading consistent across teachers.

Assignment: ${inputs.assignment || '[assignment]'}
Grade level: ${inputs.grade_level || '[grade]'}
Criteria: ${inputs.criteria || '[criteria]'}
Scale: ${inputs.scale || '[scale]'}

Create a complete rubric:

RUBRIC TITLE: ${inputs.assignment || '[assignment]'}
GRADE LEVEL: ${inputs.grade_level || '[grade]'}
SCALE: ${inputs.scale || '[scale]'}

FOR EACH CRITERION in "${inputs.criteria || '[criteria]'}":

CRITERION NAME: [name]
WEIGHTING: [% of total grade]

| Level | Descriptor | Score |
|-------|-----------|-------|
| Excellent | [Specific, observable description of excellent work] | [score] |
| Proficient | [Specific, observable description of proficient work] | [score] |
| Developing | [Specific, observable description of developing work] | [score] |
| Beginning | [Specific, observable description of beginning work] | [score] |

Rules for descriptors:
- Use observable, specific language — not "good analysis" but "identifies 3+ pieces of evidence and explains how each supports the argument"
- Students should be able to self-assess using this rubric
- Each level must be clearly distinguishable from the next

END WITH:
- TOTAL SCORE CONVERSION to ${inputs.scale || '[scale]'}
- STUDENT SELF-ASSESSMENT VERSION: Simplified language students can use before submitting`
  },
  {
    id: 'differentiation',
    number: '06',
    name: 'Differentiation Planner',
    tagline: 'Meet every student where they are without 30 different lessons',
    phase: 'Plan',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'When planning for a class with diverse learning needs',
    description: 'Creates practical differentiation strategies for the same lesson across different learning levels.',
    inputs: [
      { id: 'lesson_topic', label: 'Lesson topic', placeholder: 'e.g. Fractions — adding fractions with unlike denominators, Year 6 Maths', type: 'text' },
      { id: 'class_profile', label: 'Class profile', placeholder: 'e.g. 28 students: 6 working below grade level, 16 at grade level, 6 working above. 3 EAL students, 2 with IEPs for dyscalculia.', type: 'textarea' },
      { id: 'core_objective', label: 'Core learning objective (for all students)', placeholder: 'e.g. All students will be able to add fractions with unlike denominators using at least one strategy', type: 'text' },
      { id: 'lesson_structure', label: 'Lesson structure', placeholder: 'e.g. 60-minute lesson with whole class instruction, group work, and independent practice', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a differentiation expert and inclusive education specialist. Design practical differentiation that a teacher can actually implement in one classroom without overwhelming preparation.

Topic: ${inputs.lesson_topic || '[topic]'}
Class profile: ${inputs.class_profile || '[class]'}
Core objective: ${inputs.core_objective || '[objective]'}
Structure: ${inputs.lesson_structure || '[structure]'}

Create a differentiation plan:

CORE OBJECTIVE (all students): ${inputs.core_objective || '[objective]'}

TIER 1 — BELOW GRADE LEVEL SUPPORT:
Students: [description from class profile]
Modified objective: [simplified version — same concept, reduced complexity]
Specific accommodations:
- How content is presented differently
- Modified task or product
- Support materials (visual aids, manipulatives, sentence frames)
- Peer or teacher support structure

TIER 2 — AT GRADE LEVEL (core instruction):
Standard lesson activities that achieve the core objective.

TIER 3 — EXTENSION:
Students: [description from class profile]
Extension objective: [deeper application of same concept]
Challenge activities:
- Open-ended extension task
- Real-world application
- Cross-curricular connection

EAL/ESL SUPPORTS:
Specific language scaffolds for the 3 EAL students.

IEP ACCOMMODATIONS:
For students with dyscalculia:
- Specific accommodations during instruction
- Modified assessment approach

GROUPING STRATEGY:
How to group students for each part of ${inputs.lesson_structure || '[structure]'}.

TEACHER MANAGEMENT TIP:
How to move between groups efficiently in one classroom.`
  },
  {
    id: 'professional_development',
    number: '07',
    name: 'Professional Development Planner',
    tagline: 'Design PD that teachers actually find useful',
    phase: 'Develop',
    phaseColor: 'bg-teal-50 text-teal-700',
    context: 'When planning teacher professional development',
    description: 'Creates structured PD sessions that are practical, participatory, and lead to changed practice.',
    inputs: [
      { id: 'pd_topic', label: 'PD topic', placeholder: 'e.g. Using formative assessment strategies in the classroom, Trauma-informed teaching practices, Technology integration for engagement', type: 'text' },
      { id: 'audience', label: 'Teacher audience', placeholder: 'e.g. 25 secondary teachers, mixed subject areas, range from NQT to 20+ years experience', type: 'text' },
      { id: 'duration', label: 'Session duration', placeholder: '', type: 'select', options: ['30 minutes', '1 hour', '2 hours', 'Half day (3 hours)', 'Full day (6 hours)'] },
      { id: 'goal', label: 'What should teachers do differently after this PD?', placeholder: 'e.g. Use at least 2 formative assessment strategies per lesson, have language to talk about trauma with colleagues', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a professional learning designer who knows that most PD fails because it is passive and disconnected from classroom reality. Design PD that changes practice.

Topic: ${inputs.pd_topic || '[topic]'}
Audience: ${inputs.audience || '[audience]'}
Duration: ${inputs.duration || '[duration]'}
Behavior change goal: ${inputs.goal || '[goal]'}

Design a professional development session:

1. SESSION OUTCOMES:
   By the end of this session, teachers will:
   - Know: [key knowledge]
   - Understand: [key concept]
   - Be able to: [specific skill — connects to "${inputs.goal || '[goal]'}"]

2. SESSION PLAN (with timing):

   OPENER (10% of time):
   Not a slideshow. An activity that makes teachers feel the topic — experiential hook.

   CORE CONTENT (30% of time):
   The minimum knowledge needed to change practice.
   Adult learning principle: connect to what they already know.

   PRACTICE / APPLICATION (40% of time):
   Teachers practice the strategy / skill — with their own content.
   Collaborative structure: pairs, triads, or small groups.

   PLANNING TIME (15% of time):
   Teachers leave with something they will use next week — specific and planned.

   CLOSE (5% of time):
   Commitment + accountability structure.

3. MATERIALS NEEDED: Everything to run this session.

4. FACILITATOR NOTES: What to watch for, common resistance points, how to handle pushback.

5. FOLLOW-UP PLAN: How to support implementation after the session.

6. SUCCESS MEASURE: How will you know this PD changed practice?`
  },
  {
    id: 'student_feedback',
    number: '08',
    name: 'Student Feedback Generator',
    tagline: 'Give feedback that students actually act on',
    phase: 'Assess',
    phaseColor: 'bg-amber-50 text-amber-600',
    context: 'When returning marked work to students',
    description: 'Creates specific, actionable written feedback using the WWW/EBI or similar frameworks.',
    inputs: [
      { id: 'assignment_type', label: 'Assignment type', placeholder: 'e.g. Year 9 English essay on Of Mice and Men', type: 'text' },
      { id: 'student_work_summary', label: 'Summary of student work (no names)', placeholder: 'e.g. Student made a clear argument in the introduction, used 2 good quotes but did not analyse them, conclusion restated the introduction without developing ideas', type: 'textarea' },
      { id: 'grade_achieved', label: 'Grade or level achieved', placeholder: 'e.g. C+, Level 4, 65%', type: 'text' },
      { id: 'feedback_focus', label: 'Most important improvement area', placeholder: 'e.g. Quote analysis — student needs to explain HOW the quote supports their argument, not just what it shows', type: 'text' },
    ],
    prompt: (inputs: Record<string, string>) => `You are an expert at giving feedback that students understand and act on. Research shows that effective feedback is specific, forward-looking, and actionable.

Assignment: ${inputs.assignment_type || '[assignment]'}
Student work: ${inputs.student_work_summary || '[work summary]'}
Grade: ${inputs.grade_achieved || '[grade]'}
Key improvement area: ${inputs.feedback_focus || '[focus]'}

Write student feedback using the WWW/EBI framework:

WHAT WENT WELL (WWW):
3 specific strengths — not "good work" but what exactly they did well and why it matters.
Each point: [What they did] → [Why this is effective] → [Evidence from their work]

EVEN BETTER IF (EBI) — The single most important improvement:
Focus on: "${inputs.feedback_focus || '[focus]'}"
- Explain specifically what to do differently (not just what is wrong)
- Give a micro-example: show them what improved work looks like
- Connect to the marking criteria

IMPROVEMENT TASK:
One specific task they can do to practice this skill before the next assessment.
Time required: [5-10 minutes max]

GRADE COMMENTARY:
Brief explanation of grade: ${inputs.grade_achieved || '[grade]'}
What would move them to the next grade level — specific and achievable.

Rules:
- Address the work, not the student's character or intelligence
- Every piece of feedback must be actionable
- Use language appropriate for ${inputs.assignment_type || '[assignment type]'} age group
- No more than 200 words total — students do not read long feedback`
  },
  {
    id: 'curriculum_map',
    number: '09',
    name: 'Curriculum Map Builder',
    tagline: 'Plan a year of learning that builds progressively',
    phase: 'Plan',
    phaseColor: 'bg-blue-50 text-blue-600',
    context: 'Annual or unit curriculum planning',
    description: 'Creates a curriculum map with sequenced units, skills progression, and assessment points.',
    inputs: [
      { id: 'subject', label: 'Subject', placeholder: 'e.g. Year 8 Science, GCSE History, Primary Year 4 English', type: 'text' },
      { id: 'year_overview', label: 'Key topics or units to cover', placeholder: 'e.g. Forces and Motion, Cells and Organisation, Chemical Reactions, Space, Genetics, Ecology', type: 'textarea' },
      { id: 'weeks', label: 'Number of teaching weeks', placeholder: 'e.g. 38 weeks, 2 semesters of 18 weeks, 3 terms', type: 'text' },
      { id: 'key_skills', label: 'Key skills to develop across the year', placeholder: 'e.g. Scientific inquiry, data analysis, extended writing, collaborative problem-solving', type: 'textarea' },
    ],
    prompt: (inputs: Record<string, string>) => `You are a curriculum design expert. Build a curriculum map that shows deliberate sequencing and progressive skill development — not just a topic list.

Subject: ${inputs.subject || '[subject]'}
Topics: ${inputs.year_overview || '[topics]'}
Duration: ${inputs.weeks || '[weeks]'}
Key skills: ${inputs.key_skills || '[skills]'}

Create a curriculum map:

1. CURRICULUM OVERVIEW:
   - Subject: ${inputs.subject || '[subject]'}
   - Total weeks: ${inputs.weeks || '[weeks]'}
   - Overarching question or theme for the year

2. UNIT MAP (for each unit):
   UNIT [N]: [Title]
   - Duration: [weeks]
   - Essential question: [What should students be able to answer by the end?]
   - Key knowledge: [3-4 bullet points]
   - Key skills: [which skills from "${inputs.key_skills || '[skills]'}" are developed here]
   - Assessment: [formative and summative]
   - Links to previous unit: [how does this build on what came before?]
   - Links to next unit: [what does this prepare students for?]

3. SKILLS PROGRESSION MAP:
   Show how each skill in "${inputs.key_skills || '[skills]'}" develops across the year:
   Term 1: [introductory level]
   Term 2: [developing level]
   Term 3: [applied level]

4. ASSESSMENT CALENDAR:
   Major assessment points across the year with week numbers.

5. CROSS-CURRICULAR CONNECTIONS:
   Where does this curriculum connect to other subjects?

6. DIFFERENTIATION NOTE:
   How the curriculum serves learners at different levels throughout the year.`
  },
  {
    id: 'report_comments',
    number: '10',
    name: 'Report Card Comment Generator',
    tagline: 'Write report comments that are specific and meaningful',
    phase: 'Communicate',
    phaseColor: 'bg-green-50 text-green-700',
    context: 'Report card writing season',
    description: 'Generates personalized, professional report card comments that go beyond generic descriptors.',
    inputs: [
      { id: 'subject', label: 'Subject', placeholder: 'e.g. Year 7 Science', type: 'text' },
      { id: 'student_summary', label: 'Student performance summary (no names)', placeholder: 'e.g. Strong performer, consistently achieves A grades, particularly excellent at data analysis and scientific writing. Participates actively, sometimes dominates discussions. Working on listening to peers.', type: 'textarea' },
      { id: 'grade', label: 'Overall grade or achievement level', placeholder: 'e.g. A, Level 7, Achieving Above Expectations', type: 'text' },
      { id: 'report_style', label: 'Report style', placeholder: '', type: 'select', options: ['Formal academic report', 'Friendly and accessible', 'IB / international school style', 'Primary school style', 'Narrative / holistic'] },
    ],
    prompt: (inputs: Record<string, string>) => `You are an experienced teacher writing meaningful report comments. Good report comments are specific, evidence-based, and useful to parents and students.

Subject: ${inputs.subject || '[subject]'}
Student performance: ${inputs.student_summary || '[performance]'}
Grade: ${inputs.grade || '[grade]'}
Style: ${inputs.report_style || '[style]'}

Write a report card comment (100-150 words):

STRUCTURE:
1. Opening: Grade/achievement level + one specific strength (not "is a good student")
2. Evidence: One specific example of what this student has done well this term
3. Area for growth: One specific, constructive developmental focus
4. Forward-looking close: What to focus on next term or what they are ready for

STYLE GUIDE for ${inputs.report_style || '[style]'}:
- Formal: Third person, no contractions, precise language
- Friendly: Second person (to student), warm but professional
- IB style: Focus on approaches to learning + subject-specific skills
- Primary: Simple language, accessible to parents and child
- Narrative: Holistic, storytelling approach

Rules:
- Never use: "a pleasure to teach", "tries hard", "good effort" without specifics
- No negative framing — all areas for growth stated positively
- Reference specific work, skills, or moments where possible
- Write 3 variants so the teacher can choose

ALSO PROVIDE: A version that the student themselves could read and find useful.`
  },
]

const phases = ['All', 'Plan', 'Assess', 'Communicate', 'Support', 'Develop']

export default function EducationToolkit() {
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
          <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full">Education Toolkit</span>
          <span className="text-xs text-gray-400">10 workflows</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Education Toolkit</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-3">
            Less admin. More teaching.
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            10 AI workflows for teachers and educators — lesson plans, assessments, parent communication, differentiation, report comments, and more.
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
                      Tip: Start with workflow 09 (Curriculum Map) to plan the year, then use 01 (Lesson Plan) for each unit.
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