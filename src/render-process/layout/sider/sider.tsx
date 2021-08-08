import React from 'react';
import './sider.css';
import Menu from './components/menu';

export default function Sider() {

  return (
    <div className="tool-set-sider" id="tool-set-sider">
      <div
        className="tool-set-sider-title"
        style={{
          height: 80,
          fontSize: 20,
          color: 'hsl(0,0%,44%)',
          marginBottom: 14,
        }}
      >
        <span style={{ fontWeight: 300, marginRight: 10 }}>Tool</span>
        <span style={{ fontWeight: 600 }}>Set</span>
      </div>
      <Menu />
    </div>
  );
}
