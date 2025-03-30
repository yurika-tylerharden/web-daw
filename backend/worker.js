// import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
// import parseStems from './utils/parseStems';

// export default {
//   async fetch(request, env, ctx) {
//     const url = new URL(request.url);

//     if (url.pathname.startsWith('/api')) {
//       return handleApiRequest(request, env);
//     }

//     try {
//       return await getAssetFromKV(ctx, request);
//     } catch (e) {
//       console.error('Error fetching asset:', e);
//       return new Response('Not found', { status: 404 });
//     }
//   }
// };

// async function handleApiRequest(request, env) {
//   const url = new URL(request.url);
//   const path = url.pathname.replace('/api', '');

//   if (path === '/songs') {
//     return handleSongsRequest(env);
//   }

//   if (path === '/members') {
//     return handleMembersRequest(env);
//   }

//   if (path.startsWith('/stems/')) {
//     return handleStemsProxyRequest(path.replace('/stems/', ''), env);
//   }

//   if (path === '/process-stems') {
//     return handleProcessStemsRequest(env);
//   }

//   if (path === '/list') {
//     return handleListObjectsRequest(env);
//   }

//   if (path === '/r2-base-url') {
//     return handleR2BaseUrlRequest(env);
//   }

//   if (path === '/debug') {
//     return handleDebugRequest(env);
//   }

//   return new Response('Not found', { status: 404 });
// }

// async function handleStemsRequest(request, env) {
//   const url = new URL(request.url);
//   const key = url.pathname.replace('/api/stems/', '');

//   try {
//     const object = await env.STEMS_BUCKET.get(key);
//     if (!object) {
//       return new Response('Not found', { status: 404 });
//     }

//     return new Response(object.body, {
//       headers: {
//         'Content-Type': object.httpMetadata.contentType,
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//   } catch (e) {
//     console.error('Error fetching stem:', e);
//     return new Response('Error fetching stem', { status: 500 });
//   }
// }

// async function handleR2BaseUrlRequest(env) {
//   const baseUrl = `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com/${env.BUCKET_NAME}`;
//   return new Response(JSON.stringify({ r2BaseUrl: baseUrl }), {
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//     },
//   });
// }

// async function handleSongsRequest(env) {
//   try {
//     const { results } = await env.DB.prepare('SELECT * FROM songs').all();
//     const songsWithStems = await Promise.all(
//       results.map(async (song) => {
//         const stems = await env.DB.prepare('SELECT * FROM stems WHERE song_id = ?').bind(song.id).all();
//         return { ...song, stems: stems.results || [] };
//       })
//     );
//     return new Response(JSON.stringify(songsWithStems), {
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching songs:', error);
//     return new Response('Error fetching songs', { status: 500 });
//   }
// }

// async function handleMembersRequest(env) {
//   try {
//     const { results } = await env.DB.prepare('SELECT * FROM band').all();
//     return new Response(JSON.stringify(results), {
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching band members:', error);
//     return new Response('Error fetching band members', { status: 500 });
//   }
// }

// async function handleProcessStemsRequest(env) {
//   try {
//     const songs = await parseStems(env.STEMS_BUCKET);

//     for (const song of songs) {
//       const { name, bpm, key, stems } = song;

//       if (!name || !bpm || !key) {
//         console.error('Invalid song data:', song);
//         continue;
//       }

//       // Check if the song already exists
//       const existingSong = await env.DB.prepare('SELECT * FROM songs WHERE name = ? AND bpm = ?')
//         .bind(name, bpm)
//         .first();

//       let songId;
//       if (existingSong) {
//         songId = existingSong.id;
//       } else {
//         // Insert new song
//         const result = await env.DB.prepare('INSERT INTO songs (name, bpm, key) VALUES (?, ?, ?)')
//           .bind(name, bpm, key)
//           .run();
//         songId = result.lastInsertRowid;
//       }

//       // Insert stems
//       for (const stem of stems) {
//         const { stemName, filePath, stemGroup, assigned_to, volume } = stem;

//         if (!stemName || !filePath || !stemGroup || assigned_to === undefined || volume === undefined) {
//           console.error('Invalid stem data:', stem);
//           continue;
//         }

//         // Check if the stem already exists
//         const existingStem = await env.DB.prepare('SELECT * FROM stems WHERE song_id = ? AND stem_name = ?')
//           .bind(songId, stemName)
//           .first();

//         if (!existingStem) {
//           await env.DB.prepare('INSERT INTO stems (song_id, stem_name, file_path, stem_group, assigned_to, volume) VALUES (?, ?, ?, ?, ?, ?)')
//             .bind(songId, stemName, filePath, stemGroup, assigned_to, volume)
//             .run();
//         }
//       }
//     }

//     return new Response(JSON.stringify({ message: 'Stems processed and added to the database successfully' }), {
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//   } catch (error) {
//     console.error('Error processing stems:', error);
//     return new Response('Error processing stems', { status: 500 });
//   }
// }

// async function handleListObjectsRequest(env) {
//   try {
//     const list = await env.STEMS_BUCKET.list(); // Fetch objects in the bucket
//     const objects = list.objects.map((object) => ({
//       key: object.key,
//       size: object.size,
//     }));
//     return new Response(JSON.stringify(objects), {
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//   } catch (error) {
//     console.error('Error listing objects:', error);
//     return new Response('Error listing objects', { status: 500 });
//   }
// }

// async function handleDebugRequest(env) {
//   try {
//     const songs = await env.DB.prepare('SELECT * FROM songs').all();
//     const band = await env.DB.prepare('SELECT * FROM band').all();
//     const stems = await env.DB.prepare('SELECT * FROM stems').all();

//     return new Response(JSON.stringify({ songs, band, stems }), {
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching debug data:', error);
//     return new Response(`Error fetching debug data: ${error.message}`, { status: 500 });
//   }
// }

// async function generatePreSignedUrl(env, key, expiration = 3600) {
//   const bucketName = env.BUCKET_NAME;
//   const host = `${env.ACCOUNT_ID}.r2.cloudflarestorage.com`;
//   const region = "auto";
//   const service = "s3";

//   const isoDate = new Date().toISOString().replace(/[:-]/g, "").split(".")[0] + "Z"; // ISO8601
//   const shortDate = isoDate.slice(0, 8); // YYYYMMDD

//   const credentialScope = `${shortDate}/${region}/${service}/aws4_request`;
//   const credential = `${env.ACCESS_KEY}/${credentialScope}`;

//   const canonicalUri = `/${bucketName}/${encodeURIComponent(key)}`;
//   const canonicalHeaders = `host:${host}\n`;
//   const signedHeaders = "host";

//   const canonicalRequest = [
//     "GET",
//     canonicalUri,
//     `X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=${encodeURIComponent(credential)}&X-Amz-Date=${isoDate}&X-Amz-Expires=${expiration}&X-Amz-SignedHeaders=${signedHeaders}`,
//     canonicalHeaders,
//     signedHeaders,
//     "UNSIGNED-PAYLOAD",
//   ].join("\n");

//   console.log("Canonical Request:", canonicalRequest);

//   const hash = await crypto.subtle.digest(
//     "SHA-256",
//     new TextEncoder().encode(canonicalRequest)
//   );
//   const hashedCanonicalRequest = Array.from(new Uint8Array(hash))
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");

//   const stringToSign = [
//     "AWS4-HMAC-SHA256",
//     isoDate,
//     credentialScope,
//     hashedCanonicalRequest,
//   ].join("\n");

//   console.log("String to Sign:", stringToSign);

//   const dateKey = await generateHMACKey("AWS4" + env.SECRET_KEY, shortDate);
//   const regionKey = await generateHMACKey(dateKey, region);
//   const serviceKey = await generateHMACKey(regionKey, service);
//   const signingKey = await generateHMACKey(serviceKey, "aws4_request");

//   const signature = await generateHMACKey(signingKey, stringToSign);

//   console.log("Generated Signature:", signature);

//   return `https://${host}${canonicalUri}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=${encodeURIComponent(
//     credential
//   )}&X-Amz-Date=${isoDate}&X-Amz-Expires=${expiration}&X-Amz-SignedHeaders=${signedHeaders}&X-Amz-Signature=${signature}`;
// }

// async function generateHMACKey(key, data) {
//   const encoder = new TextEncoder();
//   const cryptoKey = await crypto.subtle.importKey(
//     "raw",
//     encoder.encode(key),
//     { name: "HMAC", hash: "SHA-256" },
//     false,
//     ["sign"]
//   );
//   const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
//   return Array.from(new Uint8Array(signature))
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
// }

// async function handleStemsProxyRequest(key, env) {
//   try {
//     // Attempt to get the object from R2
//     const object = await env.STEMS_BUCKET.get(key);
//     if (!object) {
//       return new Response('File not found', { status: 404 });
//     }

//     // Return the file directly to the client
//     return new Response(object.body, {
//       headers: {
//         'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//   } catch (error) {
//     console.error('Error reading R2 object:', error);
//     return new Response('Error reading R2 object', { status: 500 });
//   }
// }