const test = require('node:test');
const assert = require('node:assert/strict');
const { getPort, createServer } = require('../src/app');
const { sumNumbers, doubleNumber, fetchData } = require('../src/ai-generated');

test('numeric utilities handle normal values and reject invalid input', () => {
  assert.equal(sumNumbers(2, 3), 5);
  assert.equal(sumNumbers(-2, 0.5), -1.5);
  assert.equal(doubleNumber(7), 14);
  assert.equal(doubleNumber(-3), -6);
  assert.throws(() => sumNumbers('2', 3), TypeError);
  assert.throws(() => doubleNumber(NaN), TypeError);
});
test('port configuration enforces valid bounds', () => {
  assert.equal(getPort('8080'), 8080);
  for (const value of ['0', '65536', '3.5', 'abc']) assert.throws(() => getPort(value));
});
test('server and fetchData return actual JSON', async t => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const apiUrl = `http://127.0.0.1:${server.address().port}`;
  assert.deepEqual(await fetchData({ apiUrl }), { status: 'ok' });
  await assert.rejects(fetchData({ apiUrl: 'file:///tmp/example' }));
});
test('fetchData rejects HTTP failures and sends configured auth', async t => {
  const server = require('node:http').createServer((req, res) => {
    assert.equal(req.headers.authorization, 'Bearer test-only');
    res.writeHead(503); res.end();
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  await assert.rejects(fetchData({ apiUrl: `http://127.0.0.1:${server.address().port}`, apiKey: 'test-only' }), /503/);
});
