import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Detect if the device is an iPad
 */
export function isIPad(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent;

  // Check for iPad in user agent
  if (/iPad/.test(userAgent)) return true;

  // iPadOS 13+ pretends to be macOS, so we need additional checks
  // Check for touch support + macOS user agent
  if (/Macintosh/.test(userAgent) && 'ontouchend' in document) {
    return true;
  }

  return false;
}

/**
 * Detect if the device is running iOS (iPhone or iPad)
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent;

  // Check for iOS devices
  if (/iPhone|iPad|iPod/.test(userAgent)) return true;

  // iPadOS 13+ check (macOS with touch)
  if (/Macintosh/.test(userAgent) && 'ontouchend' in document) {
    return true;
  }

  return false;
}

/**
 * Check if the app is running in fullscreen/standalone mode on iOS
 */
export function isIOSStandalone(): boolean {
  if (typeof window === 'undefined') return false;

  // Check if running as a standalone web app (added to home screen)
  return (window.navigator as any).standalone === true;
}
