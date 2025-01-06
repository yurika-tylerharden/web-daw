export const onRequestDelete = async ({ env }) => {
    try {
      const bucket = env.STEMS_BUCKET;
      const objects = await bucket.list();
  
      for (const object of objects) {
        await bucket.delete(object.key);
      }
  
      return new Response('R2 storage cleared', {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        status: 200,
      });
    } catch (error) {
      console.error('Error clearing R2 storage:', error);
      return new Response('Error clearing R2 storage', { status: 500 });
    }
  };