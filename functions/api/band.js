export const onRequestGet = async ({ env }) => {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM band').all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    } catch (error) {
      console.error('Error fetching band members:', error);
      return new Response('Error fetching band members', { status: 500 });
    }
  };