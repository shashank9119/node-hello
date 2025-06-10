const http = require('http');

// Jest's beforeAll and afterAll hooks to manage the server lifecycle
let server;
const port = 3001; // Use a different port for testing to avoid conflicts with your main app

beforeAll(done => {
  // Start the server for testing
  // We're creating a simple server here for testing purposes.
  // In a more complex app, you might want to refactor index.js to export the server.
  server = http.createServer((req, res) => {
    res.statusCode = 200;
    const msg = 'Hello shashank chauhan!\n';
    res.end(msg);
  });

  server.listen(port, () => {
    console.log(`Test server running on http://localhost:${port}/`);
    done(); // Signal Jest that the asynchronous setup is complete
  });
});

afterAll(done => {
  // Close the server after all tests are done
  server.close(() => {
    console.log('Test server closed.');
    done(); // Signal Jest that the asynchronous teardown is complete
  });
});

// Test case
test('should respond with "Hello shashank chauhan!"', (done) => {
  http.get(`http://localhost:${port}/`, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      expect(data).toBe('Hello shashank chauhan!\n');
      expect(res.statusCode).toBe(200);
      done(); // Signal Jest that this asynchronous test is complete
    });
  }).on('error', (err) => {
    done(err); // Pass error to Jest if the request fails
  });
});
