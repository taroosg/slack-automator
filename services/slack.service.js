// import { findAll, findToday, } from '../repositories/spreadsheet.repository.js';
import { WebClient, } from '@slack/web-api';
import dotenv from 'dotenv';
// import cron from 'node-cron';
import { getUnixTime, format } from 'date-fns';

dotenv.config();

// メッセージ即時投稿する関数
const postToSlackNow = async (token, channel, text) => {
  const client = new WebClient(token);
  const response = await client.chat.postMessage({ channel, text });
  console.log(response.ok);
  return response;
}

// メッセージ予約投稿する関数
const postToSlackScheduled = async (token, post_at, channel, text) => {
  const client = new WebClient(token);
  try {
    const result = await client.chat.scheduleMessage({ channel, text, post_at, });
    console.log(result);
    return result;
  }
  catch (error) {
    console.error(error);
    return error;
  }
}

// スケジュールを入力して本日のものだけ出力する関数
const getTodaySchedules = (schedules) => {
  const todayObject = Object.fromEntries(format(new Date(), 'yyyy-M-d').split('-').map((x, i) => [['year', 'month', 'day'][i], Number(x)]));
  return schedules.filter((x) => [x.year === todayObject.year, x.month === todayObject.month, x.day === todayObject.day].every(x => x));
}

// スケジュールを入力すると本日のものだけ送信する関数
const scheduleAll = (schedules) => {
  const todaysSchedules = getTodaySchedules(schedules);
  todaysSchedules.forEach((x) => postToSlackScheduled(x.token, getUnixTime(new Date(x.year, x.month - 1, x.day, x.hour, x.minute, x.seconds)), x.channel, x.text));
  return
}

// 即時投稿処理
export const postNow = async () => {
  try {
    const token = process.env.SLACK_API_TOKEN;
    return postToSlackNow(token, '#test', 'post now');
  } catch (e) {
    throw Error(e);
  }
};

// 予約投稿処理
export const postScheduled = async () => {
  try {
    // const token = process.env.SLACK_API_TOKEN;
    const schedules = [
      {
        token: process.env.SLACK_API_TOKEN,
        year: 2021,
        month: 12,
        day: 8,
        hour: 17,
        minute: 56,
        seconds: 0,
        channel: '#ファントムブラッド',
        text: '<!channel>\nhogehoge',
      },
      {
        token: process.env.SLACK_API_TOKEN,
        year: 2021,
        month: 12,
        day: 8,
        hour: 17,
        minute: 56,
        seconds: 15,
        channel: '#スターダストクルセイダース',
        text: 'fuga',
      },
      {
        token: process.env.SLACK_API_TOKEN,
        year: 2021,
        month: 12,
        day: 8,
        hour: 17,
        minute: 56,
        seconds: 30,
        channel: '#黄金の風',
        text: 'piyo',
      },
    ];
    return scheduleAll(schedules);
  } catch (e) {
    throw Error('Error while posting message');
  }
};

// cron.schedule('*/3 * * * * *', () => console.log('3秒ごとに実行'));

// cron.schedule('30 19 13 * * *', () => postAllTodoData());
// cron.schedule('40 19 13 * * *', () => postTodayTodoData());

