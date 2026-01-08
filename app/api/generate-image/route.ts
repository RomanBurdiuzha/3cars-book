import { NextRequest, NextResponse } from 'next/server';
import { getChapter } from '@/lib/story';
import { chapterImageExists, generateChapterImage, saveGeneratedImage } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { chapterId } = await request.json();

    if (typeof chapterId !== 'number') {
      return NextResponse.json(
        { error: 'Invalid chapter ID' },
        { status: 400 }
      );
    }

    // Check if image already exists
    const exists = await chapterImageExists(chapterId);
    if (exists) {
      return NextResponse.json({
        success: true,
        imagePath: `/images/chapters/chapter-${chapterId}.png`,
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

    // Generate image
    const imageBlob = await generateChapterImage(chapter.imagePrompt, chapterId);

    // Save image
    const imagePath = await saveGeneratedImage(imageBlob, chapterId);

    return NextResponse.json({
      success: true,
      imagePath,
      cached: false,
    });
  } catch (error) {
    console.error('Image generation error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
