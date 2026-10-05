import { HttpError } from "@/lib/types/errors.type"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if object is an instance of Error
 */
export function isError(err: unknown): err is Error {
  return err instanceof Error
}

/**
 * Type guard to check if an error is an HttpError
 */
export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError
}

/**
 * Get status code from any error
 * Returns 500 if not an HttpError
 */
export function getStatusCode(error: unknown): number {
  if (isHttpError(error)) {
    return error.statusCode
  }
  return 500
}

/**
 * Get error message from any error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return "Unknown error"
}
