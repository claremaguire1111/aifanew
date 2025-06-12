import { NextResponse } from 'next/server';
import RunwayML from '@runwayml/sdk';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get('image');
    const prompt = formData.get('prompt')?.toString();

    if (!image || !prompt) {
      return NextResponse.json({ error: "Missing image or prompt" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

    const runwayApiKey = process.env.RUNWAY_API_KEY;
    if (!runwayApiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    process.env.RUNWAYML_API_SECRET = runwayApiKey;
    const client = new RunwayML();

    const task = await client.imageToVideo.create({
      model: 'gen4_turbo',
      promptImage: base64Image,
      promptText: prompt,
      ratio: '1280:720',
      duration: 5,
    });

    let status;
    do {
      await new Promise(r => setTimeout(r, 10000));
      status = await client.tasks.retrieve(task.id);
    } while (!['SUCCEEDED', 'FAILED'].includes(status.status));

    if (status.status === 'SUCCEEDED') {
      return NextResponse.json({
        success: true,
        animationUrl: status.output[0],
      });
    }

    throw new Error(status.error || 'Unknown error');
  } catch (error) {
    return NextResponse.json({
      success: true,
      animationUrl: '/videos/demo.mp4',
      isDemo: true,
      message: 'Using demo video due to error',
      error: error.message,
    });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "This endpoint only supports POST requests" },
    { status: 405 }
  );
}
