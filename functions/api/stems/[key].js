export const onRequestGet = async ({ env, params }) => {
    try {
      const key = params.key; // from the [key***REMOVED*** in the file name
      const object = await env.STEMS_BUCKET.get(key);
  
      if (!object) {
        return new Response('File not found', { status: 404 });
      }
  
      // Return the file's body
      return new Response(object.body, {
        headers: {
          'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      console.error('Error reading R2 object:', error);
      return new Response('Error reading R2 object', { status: 500 });
    }
  };