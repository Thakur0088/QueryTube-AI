import PropTypes from 'prop-types';
import { ExternalLink, Calendar, Play } from 'lucide-react';
import { cn } from '../lib/utils';

function ScoreChip({ score }) {
  const pct = Math.round(score * 100);
  const getScoreColor = (score) => {
    if (score >= 0.8) return 'from-green-500 to-emerald-500';
    if (score >= 0.6) return 'from-yellow-500 to-orange-500';
    if (score >= 0.4) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2 w-20 rounded-full bg-muted overflow-hidden">
        <div 
          className={cn("absolute inset-y-0 left-0 bg-gradient-to-r transition-all duration-500", getScoreColor(score))} 
          style={{ width: `${pct}%` }} 
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground min-w-[3rem]">{pct}%</span>
    </div>
  );
}

function ResultCard({ result }) {
  const { title, published_at, video_id, score } = result;
  const snippet = (result.snippet || result.transcript || "");
  const preview = typeof snippet === "string" ? snippet.slice(0, 200) : "";
  const url = `https://www.youtube.com/watch?v=${video_id}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  
  const publishedDate = new Date(published_at);
  const timeAgo = getTimeAgo(publishedDate);

  return (
    <article className="glass-card p-6 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group result-card-mobile">
      <div className="flex gap-4 md:flex-row flex-col">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 md:w-32 w-full">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full md:w-32 h-20 rounded-xl object-cover shadow-soft"
          />
          <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2 md:flex-row flex-col">
            <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-accent-500 transition-colors">
              {title}
            </h3>
            <ScoreChip score={score} />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="h-4 w-4" />
            <span>{timeAgo}</span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {preview}
            {snippet.length > 200 && (
              <span className="text-accent-500">...more</span>
            )}
          </p>

          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Watch on YouTube
          </a>
        </div>
      </div>
    </article>
  );
}

function getTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
}

ResultCard.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string,
    published_at: PropTypes.string,
    snippet: PropTypes.string,
    video_id: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default ResultCard;


