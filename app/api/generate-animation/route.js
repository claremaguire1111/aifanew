import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import RunwayML from '@runwayml/sdk';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get('image');
    const prompt = formData.get('prompt')?.toString();

    if (!image || !prompt) {
      return NextResponse.json(
        { error: 'Missing image or prompt' },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

    const runwayApiKey = process.env.RUNWAY_API_KEY;

    if (!runwayApiKey) {
      console.warn('⚠️ Missing RUNWAY_API_KEY');
      return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
    }

    process.env.RUNWAYML_API_SECRET = runwayApiKey;
    const client = new RunwayML();

    const imageToVideo = await client.imageToVideo.create({
      model: 'gen4_turbo',
      promptImage: base64Image,
      promptText: prompt,
      ratio: '1280:720',
      duration: 5,
    });

    const taskId = imageToVideo.id;
    let task;

    // Wait for completion
    do {
      await new Promise((res) => setTimeout(res, 10000));
      task = await client.tasks.retrieve(taskId);
    } while (!['SUCCEEDED', 'FAILED'].includes(task.status));

    if (task.status === 'SUCCEEDED') {
      const videoUrl = task.output[0]; // Runway-hosted video URL
      return NextResponse.json({
        success: true,
        animationUrl: videoUrl,
      });
    }

    throw new Error(`Task failed: ${task.error || 'Unknown error'}`);
  } catch (error) {
    console.error('❌ Animation error:', error.message);
    return NextResponse.json({
      success: true,
      animationUrl: '/videos/demo.mp4',
      isDemo: true,
      message: 'Using demo video due to API error',
      error:
        process.env.NODE_ENV === 'development'
          ? `API error: ${error.message}`
          : 'Video generation temporarily unavailable',
    });
  }
}
