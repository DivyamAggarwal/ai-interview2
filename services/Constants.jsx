import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, UserIcon, WalletCards } from "lucide-react";

export const SideBarOptions=[
    {
        name: 'DashBoard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Scheduled Interview',
        icon: Calendar,
        path: '/scheduled-interview'
    },
    {
        name: 'All Interview',
        icon: List,
        path: '/all-interview'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
    },
]
export const InterviewType=[
    {
        name: 'Technical',
        icon: Code2Icon,
    },
    {
        name: 'Behavioral',
        icon: User2Icon,
    },
    {
        name: 'Exprience',
        icon: BriefcaseBusinessIcon,
    },
    {
        name: 'Problem Solving',
        icon: Puzzle,
    },
    {
        name: 'Leadership',
        icon: UserIcon,
    },
]
    // export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
    // Based on the following inputs, generate a well-structured list of high-quality interview questions:
    // Job Title: {{jobTitle}}
    // Job Description: {{jobDescription}}
    // Interview Duration: {{duration}}
    // Interview Type: {{type}}
    // 🌸 Your task:
    // Analyze the job description to identify key responsibilities, required skills, and expected experience.
    // Generate a list of interview questions depends on interview duration
    // Adjust the number and depth of questions to match the interview duration.
    // Ensure the questions match the tone and structure of a real-life {{type}} interview.
    // 🌸 Format your response in JSON format with array list of questions.
    // format: interviewQuestions=[
    // {
    // question:'',
    // type:'Technical/Behavioral/Experince/Problem Solving/Leadership'
    // },{ 
    // ...
    // }]
    // 🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`
export const QUESTIONS_PROMPT = `
You are an expert AI interview assistant. 

🎯 Task:
Given the job details below, generate a JSON array of high-quality interview questions tailored to the role, experience, and interview type.

📄 Inputs:
- Job Title: {{jobTitle}}
- Job Description: {{jobDescription}}
- Interview Duration: {{duration}} minutes
- Interview Type: {{type}} (e.g., Technical, Behavioral, Mixed)

✅ Output Format:
Respond **only** with a valid JSON object in this exact structure:

{
  "interviewQuestions": [
    {
      "question": "What is your experience with RESTful APIs?",
      "type": "Technical"
    },
    {
      "question": "Describe a situation where you had to work under pressure.",
      "type": "Behavioral"
    }
    // More questions here...
  ]
}

⚠️ Do not include any markdown, explanation, or formatting outside of the JSON.

🧠 Notes:
- Match the question depth to the interview duration.
- Include a mix of question types relevant to the role.
- Keep the number of questions proportional to the time available.
- Keep language natural and professional.
- give minimum 10 question or more than that
`;
export const FEEDBACK_PROMPT = `{{conversation}}

You are an expert interview evaluator. Analyze the above interview conversation thoroughly and provide data-driven feedback based on the candidate's actual responses and performance.

**IMPORTANT:** Do not use placeholder or default values. Every rating must be justified by specific evidence from the conversation.

## Evaluation Criteria

**Technical Skills (1-10):**
- Look for: Specific technical knowledge demonstrated, accuracy of technical explanations, coding problems solved, architectural understanding, best practices mentioned
- Rate based on: Depth vs. surface-level responses, technical accuracy, ability to explain complex concepts simply
- Evidence required: Quote specific technical statements or problem-solving approaches from the conversation

**Communication (1-10):**
- Look for: Clarity of explanations, active listening (building on interviewer questions), professional language, confidence indicators, question-asking behavior
- Rate based on: How well they structured answers, whether they sought clarification when needed, overall articulation quality
- Evidence required: Note specific examples of clear/unclear communication from the dialogue

**Problem Solving (1-10):**
- Look for: Step-by-step thinking process, how they approached challenges, creative solutions, ability to break down problems, handling of follow-up questions
- Rate based on: Logical flow of reasoning, consideration of edge cases, systematic approach vs. random guessing
- Evidence required: Reference specific problem-solving instances from the conversation

**Experience (1-10):**
- Look for: Concrete examples from past roles, specific projects mentioned, lessons learned, leadership situations, relevant industry experience
- Rate based on: Relevance to target role, depth of examples, ability to extract learning from experience
- Evidence required: Cite specific experience examples shared during the interview

## Output Requirements

Provide a 3-line summary with:
1. **Overall Assessment:** Candidate's strongest impression and general readiness level
2. **Key Strengths:** Top 2-3 areas where they demonstrated excellence with specific examples
3. **Development Areas:** Primary concerns or gaps that need addressing

**Recommendation Categories:**
- **Highly Recommended:** Exceptional performance across most areas
- **Recommended:** Solid performance with minor gaps
- **Conditionally Recommended:** Good potential but significant concerns in key areas
- **Not Recommended:** Major deficiencies or poor fit

## Response Format

{
  "feedback": {
    "rating": {
      "technicalSkills": [ANALYZE_CONVERSATION_FOR_ACTUAL_SCORE],
      "communication": [ANALYZE_CONVERSATION_FOR_ACTUAL_SCORE], 
      "problemSolving": [ANALYZE_CONVERSATION_FOR_ACTUAL_SCORE],
      "experience": [ANALYZE_CONVERSATION_FOR_ACTUAL_SCORE]
    },
    "summary": [
      "Overall assessment with specific performance indicators",
      "Key strengths demonstrated with concrete examples from conversation", 
      "Primary development areas or concerns based on interview responses"
    ],
    "recommendation": "[Select based on actual performance analysis]",
    "recommendationMsg": "Specific reasoning referencing conversation content and role requirements",
    "evidenceBase": {
      "technicalEvidence": "Quote or reference specific technical discussion points",
      "communicationEvidence": "Note specific communication strengths/weaknesses observed",
      "problemSolvingEvidence": "Reference specific problem-solving examples from interview",
      "experienceEvidence": "Cite relevant experience examples candidate provided"
    }
  }
}

**Critical:** Each rating must reflect actual conversation content. If insufficient information exists for any category, note this explicitly rather than assigning arbitrary scores.`
