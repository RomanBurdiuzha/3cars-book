'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  chapterId: number;
  onGenerateAudio?: () => void;
  isGenerating?: boolean;
}

export default function AudioPlayer({
  chapterId,
  onGenerateAudio,
  isGenerating = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
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

    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
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

  if (isLoading) {
    return null; // Don't show anything while loading
  }

  if (!hasAudio) {
    return (
      <div className="flex items-center gap-2 pt-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={onGenerateAudio}
          disabled={isGenerating}
          className="text-sm"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              Генерую...
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 mr-2" />
              Згенерувати озвучку
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 pt-2">
      <Button
        size="sm"
        variant={isPlaying ? 'default' : 'secondary'}
        onClick={handlePlayStop}
        className={cn(
          'text-sm transition-all',
          isPlaying && 'animate-pulse'
        )}
      >
        <Volume2 className="w-4 h-4 mr-2" />
        {isPlaying ? 'Стоп' : 'Читати вголос'}
      </Button>
    </div>
  );
}
