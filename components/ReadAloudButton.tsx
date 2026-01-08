'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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
        className="text-base px-8 py-6 shadow-lg"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Генерую озвучку...
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5 mr-2" />
            Згенерувати озвучку
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
        'text-base px-8 py-6 shadow-lg transition-all',
        isPlaying && 'animate-pulse'
      )}
    >
      <Volume2 className="w-5 h-5 mr-2" />
      {isPlaying ? 'Стоп' : 'Читати вголос'}
    </Button>
  );
}
