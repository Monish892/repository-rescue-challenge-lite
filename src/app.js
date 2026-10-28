const http = require('node:http');

function getPort(value = process.env.APP_PORT || '3000') {
  if (!/^\d+$/.test(String(value))) throw new Error('APP_PORT must be an integer');
  const port = Number(value);
  if (port < 1 || port > 65535) throw new Error('APP_PORT must be between 1 and 65535');
  return port;
}

function createServer() {
  return http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok' }));
  });
}

function main() {
  const port = getPort();
  const server = createServer();
  server.on('error', error => {
    console.error('Server error: ' + error.message);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => console.log('Listening on port ' + port));
  return server;
}

if (require.main === module) main();
module.exports = { getPort, createServer, main };
