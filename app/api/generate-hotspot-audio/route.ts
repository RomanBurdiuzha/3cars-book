import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { generateAudio } from '@/lib/tts';
import { getDialogueForHotspot, getNameHash, type Character } from '@/lib/hotspot-dialogues';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Generate TTS audio for a hotspot character dialogue
 * POST /api/generate-hotspot-audio
 * Body: { chapterId: number, character: string, childName?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chapterId, character, childName } = body;

    if (chapterId === undefined || !character) {
      return NextResponse.json(
        { success: false, error: 'Missing chapterId or character' },
        { status: 400 }
      );
    }

    // Get personalized dialogue
    const dialogue = getDialogueForHotspot(chapterId, character as Character, childName);

    if (!dialogue) {
      return NextResponse.json(
        { success: false, error: 'No dialogue found for this chapter/character' },
        { status: 404 }
      );
    }

    // Create filename with name hash for caching
    const nameHash = getNameHash(childName);
    const filename = `chapter-${chapterId}-${character}-${nameHash}.wav`;
    const audioDir = join(process.cwd(), 'public', 'audio', 'hotspots');
    const audioPath = join(audioDir, filename);

    // Check if audio already exists
    if (existsSync(audioPath)) {
      return NextResponse.json({
        success: true,
        message: 'Audio already exists',
        filename,
        cached: true,
      });
    }

    console.log(`Generating hotspot audio for chapter ${chapterId}, character ${character}`);
    console.log(`Dialogue: ${dialogue}`);

    // Generate audio using Gemini TTS
    // Use "Puck" voice - young and friendly for children
    const audioBase64 = await generateAudio(dialogue, 'Puck');

    // Ensure directory exists
    if (!existsSync(audioDir)) {
      await mkdir(audioDir, { recursive: true });
    }

    // Save audio file
    const audioBuffer = Buffer.from(audioBase64, 'base64');
    await writeFile(audioPath, audioBuffer);

    console.log(`Hotspot audio saved to: ${audioPath}`);

    return NextResponse.json({
      success: true,
      message: 'Audio generated successfully',
      filename,
      cached: false,
    });
  } catch (error: any) {
    console.error('Hotspot audio generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unknown error',
        details: error.stack,
      },
      { status: 500 }
    );
  }
}

/**
 * Check if hotspot audio exists
 * GET /api/generate-hotspot-audio?chapterId=0&character=police&childName=Max
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chapterId = searchParams.get('chapterId');
    const character = searchParams.get('character');
    const childName = searchParams.get('childName');

    if (chapterId === null || !character) {
      return NextResponse.json(
        { exists: false, error: 'Missing chapterId or character' },
        { status: 400 }
      );
    }

    const nameHash = getNameHash(childName || undefined);
    const filename = `chapter-${chapterId}-${character}-${nameHash}.wav`;
    const audioPath = join(process.cwd(), 'public', 'audio', 'hotspots', filename);

    const exists = existsSync(audioPath);

    return NextResponse.json({
      exists,
      filename: exists ? filename : null,
    });
  } catch (error: any) {
    console.error('Error checking hotspot audio:', error);
    return NextResponse.json(
      { exists: false, error: error.message },
      { status: 500 }
    );
  }
}
