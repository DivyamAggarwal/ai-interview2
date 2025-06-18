import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";
export async function POST(req){
    const {jobPosition,jobDescription,duration,type}=await req.json();
    const FINAL_PROMPT=QUESTIONS_PROMPT
    .replace('{{jobTitle}}',jobPosition)
    .replace('{{jobDescription}}',jobDescription)
    .replace('{{duration}}',duration)
    .replace('{{type}}',type)

    console.log(FINAL_PROMPT);

    try{
        const openai=new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
            
        })
        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct",
            messages: [
            { role: "user", content:FINAL_PROMPT }
            ],
            // response_format:'json'
        })
        console.log(completion.choices[0].message)
        return NextResponse.json(completion.choices[0].message)
    }
    catch(e){
        console.log(e);
        return NextResponse.json(e)
    }

}
// import { QUESTIONS_PROMPT } from "@/services/Constants";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// export async function POST(req) {
//   const { jobPosition, jobDescription, duration, type } = await req.json();

//   // Construct the final prompt using placeholders
//   const FINAL_PROMPT = QUESTIONS_PROMPT
//     .replace('{{jobTitle}}', jobPosition)
//     .replace('{{jobDescription}}', jobDescription)
//     .replace('{{duration}}', duration)
//     .replace('{{type}}', type);

//   console.log("📨 Final Prompt Sent to AI:\n", FINAL_PROMPT);

//   try {
//     const openai = new OpenAI({
//       baseURL: "https://openrouter.ai/api/v1",
//       apiKey: process.env.OPENROUTER_API_KEY,
//     });

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: FINAL_PROMPT }],
//     });

//     const rawContent = completion.choices[0].message.content;
//     console.log("📥 Raw AI Content:\n", rawContent);

//     // Try parsing the content from AI as JSON
//     let parsedContent;
//     try {
//       parsedContent = JSON.parse(rawContent);
//     } catch (err) {
//       console.error("❌ JSON Parse Error:", err.message);
//       return NextResponse.json(
//         {
//           error: "Invalid AI JSON response",
//           content: rawContent,
//         },
//         { status: 500 }
//       );
//     }

//     // Return cleaned JSON content to frontend
//     return NextResponse.json({ content: parsedContent });

//   } catch (error) {
//     console.error("❌ API Error:", error);
//     return NextResponse.json(
//       { error: "Server error", details: error.message },
//       { status: 500 }
//     );
//   }
// }
