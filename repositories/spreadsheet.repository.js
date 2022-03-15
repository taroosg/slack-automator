import dotenv from 'dotenv';
dotenv.config();

import { google, } from 'googleapis';

const sheets = google.sheets('v4');

// execAPI('1tEP9BXmtOSLIEblc_rgKYLLmh6okrN2_q0jsWyVcJ1g', 'data!A1:E10');

// async function execAPI(spreadsheetId, range) {
export const execAPI = async (spreadsheetId, range) => {
  const auth = await google.auth.getClient({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const apiOptions = {
    auth,
    spreadsheetId,
    range,
  };

  const result = await sheets.spreadsheets.values.get(apiOptions);
  console.log(result);
  return await result.data.values;


  // sheets.spreadsheets.values.get(apiOptions, async (err, res) => {
  //   console.log(res.data.values);
  //   return await res.data.values;
  // });
}


