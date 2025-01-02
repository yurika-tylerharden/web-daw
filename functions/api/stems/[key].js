export const onRequestGet = async ({ env, params }) => {
    try {
      // The route param might be "AROUND_110_%20BASS%20GTR%20CLEAN.m4a"
      // so decode it to "AROUND_110_ BASS GTR CLEAN.m4a"
      const key = decodeURIComponent(params.key);
  
      const object = await env.STEMS_BUCKET.get(key);
      if (!object) {
        return new Response('File not found', { status: 404 });
      }
  
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