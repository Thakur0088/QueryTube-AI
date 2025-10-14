import PropTypes from 'prop-types';
import { Sun, Moon, History } from 'lucide-react';
import UserProfile from './UserProfile';
import { useAuth } from '../contexts/AuthContext';

function Header({ title, isDark, onToggle, onHistoryToggle, onSettingsClick }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/50 border-b border-white/20 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onHistoryToggle}
              className="p-2 rounded-xl hover:bg-accent-500/10 transition-colors"
              title="Search History"
            >
              <History className="h-5 w-5 text-foreground" />
            </button>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent-500 to-cyan-500 shadow-soft" />
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display">{title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle dark mode"
              onClick={onToggle}
              className="relative inline-flex h-10 w-18 items-center rounded-full px-1 transition-colors duration-300 focus:outline-none border border-white/20 dark:border-white/10 hover:bg-accent-500/10"
            >
              <span className={`inline-block h-8 w-8 transform rounded-full bg-gradient-to-r from-accent-500 to-cyan-500 transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-8' : ''}`}>
                {isDark ? <Moon className="h-4 w-4 text-white" /> : <Sun className="h-4 w-4 text-white" />}
              </span>
            </button>
            
            {user && <UserProfile onSettingsClick={onSettingsClick} />}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.node.isRequired,
  isDark: PropTypes.bool,
  onToggle: PropTypes.func,
  onHistoryToggle: PropTypes.func,
  onSettingsClick: PropTypes.func,
};

export default Header;



