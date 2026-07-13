import type { GeneratorOptions } from '../types';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = /[Il1O0o]/;

export function generatePassword(options: GeneratorOptions): string {
  let pool = '';
  if (options.lowercase) pool += LOWERCASE;
  if (options.uppercase) pool += UPPERCASE;
  if (options.numbers) pool += NUMBERS;
  if (options.symbols) pool += SYMBOLS;

  if (options.excludeAmbiguous) {
    pool = pool
      .split('')
      .filter((c) => !AMBIGUOUS.test(c))
      .join('');
  }

  if (pool.length === 0) return '';

  const values = new Uint32Array(options.length);
  crypto.getRandomValues(values);

  let result = '';
  for (let i = 0; i < options.length; i++) {
    result += pool[values[i] % pool.length];
  }
  return result;
}

export function passwordStrength(password: string): { score: 0 | 1 | 2 | 3 | 4; label: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 14) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

  const labels = ['Sehr schwach', 'Schwach', 'Okay', 'Stark', 'Sehr stark'];
  return { score: score as 0 | 1 | 2 | 3 | 4, label: labels[score] };
}
