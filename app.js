import express from 'express';
import { slackRouter } from './routes/slack.route.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({
    uri: '/',
    message: 'Hello Cloud Run!',
  });
});

// ↓追加
app.use('/slack', (req, res) => slackRouter(req, res));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

