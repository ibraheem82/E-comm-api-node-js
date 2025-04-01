import http from 'http';
import app from './app/app.js';



// * Server Connection
const PORT  = process.env.PORT || 6666;
// creating server for the application, meaning connecting server with express application.
// you're essentially telling the HTTP server to use the Express.js application as its request listener. This means that Express.js will handle all incoming HTTP requests.

/*
It creates an HTTP server using Node.js's built-in http module.
It configures the server to use the Express.js application (app) to handle incoming HTTP requests.
It stores the resulting HTTP server object in the server constant, allowing you to control and manage the server (e.g., start listening for connections).

*/
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
