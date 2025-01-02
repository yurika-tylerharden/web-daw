// functions/api/band/index.js

export const onRequestGet = async ({ env }) => {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM band').all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (error) {
      console.error('Error fetching band members:', error);
      return new Response('Error fetching band members', { status: 500 });
    }
  };
  
  export const onRequestPost = async ({ env, request }) => {
    try {
      const body = await request.json();
      // Expect body: { member_name, member_instrument }
  
      const result = await env.DB.prepare(`
        INSERT INTO band (member_name, member_instrument)
        VALUES (?, ?)
      `)
        .bind(body.member_name, body.member_instrument)
        .run();
  
      const memberId = result.lastInsertRowid;
      return new Response(JSON.stringify({ id: memberId }), {
        headers: { 'Content-Type': 'application/json' },
        status: 201,
      });
    } catch (error) {
      console.error('Error adding band member:', error);
      return new Response('Error adding band member', { status: 500 });
    }
  };