import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import fs from 'fs';
import {
  initWeekDBJsonSync,
  weekPlanFilePath,
  updateWeekPlanDBJSON,
} from './db';
import '../../../App.global.css';

const WeekPlan = () => {
  const date = new Date();

  /**
   * state
   */
  const [weekPlan, setWeekPlan] = useState(null);
  // 今天是周几在 week 中的 index
  const [currentDay, setCurrentDay] = useState(
    date.getDay() === 0 ? 7 - 1 : date.getDay() - 1
  );
  const [currentEditingPlanItem, setCurrentEditingPlanItem] = useState('');
  const [showInput, setShowInput] = useState(false);
  // 编辑
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const { x } = useSpring({
    from: { x: 0 },
    x: showInput ? 1 : 0,
    config: { duration: 300 },
  });

  /**
   * effect
   */
  useEffect(() => {
    initWeekDBJsonSync();

    const weekJSON = fs.readFileSync(weekPlanFilePath, 'utf8');

    let tempWeekPlan = [];
    tempWeekPlan = JSON.parse(weekJSON);
    setWeekPlan(tempWeekPlan);
  }, []);

  useEffect(() => {
    if (weekPlan !== null) {
      updateWeekPlanDBJSON(weekPlan);
    }
  }, [weekPlan]);

  /**
   * 按下回车事件
   */
  function handlePressEnterKey(e) {
    if (e.code === 'Enter' && currentEditingPlanItem !== '') {
      const tempWeekPlan = [...weekPlan];

      const currentDayInfo = tempWeekPlan[currentDay];

      if (edit && editIndex != null) {
        currentDayInfo.plan[editIndex].content = currentEditingPlanItem;
        currentDayInfo.plan[editIndex].complete = false;
      } else {
        currentDayInfo.plan.push({
          content: currentEditingPlanItem,
          complete: false,
        });
      }

      // 更新周计划、更新当前编辑值
      setCurrentEditingPlanItem('');
      setEdit(false);
      setEditIndex(null);
      setWeekPlan(tempWeekPlan);
      setShowInput(false);
    }
  }

  /**
   * 删除计划
   * @param index planIndex
   */
  function handleDeletePlanItem(index: number) {
    const tempWeekPlan = [...weekPlan];
    const currentDayInfo = tempWeekPlan[currentDay];

    currentDayInfo.plan.splice(index, 1);
    setWeekPlan(tempWeekPlan);
  }

  function handleCompletePlanItem(index: number) {
    const tempWeekPlan = [...weekPlan];
    const currentDayInfo = tempWeekPlan[currentDay];

    currentDayInfo.plan[index].complete = !currentDayInfo.plan[index].complete;
    setWeekPlan(tempWeekPlan);
  }

  function handleEditPlanItem(index: number) {
    setShowInput(!showInput);
    setEdit(true);

    if (!showInput) {
      setTimeout(() => {
        document.getElementById('week-plan-input')?.focus();
      }, 200);

      const tempWeekPlan = [...weekPlan];
      const currentDayInfo = tempWeekPlan[currentDay];

      const { content } = currentDayInfo.plan[index];
      setCurrentEditingPlanItem(content);
      setEditIndex(index);
    }
  }

  function handleDoubleClick() {
    setShowInput(!showInput);

    if (!showInput) {
      setTimeout(() => {
        document.getElementById('week-plan-input')?.focus();
      }, 200);
    } else {
      setCurrentEditingPlanItem('');
    }
  }

  function renderInput() {
    return (
      <animated.input
        type="text"
        id="week-plan-input"
        className="week-plan-input"
        onKeyPress={handlePressEnterKey}
        onChange={(e) => {
          setCurrentEditingPlanItem(e.target.value);
        }}
        value={currentEditingPlanItem || ''}
        style={{
          opacity: x.to({ range: [0, 1], output: [0, 1] }),
        }}
      />
    );
  }

  /**
   * 渲染顶部的周几
   */
  function renderWeekHeader() {
    if (weekPlan !== null) {
      return weekPlan.map((day, index) => {
        return (
          <div
            key={day.key}
            className="week-header-item"
            onClick={() => {
              setCurrentDay(index);
            }}
          >
            <div className="week-title">
              <span style={{ lineHeight: '100%' }}>
                <span style={{ fontWeight: 'bold' }}>{day.key}</span>
                <span>{day.date}</span>
              </span>
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
              {day.plan.map((item) => {
                if (!item.complete) {
                  return (
                    <div
                      key={Math.random()}
                      style={{
                        background: 'var(--color-border)',
                        height: 5,
                        marginTop: 5,
                      }}
                    />
                  );
                }
              })}
            </div>
          </div>
        );
      });
    }
    return null;
  }

  /**
   * 渲染周计划
   */
  function renderWeekPlan() {
    if (weekPlan !== null) {
      if (weekPlan[currentDay].plan.length === 0) {
        return <div className="week-day-noitem">暂无内容，双击唤出输入框</div>;
      }
      return weekPlan[currentDay].plan.map((aPlan, index) => (
        <div className="week-day-item" key={Math.random()}>
          {/* 优化整体长度设置 */}
          <span
            className={`${
              aPlan.complete
                ? 'week-item-complete week-item-normal'
                : 'week-item-normal'
            }`}
          >
            {aPlan.content}
          </span>

          <span className="week-item-btn-wrapper">
            <span
              className="week-item-btn week-item-complete-btn"
              onClick={() => {
                handleEditPlanItem(index);
              }}
            >
              ✏
            </span>
            <span
              className="week-item-btn week-item-complete-btn"
              onClick={() => {
                handleCompletePlanItem(index);
              }}
            >
              ✔
            </span>
            <span
              className="week-item-btn"
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
  }

  return (
    <div
      className="tool-set-week-plan tool-set-main-padding-20"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div
        className="week"
        style={{
          marginBottom: 20,
          display: 'flex',
        }}
      >
        {renderWeekHeader()}
      </div>
      <div className="week-plan-content" onDoubleClick={handleDoubleClick}>
        <div
          className="week-plan-content-show"
          style={{ width: '100%', height: '460px', overflowY: 'auto' }}
          onScroll={() => {
            setShowInput(false);
          }}
        >
          {renderWeekPlan()}
        </div>
        {renderInput()}
      </div>
    </div>
  );
};

export default WeekPlan;
