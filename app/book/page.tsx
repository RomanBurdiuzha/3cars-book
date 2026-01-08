'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Home, BookOpen } from 'lucide-react';
import { getChapter, getTotalChapters } from '@/lib/story';
import BookPage from '@/components/BookPage';
import ReadAloudButton from '@/components/ReadAloudButton';
import { cn, isIPad, isIOS } from '@/lib/utils';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

export default function BookReader() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [childName, setChildName] = useState<string | undefined>(undefined);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right');
  const [isIPadDevice, setIsIPadDevice] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Retrieve child's name from sessionStorage
    const storedName = sessionStorage.getItem('childName');
    if (storedName) {
      setChildName(storedName);
    }

    // Detect iPad/iOS devices
    setIsIPadDevice(isIPad());
    setIsIOSDevice(isIOS());

    // Request fullscreen on iPad
    if (isIPad() && document.documentElement.requestFullscreen) {
      const requestFullscreen = async () => {
        try {
          await document.documentElement.requestFullscreen();
        } catch (err) {
          console.log('Fullscreen request failed:', err);
        }
      };

      // Small delay to ensure page is fully loaded
      setTimeout(requestFullscreen, 500);
    }
  }, []);

  const totalPages = getTotalChapters();
  const currentChapter = getChapter(currentPage);

  const triggerHapticFeedback = useCallback(() => {
    // Haptic feedback for iOS devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, []);

  const goToPage = useCallback(
    (direction: 'next' | 'prev') => {
      if (isFlipping) return;

      if (direction === 'next' && currentPage < totalPages - 1) {
        triggerHapticFeedback();
        setFlipDirection('right');
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage((prev) => prev + 1);
          setIsFlipping(false);
        }, 600);
      } else if (direction === 'prev' && currentPage > 0) {
        triggerHapticFeedback();
        setFlipDirection('left');
        setIsFlipping(true);
        setTimeout(() => {
          setCurrentPage((prev) => prev - 1);
          setIsFlipping(false);
        }, 600);
      }
    },
    [currentPage, totalPages, isFlipping, triggerHapticFeedback]
  );

  // Swipe gesture support
  useSwipeGesture(containerRef, {
    onSwipeLeft: () => goToPage('next'),
    onSwipeRight: () => goToPage('prev'),
    minSwipeDistance: 50,
    minSwipeVelocity: 0.3,
  });

  const goHome = () => {
    router.push('/');
  };

  if (!currentChapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-muted-foreground">Завантаження...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-screen bg-background flex flex-col overflow-hidden",
        isIPadDevice ? "p-1 sm:p-2" : "p-2 sm:p-3 md:p-4 lg:p-6"
      )}
    >
      <div className="w-full h-full flex-1 flex flex-col min-h-0">
        {/* Book Container with 3D Effect - flex-1 makes it grow to fill available space */}
        <div className="relative perspective-[2000px] flex-1 flex flex-col min-h-0">
          {/* Main Book */}
          <div
            className={cn(
              'relative bg-book-cover rounded-r-lg rounded-l-sm shadow-2xl overflow-hidden flex-1 flex flex-col'
            )}
            style={{
              boxShadow:
                '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            {/* Inner Page Area */}
            <div className="m-2 md:m-3 bg-book-page rounded-sm overflow-hidden relative paper-texture flex-1 flex flex-col">
              {/* Page Content with Flip Animation */}
              <div
                className={cn(
                  'relative transition-transform duration-600 ease-in-out flex-1',
                  isFlipping && flipDirection === 'right' && 'animate-page-flip-right',
                  isFlipping && flipDirection === 'left' && 'animate-page-flip-left'
                )}
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: flipDirection === 'right' ? 'left center' : 'right center',
                }}
              >
                <BookPage chapter={currentChapter} childName={childName} />
              </div>

              {/* Page Shadow Effects */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/3 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Controls - fixed height footer */}
        <div className={cn(
          "flex items-center justify-between gap-1 sm:gap-2 flex-shrink-0",
          isIPadDevice ? "py-1 sm:py-2" : "py-2 sm:py-3 md:py-4"
        )}>
          {/* Left Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={goHome}
              className={cn(
                "p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-colors shadow-md",
                isIOSDevice
                  ? "bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-800"
                  : "bg-card hover:bg-muted text-foreground"
              )}
              aria-label="Go to start"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {childName && !isIPadDevice && (
              <div className="hidden xl:block px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs font-medium whitespace-nowrap">
                Для {childName} ⭐
              </div>
            )}
          </div>

          {/* Center: Navigation + Audio */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {!isIPadDevice && (
              <button
                onClick={() => goToPage('prev')}
                disabled={currentPage === 0 || isFlipping}
                className={cn(
                  'p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all shadow-lg',
                  isIOSDevice && 'backdrop-blur-md',
                  currentPage === 0
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : isIOSDevice
                    ? 'bg-blue-500/90 text-white hover:bg-blue-600/90 active:scale-95'
                    : 'bg-primary text-primary-foreground hover:scale-105 active:scale-95'
                )}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            )}

            {/* Page Dots Indicator for iPad */}
            {isIPadDevice ? (
              <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isFlipping && index !== currentPage) {
                        triggerHapticFeedback();
                        setFlipDirection(index > currentPage ? 'right' : 'left');
                        setIsFlipping(true);
                        setTimeout(() => {
                          setCurrentPage(index);
                          setIsFlipping(false);
                        }, 600);
                      }
                    }}
                    className={cn(
                      "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all",
                      index === currentPage
                        ? "bg-blue-500 w-4 sm:w-5"
                        : "bg-gray-400/50 hover:bg-gray-400"
                    )}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-muted-foreground" />
                <span className="text-xs sm:text-sm md:text-base font-medium text-foreground whitespace-nowrap">
                  {currentPage + 1} / {totalPages}
                </span>
              </div>
            )}

            {!isIPadDevice && (
              <button
                onClick={() => goToPage('next')}
                disabled={currentPage === totalPages - 1 || isFlipping}
                className={cn(
                  'p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all shadow-lg',
                  isIOSDevice && 'backdrop-blur-md',
                  currentPage === totalPages - 1
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : isIOSDevice
                    ? 'bg-blue-500/90 text-white hover:bg-blue-600/90 active:scale-95'
                    : 'bg-primary text-primary-foreground hover:scale-105 active:scale-95'
                )}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            )}

            {/* Audio Button */}
            {!isIPadDevice && (
              <div className="hidden sm:flex">
                <ReadAloudButton chapterId={currentPage} />
              </div>
            )}
          </div>

          {/* Right: Progress or Audio for iPad */}
          {isIPadDevice ? (
            <div className="flex">
              <ReadAloudButton chapterId={currentPage} />
            </div>
          ) : (
            <div className="hidden xl:flex items-center gap-1 sm:gap-2">
              <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium whitespace-nowrap">
                {Math.round(((currentPage + 1) / totalPages) * 100)}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Page Flip Animation Styles */}
      <style jsx>{`
        @keyframes page-flip-right {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
        }
        @keyframes page-flip-left {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: rotateY(180deg);
            opacity: 0;
          }
        }
        .animate-page-flip-right {
          animation: page-flip-right 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
        .animate-page-flip-left {
          animation: page-flip-left 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        /* Add depth and shadow during flip */
        .animate-page-flip-right::after,
        .animate-page-flip-left::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.2), transparent);
          pointer-events: none;
          animation: shadow-fade 0.6s ease-in-out;
        }

        @keyframes shadow-fade {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
