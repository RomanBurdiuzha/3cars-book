import { useEffect, useRef, RefObject } from 'react';

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
  minSwipeVelocity?: number;
}

interface TouchPosition {
  x: number;
  y: number;
  time: number;
}

/**
 * Custom hook for detecting swipe gestures on touch devices
 *
 * @param elementRef - Reference to the element to attach swipe listeners to
 * @param config - Configuration object with swipe handlers and thresholds
 *
 * Usage:
 * const containerRef = useRef<HTMLDivElement>(null);
 * useSwipeGesture(containerRef, {
 *   onSwipeLeft: () => goToPage('next'),
 *   onSwipeRight: () => goToPage('prev'),
 * });
 */
export function useSwipeGesture<T extends HTMLElement>(
  elementRef: RefObject<T>,
  config: SwipeConfig
) {
  const {
    onSwipeLeft,
    onSwipeRight,
    minSwipeDistance = 50, // Minimum distance in pixels
    minSwipeVelocity = 0.3, // Minimum velocity in pixels/ms
  } = config;

  const touchStartRef = useRef<TouchPosition | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const touchEnd = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;
      const deltaTime = touchEnd.time - touchStartRef.current.time;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const velocity = absX / deltaTime;

      // Only trigger if horizontal swipe is dominant (not vertical scroll)
      if (absX > absY && absX > minSwipeDistance && velocity > minSwipeVelocity) {
        if (deltaX > 0) {
          // Swiped right (previous page)
          onSwipeRight?.();
        } else {
          // Swiped left (next page)
          onSwipeLeft?.();
        }
      }

      touchStartRef.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default to avoid scrolling while swiping
      if (!touchStartRef.current) return;

      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

      // If horizontal movement is dominant, prevent scroll
      if (deltaX > deltaY) {
        e.preventDefault();
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [elementRef, onSwipeLeft, onSwipeRight, minSwipeDistance, minSwipeVelocity]);
}
