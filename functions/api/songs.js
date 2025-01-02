// functions/api/songs.js

import parseStems from '../../utils/parseStems'; // or however your local logic is organized

export const onRequestGet = async ({ env }) => {
  try {
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