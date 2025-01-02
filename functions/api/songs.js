// functions/api/songs.js

import parseStems from '../../backend/utils/parseStems'; // or however your local logic is organized

export const onRequestGet = async ({ env }) => {
  try {
    // 1. Process stems first
    await processStems(env);

    // 2. Then fetch songs
    const { results } = await env.DB.prepare('SELECT * FROM songs').all();
    const songsWithStems = await Promise.all(
      results.map(async (song) => {
        const stems = await env.DB.prepare('SELECT * FROM stems WHERE song_id = ?')
          .bind(song.id)
          .all();
        return { ...song, stems: stems.results || [***REMOVED*** };
      })
    );
    return new Response(JSON.stringify(songsWithStems), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    return new Response('Error fetching songs', { status: 500 });
  }
};

/**
 * Helper function to process stems in the bucket and write data to DB.
 * If you prefer a separate route to do this, see `process-stems.js`.
 */
async function processStems(env) {
  const songs = await parseStems(env.STEMS_BUCKET);

  for (const song of songs) {
    const { name, bpm, key, stems } = song;
    if (!name || !bpm || !key) {
      console.error('Invalid song data:', song);
      continue;
    }

    // Check if the song already exists
    const existingSong = await env.DB.prepare(
      'SELECT * FROM songs WHERE name = ? AND bpm = ?'
    )
      .bind(name, bpm)
      .first();

    let songId;
    if (existingSong) {
      songId = existingSong.id;
    } else {
      // Insert new song
      const result = await env.DB.prepare(
        'INSERT INTO songs (name, bpm, key) VALUES (?, ?, ?)'
      )
        .bind(name, bpm, key)
        .run();
      songId = result.lastInsertRowid;
    }

    // Insert stems if they don't already exist
    for (const stem of stems) {
      const { stemName, filePath, stemGroup, assigned_to, volume } = stem;
      if (!stemName || !filePath || !stemGroup) {
        console.error('Invalid stem data:', stem);
        continue;
      }

      // Check if the stem already exists
      const existingStem = await env.DB.prepare(
        'SELECT * FROM stems WHERE song_id = ? AND stem_name = ?'
      )
        .bind(songId, stemName)
        .first();

      if (!existingStem) {
        await env.DB.prepare(
          'INSERT INTO stems (song_id, stem_name, file_path, stem_group, assigned_to, volume) VALUES (?, ?, ?, ?, ?, ?)'
        )
          .bind(songId, stemName, filePath, stemGroup, assigned_to, volume)
          .run();
      }
    }
  }
}