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

Based on this Interview Conversation between assistant and user, provide comprehensive feedback for the user's interview performance. 

Analyze the following aspects with detailed reasoning:

**Technical Skills (1-10):** Evaluate depth of knowledge, accuracy of responses, problem-solving approach, coding ability (if applicable), understanding of concepts, and ability to explain technical topics clearly.

**Communication (1-10):** Assess clarity of expression, listening skills, ability to ask relevant questions, professional demeanor, confidence level, and how well they articulated their thoughts.

**Problem Solving (1-10):** Judge analytical thinking, approach to challenges, creativity in solutions, ability to break down complex problems, and logical reasoning demonstrated.

**Experience (1-10):** Consider relevant work history, practical application of skills, lessons learned from past roles, leadership examples, and how well they connected experience to the role.

Provide a 3-line summary focusing on:
1. Overall performance and standout qualities
2. Key strengths and areas where they excelled
3. Main areas for improvement or concerns

Give a clear hiring recommendation with specific reasoning based on role requirements and candidate performance.

Respond in JSON format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6, 
      "problemSolving": 4,
      "experience": 7
    },
    "summary": ["Line 1 of summary", "Line 2 of summary", "Line 3 of summary"],
    "Recommendation": "Recommended/Not Recommended/Conditionally Recommended/Highly Recommended",
    "RecommendationMsg": "Brief message explaining the recommendation with specific reasons"
  }
}`