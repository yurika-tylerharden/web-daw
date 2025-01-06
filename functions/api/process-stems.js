import parseStems from '../../backend/utils/parseStems'; // or however your local logic is organized

export const onRequestGet = async ({ env }) => {
  try {
    const songs = await parseStems(env.STEMS_BUCKET);

    for (const song of songs) {
      const { name, bpm, key, stems } = song;

      if (!name || !bpm || !key) {
        console.error('Invalid song data:', song);
        continue;
      }

      const existingSong = await env.DB.prepare('SELECT * FROM songs WHERE name = ? AND bpm = ?')
        .bind(name, bpm)
        .first();

      let songId;
      if (existingSong) {
        songId = existingSong.id;
      } else {
        const result = await env.DB.prepare('INSERT INTO songs (name, bpm, key) VALUES (?, ?, ?)')
          .bind(name, bpm, key)
          .run();
        songId = result.lastInsertRowid;
      }

      for (const stem of stems) {
        const { stemName, filePath, stemGroup, assigned_to, volume } = stem;

        if (!stemName || !filePath || !stemGroup || assigned_to === undefined || volume === undefined) {
          console.error('Invalid stem data:', stem);
          continue;
        }

        const existingStem = await env.DB.prepare('SELECT * FROM stems WHERE song_id = ? AND stem_name = ?')
          .bind(songId, stemName)
          .first();

        if (!existingStem) {
          await env.DB.prepare('INSERT INTO stems (song_id, stem_name, file_path, stem_group, assigned_to, volume) VALUES (?, ?, ?, ?, ?, ?)')
            .bind(songId, stemName, filePath, stemGroup, assigned_to, volume)
            .run();
        }
      }
    }

    return new Response(JSON.stringify({ message: 'Stems processed and added to the database successfully' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error processing stems:', error);
    return new Response('Error processing stems', { status: 500 });
  }
};