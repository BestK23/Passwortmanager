import { useCallback, useEffect, useState } from 'react';

const CREDENTIAL_ID_KEY = 'pv-webauthn-credential-id';
const RP_NAME = 'Passwort-Tresor';

function bufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlToBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const str = atob(padded);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes.buffer;
}

export type LockStatus = 'checking' | 'unsupported' | 'needs-setup' | 'locked' | 'unlocked' | 'error';

export function useFaceIdLock() {
  const [status, setStatus] = useState<LockStatus>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supported =
    typeof window !== 'undefined' &&
    !!window.PublicKeyCredential &&
    typeof navigator.credentials?.create === 'function';

  useEffect(() => {
    if (!supported) {
      setStatus('unsupported');
      return;
    }
    const existing = localStorage.getItem(CREDENTIAL_ID_KEY);
    setStatus(existing ? 'locked' : 'needs-setup');
  }, [supported]);

  const setup = useCallback(async () => {
    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const userId = crypto.getRandomValues(new Uint8Array(16));

      const credential = (await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: RP_NAME },
          user: {
            id: userId,
            name: 'tresor-nutzer',
            displayName: 'Tresor-Nutzer',
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },
            { type: 'public-key', alg: -257 },
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
            residentKey: 'preferred',
          },
          timeout: 60000,
          attestation: 'none',
        },
      })) as PublicKeyCredential | null;

      if (!credential) throw new Error('Keine Anmeldedaten erhalten');

      localStorage.setItem(CREDENTIAL_ID_KEY, bufferToBase64url(credential.rawId));
      setStatus('unlocked');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Einrichtung fehlgeschlagen');
      setStatus('error');
    }
  }, []);

  const unlock = useCallback(async () => {
    const credentialId = localStorage.getItem(CREDENTIAL_ID_KEY);
    if (!credentialId) {
      setStatus('needs-setup');
      return;
    }
    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [
            {
              id: base64urlToBuffer(credentialId),
              type: 'public-key',
              transports: ['internal'],
            },
          ],
          userVerification: 'required',
          timeout: 60000,
        },
      });

      if (!assertion) throw new Error('Face ID wurde nicht bestätigt');
      setErrorMessage(null);
      setStatus('unlocked');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Face ID fehlgeschlagen');
      setStatus('locked');
    }
  }, []);

  const lock = useCallback(() => {
    setStatus('locked');
  }, []);

  const resetSetup = useCallback(() => {
    localStorage.removeItem(CREDENTIAL_ID_KEY);
    setStatus('needs-setup');
  }, []);

  return { status, errorMessage, supported, setup, unlock, lock, resetSetup };
}
