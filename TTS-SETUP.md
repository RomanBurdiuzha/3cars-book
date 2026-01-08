# Google Cloud Text-to-Speech Setup Guide

Your interactive book now uses **Google Cloud Text-to-Speech with Gemini-TTS models** for Ukrainian audio narration!

## Current Status

The TTS integration is ready. You just need to set up Google Cloud credentials.

---

## Step 1: Enable Google Cloud Text-to-Speech API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** → **Library**
4. Search for **"Cloud Text-to-Speech API"**
5. Click **Enable**

Direct link: https://console.cloud.google.com/apis/library/texttospeech.googleapis.com

---

## Step 2: Set Up Authentication

### Option A: Service Account (Recommended for Development)

1. **Create Service Account**:
   - Go to [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
   - Click **Create Service Account**
   - Name: `interactive-book-tts`
   - Role: **Cloud Text-to-Speech User** (or **Editor** for full access)
   - Click **Create and Continue** → **Done**

2. **Download JSON Key**:
   - Click on your new service account
   - Go to **Keys** tab
   - Click **Add Key** → **Create new key**
   - Choose **JSON**
   - Save the file as `service-account.json` in your project root

3. **Set Environment Variable**:

   Add to your `.env` file:
   ```bash
   GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/service-account.json
   ```

   Or set it temporarily in terminal:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/Users/romanburdiuzha/tmp/3 cars/interactive-book/service-account.json"
   ```

### Option B: Application Default Credentials

If you already have gcloud CLI installed:

```bash
gcloud auth application-default login
```

This will automatically set up credentials for local development.

---

## Step 3: Enable Billing

Google Cloud Text-to-Speech requires billing to be enabled:

1. Go to [Billing](https://console.cloud.google.com/billing)
2. Link a billing account to your project
3. Check pricing: https://cloud.google.com/text-to-speech/pricing

**Pricing Info** (as of 2025):
- Gemini-TTS: $16 per 1 million characters
- Free tier: First 1 million characters per month are free for Standard voices
- Your book (~15 chapters × ~500 characters each = ~7,500 characters total)
- Estimated cost for full book: **Less than $0.50** (likely free with free tier)

---

## Step 4: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open the book: http://localhost:3000

3. Click **"Згенерувати озвучку (AI)"** button on any chapter

4. Audio file will be generated and saved to `public/audio/chapters/`

---

## Configuration Options

### Change Voice

Edit `lib/tts.ts` or the API route to use different voices:

```typescript
const base64Audio = await generateAudio(narrationText, 'Aoede'); // Female voice
// Available voices: Kore, Aoede, Charon, Fenrir, Puck, and 25+ others
```

### Adjust Speaking Rate and Pitch

Uncomment lines in `lib/tts.ts`:

```typescript
audioConfig: {
  audioEncoding: 'LINEAR16',
  sampleRateHertz: 24000,
  speakingRate: 1.0,  // 0.25 to 4.0 (1.0 = normal)
  pitch: 0.0,         // -20.0 to 20.0 (0 = normal)
}
```

### Add Style Control

Add a prompt to the input in `lib/tts.ts`:

```typescript
input: {
  text: text,
  prompt: "Say in a friendly, storytelling tone suitable for children"
}
```

---

## File Structure

After setup, your project will have:

```
interactive-book/
├── .env                          # Environment variables
├── service-account.json          # Google Cloud credentials (gitignored)
├── lib/tts.ts                    # TTS implementation
├── app/api/generate-audio/       # API endpoint
└── public/audio/chapters/        # Generated audio files
    ├── chapter-0.wav
    ├── chapter-1.wav
    └── ...
```

---

## Troubleshooting

### Error: "API has not been used in project"
**Solution**: Enable the Cloud Text-to-Speech API in Google Cloud Console (Step 1)

### Error: "Requests to this API are blocked"
**Solution**:
1. Make sure billing is enabled
2. Check that your service account has the correct role (`roles/cloudtexttospeech.user`)
3. Wait a few minutes after enabling the API

### Error: "credentials not found"
**Solution**:
1. Check that `GOOGLE_APPLICATION_CREDENTIALS` path in `.env` is absolute
2. Verify the JSON file exists and is readable
3. Restart the dev server after updating `.env`

### Audio quality issues
**Solution**:
- Try different voices: Kore, Aoede, Charon, etc.
- Adjust sample rate (24000 Hz is optimal for web)
- Use `gemini-2.5-pro-tts` model for best quality (more expensive)

### Generated audio is too slow/fast
**Solution**: Adjust `speakingRate` in audioConfig (default: 1.0)

---

## Alternative: Manual Audio Recording

If you prefer not to set up Google Cloud, you can:

1. **Record your own voice** (recommended - more personal!)
2. Use online TTS services (ElevenLabs, etc.)
3. Hire a voice actor on Fiverr

See `AUDIO-GUIDE.md` for detailed instructions.

---

## Security Notes

- **Never commit** `service-account.json` to git
- Add to `.gitignore`:
  ```
  service-account.json
  *.json
  .env
  .env.local
  ```
- The service account key gives access to your Google Cloud project
- Use the principle of least privilege (only grant Text-to-Speech access)

---

## Next Steps

After TTS is working:

1. Generate audio for all 15 chapters
2. Test playback on tablet/iPad
3. Optionally add sound effects for hotspots (see `AUDIO-GUIDE.md`)
4. Consider converting WAV to MP3 for smaller file sizes
5. Deploy to web (Vercel, Netlify, etc.)

---

## Resources

- [Google Cloud TTS Documentation](https://cloud.google.com/text-to-speech/docs)
- [Gemini-TTS Guide](https://cloud.google.com/text-to-speech/docs/gemini-tts)
- [Available Voices](https://cloud.google.com/text-to-speech/docs/voices)
- [Ukrainian Language Support](https://cloud.google.com/text-to-speech/docs/voices#uk-ua)
- [Pricing Calculator](https://cloud.google.com/products/calculator)

---

Made with ❤️ for bedtime stories
