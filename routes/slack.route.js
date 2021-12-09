import express from 'express';
import { sendNow, sendScheduled, } from '../controllers/slack.controller.js';

export const slackRouter = express.Router();

slackRouter.get('/now', (req, res) => sendNow(req, res));
slackRouter.get('/scheduled', (req, res) => sendScheduled(req, res));
