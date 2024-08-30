'use strict'

const { stdout } = require("node:process");
const autocannon = require("autocannon");

function print(result) {
  stdout.write(autocannon.printResult(result));
}
let n = 500;
autocannon({
  url: `http://localhost:3000/?n=${n}`,
  connections: 100, //default
  pipelining: 1, // default
  duration: 10, // default
  workers: 10,
}, (err, data) => print(data));
