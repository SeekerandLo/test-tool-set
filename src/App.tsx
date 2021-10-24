import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.global.css';
import IndexPage from './render-process/pages/index/index';
import WeeklyPlan from './render-process/pages/week-plan/week-plan';
import JsonFormat from './render-process/pages/json-format/json-format';
import Note from './render-process/pages/note/note';
import Sider from './render-process/layout/sider/sider';

export default function App() {
  return (
    <Router>
      <div className="tool-set-app">
        {/* 侧边栏 */}
        <Sider />
        <main style={{ width: 720 }}>
          <Route path="/" exact component={IndexPage} />
          <Route path="/week-plan" component={WeeklyPlan} />
          <Route path="/json" component={JsonFormat} />
          <Route path="/note" component={Note} />
          <Redirect to="/" />
        </main>
        {/* 右侧工具栏 */}
      </div>
    </Router>
  );
}
