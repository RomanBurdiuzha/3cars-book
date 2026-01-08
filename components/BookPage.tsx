'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Chapter } from '@/lib/story';
import { getHotspotsForChapter } from '@/lib/hotspots';
import { getChapterDialogues } from '@/lib/hotspot-dialogues';
import ClickableHotspot from './ClickableHotspot';
import AudioPlayer from './AudioPlayer';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BookPageProps {
  chapter: Chapter;
  childName?: string;
}

export default function BookPage({ chapter, childName }: BookPageProps) {
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioKey, setAudioKey] = useState(0);
  const [showSparkle, setShowSparkle] = useState<{ x: number; y: number } | null>(null);
  const hotspots = getHotspotsForChapter(chapter.id);

  const displayContent = childName ? chapter.content : chapter.content;

  // Pre-generate hotspot dialogues in the background
  useEffect(() => {
    const preGenerateDialogues = async () => {
      const dialogues = getChapterDialogues(chapter.id);

      if (dialogues.length === 0) {
        return; // No dialogues for this chapter
      }

      console.log(`Pre-generating ${dialogues.length} hotspot dialogues for chapter ${chapter.id}`);

      // Trigger generation for all dialogues in parallel (non-blocking)
      const generationPromises = dialogues.map(async ({ character }) => {
        try {
          // Check if audio already exists
          const checkResponse = await fetch(
            `/api/generate-hotspot-audio?chapterId=${chapter.id}&character=${character}&childName=${childName || ''}`,
            { method: 'GET' }
          );

          const checkData = await checkResponse.json();

          if (!checkData.exists) {
            // Generate audio
            console.log(`Pre-generating dialogue for ${character} in chapter ${chapter.id}`);
            const generateResponse = await fetch('/api/generate-hotspot-audio', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chapterId: chapter.id,
                character,
                childName,
              }),
            });

            const generateData = await generateResponse.json();

            if (generateData.success) {
              console.log(`✓ Pre-generated dialogue for ${character}`);
            } else {
              console.warn(`Failed to pre-generate dialogue for ${character}:`, generateData.error);
            }
          } else {
            console.log(`✓ Dialogue already cached for ${character}`);
          }
        } catch (error) {
          console.error(`Error pre-generating dialogue for ${character}:`, error);
        }
      });

      // Wait for all generations to complete (but don't block rendering)
      await Promise.allSettled(generationPromises);
      console.log(`Finished pre-generating dialogues for chapter ${chapter.id}`);
    };

    preGenerateDialogues();
  }, [chapter.id, childName]);

  const handleGenerateAudio = async () => {
    setIsGeneratingAudio(true);
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chapterId: chapter.id }),
      });

      const data = await response.json();

      if (data.success) {
        setAudioKey((prev) => prev + 1);
      } else {
        alert(`Помилка: ${data.error}\n${data.details || ''}`);
      }
    } catch (error) {
      console.error('Failed to generate audio:', error);
      alert('Не вдалося згенерувати аудіо. Перевірте налаштування API.');
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShowSparkle({ x, y });
    setTimeout(() => setShowSparkle(null), 1000);
  };

  return (
    <div className="h-full p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col overflow-hidden">
      {/* Image Section */}
      <div className="flex-1 flex flex-col gap-2 md:gap-3 min-h-0 overflow-hidden">
        <div className="flex items-center justify-center flex-1 min-h-0">
          <div
            className="relative w-full h-full max-h-full rounded-lg md:rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={handleImageClick}
          >
            <div className="relative w-full h-full" key={`chapter-image-${chapter.id}`}>
              <Image
                key={chapter.id}
                src={`/images/chapters/chapter-${chapter.id}.png`}
                alt={chapter.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority={chapter.id === 0}
                sizes="100vw"
              />

              {/* Sparkle effect on click */}
              {showSparkle && (
                <div
                  className="absolute animate-ping"
                  style={{ left: showSparkle.x - 12, top: showSparkle.y - 12 }}
                >
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
              )}

              {/* Clickable hotspots overlay */}
              {hotspots.map((hotspot) => (
                <ClickableHotspot
                  key={hotspot.id}
                  hotspot={hotspot}
                  chapterId={chapter.id}
                  childName={childName}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-start space-y-1 sm:space-y-1.5 md:space-y-2 overflow-y-auto flex-shrink-0 max-h-[35vh] sm:max-h-[30vh]">
          {/* Chapter Title */}
          <h2 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground border-b-2 border-accent pb-1">
            {chapter.title}
          </h2>

          {/* Story Text */}
          <p className="font-serif text-xs sm:text-sm md:text-base leading-relaxed text-foreground whitespace-pre-line">
            {displayContent}
          </p>

          {/* Chapter Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
            <div className="bg-primary text-primary-foreground px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-sm">
              Розділ {chapter.id + 1}
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl">
              {chapter.id === 0 && '🚔'}
              {chapter.id === 1 && '🚔'}
              {chapter.id === 2 && '🚒'}
              {chapter.id === 3 && '🚑'}
              {chapter.id >= 4 && '⭐'}
            </div>
          </div>

          {/* Interactive Hint */}
          {hotspots.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
              <Sparkles className="w-3 h-3 text-accent flex-shrink-0" />
              <span className="leading-tight">Натискайте на картинку, щоб почути звуки!</span>
            </div>
          )}
        </div>
      </div>

      {/* Page Number */}
      <div className="pt-1 sm:pt-1.5 md:pt-2 text-center flex-shrink-0">
        <span className="text-xs text-muted-foreground font-medium">- {chapter.id + 1} -</span>
      </div>

      {/* Hidden Audio Player - controlled from parent */}
      <div className="hidden">
        <AudioPlayer
          key={audioKey}
          chapterId={chapter.id}
          onGenerateAudio={handleGenerateAudio}
          isGenerating={isGeneratingAudio}
        />
      </div>
    </div>
  );
}
