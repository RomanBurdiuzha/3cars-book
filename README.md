# 📚 Три машинки - Interactive Children's Book

An interactive picture book for children featuring three cars: a police car, a fire truck, and an ambulance. Built with Next.js, featuring AI-generated illustrations and text-to-speech narration in Ukrainian.

## ✨ Features

- 📖 **15 chapters** with beautiful AI-generated illustrations (already included!)
- 🎙️ **Ukrainian audio narration** with Google Cloud TTS (Gemini-TTS models)
- 🖱️ **Interactive hotspots** - clickable areas on images with sound effects
- 👶 **Name personalization** - add your child as a character
- 📱 **Tablet-optimized** - perfect for iPad reading (1280px max-width)
- 🎨 **Real book design** - images take 70-80% of screen like a picture book
- 🔊 **Audio controls** - play/pause narration with visual waveform animation
- ✨ **Beautiful UI** - golden frames, paper textures, 3D button effects

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- (Optional) Google Cloud account for TTS narration

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   - Go to http://localhost:3000
   - Enter child's name
   - Start reading!

All chapter images are already included in `public/images/chapters/`!

## 🎤 Audio Setup

### Option 1: AI Text-to-Speech (Google Cloud TTS)

The book supports Google Cloud Text-to-Speech with Ukrainian voices:

1. See **`TTS-SETUP.md`** for complete setup instructions
2. Enable Cloud Text-to-Speech API in Google Cloud Console
3. Set up service account credentials
4. Click "Згенерувати озвучку (AI)" button in the app!

**Cost:** Less than $0.50 for entire book (free tier: 1M characters/month)

### Option 2: Record Your Own Voice (Recommended!)

Record your own voice for a more personal touch:

1. See **`AUDIO-GUIDE.md`** for recording instructions
2. Save files as `public/audio/chapters/chapter-0.wav` through `chapter-14.wav`
3. Audio player will automatically detect and use them

Your child will love hearing your voice reading the story!

### Option 3: Sound Effects (Optional)

Add sound effects for interactive hotspots:
- Place MP3 files in `public/sounds/`
- Required: `police-siren.mp3`, `fire-siren.mp3`, `ambulance-siren.mp3`, `helicopter.mp3`, `truck-horn.mp3`
- Download free sounds from freesound.org

## 📖 How to Use

1. **Start Page**: Enter your child's name and click "Почати читати!"
2. **Reading**: Navigate with Previous/Next buttons
3. **Audio**: Click "Згенерувати озвучку (AI)" or add your own recordings
4. **Interactive**: Click on cars in images to hear sounds (if sound files added)
5. **Progress**: Track reading progress with the progress bar

## 📁 Project Structure

```
interactive-book/
├── app/
│   ├── page.tsx              # Home page with book cover
│   ├── book/page.tsx         # Main book reader
│   └── api/
│       └── generate-audio/   # TTS API endpoint
├── components/
│   ├── BookPage.tsx          # Chapter display (picture book layout)
│   ├── Navigation.tsx        # Page navigation controls
│   ├── AudioPlayer.tsx       # Audio playback with waveform
│   └── ClickableHotspot.tsx  # Interactive image hotspots
├── lib/
│   ├── story.ts              # Book content (15 chapters)
│   ├── hotspots.ts           # Clickable area configurations
│   └── tts.ts                # Google Cloud TTS integration
├── public/
│   ├── images/chapters/      # Chapter illustrations (PNG) ✅ Included
│   ├── audio/chapters/       # Generated/recorded audio (WAV)
│   └── sounds/               # Sound effects for hotspots (MP3)
├── TTS-SETUP.md              # Google Cloud TTS setup guide
├── AUDIO-GUIDE.md            # Alternative audio options
└── BOOK-REDESIGN.md          # Design changes documentation
```

## 🎯 Customizing Hotspots

After generating images, you may need to adjust the clickable hotspots to match character positions:

1. Edit `lib/hotspots.ts`
2. Modify the `x`, `y`, `width`, and `height` percentages for each hotspot
3. Coordinates are percentage-based (0-100) from top-left corner

Example:
```typescript
{
  id: 'fire-1',
  x: 40,        // 40% from left
  y: 40,        // 40% from top
  width: 20,    // 20% width
  height: 30,   // 30% height
  character: 'fire',
  soundEffect: 'fire-siren.mp3'
}
```

## 🎨 Design Features

- **Picture book layout** - image-focused vertical design (image 70%, text 30%)
- **Golden frames** - decorative borders around illustrations
- **Paper texture** - realistic book-like background
- **3D buttons** - touch-friendly with press effects
- **Progress bar** - track reading progress with shimmer animation
- **Waveform animation** - visual feedback during audio playback
- **Tablet optimization** - max-width 1280px, 44px+ touch targets
- **Responsive breakpoints** - mobile, tablet, desktop support

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `GOOGLE_APPLICATION_CREDENTIALS` (base64 encoded service account JSON)
4. Upload generated audio files to `public/audio/chapters/`
5. Deploy!

### Build for Production

```bash
npm run build
npm start
```

**Note:** Images are already optimized with Next.js Image component.

## 📝 Story Content

The story is based on "Три машинки" (Three Cars) - a Ukrainian children's tale about friendship and helping each other. The story follows three car sisters:

- 🚔 **Police Car** - The eldest sister who helps keep order
- 🚒 **Fire Truck** - The middle sister who fights fires and rescues
- 🚑 **Ambulance** - The youngest sister who helps sick people

## 📚 Documentation

- **`TTS-SETUP.md`** - Complete Google Cloud TTS setup guide
- **`AUDIO-GUIDE.md`** - Alternative audio recording options
- **`BOOK-REDESIGN.md`** - Details on layout and design changes

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling and responsive design
- **Google Cloud TTS** - AI voice generation (Gemini-TTS models)
- **Google Gemini** - Image generation (images already generated)
- **HTML5 Audio API** - Audio playback
- **@google-cloud/text-to-speech** - TTS client library

## 🎯 Browser Support

- Chrome/Edge (recommended)
- Safari (iOS/macOS)
- Firefox
- **Optimized for tablets** (768px - 1024px)

## 📝 To Do (Optional Enhancements)

- [ ] Add swipe gestures for page navigation
- [ ] Add fullscreen mode
- [ ] Add page turn sound effect
- [ ] Optimize images (PNG → WebP conversion)
- [ ] Add more interactive elements (animations, mini-games)
- [ ] Multi-language support (add English translation)
- [ ] Add bookmarks and reading history

## 🤝 Contributing

This is a personal project for creating interactive books for children. Feel free to fork and adapt for your own stories!

## 📄 License

Private project - for personal use.

## 🙏 Credits

- Story: "Три машинки" (Ukrainian children's tale)
- Images: Generated with Google Gemini AI
- TTS: Google Cloud Text-to-Speech with Gemini-TTS models
- Sounds: Add your sound effect attributions here

---

## 🎉 Enjoy Reading!

Your interactive book is ready with all images included! Just set up the TTS (see `TTS-SETUP.md`) or record your own audio, and start reading with your child! 📚✨👶

Made with ❤️ for bedtime stories and quality time with children.
