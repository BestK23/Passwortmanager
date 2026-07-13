import { useState } from 'react';
import type { VaultEntry } from '../types';
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon, TrashIcon } from './Icons';

interface VaultProps {
  entries: VaultEntry[];
  onDelete: (id: string) => void;
}

function VaultRow({ entry, onDelete }: { entry: VaultEntry; onDelete: (id: string) => void }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(entry.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="vault-row">
      <div className="vault-row__info">
        <div className="vault-row__label">{entry.label}</div>
        {entry.username && <div className="vault-row__username">{entry.username}</div>}
        <div className="vault-row__password">
          {revealed ? entry.password : '•'.repeat(Math.min(entry.password.length, 20))}
        </div>
      </div>
      <div className="vault-row__actions">
        <button onClick={() => setRevealed((r) => !r)} aria-label="Anzeigen">
          {revealed ? <EyeOffIcon width={19} height={19} /> : <EyeIcon width={19} height={19} />}
        </button>
        <button onClick={copy} aria-label="Kopieren">
          {copied ? <CheckIcon width={19} height={19} /> : <CopyIcon width={19} height={19} />}
        </button>
        <button
          className="danger"
          onClick={() => {
            if (confirm(`"${entry.label}" wirklich löschen?`)) onDelete(entry.id);
          }}
          aria-label="Löschen"
        >
          <TrashIcon width={19} height={19} />
        </button>
      </div>
    </div>
  );
}

export function Vault({ entries, onDelete }: VaultProps) {
  if (entries.length === 0) {
    return <div className="vault__empty">Noch keine gespeicherten Passwörter.</div>;
  }

  return (
    <div className="vault">
      {entries.map((entry) => (
        <VaultRow key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
}
