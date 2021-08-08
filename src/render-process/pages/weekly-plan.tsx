import React from 'react';
import '../../App.global.css';

const week = [
  {
    key: '周一',
  },
  {
    key: '周二',
  },
  {
    key: '周三',
  },
  {
    key: '周四',
  },
  {
    key: '周五',
  },
  {
    key: '周六',
  },
  {
    key: '周日',
  },
];

const Test = () => {
  function renderWeek() {
    return week.map((day) => {
      return (
        <div
          key={day.key}
          style={{
            flexGrow: 1,
            height: 150,
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            margin: '0 5px',
            fontSize: 13,
            color: 'var(--color-subtle)',
            padding: 5,
            boxSizing: 'border-box'
          }}
        >
          <div>{day.key}</div>
        </div>
      );
    });
  }

  return (
    <div
      className="tool-set-weekly-plan"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div
        className="weekly"
        style={{
          marginBottom: 20,
          display: 'flex',
          overflow: 'auto',
        }}
      >
        {renderWeek()}
      </div>
      <div
        className="weekly-plan-content"
        style={{
          flexGrow: 1,
          background: 'rgb(245, 245, 245)',
          width: '100%',
          borderRadius: 8,
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <div className="weekly-plan-content-show">
          展示区
        </div>
        <input className="weekly-plan-input" style={{
          width: '90%',
          boxSizing: 'border-box',
          height: 30,
          position: 'absolute',
          bottom: 10,
          borderRadius: 8,
          border: '1px solid var(--color-border)'
         }}></input>
      </div>
    </div>
  );
};

export default Test;
