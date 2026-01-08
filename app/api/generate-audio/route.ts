import { NextRequest, NextResponse } from 'next/server';
import { getChapter } from '@/lib/story';
import { generateAudio } from '@/lib/tts';
import { promises as fs } from 'fs';
import path from 'path';

// Check if audio file already exists
async function audioExists(chapterId: number): Promise<boolean> {
  try {
    const audioPath = path.join(process.cwd(), 'public', 'audio', 'chapters', `chapter-${chapterId}.wav`);
    await fs.access(audioPath);
    return true;
  } catch {
    return false;
  }
}

// Save audio data to file
async function saveAudio(base64Audio: string, chapterId: number): Promise<string> {
  const audioDir = path.join(process.cwd(), 'public', 'audio', 'chapters');

  // Ensure directory exists
  await fs.mkdir(audioDir, { recursive: true });

  const fileName = `chapter-${chapterId}.wav`;
  const filePath = path.join(audioDir, fileName);

  // Decode base64 and save as WAV file
  const buffer = Buffer.from(base64Audio, 'base64');
  await fs.writeFile(filePath, buffer);

  return `/audio/chapters/${fileName}`;
}

export async function POST(request: NextRequest) {
  try {
    const { chapterId } = await request.json();

    if (typeof chapterId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid chapter ID' },
        { status: 400 }
      );
    }

    // Check if audio already exists
    const exists = await audioExists(chapterId);
    if (exists) {
      return NextResponse.json({
        success: true,
        audioPath: `/audio/chapters/chapter-${chapterId}.wav`,
        cached: true,
      });
    }

    // Get chapter data
    const chapter = getChapter(chapterId);
    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    // Prepare text for narration (title + content)
    const narrationText = `${chapter.title}. ${chapter.content}`;

    // Generate audio using Gemini TTS
    // Using 'Kore' voice - you can experiment with other voices
    const base64Audio = await generateAudio(narrationText, 'Kore');

    // Save audio file
    const audioPath = await saveAudio(base64Audio, chapterId);

    return NextResponse.json({
      success: true,
      audioPath,
      cached: false,
    });
  } catch (error) {
    console.error('Audio generation error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate audio',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
