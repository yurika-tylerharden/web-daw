// functions/api/songs/index.js
export const onRequestGet = async ({ env }) => {
    try {
      // 1. Fetch all songs from DB
      const { results } = await env.DB.prepare('SELECT * FROM songs').all();
  
      // 2. For each song, fetch its stems from the 'stems' table
      const songsWithStems = await Promise.all(
        results.map(async (song) => {
          // stems => SELECT * FROM stems WHERE song_id = ?
          const stemsData = await env.DB.prepare('SELECT * FROM stems WHERE song_id = ?')
            .bind(song.id)
            .all();
  
          // Include stems array in the returned song object
          return {
            ...song,
            stems: stemsData.results || [],
          };
        })
      );
  
      return new Response(JSON.stringify(songsWithStems), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (error) {
      console.error('Error fetching songs:', error);
      return new Response('Error fetching songs', { status: 500 });
    }
  };
  
  // optional: onRequestPost, etc. for creating songs