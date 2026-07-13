import { useCallback, useEffect, useState } from 'react';
import type { VaultEntry } from '../types';

const STORAGE_KEY = 'pv-vault-entries-v1';

function loadEntries(): VaultEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useVault() {
  const [entries, setEntries] = useState<VaultEntry[]>(loadEntries);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((label: string, username: string, password: string) => {
    const entry: VaultEntry = {
      id: crypto.randomUUID(),
      label,
      username,
      password,
      createdAt: Date.now(),
    };
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { entries, addEntry, deleteEntry };
}
