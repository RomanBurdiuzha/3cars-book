'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReadAloudButtonProps {
  chapterId: number;
}

export default function ReadAloudButton({ chapterId }: ReadAloudButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Stop any playing audio when chapter changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }

    // Check if audio file exists
    const checkAudio = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/audio/chapters/chapter-${chapterId}.wav`, {
          method: 'HEAD',
        });
        setHasAudio(response.ok);
      } catch {
        setHasAudio(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAudio();
  }, [chapterId]);

  const handlePlayStop = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(`/audio/chapters/chapter-${chapterId}.wav`);

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };

      audioRef.current.onerror = () => {
        setIsPlaying(false);
        setHasAudio(false);
      };
    }

    if (isPlaying) {
      // Stop: pause and reset to beginning
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      // Play from beginning
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleGenerateAudio = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chapterId }),
      });

      const data = await response.json();

      if (data.success) {
        setHasAudio(true);
      } else {
        alert(`Помилка: ${data.error}\n${data.details || ''}`);
      }
    } catch (error) {
      console.error('Failed to generate audio:', error);
      alert('Не вдалося згенерувати аудіо. Перевірте налаштування API.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return null;
  }

  if (!hasAudio) {
    return (
      <Button
        size="lg"
        variant="secondary"
        onClick={handleGenerateAudio}
        disabled={isGenerating}
        className="text-base px-10 py-8 shadow-2xl min-w-[200px] sm:min-w-[240px]"
      >
        {isGenerating ? (
          <>
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
            <span className="text-sm sm:text-base">Генерую озвучку...</span>
          </>
        ) : (
          <>
            <span className="text-4xl mr-3">🎭</span>
            <span className="text-sm sm:text-base font-semibold">Згенерувати озвучку</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      variant={isPlaying ? 'default' : 'secondary'}
      onClick={handlePlayStop}
      className={cn(
        'text-base px-10 py-8 shadow-2xl transition-all min-w-[200px] sm:min-w-[240px] relative',
        'before:absolute before:inset-0 before:rounded-lg before:transition-all',
        !isPlaying && 'before:animate-pulse before:bg-primary/10 before:blur-sm',
        isPlaying && 'animate-pulse ring-2 ring-primary ring-offset-2'
      )}
    >
      <span className="text-4xl mr-3 relative z-10">🎭</span>
      <span className="text-sm sm:text-base font-semibold relative z-10">
        {isPlaying ? 'Стоп' : 'Слухати казку'}
      </span>
    </Button>
  );
}
