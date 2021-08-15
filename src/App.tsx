import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.global.css';
import IndexPage from './render-process/pages/index/index';
import WeeklyPlan from './render-process/pages/week-plan/week-plan';
import Sider from './render-process/layout/sider/sider';

export default function App() {
  return (
    <Router>
      <div className="tool-set-app">
        {/* 侧边栏 */}
        <Sider />
        <main style={{ padding: 20, width: 640 }}>
          <Route path="/" exact component={IndexPage} />
          <Route path="/week-plan" component={WeeklyPlan} />
          <Redirect to="/" />
        </main>
      </div>
    </Router>
  );
}
