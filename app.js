import express from 'express';
import { slackRouter } from './routes/slack.route.js';
import { execAPI } from './repositories/spreadsheet.repository.js';
import { getUnixTime, format, addHours } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';
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
    data: format(new Date(), 'yyyy-M-d-HH-mm-ss'),
    formatted: format(addHours(new Date(), 9), 'yyyy-M-d-HH-mm-ss'),
    // formatteddata: formatToTimeZone(new Date(), 'YYYY-M-D-HH-mm-ss', { timeZone: 'Asia/Tokyo' }),
  });
});

// ↓追加
app.use('/slack', (req, res) => slackRouter(req, res));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

