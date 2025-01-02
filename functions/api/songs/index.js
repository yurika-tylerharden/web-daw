// functions/api/songs/index.js

export const onRequestGet = async ({ env }) => {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM songs').all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (error) {
      console.error('Error fetching songs:', error);
      return new Response('Error fetching songs', { status: 500 });
    }
  };
  
  export const onRequestPost = async ({ env, request }) => {
    try {
      const body = await request.json();
      // e.g. { name, bpm, key }
      const result = await env.DB.prepare(`
        INSERT INTO songs (name, bpm, key)
        VALUES (?, ?, ?)
      `)
        .bind(body.name, body.bpm, body.key)
        .run();
  
      const newSongId = result.lastInsertRowid;
      return new Response(JSON.stringify({ id: newSongId }), {
        headers: { 'Content-Type': 'application/json' },
        status: 201,
      });
    } catch (error) {
      console.error('Error creating song:', error);
      return new Response('Error creating song', { status: 500 });
    }
  };