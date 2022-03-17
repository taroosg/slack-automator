import dotenv from 'dotenv';
dotenv.config();

import { google, } from 'googleapis';

const sheets = google.sheets('v4');

export const execAPI = async (spreadsheetId, range) => {
  const auth = await google.auth.getClient({
    // keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const apiOptions = {
    auth,
    spreadsheetId,
    range,
  };

  const result = await sheets.spreadsheets.values.get(apiOptions);
  return result.data.values;

}

// 空文字含む行を判定
const hasEmpty = (array) => array.every((x) => x != '');

// カラム数が足りない行を判定
const hasColumn = (array, initialArray) => array.length === initialArray.length;

// 必要な行のみ抽出して整形
export const createFantasticData = (rawData) => rawData
  .filter((x, i, arr) => i !== 0 && hasEmpty(x) && hasColumn(x, arr[0]))
  .map((x, i) => Object.fromEntries(x.map((x, i) => [rawData[0][i], ['year', 'month', 'day', 'hour', 'minute', 'seconds'].includes(rawData[0][i]) ? Number(x) : x])));

export const getSheetData = async () => createFantasticData(await execAPI(process.env.SPREADSHEET_ID, 'data'));
