import { LowSync, JSONFileSync } from 'lowdb';
import fs from 'fs';
import week from './week.json';

// 每个 todoItem 的类型
type PlanType = {
  content?: string;
  complete?: boolean;
};

// 每天的类型
type WeekPlanType = {
  key: string;
  plan: PlanType[];
  current?: boolean;
  date?: number;
};

// 一周的类型
type WeekType = WeekPlanType[];

const userPath = process.env.HOME || process.env.USERPROFILE;

const ttsPath = `${userPath}/.tts`;

const weekPlanFilePath = `${ttsPath}/week-plan.json`;

function initTTSDirSync() {
  if (!fs.existsSync(ttsPath)) {
    fs.mkdirSync(`${userPath}/.tts`);
  }
}

function initWeekDBJsonSync() {
  initTTSDirSync();

  if (!fs.existsSync(weekPlanFilePath)) {
    fs.writeFileSync(`${ttsPath}/week-plan.json`, JSON.stringify(week), 'utf8');
  }
}

function updateWeekPlanDBJSON(data: WeekType) {
  const db = new LowSync(new JSONFileSync<WeekType>(weekPlanFilePath));
  db.data = data;
  db.write();
}

export { initWeekDBJsonSync, weekPlanFilePath, updateWeekPlanDBJSON };
