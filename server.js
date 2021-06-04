const path = require('path');
const http = require('http');
const fileSystem = require('fs');
const PORT = process.env.PORT || 7890;


http.createServer(
  (request, response) => {
    
    if (request.url.includes("styles.css")) {
      // response.writeHead(200);
      fileSystem.readFile("./styles.css", (error, content) => {
        if (error) response.end(error.message);
        else response.end(content);
      });
    }

    if (request.url.includes("index.html")) {
      // response.writeHead(200);
      fileSystem.readFile("./index.html", (error, content) => {
        if (error) response.end(error.message);
        else response.end(content);
      });
    }

    if (request.url.includes("calculator.js")) {
      // response.writeHead(200);
      fileSystem.readFile("./calculator.js", (error, content) => {
        if (error) response.end(error.message);
        else response.end(content);
      });
    }

  }
)
  .listen(PORT);