// functions/api/band/[id***REMOVED***.js

export const onRequestGet = async ({ env, params }) => {
    const { id } = params;
    try {
      const member = await env.DB.prepare(`
        SELECT * FROM band WHERE id = ?
      `).bind(id).first();
  
      if (!member) {
        return new Response('Member not found', { status: 404 });
      }
      return new Response(JSON.stringify(member), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching member:', error);
      return new Response('Error fetching member', { status: 500 });
    }
  };
  
  // You can decide if you want to use onRequestPatch or onRequestPut or both
  export const onRequestPatch = async ({ env, params, request }) => {
    const { id } = params;
    try {
      const body = await request.json();
      // e.g. body might contain { member_name, member_instrument }
  
      // Update only the fields provided
      if (!Object.keys(body).length) {
        return new Response('No fields to update', { status: 400 });
      }
  
      // Construct a dynamic query if you like, or just do it with known fields:
      await env.DB.prepare(`
        UPDATE band
        SET member_name = COALESCE(?, member_name),
            member_instrument = COALESCE(?, member_instrument)
        WHERE id = ?
      `).bind(body.member_name, body.member_instrument, id).run();
  
      return new Response('Band member updated');
    } catch (error) {
      console.error('Error updating member:', error);
      return new Response('Error updating member', { status: 500 });
    }
  };
  
  export const onRequestDelete = async ({ env, params }) => {
    const { id } = params;
    try {
      await env.DB.prepare('DELETE FROM band WHERE id = ?').bind(id).run();
      return new Response('Member deleted');
    } catch (error) {
      console.error('Error deleting member:', error);
      return new Response('Error deleting member', { status: 500 });
    }
  };