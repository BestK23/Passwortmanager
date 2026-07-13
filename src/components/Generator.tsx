import { useEffect, useState } from 'react';
import type { GeneratorOptions } from '../types';
import { generatePassword, passwordStrength } from '../lib/generatePassword';
import { CheckIcon, CopyIcon, RefreshIcon } from './Icons';
import { Switch } from './Switch';

interface GeneratorProps {
  onSave: (label: string, username: string, password: string) => void;
}

const DEFAULT_OPTIONS: GeneratorOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
};

export function Generator({ onSave }: GeneratorProps) {
  const [options, setOptions] = useState<GeneratorOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [label, setLabel] = useState('');
  const [username, setUsername] = useState('');

  const regenerate = () => setPassword(generatePassword(options));

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const strength = passwordStrength(password);
  const noCharsetSelected =
    !options.uppercase && !options.lowercase && !options.numbers && !options.symbols;

  const copy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggle = (key: keyof GeneratorOptions) =>
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="generator">
      <div className="generator__output">
        <span className="generator__password">{password || 'Zeichensatz wählen'}</span>
        <button className="generator__copy" onClick={copy} disabled={!password} aria-label="Kopieren">
          {copied ? <CheckIcon width={18} height={18} /> : <CopyIcon width={18} height={18} />}
        </button>
      </div>

      {password && (
        <div className={`strength strength--${strength.score}`}>
          <div className="strength__bar">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`strength__segment ${i < strength.score ? 'strength__segment--filled' : ''}`} />
            ))}
          </div>
          <span>{strength.label}</span>
        </div>
      )}

      <div className="generator__row">
        <label htmlFor="length">Länge</label>
        <span>{options.length}</span>
      </div>
      <input
        id="length"
        type="range"
        min={8}
        max={64}
        value={options.length}
        onChange={(e) => setOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
      />

      <div className="generator__toggles">
        <Switch label="Großbuchstaben (A-Z)" checked={options.uppercase} onChange={() => toggle('uppercase')} />
        <Switch label="Kleinbuchstaben (a-z)" checked={options.lowercase} onChange={() => toggle('lowercase')} />
        <Switch label="Zahlen (0-9)" checked={options.numbers} onChange={() => toggle('numbers')} />
        <Switch label="Symbole (!@#$...)" checked={options.symbols} onChange={() => toggle('symbols')} />
        <Switch
          label="Verwechselbare Zeichen ausschließen"
          checked={options.excludeAmbiguous}
          onChange={() => toggle('excludeAmbiguous')}
        />
      </div>

      {noCharsetSelected && <p className="generator__warning">Wähle mindestens einen Zeichensatz.</p>}

      <button className="btn btn--secondary" onClick={regenerate} disabled={noCharsetSelected}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <RefreshIcon width={17} height={17} /> Neu generieren
        </span>
      </button>

      {!showSaveForm ? (
        <button
          className="btn btn--primary"
          disabled={!password}
          onClick={() => setShowSaveForm(true)}
        >
          Im Tresor speichern
        </button>
      ) : (
        <div className="generator__save-form">
          <input
            className="lock-screen__input"
            placeholder="Bezeichnung (z.B. Instagram)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <input
            className="lock-screen__input"
            placeholder="Benutzername / E-Mail (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="generator__save-actions">
            <button
              className="btn btn--secondary"
              onClick={() => {
                setShowSaveForm(false);
                setLabel('');
                setUsername('');
              }}
            >
              Abbrechen
            </button>
            <button
              className="btn btn--primary"
              disabled={!label.trim()}
              onClick={() => {
                onSave(label.trim(), username.trim(), password);
                setShowSaveForm(false);
                setLabel('');
                setUsername('');
              }}
            >
              Speichern
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
