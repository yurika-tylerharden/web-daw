export const onRequestPut = async ({ env, request }) => {
    try {
      const { file_path, stem_group } = await request.json();
  
      if (!file_path || !stem_group) {
        return new Response('Missing file_path or stem_group', { status: 400 });
      }
  
      const result = await env.DB.prepare('UPDATE stems SET stem_group = ? WHERE file_path = ?')
        .bind(stem_group, file_path)
        .run();
  
      if (result.changes === 0) {
        return new Response('Stem not found', { status: 404 });
      }
  
      return new Response('Stem group updated', { status: 200 });
    } catch (error) {
      console.error('Error updating stem group:', error);
      return new Response('Error updating stem group', { status: 500 });
    }
  };