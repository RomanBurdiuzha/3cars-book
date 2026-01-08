'use client';

import { Hotspot } from '@/lib/hotspots';
import { useRef, useEffect, useState } from 'react';
import { getNameHash } from '@/lib/hotspot-dialogues';

interface ClickableHotspotProps {
  hotspot: Hotspot;
  chapterId: number;
  childName?: string;
  onPlay?: () => void;
}

export default function ClickableHotspot({ hotspot, chapterId, childName, onPlay }: ClickableHotspotProps) {
  const soundEffectRef = useRef<HTMLAudioElement | null>(null);
  const dialogueRef = useRef<HTMLAudioElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [justClicked, setJustClicked] = useState(false);
  const [isDialogueLoading, setIsDialogueLoading] = useState(false);
  const [hasDialogue, setHasDialogue] = useState(false);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);

  // Preload sound effect
  useEffect(() => {
    const audio = new Audio(`/sounds/${hotspot.soundEffect}`);
    audio.addEventListener('error', () => {
      console.warn(`Sound file not found: /sounds/${hotspot.soundEffect}`);
      setHasError(true);
    });
    soundEffectRef.current = audio;

    return () => {
      if (soundEffectRef.current) {
        soundEffectRef.current.pause();
        soundEffectRef.current = null;
      }
    };
  }, [hotspot.soundEffect]);

  // Check for and generate dialogue audio
  useEffect(() => {
    const checkAndGenerateDialogue = async () => {
      setIsDialogueLoading(true);
      try {
        const nameHash = getNameHash(childName);
        const filename = `chapter-${chapterId}-${hotspot.character}-${nameHash}.wav`;

        // Check if audio exists
        const checkResponse = await fetch(
          `/api/generate-hotspot-audio?chapterId=${chapterId}&character=${hotspot.character}&childName=${childName || ''}`,
          { method: 'GET' }
        );

        const checkData = await checkResponse.json();

        if (checkData.exists) {
          // Audio already exists, preload it
          const audio = new Audio(`/audio/hotspots/${filename}`);
          audio.addEventListener('error', () => {
            console.warn(`Dialogue audio not found: /audio/hotspots/${filename}`);
            setHasDialogue(false);
          });
          audio.addEventListener('canplaythrough', () => {
            setHasDialogue(true);
          });
          dialogueRef.current = audio;
        } else {
          // Generate audio
          console.log(`Generating dialogue for ${hotspot.character} in chapter ${chapterId}`);
          const generateResponse = await fetch('/api/generate-hotspot-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chapterId,
              character: hotspot.character,
              childName,
            }),
          });

          const generateData = await generateResponse.json();

          if (generateData.success) {
            // Preload the newly generated audio
            const audio = new Audio(`/audio/hotspots/${generateData.filename}`);
            audio.addEventListener('canplaythrough', () => {
              setHasDialogue(true);
            });
            dialogueRef.current = audio;
          } else {
            console.warn('Failed to generate dialogue:', generateData.error);
            setHasDialogue(false);
          }
        }
      } catch (error) {
        console.error('Error checking/generating dialogue:', error);
        setHasDialogue(false);
      } finally {
        setIsDialogueLoading(false);
      }
    };

    checkAndGenerateDialogue();

    return () => {
      if (dialogueRef.current) {
        dialogueRef.current.pause();
        dialogueRef.current = null;
      }
    };
  }, [chapterId, hotspot.character, childName]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling

    // Don't allow clicks while playing sequence
    if (isPlayingSequence) return;

    console.log('Hotspot clicked:', hotspot.id, hotspot.character);

    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 300);

    // Callback for animations or other effects
    onPlay?.();

    // Sequential playback: sound effect → dialogue
    const playSequence = async () => {
      setIsPlayingSequence(true);

      try {
        // Step 1: Play sound effect
        if (soundEffectRef.current && !hasError) {
          soundEffectRef.current.currentTime = 0;
          await soundEffectRef.current.play();

          // Wait for sound effect to finish
          await new Promise<void>((resolve) => {
            if (soundEffectRef.current) {
              soundEffectRef.current.onended = () => resolve();
            } else {
              resolve();
            }
          });
        } else if (hasError) {
          console.log(`🔇 Sound file missing for ${hotspot.character}`);
        }

        // Step 2: Play dialogue if available
        if (hasDialogue && dialogueRef.current) {
          dialogueRef.current.currentTime = 0;
          await dialogueRef.current.play();

          // Wait for dialogue to finish
          await new Promise<void>((resolve) => {
            if (dialogueRef.current) {
              dialogueRef.current.onended = () => resolve();
            } else {
              resolve();
            }
          });
        }
      } catch (err) {
        console.warn('Audio playback failed:', err);
      } finally {
        setIsPlayingSequence(false);
      }
    };

    playSequence();
  };

  // Get emoji for character type
  const getEmoji = () => {
    switch (hotspot.character) {
      case 'police': return '🚔';
      case 'fire': return '🚒';
      case 'ambulance': return '🚑';
      case 'helicopter': return '🚁';
      case 'plane': return '✈️';
      case 'tow': return '🚛';
      default: return '🚗';
    }
  };

  return (
    <div
      onClick={handleClick}
      className="absolute cursor-pointer group transition-all duration-200 hover:scale-110 z-10"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      title={`Click for ${hotspot.character} sound`}
    >
      {/* Always visible subtle indicator */}
      <div className="absolute inset-0 rounded-full border-2 border-white/30 opacity-40 group-hover:opacity-0 transition-opacity" />

      {/* Visual feedback on hover - make it very obvious */}
      <div className="absolute inset-0 rounded-full border-4 border-yellow-400 bg-yellow-400/20 opacity-0 group-hover:opacity-90 transition-opacity duration-200 animate-pulse" />

      {/* Show emoji on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="text-4xl drop-shadow-lg animate-bounce">
          {getEmoji()}
        </div>
      </div>

      {/* Loading indicator when generating dialogue */}
      {isDialogueLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-500/30 rounded-full">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Playing sequence indicator */}
      {isPlayingSequence && (
        <div className="absolute inset-0 rounded-full border-4 border-green-400 bg-green-400/30 animate-pulse" />
      )}

      {/* Click ripple effect */}
      {justClicked && (
        <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-50 animate-ping" />
      )}

      {/* Subtle ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-40 group-active:animate-ping" />
    </div>
  );
}
