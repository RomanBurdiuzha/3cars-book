'use client';

import { getTotalChapters } from '@/lib/story';

interface NavigationProps {
  currentPage: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Navigation({
  currentPage,
  onPrevious,
  onNext,
}: NavigationProps) {
  const totalPages = getTotalChapters();
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
      <div className="paper-texture rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-amber-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Previous button - Touch-friendly size */}
          <button
            onClick={onPrevious}
            disabled={isFirstPage}
            className="w-full sm:w-auto min-w-[140px] px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed btn-3d text-lg sm:text-xl touch-manipulation"
          >
            ← Попередня
          </button>

          {/* Page indicator - Larger for tablet */}
          <div className="flex items-center justify-center flex-1">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold shadow-lg text-xl sm:text-2xl">
              {currentPage + 1} / {totalPages}
            </div>
          </div>

          {/* Next button - Touch-friendly size */}
          <button
            onClick={onNext}
            disabled={isLastPage}
            className="w-full sm:w-auto min-w-[140px] px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed btn-3d text-lg sm:text-xl touch-manipulation"
          >
            Наступна →
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-full bg-gray-300 rounded-full h-4 shadow-inner overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Progress text */}
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Прогрес читання: {Math.round(((currentPage + 1) / totalPages) * 100)}%
            {currentPage === totalPages - 1 && ' 🎉'}
          </p>
        </div>
      </div>
    </div>
  );
}
