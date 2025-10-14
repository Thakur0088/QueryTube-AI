import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Trash2, 
  History, 
  Shield, 
  Bell,
  Palette,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

const SettingsPage = ({ onBack }) => {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    const root = document.documentElement;
    if (newTheme) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all search history? This action cannot be undone.')) {
      localStorage.removeItem('searchHistory');
      // Show a success message or trigger a refresh
      alert('Search history cleared successfully!');
    }
  };

  const handleLogout = async () => {
    await logout();
    onBack();
  };

  const settingsSections = [
    {
      title: "Account",
      icon: <User className="h-5 w-5" />,
      items: [
        {
          label: "Email",
          value: user?.email || "Not signed in",
          type: "text"
        },
        {
          label: "Account Status",
          value: user ? "Active" : "Not signed in",
          type: "text"
        }
      ]
    },
    {
      title: "Appearance",
      icon: <Palette className="h-5 w-5" />,
      items: [
        {
          label: "Theme",
          value: isDark ? "Dark" : "Light",
          type: "toggle",
          action: handleThemeToggle
        }
      ]
    },
    {
      title: "Privacy & Data",
      icon: <Shield className="h-5 w-5" />,
      items: [
        {
          label: "Clear Search History",
          value: "Remove all saved searches",
          type: "action",
          action: handleClearHistory,
          destructive: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/50 border-b border-white/20 dark:border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-accent-500/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-accent-500" />
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-accent-500/10 flex items-center justify-center text-accent-500">
                  {section.icon}
                </div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-border/50 last:border-b-0">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.value}</div>
                    </div>

                    {item.type === 'toggle' && (
                      <button
                        onClick={item.action}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                          isDark ? "bg-accent-500" : "bg-muted"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                            isDark ? "translate-x-6" : "translate-x-1"
                          )}
                        />
                      </button>
                    )}

                    {item.type === 'action' && (
                      <button
                        onClick={item.action}
                        className={cn(
                          "px-4 py-2 rounded-lg font-medium transition-colors",
                          item.destructive
                            ? "text-destructive hover:bg-destructive/10"
                            : "text-accent-500 hover:bg-accent-500/10"
                        )}
                      >
                        {item.destructive ? (
                          <div className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4" />
                            Clear
                          </div>
                        ) : (
                          "Action"
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Logout Section */}
          <div className="glass-card p-6 border-destructive/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-destructive">Sign Out</h3>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

