import http from 'http';
import app from './app/app.js';



// * Server Connection
const PORT  = process.env.PORT || 6666;
// creating server for the application, meaning connecting server with express application.
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
