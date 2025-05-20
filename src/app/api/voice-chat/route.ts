import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const chat = await openai.chat.completions.create({
    model: 'openrouter/openai/gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  const reply = chat.choices[0].message.content;
  return NextResponse.json({ reply });
}
