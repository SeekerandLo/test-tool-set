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

function writeInWeekPlan(
  currentDate: number,
  currentDay: number,
  currentMonth: number
) {
  week.forEach((aDay: { date: number; month: number }, index: number) => {
    aDay.date = currentDate - (currentDay - index);
    aDay.month = currentMonth;
  });

  fs.writeFileSync(`${ttsPath}/week-plan.json`, JSON.stringify(week), 'utf8');
}

function initWeekDBJsonSync() {
  initTTSDirSync();
  const date = new Date();
  const currentDate = date.getDate();
  const currentDay = date.getDay() === 0 ? 7 - 1 : date.getDay() - 1;
  const currentMonth = date.getMonth() + 1;

  // 如果文件不存在，则写入
  if (!fs.existsSync(weekPlanFilePath)) {
    writeInWeekPlan(currentDate, currentDay, currentMonth);
  } else {
    // 如果存在，则判断文件中周内第一天的日期和实际本周的第一天日期是否相等
    const weekStr = fs.readFileSync(weekPlanFilePath, 'utf8');
    let weekJson = '';
    try {
      weekJson = JSON.parse(weekStr);
    } catch (e) {
      writeInWeekPlan(currentDate, currentDay, currentMonth);
      return;
    }

    const theFirst = weekJson[0];

    const currentWeekMondayDate = currentDate - currentDay;

    if (
      theFirst.date !== currentWeekMondayDate ||
      theFirst.month !== currentMonth
    ) {
      writeInWeekPlan(currentDate, currentDay, currentMonth);
    }
  }
}

function updateWeekPlanDBJSON(data: WeekType) {
  const db = new LowSync(new JSONFileSync<WeekType>(weekPlanFilePath));
  db.data = data;
  db.write();
}

export { initWeekDBJsonSync, weekPlanFilePath, updateWeekPlanDBJSON };
