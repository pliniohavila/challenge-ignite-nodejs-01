import http from 'node:http';

import { json } from './middlewares/json.js';
import { routers } from './routers/routers.js';

async function serverHandler(request, response) {
  const {method, url} = request;

  // middleware
  await json(request, response);

  const route = routers.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(request, response);
  }

  return response.writeHead(404).end('Not found (: ');
}


const PORT = 3000;

const server = http.createServer(serverHandler);

server.listen(PORT, () => {{
  console.log('Server is running at port: ', PORT);
}});