import { useState } from 'react';
import { Search, Mic, Sparkles, ArrowRight, Play, Users, Zap } from 'lucide-react';
import AuthModal from './AuthModal';

const HomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Semantic Search",
      description: "Find videos by meaning, not just keywords"
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Voice Search",
      description: "Search hands-free with voice commands"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered",
      description: "Advanced AI understands context and intent"
    }
  ];

  const stats = [
    { number: "10M+", label: "Videos Indexed" },
    { number: "99.9%", label: "Uptime" },
    { number: "50ms", label: "Avg Response" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="h-20 w-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-accent-500 to-cyan-500 shadow-glow animate-pulse-glow" />
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="accent-gradient-text">QueryTube</span>
              <span className="text-foreground"> AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover videos through intelligent semantic search powered by cutting-edge AI
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => {
                setAuthMode('signin');
                setShowAuthModal(true);
              }}
              className="gradient-button text-lg px-8 py-4"
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setShowAuthModal(true);
              }}
              className="px-8 py-4 text-lg font-semibold rounded-xl border border-accent-500/30 text-accent-500 hover:bg-accent-500/10 transition-all"
            >
              Create Account
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6 text-center group hover:shadow-soft-lg transition-all">
                <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent-500/20 to-cyan-500/20 flex items-center justify-center text-accent-500 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500/5 to-cyan-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">See It In Action</h2>
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Play className="h-8 w-8 text-accent-500" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">"How to learn machine learning"</h3>
                <p className="text-sm text-muted-foreground">Returns relevant educational content, tutorials, and courses</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <Mic className="h-8 w-8 text-accent-500" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Voice: "Show me cooking videos"</h3>
                <p className="text-sm text-muted-foreground">Hands-free search with natural language processing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Zap className="h-8 w-8 text-accent-500" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">"Best productivity tips"</h3>
                <p className="text-sm text-muted-foreground">Finds videos about efficiency, time management, and workflow optimization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <div className="flex items-center justify-center gap-2">
          <Users className="h-4 w-4" />
         <span>Built with passion and precision for the future of video discovery</span>

        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode}
      />
    </div>
  );
};

export default HomePage;

