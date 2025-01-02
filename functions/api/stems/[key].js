// functions/api/stems/[key***REMOVED***.js

export const onRequestGet = async ({ env, params }) => {
    try {
      // decode the param so spaces can be handled
      const key = decodeURIComponent(params.key);
  
      const object = await env.STEMS_BUCKET.get(key);
      if (!object) {
        return new Response('File not found', { status: 404 });
      }
  
      return new Response(object.body, {
        headers: {
          'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
        },
        status: 200,
      });
    } catch (error) {
      console.error('Error retrieving stem:', error);
      return new Response('Error retrieving stem', { status: 500 });
    }
  };
  
  export const onRequestDelete = async ({ env, params }) => {
    try {
      const key = decodeURIComponent(params.key);
  
      await env.STEMS_BUCKET.delete(key);
      return new Response(`Deleted stem ${key}`, { status: 200 });
    } catch (error) {
      console.error('Error deleting stem:', error);
      return new Response('Error deleting stem', { status: 500 });
    }
  };