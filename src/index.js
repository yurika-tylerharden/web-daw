import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      const key = url.pathname.slice(1);
  
      switch (request.method) {
        case "PUT":
          await env.MY_BUCKET.put(key, request.body);
          return new Response(`Put ${key} successfully!`);
        case "GET":
          const object = await env.MY_BUCKET.get(key);
  
          if (object === null) {
            return new Response("Object Not Found", { status: 404 });
          }
  
          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set("etag", object.httpEtag);
  
          return new Response(object.body, {
            headers,
          });
        case "DELETE":
          await env.MY_BUCKET.delete(key);
          return new Response("Deleted!");
  
        default:
          return new Response("Method Not Allowed", {
            status: 405,
            headers: {
              Allow: "PUT, GET, DELETE",
            },
          });
      }
    },
  };