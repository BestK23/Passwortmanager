import { useState } from 'react';
import { LockScreen } from './components/LockScreen';
import { Generator } from './components/Generator';
import { Vault } from './components/Vault';
import { LockIcon } from './components/Icons';
import { useVault } from './hooks/useVault';
import './App.css';

type Tab = 'generator' | 'vault';

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<Tab>('generator');
  const { entries, addEntry, deleteEntry } = useVault();

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__title">Passwort-Tresor</div>
        <button className="app-header__lock" onClick={() => setUnlocked(false)} aria-label="Sperren">
          <LockIcon width={17} height={17} />
        </button>
      </header>

      <nav className="tabs">
        <button className={`tabs__tab ${tab === 'generator' ? 'tabs__tab--active' : ''}`} onClick={() => setTab('generator')}>
          Generator
        </button>
        <button className={`tabs__tab ${tab === 'vault' ? 'tabs__tab--active' : ''}`} onClick={() => setTab('vault')}>
          Tresor ({entries.length})
        </button>
      </nav>

      <main className="app__main">
        {tab === 'generator' ? (
          <Generator onSave={addEntry} />
        ) : (
          <Vault entries={entries} onDelete={deleteEntry} />
        )}
      </main>
    </div>
  );
}

export default App;
