// functions/api/songs/[id].js

export const onRequestGet = async ({ env, params }) => {
    const { id } = params;
    try {
      // fetch the song
      const song = await env.DB.prepare('SELECT * FROM songs WHERE id = ?')
        .bind(id)
        .first();
  
      if (!song) {
        return new Response('Song not found', { status: 404 });
      }
  
      // fetch stems if you want to embed them
      const stemsData = await env.DB.prepare('SELECT * FROM stems WHERE song_id = ?')
        .bind(id)
        .all();
  
      return new Response(JSON.stringify({ ...song, stems: stemsData.results }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching song:', error);
      return new Response('Error fetching song', { status: 500 });
    }
  };
  
  export const onRequestPut = async ({ env, params, request }) => {
    const { id } = params;
    try {
      const body = await request.json();
      // e.g. { name, bpm, key }
  
      await env.DB.prepare(`
        UPDATE songs
        SET name = COALESCE(?, name),
            bpm = COALESCE(?, bpm),
            key = COALESCE(?, key)
        WHERE id = ?
      `).bind(body.name, body.bpm, body.key, id).run();
  
      return new Response('Song updated');
    } catch (error) {
      console.error('Error updating song:', error);
      return new Response('Error updating song', { status: 500 });
    }
  };
  
  export const onRequestDelete = async ({ env, params }) => {
    const { id } = params;
    try {
      // you may also want to remove stems from DB
      await env.DB.prepare('DELETE FROM stems WHERE song_id = ?').bind(id).run();
      await env.DB.prepare('DELETE FROM songs WHERE id = ?').bind(id).run();
  
      return new Response('Song deleted');
    } catch (error) {
      console.error('Error deleting song:', error);
      return new Response('Error deleting song', { status: 500 });
    }
  };