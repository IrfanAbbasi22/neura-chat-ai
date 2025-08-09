import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY || !openai) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured. Please create a .env.local file with your OPENAI_API_KEY.',
          setup: 'Visit https://platform.openai.com/api-keys to get your API key'
        },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Create a chat completion with streaming
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using the latest efficient model
      messages: [
        {
          role: 'system',
          content: `You are NeuraChat, a helpful and intelligent AI assistant with a modern, friendly personality. 
          You're designed to provide thoughtful, accurate, and engaging responses. 
          Keep your responses conversational and helpful, adapting to the user's tone and needs.
          If asked about your interface, mention that you have a beautiful glassmorphism UI inspired by iOS design.`
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    });

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              const data = encoder.encode(`data: ${JSON.stringify({ content })}\n\n`);
              controller.enqueue(data);
            }
          }
          
          // Send end signal
          const endData = encoder.encode(`data: ${JSON.stringify({ finished: true })}\n\n`);
          controller.enqueue(endData);
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
