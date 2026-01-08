# 🎙️ Text-to-Speech Feature

## Overview

Your interactive book now includes AI-powered audio narration using Google's Gemini Text-to-Speech API! Each chapter can be read aloud with natural-sounding voice synthesis.

## ✨ Features

- **AI-Generated Narration**: Uses Google Gemini 2.0 Flash with TTS capability
- **Audio Player UI**: Beautiful, integrated audio controls on each page
- **Caching**: Generated audio is saved and reused (no regeneration needed)
- **Play/Pause Controls**: Full playback control
- **Visual Feedback**: Animated waveform while audio is playing
- **One-Click Generation**: Easy button to generate narration for any chapter

## 🎯 How It Works

### For Users

1. **Navigate to any chapter** in the book
2. **Click "Згенерувати озвучку"** button in the text section
3. Wait a few seconds while the AI generates the narration
4. **Click "▶️ Грати"** to listen to the chapter being read aloud
5. Use **⏸️ Пауза** to pause or **⏹️** to stop

### Technical Details

**Client-Side** (`components/AudioPlayer.tsx`):
- Checks if audio file exists for current chapter
- Shows "generate" button if no audio exists
- Plays WAV files using HTML5 Audio API
- Displays animated waveform during playback

**Server-Side** (`app/api/generate-audio/route.ts`):
- Receives chapter ID
- Fetches chapter text from story data
- Calls Gemini API to generate speech
- Saves audio as WAV file in `public/audio/chapters/`
- Returns path to audio file

**TTS Utility** (`lib/tts.ts`):
- Handles Gemini API communication
- Converts base64 audio to WAV format
- Provides both client and server-side functions

## 📁 File Structure

```
interactive-book/
├── lib/
│   └── tts.ts                      # TTS utility functions
├── app/
│   └── api/
│       └── generate-audio/
│           └── route.ts            # API endpoint
├── components/
│   ├── AudioPlayer.tsx             # Audio player UI
│   └── BookPage.tsx                # Updated with audio player
└── public/
    └── audio/
        └── chapters/               # Generated audio files
            ├── chapter-0.wav
            ├── chapter-1.wav
            └── ... (chapter-14.wav)
```

## 🔧 Configuration

### Environment Variables

The TTS feature uses the same Gemini API key as image generation:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

No additional configuration needed!

### Voice Selection

Currently uses the **'Kore'** voice for narration. You can change the voice by modifying:

`app/api/generate-audio/route.ts` (line 60):
```typescript
const base64Audio = await generateAudio(narrationText, 'Kore'); // Change 'Kore' to another voice
```

Available voices (experiment to find the best one for Ukrainian text):
- `Kore` - Default
- `Puck`
- `Charon`
- `Aoede`
- Other Gemini TTS voices

## 🎨 UI Components

### Audio Player States

1. **Loading**: Shows spinner while checking for audio
2. **No Audio**: Shows "generate" button with gradient background
3. **Audio Ready**: Shows play/pause controls with waveform animation
4. **Playing**: Animated waveform, pause and stop buttons visible

### Visual Design

- Gradient purple/pink background for generate button
- Gradient blue/purple background for audio player
- 3D button effects matching the book theme
- Emoji indicators (🎧, 🔊, 🔉, ⏸️, ▶️, ⏹️)
- Animated waveform bars during playback

## 🚀 Usage Tips

1. **Generate All Audio**: Consider generating audio for all chapters at once for offline use
2. **Audio Quality**: Audio is generated at 24kHz sample rate, suitable for voice
3. **File Size**: Each WAV file is ~500KB-2MB depending on chapter length
4. **Caching**: Once generated, audio files are permanent until manually deleted

## 🔊 Audio Format

- **Format**: WAV (uncompressed)
- **Sample Rate**: 24000 Hz
- **Channels**: Mono (1)
- **Bit Depth**: 16-bit PCM

## 🎭 Use Cases

- **Bedtime Stories**: Let the AI read the story while showing illustrations
- **Language Learning**: Help children follow along with Ukrainian text
- **Accessibility**: Support for children who are learning to read
- **Hands-Free**: Parents can let the book read itself

## ⚡ Performance

- **First Generation**: ~3-5 seconds per chapter (depends on text length)
- **Subsequent Plays**: Instant (cached audio)
- **Storage**: ~15-30MB total for all 15 chapters

## 🐛 Troubleshooting

**Audio won't generate:**
- Check that `GEMINI_API_KEY` is set in `.env.local`
- Verify API key has TTS permissions
- Check browser console for errors

**Audio won't play:**
- Ensure browser supports HTML5 Audio
- Check that WAV files are in `public/audio/chapters/`
- Try refreshing the page

**Poor audio quality:**
- Try different voice names
- Adjust the text formatting in story.ts
- Check network connection during generation

## 🎉 Complete Feature Set

Your book now has:
- ✅ AI-generated illustrations (Gemini Imagen)
- ✅ Interactive sound effects (clickable hotspots)
- ✅ AI-generated narration (Gemini TTS)
- ✅ Beautiful book-like UI
- ✅ Name personalization
- ✅ Progress tracking
- ✅ Page navigation

**Your interactive book is now fully multimedia! 📚🎨🔊**

---

Generated with Google Gemini API
