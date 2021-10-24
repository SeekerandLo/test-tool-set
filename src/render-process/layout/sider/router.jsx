/* eslint-disable react/jsx-filename-extension */
import React from 'react';

const routes = [
  {
    name: '首页',
    link: '/',
    children: null,
    key: 'index',
    icon: '📑',
  },
  {
    name: '项目管理',
    link: null,
    /**
     * 这里的key与variables.css中的类名对应
     * 如想添加新的颜色，则命名为 tool-set-sider-category-${key}
     */
    key: 'test-manage',
    children: [
      {
        name: '周计划',
        link: '/week-plan',
      },
      {
        name: '备忘录',
        link: '/note',
      },
    ],
    icon: '📑',
  },
  {
    name: '实用工具',
    link: null,
    /**
     * 这里的key与variables.css中的类名对应
     * 如想添加新的颜色，则命名为 tool-set-sider-category-${key}
     */
    key: 'practical-tool',
    children: [
      {
        name: 'JSON',
        link: '/json',
      },
    ],
    icon: '📑',
  },
  // http 测试工具
  // 简单压测
  // json 格式化
];

export default routes;
