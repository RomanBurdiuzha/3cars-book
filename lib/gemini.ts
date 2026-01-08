import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateChapterImage(
  prompt: string,
  chapterId: number
): Promise<Blob> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Using Imagen 3 model for image generation
  const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-001" });

  const enhancedPrompt = `${prompt}. High quality children's book illustration, bright and colorful, friendly and non-scary, suitable for a 3-5 year old child. Ukrainian setting. Wide landscape format 16:9.`;

  const result = await model.generateContent({
    contents: [{
      role: "user",
      parts: [{
        text: enhancedPrompt
      }]
    }],
    generationConfig: {
      temperature: 0.4,
      candidateCount: 1,
    }
  });

  const response = result.response;

  // Extract image data from response
  // Note: Actual implementation depends on Gemini's response format
  // This is a placeholder - you'll need to adjust based on actual API response

  if (!response || !response.candidates || response.candidates.length === 0) {
    throw new Error("No image generated");
  }

  // The actual implementation will depend on how Gemini returns images
  // For now, this is a type-safe placeholder
  throw new Error("Image generation implementation pending - needs actual Gemini Imagen API response handling");
}

// Helper to save image to public directory
export async function saveGeneratedImage(
  blob: Blob,
  chapterId: number
): Promise<string> {
  const fs = await import('fs/promises');
  const path = await import('path');

  const fileName = `chapter-${chapterId}.png`;
  const publicPath = path.join(process.cwd(), 'public', 'images', 'chapters');

  // Ensure directory exists
  await fs.mkdir(publicPath, { recursive: true });

  const filePath = path.join(publicPath, fileName);
  const buffer = Buffer.from(await blob.arrayBuffer());

  await fs.writeFile(filePath, buffer);

  return `/images/chapters/${fileName}`;
}

// Check if chapter image already exists
export async function chapterImageExists(chapterId: number): Promise<boolean> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');

    const fileName = `chapter-${chapterId}.png`;
    const filePath = path.join(process.cwd(), 'public', 'images', 'chapters', fileName);

    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
