import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../src/data/lastPlayed.json');
const DISCORD_USER = '1090675845145825402';

async function syncSpotify() {
  console.log(`Connecting to Lanyard for Discord user ${DISCORD_USER}...`);
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER}`);
    if (!res.ok) {
      throw new Error(`Lanyard API returned status ${res.status}`);
    }

    const json = await res.json();
    if (!json.success || !json.data) {
      throw new Error('Invalid response structure from Lanyard API');
    }

    let track = null;

    if (json.data.spotify) {
      track = {
        song: json.data.spotify.song,
        artist: json.data.spotify.artist,
        album: json.data.spotify.album || '',
        albumArt: json.data.spotify.album_art_url || '',
        trackUrl: json.data.spotify.track_id
          ? `https://open.spotify.com/track/${json.data.spotify.track_id}`
          : '#',
      };
    } else {
      const spotifyActivity = json.data.activities?.find((a) => a.name === 'Spotify');
      if (spotifyActivity) {
        let art = '';
        if (spotifyActivity.assets?.large_image) {
          art = `https://i.scdn.co/image/${spotifyActivity.assets.large_image.replace('spotify:', '')}`;
        }
        track = {
          song: spotifyActivity.details || 'Live Stream',
          artist: spotifyActivity.state || 'Spotify',
          album: '',
          albumArt: art,
          trackUrl: '#',
        };
      }
    }

    if (track && track.song) {
      let currentContent = '';
      try {
        currentContent = fs.readFileSync(DATA_FILE, 'utf-8');
      } catch (_) {}

      const newContent = JSON.stringify(track, null, 2) + '\n';
      if (currentContent.trim() === newContent.trim()) {
        console.log(`✨ Track is already up-to-date: "${track.song}" by ${track.artist}`);
      } else {
        fs.writeFileSync(DATA_FILE, newContent, 'utf-8');
        console.log('✅ Successfully updated lastPlayed.json:');
        console.log(`   🎵 Track:  ${track.song}`);
        console.log(`   👤 Artist: ${track.artist}`);
        if (track.album) console.log(`   💿 Album:  ${track.album}`);
        if (track.trackUrl) console.log(`   🔗 URL:    ${track.trackUrl}`);
      }
    } else {
      console.log('ℹ️  No active Spotify session detected on Discord.');
      console.log('   Make sure Discord desktop/mobile is running with Spotify playing.');
      console.log('   Keeping existing fallback in src/data/lastPlayed.json unchanged.');
    }
  } catch (err) {
    console.warn('⚠️  Warning during Spotify sync:', err.message);
    if (!process.env.CI) {
      process.exitCode = 1;
    }
  }
}

syncSpotify();
