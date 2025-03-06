import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function POST(request) {
  try {
    const { message, artistId } = await request.json();

    // Build a messages array for a chat completion.
    // You can customize this as needed.
    const messages = [
      { role: 'system', content: `You are ${artistId}, an artist from history.` },
      { role: 'user', content: message },
    ];

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'No OPENAI_API_KEY found in environment.' },
        { status: 500 }
      );
    }

    // Initialize the OpenAI client with your API key
    const openai = new OpenAI({ apiKey });

    // Call the chat completions endpoint (using GPT-3.5-turbo as in your film chat)
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
    });

    const aiMessage = completion.choices[0].message.content;
    return NextResponse.json({ reply: aiMessage });
  } catch (error) {
    console.error("Error in /api/ask:", error);
    return NextResponse.json(
      { reply: "I'm having trouble responding right now." },
      { status: 500 }
    );
  }
}
