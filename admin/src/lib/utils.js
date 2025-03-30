import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// This is a simplified version of the cn utility for a non-shadcn project
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Simple utility functions can go here
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
} 