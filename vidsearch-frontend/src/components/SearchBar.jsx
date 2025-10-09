import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff, Search, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

function SearchBar({ onSearch, placeholder, disabled = false }) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSearch?.(text);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 search-bar-mobile">
      <div className="flex-1 relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-2xl border border-white/30 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 backdrop-blur px-5 py-4 pr-20 outline-none ring-0 focus:ring-2 focus:ring-accent-500/60 shadow-soft text-base transition-all",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        
        <div className="absolute inset-y-0 right-4 flex items-center gap-2">
          {isSupported && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              disabled={disabled}
              className={cn(
                "p-2 rounded-lg transition-all",
                isListening 
                  ? "text-red-500 bg-red-500/10 animate-pulse" 
                  : "text-muted-foreground hover:text-accent-500 hover:bg-accent-500/10",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          )}
          
          <kbd className="hidden sm:inline-block rounded-lg border border-white/20 px-2 py-1 text-xs opacity-70">
            Enter
          </kbd>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="gradient-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabled ? (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span className="hidden sm:inline">Searching</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Search className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Search</span>
          </div>
        )}
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SearchBar;



