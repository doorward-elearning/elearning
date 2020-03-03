import * as express from 'express';

const app = express();

app.get('/chat/api', (req, res) => {
  res.send({ message: 'Welcome to edudoor-chat-api!' });
});

const port = process.env.CHAT_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
