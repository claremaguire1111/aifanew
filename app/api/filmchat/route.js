// app/api/filmchat/route.js
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "No OPENAI_API_KEY found in environment." },
        { status: 500 }
      );
    }

    // In v5, we instantiate the new `OpenAI` class
    const openai = new OpenAI({ apiKey });

    // Then call the new method:
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    });

    const aiMessage = completion.choices[0].message;
    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    console.error("POST /api/filmchat error:", err);
    return NextResponse.json(
      { error: "Server error from /api/filmchat" },
      { status: 500 }
    );
  }
}
