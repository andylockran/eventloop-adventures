'use strict'

const autocannon = require("autocannon");

let n = 100;
autocannon({
  url: `http://localhost:3000/?n=${n}`,
  connections: 10, //default
  pipelining: 1, // default
  duration: 10, // default
  workers: 10,
}, console.log);
