import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge and combine CSS class names using clsx and tailwind-merge.
 * @param {...ClassValue} inputs - Array of class names, objects, or conditional classes to merge.
 * @returns {string} - Combined and optimized class string.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
