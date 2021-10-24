import { LowSync, JSONFileSync } from 'lowdb';
import fs from 'fs';

// 每个 todoItem 的类型
type Note = {
  html: string;
  text: string;
};

// 每天的类型
type Notes = Array<Note>;

const userPath = process.env.HOME || process.env.USERPROFILE;

const ttsPath = `${userPath}/.tts`;

const notesPath = `${ttsPath}/notes.json`;

function initTTSDirSync() {
  if (!fs.existsSync(ttsPath)) {
    fs.mkdirSync(`${userPath}/.tts`);
  }
}

// TODO 保存
function initNotes() {
  const notes: Notes = [];
  fs.writeFileSync(notesPath, JSON.stringify(notes), 'utf8');
}

// TODO 初始化
function initSync() {
  // 初始化 tts 路径
  initTTSDirSync();

  if (!fs.existsSync(notesPath)) {
    initNotes();
  }
}

function read(path: string) {
  const jsonStr = fs.readFileSync(path, 'utf8');
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    // TODO
    return [];
  }
}

function update(data: Notes) {
  const db = new LowSync(new JSONFileSync<Notes>(notesPath));
  db.data = data;
  db.write();
}

export { initSync, notesPath, update, read };
