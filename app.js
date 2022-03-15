import express from 'express';
import { slackRouter } from './routes/slack.route.js';
import { execAPI } from './repositories/spreadsheet.repository.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  res.json({
    uri: '/',
    message: 'Hello Cloud Run!',
    data: await execAPI(process.env.SPREADSHEET_ID, 'data!A1:E10'),
  });
});

// ↓追加
app.use('/slack', (req, res) => slackRouter(req, res));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

