import React, { useState, useEffect } from 'react';

import '../../../App.global.css';

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
};

// 一周的类型
type WeekType = WeekPlanType[];

const week: WeekType = [
  {
    key: '周一',
    plan: [],
  },
  {
    key: '周二',
    plan: [],
  },
  {
    key: '周三',
    plan: [],
  },
  {
    key: '周四',
    plan: [],
  },
  {
    key: '周五',
    plan: [],
  },
  {
    key: '周六',
    plan: [],
  },
  {
    key: '周日',
    plan: [],
  },
];

const Test = () => {
  const [weekPlan, setWeekPlan] = useState(week);
  const [currentDay, setCurrentDay] = useState(new Date().getDay() - 1);
  const [currentEditingPlanItem, setCurrentEditingPlanItem] = useState('');

  useEffect(() => {
    console.log('调用');
    document.title = `TTS: Week Plan`;
    // 从本地json中还原
  });

  useEffect(() => {
    console.log('weekplan', weekPlan);
  }, [weekPlan]);

  function handlePressEnterKey(e) {
    if (e.code === 'Enter') {
      const tempWeekPlan = [...weekPlan];

      const currentDayInfo = tempWeekPlan[currentDay];
      currentDayInfo.plan.push({
        content: currentEditingPlanItem,
        complete: false,
      });

      // 更新周计划、更新当前编辑值
      setCurrentEditingPlanItem('');
      setWeekPlan(tempWeekPlan);
    }
  }

  /**
   * 删除计划
   * @param index planIndex
   */
  function handleDeletePlanItem(index) {
    const tempWeekPlan = [...weekPlan];
    const currentDayInfo = tempWeekPlan[currentDay];

    currentDayInfo.plan.splice(index, 1);
    setWeekPlan(tempWeekPlan);
  }

  /**
   * 渲染顶部的周几
   */
  function renderWeek() {
    return weekPlan.map((day, index) => {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          key={day.key}
          className="week-header-item"
          onClick={() => {
            setCurrentDay(index);
          }}
        >
          <div className="week-title">
            <span style={{ lineHeight: '100%' }}>{day.key}</span>
            {currentDay === index ? (
              <div
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  marginLeft: 5,
                }}
              />
            ) : (
              ''
            )}
          </div>
          <div className="week-item">
            {day.plan.map((item) => (
              <div
                key={Math.random()}
                style={{
                  background: `${
                    day.current ? 'white' : 'var(--color-border)'
                  }`,
                  height: 5,
                  marginTop: 5,
                }}
              />
            ))}
          </div>
        </div>
      );
    });
  }

  /**
   * 渲染周计划
   */
  function renderWeekPlan() {
    return weekPlan[currentDay].plan.map((aPlan, index) => (
      <div className="week-day-item" key={Math.random()}>
        {/* 优化整体长度设置 */}
        <span
          style={{
            width: 730,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {aPlan.content}
        </span>

        <span
          className="weeb-item-delete-wrapper"
          style={{
            width: '5%',
            display: 'flex',
            justifyContent: 'flex-end',
            color: 'rgb(204, 204, 204)',
          }}
        >
          <span
            onClick={() => {
              handleDeletePlanItem(index);
            }}
          >
            ✖
          </span>
        </span>
      </div>
    ));
  }

  return (
    <div
      className="tool-set-week-plan"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div
        className="week"
        style={{
          marginBottom: 20,
          display: 'flex',
        }}
      >
        {renderWeek()}
      </div>
      <div className="week-plan-content">
        <div
          className="week-plan-content-show"
          style={{ width: '100%', height: '460px', overflowY: 'auto' }}
        >
          {renderWeekPlan()}
        </div>
        <input
          className="week-plan-input"
          onKeyPress={handlePressEnterKey}
          onChange={(e) => {
            setCurrentEditingPlanItem(e.target.value);
          }}
          value={currentEditingPlanItem || ''}
        />
      </div>
    </div>
  );
};

export default Test;
