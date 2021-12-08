import { postNow, postScheduled, } from '../services/slack.service.js';

export const sendNow = async (req, res, next) => {
  try {
    const result = await postNow();
    return res.status(200).json({
      status: 200,
      result: result,
      message: 'Message is send successfully!',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const sendScheduled = async (req, res, next) => {
  try {
    const result = await postScheduled();
    return res.status(200).json({
      status: 200,
      result: result,
      message: 'Message is scheduled successfully!',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

