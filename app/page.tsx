'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function Home() {
  const [childName, setChildName] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (childName.trim()) {
      sessionStorage.setItem('childName', childName.trim());
    }
    router.push('/book');
  };

  const handleSkip = () => {
    sessionStorage.removeItem('childName');
    router.push('/book');
  };

  return (
    <div className="h-screen bg-background flex items-center justify-center p-2 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-4xl sm:text-6xl md:text-8xl">🚔</div>
        <div className="absolute top-20 right-20 text-3xl sm:text-5xl md:text-7xl">🚒</div>
        <div className="absolute bottom-20 left-20 text-3xl sm:text-5xl md:text-7xl">🚑</div>
        <div className="absolute bottom-10 right-10 text-2xl sm:text-4xl md:text-6xl">⭐</div>
      </div>

      <div className="w-full h-full max-h-full flex flex-col justify-center relative z-10 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 overflow-y-auto py-4">
        {/* 3D Book Cover */}
        <div className="relative perspective-[2000px] group flex-shrink-0">
          {/* Book cover */}
          <div
            className={cn(
              'relative bg-gradient-to-br from-primary via-primary/90 to-primary/80',
              'rounded-lg md:rounded-r-lg md:rounded-l-sm shadow-2xl overflow-hidden',
              'transition-transform duration-500',
              'group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg]'
            )}
            style={{
              boxShadow:
                '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            <div className="m-2 sm:m-3 bg-book-page rounded-sm p-4 sm:p-6 md:p-8 lg:p-12 relative paper-texture">
              {/* Decorative border */}
              <div className="absolute inset-3 sm:inset-4 md:inset-6 border-2 border-accent/30 rounded-lg" />

              <div className="relative text-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                {/* Title */}
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-1 sm:mb-2 drop-shadow-sm">
                    Три машинки
                  </h1>
                  <div className="h-0.5 sm:h-1 w-24 sm:w-32 md:w-48 bg-accent mx-auto rounded-full" />
                </div>

                {/* Subtitle */}
                <p className="font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-semibold">
                  Казка про дружбу та взаємодопомогу
                </p>

                {/* Cars illustration */}
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl my-3 sm:my-4 md:my-6 lg:my-8 flex justify-center gap-2 sm:gap-3 md:gap-4">
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '0s', animationDuration: '2s' }}
                  >
                    🚔
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '0.3s', animationDuration: '2s' }}
                  >
                    🚒
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '0.6s', animationDuration: '2s' }}
                  >
                    🚑
                  </span>
                </div>

                {/* Author */}
                <p className="font-serif text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground italic">
                  Інтерактивна книжка для дітей
                </p>
              </div>
            </div>
          </div>

          {/* Page edges */}
          <div className="absolute right-0 top-5 bottom-5 w-1 flex flex-col justify-center gap-0.5 pr-0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-1 bg-book-page-shadow rounded-full opacity-60" />
            ))}
          </div>
        </div>

        {/* Input form */}
        <div className="bg-card rounded-lg md:rounded-xl shadow-xl border p-4 sm:p-6 md:p-8 lg:p-12 paper-texture flex-shrink-0">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="childName" className="text-base sm:text-lg md:text-xl font-bold text-center block">
                Як звати вашу дитину?
              </Label>
              <input
                type="text"
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Введіть ім'я..."
                className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl bg-background border-2 border-input rounded-lg focus:outline-none focus:border-ring focus:ring-4 focus:ring-ring/20 transition-all"
              />
              <p className="text-xs sm:text-sm text-muted-foreground text-center italic">
                ✨ Ім'я з'явиться в історії, щоб зробити її особливою
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4">
              <Button
                size="lg"
                onClick={handleStart}
                className="flex-1 text-base sm:text-lg md:text-xl lg:text-2xl py-3 sm:py-4 md:py-6 shadow-lg hover:scale-105 transition-transform"
              >
                📖 Почати читати!
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={handleSkip}
                className="text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-6 shadow-md hover:scale-105 transition-transform"
              >
                Пропустити →
              </Button>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="text-center space-y-1 sm:space-y-2 flex-shrink-0">
          <p className="text-foreground text-sm sm:text-base md:text-lg font-semibold">
            ✨ Натискайте на машинки, щоб почути звуки! 🔊
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Інтерактивна казка з ілюстраціями та звуками
          </p>
        </div>
      </div>
    </div>
  );
}
