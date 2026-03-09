'use strict';

const http = require('http');

const { calculateFSI } =
  require('../services/fsi.service');

const PORT = 3000;

function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {

  if (req.method === 'POST' && req.url === '/fsi/score') {

    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {

      try {

        const input = JSON.parse(body);

        const result = calculateFSI(input);

        send(res, 200, result);

      } catch (err) {

        send(res, 400, {
          error: err.message
        });

      }

    });

    return;
  }

  if (req.method === 'GET' && req.url === '/health') {

    send(res, 200, { status: "FSI API running" });
    return;

  }

  send(res, 404, { error: "Route not found" });

});

server.listen(PORT, () => {
  console.log("FSI API listening on port", PORT);
});

function timedRun(input) {
  const start = Date.now();
  const result = calculateFSI(input);
  const duration = Date.now() - start;

  result.meta.processingTimeMs = duration;
  return result;
}

