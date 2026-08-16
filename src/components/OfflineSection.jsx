import React, { useState, useEffect } from 'react';
import DEFAULT_FALLBACK_TRACK from '../data/lastPlayed.json';

const STORAGE_KEY = 'crt_last_played_spotify_track';

export default function OfflineSection() {
  const [spotifyData, setSpotifyData] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Storage access error fallback
    }
    return DEFAULT_FALLBACK_TRACK;
  });

  useEffect(() => {
    let isMounted = true;
    const DISCORD_USER = '1090675845145825402';

    const fetchSpotify = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER}`);
        const json = await res.json();
        if (isMounted && json && json.data) {
          if (json.data.spotify) {
            const currentTrack = {
              song: json.data.spotify.song,
              artist: json.data.spotify.artist,
              album: json.data.spotify.album,
              albumArt: json.data.spotify.album_art_url,
              trackUrl: `https://open.spotify.com/track/${json.data.spotify.track_id}`,
            };
            setSpotifyData({ isPlaying: true, ...currentTrack });
            setLastPlayed(currentTrack);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTrack));
            } catch (e) {}
          } else {
            const spotifyActivity = json.data.activities?.find((a) => a.name === 'Spotify');
            if (spotifyActivity) {
              let art = null;
              if (spotifyActivity.assets?.large_image) {
                art = `https://i.scdn.co/image/${spotifyActivity.assets.large_image.replace('spotify:', '')}`;
              }
              const currentTrack = {
                song: spotifyActivity.details || 'Live Stream',
                artist: spotifyActivity.state || 'Spotify',
                album: '',
                albumArt: art,
                trackUrl: '#',
              };
              setSpotifyData({ isPlaying: true, ...currentTrack });
              setLastPlayed(currentTrack);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTrack));
              } catch (e) {}
            } else {
              setSpotifyData({ isPlaying: false });
            }
          }
        }
      } catch (err) {
        if (isMounted) setSpotifyData({ isPlaying: false });
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 6000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const isPlaying = spotifyData?.isPlaying;
  const displayTrack = isPlaying ? spotifyData : (lastPlayed || DEFAULT_FALLBACK_TRACK);

  return (
    <section
      id="about"
      style={{
        width: '100%',
        padding: 'clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Section Header */}
      <div className="reveal-on-scroll" style={{ marginBottom: 'var(--space-xl, 2.618rem)' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-size-xs, 12px)',
            color: 'var(--color-warning-red)',
            letterSpacing: '0.1em',
            marginBottom: 'var(--space-xs, 0.382rem)',
          }}
        >
          OFFLINE
        </div>
        <h2
          className="font-display text-phosphor"
          style={{
            fontSize: 'var(--font-size-h2, clamp(2.2rem, 4.236vw, 4.236rem))',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          apart from tech
        </h2>
      </div>

      {/* Top Row: GYM and CRICKET (Horizontal 2-Column Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-lg, 1.618rem)',
        }}
      >
        {/* GYM */}
        <div
          className="reveal-on-scroll"
          style={{
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/gym.png`}
            alt="Rewati Raman Singh strength training in gym"
            loading="lazy"
            decoding="async"
            style={{
              height: '280px',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'contrast(110%) brightness(95%)',
              display: 'block',
            }}
          />

          <div style={{ padding: 'var(--space-md, 1rem)' }}>
            <h3
              className="font-display text-phosphor"
              style={{
                fontSize: 'var(--font-size-h3, 2.618rem)',
                fontWeight: 800,
                margin: 0,
              }}
            >
              GYM
            </h3>
          </div>
        </div>

        {/* CRICKET */}
        <div
          className="reveal-on-scroll"
          style={{
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/cric.png`}
            alt="Rewati Raman Singh playing cricket action shot"
            loading="lazy"
            decoding="async"
            style={{
              height: '280px',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'contrast(120%) brightness(90%)',
              display: 'block',
            }}
          />

          <div style={{ padding: 'var(--space-md, 1rem)' }}>
            <h3
              className="font-display text-phosphor"
              style={{
                fontSize: 'var(--font-size-h3, 2.618rem)',
                fontWeight: 800,
                margin: 0,
              }}
            >
              CRICKET
            </h3>
          </div>
        </div>
      </div>

      {/* Bottom Row: Full-Width Horizontal Rectangle for Spotify Activity */}
      <div
        className="reveal-on-scroll"
        style={{
          marginTop: 'var(--space-lg, 1.618rem)',
          backgroundColor: 'rgba(12, 14, 18, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '1.2rem 1.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', minWidth: '240px' }}>
          {/* Album Cover / CRT Icon */}
          <div
            style={{
              width: '54px',
              height: '54px',
              backgroundColor: '#111317',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '3px',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {displayTrack?.albumArt ? (
              <img
                src={displayTrack.albumArt}
                alt={displayTrack.song || 'Spotify Cover'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '20px', color: isPlaying ? '#00ff66' : '#ffb000' }}>
                ♫
              </span>
            )}
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: isPlaying ? '#00ff66' : '#ffb000',
                letterSpacing: '0.08em',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isPlaying ? '#00ff66' : '#ffb000',
                  boxShadow: isPlaying ? '0 0 6px #00ff66' : '0 0 4px #ffb000',
                }}
              />
              {isPlaying ? 'SPOTIFY // NOW PLAYING' : 'SPOTIFY // LAST PLAYED'}
            </div>

            <a
              href={displayTrack?.trackUrl && displayTrack.trackUrl !== '#' ? displayTrack.trackUrl : '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="font-display text-phosphor"
                style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.1, color: 'var(--color-phosphor-white)' }}
              >
                {displayTrack?.song || 'No Track Recorded'}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-signal-grey)', marginTop: '2px' }}>
                {displayTrack?.artist || 'Unknown Artist'} {displayTrack?.album ? `— ${displayTrack.album}` : ''}
              </div>
            </a>
          </div>
        </div>

        {/* Frequency Bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '22px' }}>
          {[16, 22, 10, 18, 24, 14, 20, 8].map((h, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: isPlaying ? `${h}px` : `${Math.max(4, Math.round(h * 0.4))}px`,
                backgroundColor: isPlaying ? '#00ff66' : 'rgba(255, 176, 0, 0.45)',
                transition: 'height 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

