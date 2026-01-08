import { GoogleGenAI, Modality } from "@google/genai";
import { decodeBase64, pcmToWav } from "./audioUtils";

/**
 * Server-side only TTS module
 * Generate audio using Gemini 2.5 Flash TTS Preview model
 * Uses your existing GEMINI_API_KEY - no additional setup required!
 * This ensures API key is never exposed to the client
 *
 * Based on Google AI Studio example - handles raw PCM data conversion to WAV
 */

export type VoiceName = "Puck" | "Charon" | "Kore" | "Fenrir" | "Aoede";

const SAMPLE_RATE = 24000; // 24kHz sample rate
const NUM_CHANNELS = 1; // Mono audio

/**
 * Generates speech audio from text using Gemini TTS with automatic fallback
 * First tries gemini-2.5-pro-tts, then falls back to gemini-2.5-flash-tts on quota errors
 * @param text - Text to convert to speech
 * @param voiceName - Voice to use (default: "Puck")
 * @returns Base64 encoded WAV audio data
 */
export async function generateAudio(
  text: string,
  voiceName: VoiceName = "Puck"
): Promise<string> {
  // Use GEMINI_API_KEY from .env (server-side only)
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in .env file');
  }

  // Create a fresh instance for the call
  const ai = new GoogleGenAI({ apiKey });

  // Try with Pro model first, then fallback to Flash on quota errors
  const models = ["gemini-2.5-pro-preview-tts", "gemini-2.5-flash-preview-tts"];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`Attempting TTS generation with model: ${model}`);

      // Use simplified request without systemInstructions to avoid 500 errors
      // in the specialized TTS preview endpoint
      const response = await ai.models.generateContent({
        model,
        contents: [{
          parts: [{ text: `Please speak the following text clearly: ${text}` }]
        }],
        config: {
          // Only include required modalities for the TTS flow
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      if (!response.candidates?.[0]?.content?.parts) {
        throw new Error("The model did not return a valid response. Please try again.");
      }

      const parts = response.candidates[0].content.parts;

      // Find the audio part specifically
      const audioPart = parts.find(p => p.inlineData && p.inlineData.mimeType.includes('audio'));
      const base64Audio = audioPart?.inlineData?.data;

      if (!base64Audio) {
        // Check for text fallback
        const textPart = parts.find(p => p.text);
        if (textPart?.text) {
          throw new Error("The model returned text instead of audio. Try rephrasing your input.");
        }
        throw new Error("No speech audio was generated. Please try a different text.");
      }

      // Decode base64 to get raw PCM data
      const pcmData = decodeBase64(base64Audio);

      // Convert raw PCM to WAV format with proper headers
      const wavBuffer = pcmToWav(pcmData, SAMPLE_RATE, NUM_CHANNELS);

      console.log(`✓ TTS generation successful with model: ${model}`);

      // Return as base64 for storage
      return wavBuffer.toString('base64');

    } catch (error: any) {
      lastError = error;

      // Check if this is a quota error
      const isQuotaError =
        error.message?.includes('quota') ||
        error.message?.includes('429') ||
        error.status === 429;

      if (isQuotaError && model !== models[models.length - 1]) {
        // Quota error and not the last model - try next model
        console.warn(`Quota exceeded for ${model}, falling back to next model...`);
        continue;
      }

      // For non-quota errors or if this is the last model, break and handle error
      console.error(`Gemini TTS Error with ${model}:`, error);
      break;
    }
  }

  // If we get here, all models failed - provide user-friendly feedback
  const error = lastError;

  if (error.message?.includes("500") || error.message?.includes("INTERNAL")) {
    throw new Error("The TTS engine encountered an internal server error. This is usually transient—please wait a moment and try again.");
  }

  if (error.message?.includes("non-audio response")) {
    throw new Error("The synthesis engine returned text instead of speech. Try providing simpler text content.");
  }

  if (error.message?.includes('API_KEY_INVALID')) {
    throw new Error('Invalid API key. Please check your GEMINI_API_KEY in .env file.');
  }

  if (error.message?.includes('quota') || error.status === 429) {
    throw new Error('API quota exceeded for all available models. Please check your usage limits at https://aistudio.google.com/app/apikey');
  }

  throw new Error(error.message || "An unexpected error occurred during speech synthesis.");
}
