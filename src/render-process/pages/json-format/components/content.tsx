import React from 'react';

import Line from './line';

// TODO 考虑 js 数组自动排序

type KeyProps = {
  content: string;
};

type jsonType = {
  type: string;
  valueType: null | string;
  key: string;
  value: string | number | unknown;
  line: string;
  component: React.ReactChild;
  depth: number;
};

// 遍历json的所有情况

// 深度优先遍历
function dfs(jsonObject, jsonObjectArray: jsonType[], depth) {
  const entries = Object.entries(jsonObject);
  entries.forEach(([key, value]) => {
    if (value instanceof Array) {
      jsonObjectArray.push({
        type: 'array start',
        valueType: 'token',
        key,
        value: '[',
        line: `${key}:[`,
        component: (
          <Line
            keyV={key}
            showKey
            value="["
            offset={depth}
            showValueQuotation={false}
          />
        ),
        depth,
      });
      dfs(value, jsonObjectArray, depth + 1);
      jsonObjectArray.push({
        type: 'array end',
        valueType: 'token',
        key,
        value: ']',
        line: `[`,
        component: (
          <Line
            keyV={key}
            showKey={false}
            value="]"
            offset={depth}
            showValueQuotation={false}
          />
        ),
        depth,
      });
    } else if (value instanceof Object) {
      jsonObjectArray.push({
        type: 'object start',
        valueType: 'token',
        key,
        value: '{',
        line: `${key}:{`,
        component: (
          <Line
            keyV={key}
            showKey
            value="{"
            offset={depth}
            showValueQuotation={false}
          />
        ),
        depth,
      });
      dfs(value, jsonObjectArray, depth + 1);
      jsonObjectArray.push({
        type: 'object end',
        valueType: 'token',
        key,
        value: '}',
        line: '}',
        component: (
          <Line
            keyV={key}
            showKey={false}
            value="}"
            offset={depth}
            showValueQuotation={false}
          />
        ),
        depth,
      });
    } else {
      jsonObjectArray.push({
        // 表示是有内容的，
        type: 'content',
        valueType: 'content',
        key,
        value,
        line: `${key}:${value}`,
        component: (
          <Line
            keyV={key}
            value={value}
            showKey
            offset={depth}
            showValueQuotation
          />
        ),
        depth,
      });
      return jsonObjectArray;
    }
  });
}

const Content = (props: KeyProps, state) => {
  // content 是一个字符窜
  const { content } = props;

  const jsonObjectArray = [];

  dfs(content, jsonObjectArray, 1);

  jsonObjectArray.unshift({
    type: 'all start',
    valueType: 'token',
    key: null,
    value: '{',
    line: `{`,
    depth: 0,
    component: (
      <Line
        keyV={null}
        showKey={false}
        value="{"
        offset={0}
        showValueQuotation={false}
      />
    ),
  });

  jsonObjectArray.push({
    type: 'all end',
    valueType: 'token',
    key: null,
    value: '}',
    line: `}`,
    depth: 0,
    component: (
      <Line
        keyV={null}
        value="}"
        showKey={false}
        showValueQuotation={false}
        offset={0}
      />
    ),
  });

  function renderLines(lines) {
    return lines.map((line) => line.component);
  }

  return <div>{renderLines(jsonObjectArray)}</div>;
};

export default Content;
