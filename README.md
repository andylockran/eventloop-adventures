# EventLoop Adventures

This is a little repo I've setup to understand the event loop.

## Context

This repo was born after I noticed that some of our express apps running in containers were slowing down and not responding.  At high throughput, blocking the eventLoop even for a small time really added up.  

The situation I'm trying to replicate is the EventLoop slowing to 500ms, but the consequence being that at that level of latency, a request is queued up and not processed by express for 40+ seconds.

nodeJS offer a good guide [1] on their site where most of this is from; but I've also included some useful packages that make understanding and playing with the event loop more useful/visible.

This repo is designed so you can play locally; whilst this may be a problem manifesting on a cloud provider - it's native to nodeJS therefore anyone can play around with the limitations on their own machine.  The good news is the worse spec your machine the easier it is to demonstrate imperfect performance at these levels.   

## Running the examples

Split your screen into two terminals.  

In terminal A, run `npm start` to run the express app.

In terminal B, run `node test` to execute the autocannon test defined in test.js.

## Useful Libraries

- autocannon - A simple js tool for running load tests.
- blocked-at - A useful library for diagnosing where your code is blocking without having to instrument all your code to the nth level (as it cleverly uses the node EventEmitter)
- express-under-pressure - A lib based on @fastify/under-pressure which allows your express server to start throwing 503 errors when it hits a measured node performance boundary, rather than watching your node processes lock up or delay indefinitely.
- express-lag-detector - seemingly simple and deprecated, but useful for seeing the lag per request.
- express-queue - useful for starting to see how you cna queue up requests.
- morgan - logging
- clinic - useful for looking at local i/o issues and event loop performance in your express app.


[1] https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop

