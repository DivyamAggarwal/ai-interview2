import { FEEDBACK_PROMPT } from "@/services/Constants";
import OpenAI from "openai";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Validate environment variable
        if (!process.env.OPENROUTER_API_KEY) {
            console.error('Missing OPENROUTER_API_KEY environment variable');
            return NextResponse.json(
                { error: 'API configuration error' }, 
                { status: 500 }
            );
        }

        // Parse and validate request body
        const body = await req.json();
        const { conversation } = body;
        
        if (!conversation) {
            return NextResponse.json(
                { error: 'Conversation is required' }, 
                { status: 400 }
            );
        }

        const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));
        
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Feedback Generator"
            }
        });

        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct",
            messages: [
                { role: "user", content: FINAL_PROMPT }
            ],
            max_tokens: 1000, // Add token limit
            temperature: 0.7  // Add temperature control
        });

        if (!completion.choices || completion.choices.length === 0) {
            throw new Error('No response from OpenRouter API');
        }

        console.log('Success:', completion.choices[0].message);
        return NextResponse.json(completion.choices[0].message);

    } catch (error) {
        console.error('Detailed API Error:', {
            message: error.message,
            status: error.status,
            response: error.response?.data,
            stack: error.stack
        });

        // Handle specific error types
        if (error.response) {
            // OpenRouter API error
            return NextResponse.json(
                { 
                    error: 'OpenRouter API error', 
                    details: error.response.data,
                    status: error.response.status 
                },
                { status: error.response.status }
            );
        } else if (error.request) {
            // Network error
            return NextResponse.json(
                { error: 'Network error - unable to reach OpenRouter API' },
                { status: 503 }
            );
        } else if (error.name === 'SyntaxError') {
            // JSON parsing error
            return NextResponse.json(
                { error: 'Invalid request format' },
                { status: 400 }
            );
        } else {
            // Generic server error
            return NextResponse.json(
                { 
                    error: 'Internal server error', 
                    message: error.message 
                },
                { status: 500 }
            );
        }
    }
}
