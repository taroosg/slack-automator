import express from 'express';
import { slackRouter } from './routes/slack.route.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    uri: '/',
    message: 'Hello Node.js!',
  });
});

// ↓追加
app.use('/slack', (req, res) => slackRouter(req, res));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

