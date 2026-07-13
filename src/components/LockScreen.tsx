import { useState } from 'react';
import { useFaceIdLock } from '../hooks/useFaceIdLock';
import { usePasscodeLock } from '../hooks/usePasscodeLock';

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const faceId = useFaceIdLock();
  const passcode = usePasscodeLock();
  const [code, setCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');

  const usingFaceId = faceId.supported;

  if (usingFaceId && faceId.status === 'unlocked') {
    onUnlock();
    return null;
  }
  if (!usingFaceId && passcode.status === 'unlocked') {
    onUnlock();
    return null;
  }

  if (usingFaceId) {
    if (faceId.status === 'needs-setup') {
      return (
        <div className="lock-screen">
          <div className="lock-screen__icon">🔒</div>
          <h1>Passwort-Tresor</h1>
          <p>Sichere deinen Tresor mit Face ID.</p>
          <button className="btn btn--primary" onClick={faceId.setup}>
            Face ID einrichten
          </button>
          {faceId.errorMessage && <p className="lock-screen__error">{faceId.errorMessage}</p>}
        </div>
      );
    }

    return (
      <div className="lock-screen">
        <div className="lock-screen__icon">🔒</div>
        <h1>Passwort-Tresor</h1>
        <p>Entsperre mit Face ID, um fortzufahren.</p>
        <button className="btn btn--primary" onClick={faceId.unlock}>
          Mit Face ID entsperren
        </button>
        {faceId.errorMessage && <p className="lock-screen__error">{faceId.errorMessage}</p>}
      </div>
    );
  }

  if (passcode.status === 'needs-setup') {
    return (
      <div className="lock-screen">
        <div className="lock-screen__icon">🔒</div>
        <h1>Passwort-Tresor</h1>
        <p>Face ID ist auf diesem Gerät/Browser nicht verfügbar. Lege stattdessen einen Code fest.</p>
        <input
          className="lock-screen__input"
          type="password"
          inputMode="numeric"
          placeholder="Neuer Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          className="lock-screen__input"
          type="password"
          inputMode="numeric"
          placeholder="Code bestätigen"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
        />
        <button
          className="btn btn--primary"
          disabled={code.length < 4 || code !== confirmCode}
          onClick={() => passcode.setup(code)}
        >
          Code festlegen
        </button>
      </div>
    );
  }

  return (
    <div className="lock-screen">
      <div className="lock-screen__icon">🔒</div>
      <h1>Passwort-Tresor</h1>
      <p>Code eingeben, um fortzufahren.</p>
      <input
        className="lock-screen__input"
        type="password"
        inputMode="numeric"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') passcode.unlock(code);
        }}
      />
      <button className="btn btn--primary" onClick={() => passcode.unlock(code)}>
        Entsperren
      </button>
      {passcode.errorMessage && <p className="lock-screen__error">{passcode.errorMessage}</p>}
    </div>
  );
}
