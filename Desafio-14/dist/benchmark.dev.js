"use strict";

var autocannon = require('autocannon');

var _require = require('stream'),
    PassThrough = _require.PassThrough;

function run(url) {
  var buf = [];
  var outputStream = new PassThrough();
  var inst = autocannon({
    url: url,
    connections: 100,
    duration: 20
  });
  autocannon.track(inst, {
    outputStream: outputStream
  });
  outputStream.on('data', function (data) {
    return buf.push(data);
  });
  inst.on('done', function () {
    process.stdout.write(Buffer.concat(buf));
  });
}

console.log('Running all benchmarks in parallel ...');
run('http://localhost:8084/info');