import { useCallback, useEffect, useState } from 'react';

const PASSCODE_HASH_KEY = 'pv-passcode-hash';

async function hashPasscode(code: string): Promise<string> {
  const data = new TextEncoder().encode(code);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export type PasscodeStatus = 'checking' | 'needs-setup' | 'locked' | 'unlocked';

export function usePasscodeLock() {
  const [status, setStatus] = useState<PasscodeStatus>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const existing = localStorage.getItem(PASSCODE_HASH_KEY);
    setStatus(existing ? 'locked' : 'needs-setup');
  }, []);

  const setup = useCallback(async (code: string) => {
    const hash = await hashPasscode(code);
    localStorage.setItem(PASSCODE_HASH_KEY, hash);
    setStatus('unlocked');
  }, []);

  const unlock = useCallback(async (code: string) => {
    const stored = localStorage.getItem(PASSCODE_HASH_KEY);
    const hash = await hashPasscode(code);
    if (hash === stored) {
      setErrorMessage(null);
      setStatus('unlocked');
    } else {
      setErrorMessage('Falscher Code');
    }
  }, []);

  const lock = useCallback(() => {
    setStatus('locked');
  }, []);

  return { status, errorMessage, setup, unlock, lock };
}
