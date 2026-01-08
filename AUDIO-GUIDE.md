# 🎙️ Audio Narration Guide

## Current Status

**AI Text-to-Speech**: The book now supports **Google Cloud Text-to-Speech with Gemini-TTS models** for Ukrainian audio narration!

**Setup Required**: See `TTS-SETUP.md` for complete instructions on enabling Google Cloud TTS.

**Alternative Solutions**: If you prefer not to use AI TTS, you can record your own audio (recommended for personal touch!) or use other services below.

---

## Option 0: Google Cloud TTS (AI - Recommended)

The book now has full Gemini-TTS integration with Ukrainian language support!

**Pros:**
- ✅ Automatic generation for all chapters
- ✅ High-quality Ukrainian voices (Kore, Aoede, Charon, etc.)
- ✅ Supports `uk-UA` language code
- ✅ Style control with prompts
- ✅ First 1 million characters/month free

**Setup:**
1. See detailed setup guide: `TTS-SETUP.md`
2. Enable Cloud Text-to-Speech API in Google Cloud Console
3. Set up service account credentials
4. Click "Згенерувати озвучку (AI)" button in the app

**Estimated Cost:** Less than $0.50 for the entire book (likely free with free tier)

---

## Option 1: Record Your Own Voice (Recommended!)

This is actually **better** than AI - your son will love hearing your voice reading the story!

### How to Record:

1. **On Mac:**
   - Open QuickTime Player
   - File → New Audio Recording
   - Click the red record button
   - Read the chapter text
   - Save as `.m4a` or `.wav`

2. **On iPhone/iPad:**
   - Use Voice Memos app
   - Record yourself reading
   - AirDrop to your Mac

3. **Convert to WAV:**
   ```bash
   # If you have ffmpeg installed
   ffmpeg -i chapter-0.m4a -ar 24000 -ac 1 chapter-0.wav

   # Or use online converter: https://cloudconvert.com/m4a-to-wav
   ```

4. **Place files:**
   ```
   public/audio/chapters/
   ├── chapter-0.wav  (intro)
   ├── chapter-1.wav  (police car)
   ├── chapter-2.wav  (fire truck)
   ...
   ├── chapter-14.wav (ending)
   ```

---

## Option 2: Use Online TTS Services

If you prefer automated voice:

### ElevenLabs (High Quality)
- https://elevenlabs.io/
- Free tier: 10,000 characters/month
- Has multilingual voices
- Export as WAV

### Google Cloud TTS (Web Interface)
- https://cloud.google.com/text-to-speech
- Try voices in browser
- Download audio files
- Ukrainian voices available

### Natural Readers
- https://www.naturalreaders.com/
- Free online TTS
- Download MP3, convert to WAV

---

## Option 3: Hire Voice Actor (Fiverr)

For professional narration:
- https://www.fiverr.com/
- Search: "Ukrainian voice over"
- $20-50 for full book narration
- Provide the text from `cars.md`

---

## File Requirements

Your audio files should be:
- **Format**: WAV (preferred) or MP3
- **Naming**: `chapter-0.wav` through `chapter-14.wav`
- **Location**: `public/audio/chapters/`
- **Sample Rate**: 24000 Hz (or any, will work)
- **Channels**: Mono or Stereo (both work)

---

## Quick Recording Script

Here's what to read for each chapter (from `lib/story.ts`):

### Chapter 0 (Intro):
```
Знайомство з машинками

Жили-були три машинки в одному великому і теплому гаражі...
```

### Chapter 1:
```
Поліцейська машинка

Старша машинка була поліцейською...
```

*(Full text is in the app - just read what's on screen!)*

---

## Testing Your Audio

1. Add your WAV file to `public/audio/chapters/`
2. Refresh the book page
3. Audio player will automatically appear
4. Click Play to test!

---

## File Size Tips

- **WAV files** are large (~5-10MB each)
- For web deployment, consider converting to MP3:
  ```bash
  ffmpeg -i chapter-0.wav -b:a 128k chapter-0.mp3
  ```
- Update `AudioPlayer.tsx` to use `.mp3` instead of `.wav`

---

## Why Your Voice is Better

Reading to your child yourself (even recorded):
- ✅ More personal and engaging
- ✅ Creates stronger emotional connection
- ✅ You can add emotion and character voices
- ✅ Your son recognizes and loves your voice
- ✅ No API costs or technical issues

**Recommendation**: Take 20 minutes tonight, record yourself reading all 15 chapters. Your son will treasure these recordings! 💙

---

## Already Have the Book Images?

You already have beautiful Gemini-generated illustrations! Now just add:
1. Your voice reading the story
2. Some sound effects (car sirens, etc.)

And you'll have a **complete interactive book** that's better than anything from the store!

---

Made with ❤️ for bedtime stories
