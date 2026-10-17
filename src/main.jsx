import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const tracks = [
  {
    id: 1,
    title: 'Midnight Echo',
    artist: 'Nova Bloom',
    album: 'Afterglow',
    duration: 204,
    cover: 'linear-gradient(135deg, #1db954 0%, #0f172a 100%)',
    accent: '#1db954',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Golden Skyline',
    artist: 'Luna Harbor',
    album: 'Atlas',
    duration: 231,
    cover: 'linear-gradient(135deg, #f59e0b 0%, #7c2d12 100%)',
    accent: '#f59e0b',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Soft Static',
    artist: 'Cora Lane',
    album: 'Night Signals',
    duration: 188,
    cover: 'linear-gradient(135deg, #8b5cf6 0%, #312e81 100%)',
    accent: '#8b5cf6',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 4,
    title: 'Velvet Motion',
    artist: 'The Mellow Keys',
    album: 'Blue Hour',
    duration: 242,
    cover: 'linear-gradient(135deg, #22d3ee 0%, #164e63 100%)',
    accent: '#22d3ee',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 5,
    title: 'Coastline Dreams',
    artist: 'Sierra Vale',
    album: 'After Hours',
    duration: 214,
    cover: 'linear-gradient(135deg, #fb7185 0%, #7f1d1d 100%)',
    accent: '#fb7185',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: 6,
    title: 'Neon Avenue',
    artist: 'Volt Theory',
    album: 'City Lights',
    duration: 266,
    cover: 'linear-gradient(135deg, #38bdf8 0%, #0f172a 100%)',
    accent: '#38bdf8',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
];

const playlistCards = [
  { title: 'Daily Mix 1', subtitle: 'Nova Bloom, Luna Harbor, Cora Lane', color: 'sunset' },
  { title: 'Chill Vibes', subtitle: 'Low-key beats and late-night grooves', color: 'violet' },
  { title: 'Feel Good', subtitle: 'The brightest tracks from the week', color: 'green' },
];

const sidebarLinks = ['Home', 'Search', 'Your Library', 'Create Playlist', 'Liked Songs'];
const miniPlaylist = ['This Is Radiohead', 'Fresh Finds', 'Night Drive', 'Lo-fi Morning'];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

function App() {
  const [search, setSearch] = useState('');
  const [selectedTrackId, setSelectedTrackId] = useState(tracks[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.72);
  const audioRef = useRef(null);

  const filteredTracks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tracks;

    return tracks.filter((track) => {
      return (
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.album.toLowerCase().includes(query)
      );
    });
  }, [search]);

  const selectedTrack = useMemo(
    () => tracks.find((track) => track.id === selectedTrackId) ?? tracks[0],
    [selectedTrackId]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTrack = selectedTrack.audioUrl;
    if (audio.src !== nextTrack) {
      audio.src = nextTrack;
      audio.load();
    }

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [selectedTrack, isPlaying]);

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const handleTrackClick = (track) => {
    setSelectedTrackId(track.id);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = nextTime;
    }
    setCurrentTime(nextTime);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">♪</div>
          <span>Spotify</span>
        </div>

        <nav className="nav-links">
          {sidebarLinks.map((link, index) => (
            <button key={link} className={`nav-item ${index === 0 ? 'active' : ''}`}>
              {link}
            </button>
          ))}
        </nav>

        <div className="divider" />

        <div className="section-heading">Playlists</div>
        <div className="mini-list">
          {miniPlaylist.map((item) => (
            <button key={item} className="mini-item">
              {item}
            </button>
          ))}
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="nav-arrows">
            <button aria-label="Back">←</button>
            <button aria-label="Forward">→</button>
          </div>

          <div className="topbar-actions">
            <button className="ghost-button">Premium</button>
            <button className="ghost-button">Support</button>
            <button className="ghost-button">Download</button>
            <div className="user-pill">SJ</div>
          </div>
        </header>

        <section className="hero-card">
          <div className="hero-art" style={{ background: selectedTrack.cover }} />
          <div className="hero-copy">
            <span className="eyebrow">Featured playlist</span>
            <h1>Morning Energy</h1>
            <p>
              A hand-picked mix of warm synths, pop hooks, and upbeat rhythms to get your day moving.
            </p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={handleTogglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button className="secondary-button">Follow</button>
            </div>
          </div>
        </section>

        <section className="content-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Browse</span>
              <h2>Made for you</h2>
            </div>
            <input
              className="search-box"
              type="text"
              value={search}
              placeholder="Search songs, artists or albums"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="playlist-grid">
            {playlistCards.map((playlist) => (
              <div key={playlist.title} className={`playlist-card ${playlist.color}`}>
                <div className="playlist-badge">Playlist</div>
                <h3>{playlist.title}</h3>
                <p>{playlist.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="tracks-section">
            <div className="tracks-header">
              <div>
                <span className="eyebrow">Popular</span>
                <h2>Trending now</h2>
              </div>
            </div>

            <div className="track-list">
              {filteredTracks.map((track, index) => (
                <button
                  key={track.id}
                  className={`track-row ${track.id === selectedTrackId ? 'active' : ''}`}
                  onClick={() => handleTrackClick(track)}
                >
                  <div className="track-index">{index + 1}</div>
                  <div className="track-art" style={{ background: track.cover }} />
                  <div className="track-meta">
                    <span className="track-title">{track.title}</span>
                    <span className="track-artist">{track.artist}</span>
                  </div>
                  <div className="track-album">{track.album}</div>
                  <div className="track-duration">{formatTime(track.duration)}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="now-playing-bar">
        <div className="current-track">
          <div className="mini-cover" style={{ background: selectedTrack.cover }} />
          <div className="mini-copy">
            <span>{selectedTrack.title}</span>
            <small>{selectedTrack.artist}</small>
          </div>
        </div>

        <div className="player-controls">
          <div className="control-buttons">
            <button aria-label="Previous">⏮</button>
            <button className="play-toggle" aria-label="Play or pause" onClick={handleTogglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button aria-label="Next">⏭</button>
          </div>

          <div className="progress-wrap">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || selectedTrack.duration}
              value={currentTime}
              onChange={handleSeek}
            />
            <span>{formatTime(duration || selectedTrack.duration)}</span>
          </div>
        </div>

        <div className="volume-control">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || selectedTrack.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
