import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const UserProfile = ({ onSettingsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const handleSettings = () => {
    onSettingsClick?.();
    setIsOpen(false);
  };

  const userInitials = user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-xl hover:bg-accent-500/10 transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
          {userInitials}
        </div>
        <span className="hidden sm:block text-sm font-medium text-foreground max-w-32 truncate">
          {user?.email}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 glass-card p-2 z-20 animate-scale-in">
            <div className="px-3 py-2 border-b border-border/50">
              <p className="text-sm font-medium text-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Signed in</p>
            </div>
            
            <div className="py-1">
              <button 
                onClick={handleSettings}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent-500/10 rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              
              <div className="h-px bg-border/50 my-1" />
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
