export const onRequestGet = async ({ env }) => {
    try {
      const list = await env.STEMS_BUCKET.list();
      const objects = list.objects.map((object) => ({
        key: object.key,
        size: object.size,
      }));
  
      return new Response(JSON.stringify(objects), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error('Error listing objects:', error);
      return new Response('Error listing objects', { status: 500 });
    }
  };