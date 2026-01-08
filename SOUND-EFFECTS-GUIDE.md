# 🔊 Sound Effects Guide

Guide for adding sound effects to your interactive book's clickable hotspots.

---

## Required Sound Files

Your book needs these 5 sound effect files in `public/sounds/`:

1. **`police-siren.mp3`** - Police car siren (wee-woo sound)
2. **`fire-siren.mp3`** - Fire truck siren (long wailing sound)
3. **`ambulance-siren.mp3`** - Ambulance siren (urgent siren)
4. **`helicopter.mp3`** - Helicopter rotor sound
5. **`truck-horn.mp3`** - Tow truck horn (honk sound)

---

## Option 1: Free Sound Libraries (Recommended)

### Freesound.org (Best Option)
Free, high-quality sound effects with Creative Commons licenses.

**Steps:**
1. Go to https://freesound.org/
2. Create a free account
3. Search for each sound:
   - Search: "police siren"
   - Search: "fire truck siren"
   - Search: "ambulance siren"
   - Search: "helicopter"
   - Search: "truck horn"
4. Download as MP3 (or WAV and convert)
5. Rename files to match exactly: `police-siren.mp3`, etc.
6. Place in `public/sounds/` folder

**Recommended Searches:**
- "emergency siren" - for police/fire/ambulance
- "helicopter rotor" - for helicopter
- "car horn" - for truck horn

**License Note:** Most sounds are CC0 or CC-BY (just need attribution). Check license before using!

---

### Other Free Sources

#### Zapsplat.com
- https://www.zapsplat.com/
- Free with attribution
- High quality sound effects
- Categories: Vehicles → Emergency

#### BBC Sound Effects
- https://sound-effects.bbcrewind.co.uk/
- Free for personal use
- Professional quality
- Search categories

#### FreeSound Effects
- https://www.freesoundeffects.com/
- Free downloads
- No attribution required for personal use

---

## Option 2: Record Your Own

For maximum fun with your son, record him making the sounds!

**How to Record:**

1. **On iPhone/iPad:**
   - Open Voice Memos app
   - Have your son make siren sounds: "Wee-woo-wee-woo!"
   - Save and AirDrop to Mac

2. **On Mac:**
   - Open QuickTime Player
   - File → New Audio Recording
   - Record sounds
   - Export as M4A or WAV

3. **Convert to MP3:**
   ```bash
   # Using ffmpeg (if installed)
   ffmpeg -i recording.m4a -b:a 128k police-siren.mp3

   # Or use online converter:
   # https://cloudconvert.com/m4a-to-mp3
   ```

**Fun Ideas:**
- Make it silly - exaggerated sounds
- Add dramatic effects
- Record multiple takes and pick the best
- Your son will LOVE hearing his own voice!

---

## Option 3: Use AI Generated Sounds

### ElevenLabs Sound Effects (Beta)
- https://elevenlabs.io/sound-effects
- Generate custom sound effects with AI
- Free tier available
- Just describe what you want: "police car siren sound effect"

### Other AI Tools
- **Soundraw.io** - AI music and sound effects
- **AIVA** - Can generate atmospheric sounds
- **Mubert** - AI-generated audio

---

## Option 4: YouTube Audio Library

1. Go to https://studio.youtube.com/
2. Sign in with Google account
3. Go to Audio Library → Sound Effects
4. Search and download:
   - Emergency sirens
   - Vehicle sounds
   - Helicopter sounds
5. Download as MP3
6. Rename and place in `public/sounds/`

**Advantage:** All sounds are free and royalty-free!

---

## File Specifications

**Format:** MP3 (recommended for web)
**Sample Rate:** 44.1kHz or 48kHz
**Bitrate:** 128kbps - 192kbps (good quality, small file size)
**Duration:** 2-5 seconds (short loops work best)
**File Size:** Aim for < 100KB per file

---

## Installation Steps

1. **Download** your sound files from any source above

2. **Rename** files exactly as shown:
   ```
   police-siren.mp3
   fire-siren.mp3
   ambulance-siren.mp3
   helicopter.mp3
   truck-horn.mp3
   ```

3. **Place** in the correct directory:
   ```
   interactive-book/
   └── public/
       └── sounds/
           ├── police-siren.mp3
           ├── fire-siren.mp3
           ├── ambulance-siren.mp3
           ├── helicopter.mp3
           └── truck-horn.mp3
   ```

4. **Test** - Refresh the book page and click on the cars!

---

## Converting Audio Formats

If you download WAV files and need MP3:

### Using Online Converters (Easiest)
- https://cloudconvert.com/
- https://online-audio-converter.com/
- Upload WAV, select MP3, download

### Using FFmpeg (Command Line)
```bash
# Install ffmpeg first (if not installed)
brew install ffmpeg  # On Mac

# Convert WAV to MP3
ffmpeg -i police-siren.wav -b:a 128k police-siren.mp3

# Convert and normalize volume
ffmpeg -i input.wav -af "volume=1.5" -b:a 128k output.mp3

# Batch convert all WAV files
for file in *.wav; do
  ffmpeg -i "$file" -b:a 128k "${file%.wav}.mp3"
done
```

---

## Adjusting Volume

If sounds are too loud or quiet:

### Using Audacity (Free)
1. Download: https://www.audacityteam.org/
2. Open your sound file
3. Select all (Cmd+A)
4. Effect → Amplify (increase) or Normalize
5. Export as MP3

### Using FFmpeg
```bash
# Increase volume by 50%
ffmpeg -i police-siren.mp3 -af "volume=1.5" police-siren-loud.mp3

# Decrease volume by 50%
ffmpeg -i fire-siren.mp3 -af "volume=0.5" fire-siren-quiet.mp3
```

---

## Quick Start: My Recommendations

**For Quick Setup (5 minutes):**
1. Go to https://freesound.org/
2. Search "emergency vehicle pack"
3. Download a pack with all sirens
4. Rename and add to `public/sounds/`

**For Best Quality:**
1. Use BBC Sound Effects for professional sounds
2. Or record with your son for personalization!

**For Most Fun:**
1. Record your son making vehicle sounds
2. He'll be THRILLED to hear himself in the book!

---

## Troubleshooting

### Sound doesn't play when clicking hotspot
- Check console for errors (F12 → Console)
- Verify file exists in `public/sounds/`
- Check filename matches exactly (case-sensitive!)
- Try different browser (Chrome works best)

### Sound is too quiet/loud
- Adjust volume in code (`components/ClickableHotspot.tsx` line with `audioRef.current.volume = 0.7`)
- Or edit the audio file volume (see above)

### File is too large
- Convert to lower bitrate: `ffmpeg -i input.mp3 -b:a 96k output.mp3`
- Trim duration to 2-3 seconds
- Use MP3 instead of WAV

---

## Attribution

If using Creative Commons sounds, add attribution to your README:

```markdown
## Sound Effects Attribution

- Police Siren: [Author Name] via Freesound.org (CC-BY)
- Fire Truck: [Author Name] via Freesound.org (CC-BY)
- Ambulance: [Author Name] via Freesound.org (CC0)
```

---

## What Sounds Work Best?

**Police Siren:** European-style "wee-woo" or American "yelp"
**Fire Truck:** Deep, wailing siren
**Ambulance:** High-pitched, urgent siren
**Helicopter:** Steady rotor thump-thump sound
**Truck Horn:** Classic "honk" or air horn

**Pro Tip:** Keep sounds **short** (2-4 seconds) so they don't get annoying with repeated clicks!

---

## Next Steps

1. Download/record sounds (10 minutes)
2. Add to `public/sounds/` folder
3. Refresh book page
4. Click on cars and enjoy! 🚔🚒🚑

---

Made with ❤️ for interactive storytelling
