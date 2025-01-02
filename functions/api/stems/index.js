// functions/api/stems/index.js

export const onRequestGet = async ({ env }) => {
    try {
      const list = await env.STEMS_BUCKET.list();
      const objects = list.objects.map(({ key, size }) => ({ key, size }));
      return new Response(JSON.stringify(objects), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (error) {
      console.error('Error listing stems:', error);
      return new Response('Error listing stems', { status: 500 });
    }
  };
  
  // Optional: Upload logic - handle multipart or raw file
  export const onRequestPost = async ({ env, request }) => {
    try {
      // For simplicity, assume a raw file body with a ?key= param:
      // e.g. fetch('/api/stems?key=someFile.wav', { method: 'POST', body: theFileBuffer })
      const url = new URL(request.url);
      const keyParam = url.searchParams.get('key');
      if (!keyParam) {
        return new Response('Missing key param', { status: 400 });
      }
  
      const fileBuffer = await request.arrayBuffer();
      await env.STEMS_BUCKET.put(keyParam, fileBuffer, {
        httpMetadata: { contentType: 'audio/m4a' }, // or detect type
      });
  
      return new Response(`Uploaded stem ${keyParam}`, { status: 201 });
    } catch (error) {
      console.error('Error uploading stem:', error);
      return new Response('Error uploading stem', { status: 500 });
    }
  };