/**
 * Lightweight validation utilities for common input validation needs.
 * Provides type-safe validators without external dependencies.
 */
const validators = {
  /**
   * Validates a URL string and optionally checks protocol.
   * @param value - URL string to validate
   * @param allowedProtocols - Array of allowed protocols (default: ['http:', 'https:'])
   * @returns true if valid URL with allowed protocol
   * @example
   * validators.url('https://example.com') // true
   * validators.url('javascript:alert(1)') // false
   * validators.url('ftp://example.com', ['ftp:', 'ftps:']) // true
   */
  url: (value: string, allowedProtocols: string[] = ["http:", "https:"]): boolean => {
    try {
      const url = new URL(value)
      return allowedProtocols.includes(url.protocol)
    } catch {
      return false
    }
  },

  /**
   * Validates an email address format.
   * Uses a simple regex pattern for basic validation.
   * @param value - Email string to validate
   * @returns true if valid email format
   * @example
   * validators.email('user@example.com') // true
   * validators.email('invalid-email') // false
   */
  email: (value: string): boolean => {
    if (typeof value !== "string") return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },

  /**
   * Validates a number with optional min/max bounds.
   * @param value - Value to validate as number
   * @param min - Optional minimum value (inclusive)
   * @param max - Optional maximum value (inclusive)
   * @returns true if valid number within bounds
   * @example
   * validators.number(5, 1, 10) // true
   * validators.number(15, 1, 10) // false
   * validators.number('5', 1, 10) // true (converts string)
   */
  number: (value: any, min?: number, max?: number): boolean => {
    const num = Number(value)
    if (isNaN(num)) return false
    if (min !== undefined && num < min) return false
    if (max !== undefined && num > max) return false
    return true
  },

  /**
   * Validates an integer with optional min/max bounds.
   * @param value - Value to validate as integer
   * @param min - Optional minimum value (inclusive)
   * @param max - Optional maximum value (inclusive)
   * @returns true if valid integer within bounds
   * @example
   * validators.integer(5, 1, 10) // true
   * validators.integer(5.5, 1, 10) // false
   */
  integer: (value: any, min?: number, max?: number): boolean => {
    const num = Number(value)
    if (isNaN(num) || !Number.isInteger(num)) return false
    if (min !== undefined && num < min) return false
    if (max !== undefined && num > max) return false
    return true
  },

  /**
   * Validates a string with optional length constraints.
   * @param value - Value to validate as string
   * @param minLength - Optional minimum length
   * @param maxLength - Optional maximum length
   * @returns true if valid string within length bounds
   * @example
   * validators.string('hello', 1, 10) // true
   * validators.string('', 1, 10) // false
   */
  string: (value: any, minLength?: number, maxLength?: number): boolean => {
    if (typeof value !== "string") return false
    if (minLength !== undefined && value.length < minLength) return false
    if (maxLength !== undefined && value.length > maxLength) return false
    return true
  },

  /**
   * Validates a string is not empty (after trimming).
   * @param value - String to validate
   * @returns true if string has content after trimming
   * @example
   * validators.notEmpty('hello') // true
   * validators.notEmpty('   ') // false
   */
  notEmpty: (value: string): boolean => {
    return typeof value === "string" && value.trim().length > 0
  },

  /**
   * Validates a value matches a regex pattern.
   * @param value - String to validate
   * @param pattern - Regex pattern to match
   * @returns true if value matches pattern
   * @example
   * validators.pattern('abc123', /^[a-z0-9]+$/) // true
   * validators.pattern('ABC', /^[a-z]+$/) // false
   */
  pattern: (value: string, pattern: RegExp): boolean => {
    if (typeof value !== "string") return false
    // Reset lastIndex to prevent stateful behavior with global/sticky flags
    pattern.lastIndex = 0
    return pattern.test(value)
  },

  /**
   * Validates a value is one of the allowed values.
   * @param value - Value to check
   * @param allowedValues - Array of allowed values
   * @returns true if value is in allowed list
   * @example
   * validators.oneOf('red', ['red', 'green', 'blue']) // true
   * validators.oneOf('yellow', ['red', 'green', 'blue']) // false
   */
  oneOf: <T>(value: T, allowedValues: T[]): boolean => {
    return allowedValues.includes(value)
  },

  /**
   * Validates an array with optional length constraints.
   * @param value - Value to validate as array
   * @param minLength - Optional minimum array length
   * @param maxLength - Optional maximum array length
   * @returns true if valid array within length bounds
   * @example
   * validators.array([1, 2, 3], 1, 5) // true
   * validators.array([], 1, 5) // false
   */
  array: (value: any, minLength?: number, maxLength?: number): boolean => {
    if (!Array.isArray(value)) return false
    if (minLength !== undefined && value.length < minLength) return false
    if (maxLength !== undefined && value.length > maxLength) return false
    return true
  },

  /**
   * Validates a value is a valid JSON string.
   * @param value - String to validate as JSON
   * @returns true if valid JSON string
   * @example
   * validators.json('{"key": "value"}') // true
   * validators.json('invalid{json') // false
   */
  json: (value: string): boolean => {
    if (typeof value !== "string") return false
    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  },

  /**
   * Validates a date string or Date object.
   * @param value - Date string or Date object to validate
   * @param minDate - Optional minimum date
   * @param maxDate - Optional maximum date
   * @returns true if valid date within bounds
   * @example
   * validators.date('2024-01-01') // true
   * validators.date('invalid-date') // false
   */
  date: (value: string | Date, minDate?: Date, maxDate?: Date): boolean => {
    const date = value instanceof Date ? value : new Date(value)
    if (isNaN(date.getTime())) return false
    if (minDate && date < minDate) return false
    if (maxDate && date > maxDate) return false
    return true
  },

  /**
   * Validates a hex color code.
   * @param value - Color string to validate
   * @returns true if valid hex color (3 or 6 digits)
   * @example
   * validators.hexColor('#fff') // true
   * validators.hexColor('#ffffff') // true
   * validators.hexColor('fff') // false
   */
  hexColor: (value: string): boolean => {
    return typeof value === "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
  },
}

export default validators
