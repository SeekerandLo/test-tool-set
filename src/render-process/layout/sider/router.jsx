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
    name: '测试管理',
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
    ],
    icon: '📑',
  },
];

export default routes;
