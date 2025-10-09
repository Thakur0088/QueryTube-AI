import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { History, X, Clock, ChevronRight, Sparkles, Trash2, Search, Filter, TrendingUp } from 'lucide-react';
import { cn } from './lib/utils';
import './index.css';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import Pagination from './components/Pagination';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import AuthModal from './components/AuthModal';

function SearchPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const resultsPerPage = 8;

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  const handleSearch = async (searchQuery) => {
    const q = searchQuery?.trim();
    if (!q) return;
    
    setQuery(q);
    setLoading(true);
    setError('');
    setCurrentPage(1);
    
    try {
      const res = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: q,
          top_k: 10
        }),
      });
      
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setResults(data.results || []);
      
      // Add to search history
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const newHistory = [
        { query: q, timestamp: Date.now() },
        ...history.filter(item => item.query !== q)
      ].slice(0, 20);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      setSearchHistory(newHistory);
      
    } catch (e) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchFromHistory = (query) => {
    handleSearch(query);
  };

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getSearchCategory = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('how to') || lowerQuery.includes('tutorial') || lowerQuery.includes('learn')) {
      return { icon: <TrendingUp className="h-3 w-3" />, label: 'Learning', color: 'text-blue-500' };
    }
    if (lowerQuery.includes('what is') || lowerQuery.includes('explain') || lowerQuery.includes('definition')) {
      return { icon: <Search className="h-3 w-3" />, label: 'Information', color: 'text-green-500' };
    }
    if (lowerQuery.includes('best') || lowerQuery.includes('top') || lowerQuery.includes('review')) {
      return { icon: <Filter className="h-3 w-3" />, label: 'Recommendations', color: 'text-purple-500' };
    }
    return { icon: <Sparkles className="h-3 w-3" />, label: 'General', color: 'text-accent-500' };
  };

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return results.slice(startIndex, endIndex);
  }, [results, currentPage]);

  const totalPages = Math.ceil(results.length / resultsPerPage);

  const headerAccent = useMemo(() => (
    <span className="accent-gradient-text">QueryTube AI</span>
  ), []);

  if (!user) {
    return (
      <>
        <HomePage />
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="min-h-dvh text-zinc-900 dark:text-zinc-100">
      <Header 
        title={headerAccent} 
        isDark={isDark} 
        onToggle={() => setIsDark((v) => !v)}
        onHistoryToggle={() => setShowHistory((v) => !v)}
        onSettingsClick={() => setShowSettings(true)}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
            <div className="glass-card p-6">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Ask about science, health, or life…" 
                disabled={loading}
              />
            </div>

            <div className="glass-card p-2">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
            </div>

            {loading && (
              <div className="glass-card p-8 flex items-center justify-center">
                <div className="h-5 w-5 mr-3 rounded-full border-2 border-accent-500 border-t-transparent animate-spin" />
                <span className="tracking-wide">Searching the videoverse<span className="loading-dots"></span></span>
              </div>
            )}

            {error && (
              <div className="glass-card p-4 border-red-200 dark:border-red-900">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <>
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </h2>
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedResults.map((r) => (
                      <ResultCard key={r.video_id} result={r} />
                    ))}
                  </div>
                </section>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  disabled={loading}
                />
              </>
            )}

            {!loading && query && results.length === 0 && (
              <div className="glass-card p-8 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No videos found</h3>
                <p className="text-muted-foreground">
                  Try different search terms or check your spelling
                </p>
              </div>
            )}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-accent-500/5 to-cyan-500/5 border-t border-border/50 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-500 to-cyan-500 shadow-glow" />
                <div>
                  <h3 className="text-xl font-bold accent-gradient-text">QueryTube AI</h3>
                  <p className="text-sm text-muted-foreground">Intelligent Video Discovery</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Discover videos through intelligent semantic search powered by cutting-edge AI technology. 
                Find exactly what you're looking for with natural language understanding.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Real-time Search</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent-500 transition-colors text-sm">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent-500 transition-colors text-sm">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent-500 transition-colors text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent-500 transition-colors text-sm">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent-500 transition-colors text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent-500 transition-colors text-sm">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent-500 transition-colors text-sm">
                    Feature Requests
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent-500 transition-colors text-sm">
                    Bug Reports
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border/50 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>© 2024 QueryTube AI. All rights reserved.</span>
                <div className="flex items-center gap-2">
                <span>Built with passion and precision for the future of video discovery</span>

                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>All systems operational</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  v2.1.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* History Panel - ChatGPT Style */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowHistory(false)}
          />
          
          {/* History Panel */}
          <div className="w-1/2 bg-background border-l border-border/50 shadow-2xl">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-accent-500/5 to-cyan-500/5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent-500 to-cyan-500 flex items-center justify-center">
                    <History className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Search History</h2>
                    <p className="text-xs text-muted-foreground">AI-powered search insights</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {searchHistory && searchHistory.length > 0 && (
                    <button
                      onClick={() => {
                        localStorage.removeItem('searchHistory');
                        setSearchHistory([]);
                      }}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-destructive hover:text-destructive/80 transition-colors"
                      title="Clear all history"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-2 rounded-lg hover:bg-accent-500/10 transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {searchHistory && searchHistory.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {searchHistory.length} recent searches
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                        AI Enhanced
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {searchHistory.map((item, index) => {
                        const category = getSearchCategory(item.query);
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              handleSearchFromHistory(item.query);
                              setShowHistory(false);
                            }}
                            className="w-full flex items-start gap-3 p-4 rounded-xl hover:bg-accent-500/10 transition-all duration-200 group text-left border border-transparent hover:border-accent-500/20"
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              <div className={cn("h-6 w-6 rounded-lg flex items-center justify-center", category.color.replace('text-', 'bg-').replace('-500', '-500/10'))}>
                                {category.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-accent-500 transition-colors">
                                  {item.query}
                                </p>
                                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{formatTime(item.timestamp)}</span>
                                <span>•</span>
                                <span className={cn("font-medium", category.color)}>{category.label}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-500/10 to-cyan-500/10 flex items-center justify-center">
                      <History className="h-8 w-8 text-accent-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No search history yet</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Your AI-powered searches will appear here with intelligent categorization
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      <span>Enhanced with AI insights</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
