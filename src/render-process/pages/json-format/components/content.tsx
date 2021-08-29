import React from 'react';
import {
  buildArrayAllEndLine,
  buildArrayAllStartLine,
  buildArrayEndLine,
  buildArrayStartLine,
  buildContentLine,
  buildObjectAllEndLine,
  buildObjectAllStartLine,
  buildObjectEndLine,
  buildObjectStartLine,
} from './buile-line';
import Line from './line';

// TODO 考虑 js 数组自动排序

type KeyProps = {
  content: Record<string, unknown> | Array<unknown> | null | string;
  error: string | null;
};

// 深度优先遍历
function dfs(jsonObject, jsonObjectArray, depth, belong, jsonObjectLength) {
  const entries = Object.entries(jsonObject);
  entries.forEach(([key, value], index) => {
    if (value instanceof Array) {
      let arrayStartLine = null;
      if (belong === 'array') {
        arrayStartLine = buildArrayStartLine(null);
      } else {
        arrayStartLine = buildArrayStartLine(key);
      }
      jsonObjectArray.push(<Line line={arrayStartLine} offset={depth} />);

      dfs(value, jsonObjectArray, depth + 1, 'array', value.length);

      let addComma = false;
      if (index + 1 < jsonObjectLength) {
        addComma = true;
      }
      const arrayEndLine = buildArrayEndLine(key, addComma);
      jsonObjectArray.push(<Line line={arrayEndLine} offset={depth} />);
    } else if (value instanceof Object) {
      // 如果对象属于 array，则 key 暂时置为 null
      let objectStartLine = null;
      if (belong === 'array') {
        objectStartLine = buildObjectStartLine(null);
      } else {
        objectStartLine = buildObjectStartLine(key);
      }
      jsonObjectArray.push(<Line line={objectStartLine} offset={depth} />);

      dfs(
        value,
        jsonObjectArray,
        depth + 1,
        'object',
        Object.keys(value).length
      );

      let addComma = false;
      if (index + 1 < jsonObjectLength) {
        addComma = true;
      }
      // TODO 加逗号的逻辑
      const objectEndLine = buildObjectEndLine(key, addComma);
      jsonObjectArray.push(<Line line={objectEndLine} offset={depth} />);
    } else {
      let addComma = false;
      if (index + 1 < jsonObjectLength) {
        addComma = true;
      }

      const contentLine = buildContentLine(key, value, belong, addComma);
      jsonObjectArray.push(<Line line={contentLine} offset={depth} />);

      return jsonObjectArray;
    }
  });
}

function fillArray(jsonObjectArray) {
  const arrayStartLine = buildArrayAllStartLine();
  const arrayEndLine = buildArrayAllEndLine();

  jsonObjectArray.unshift(<Line line={arrayStartLine} offset={0} />);
  jsonObjectArray.push(<Line line={arrayEndLine} offset={0} />);
}

function fillObject(jsonObjectArray) {
  const objectStartLine = buildObjectAllStartLine();
  const objectEndLine = buildObjectAllEndLine();

  jsonObjectArray.unshift(<Line line={objectStartLine} offset={0} />);
  jsonObjectArray.push(<Line line={objectEndLine} offset={0} />);
}

const Content = (props: KeyProps, state) => {
  // content 已经是一个 json 对象了
  const { content, error } = props;

  if (content === null && error !== null) {
    return (
      <div
        className="tool-set-json-viewer-content"
        style={{ color: 'hsl(330, 65%, 48%)' }}
      >
        {error}
      </div>
    );
  }

  const jsonObjectArray = [];

  if (content !== null) {
    dfs(
      content,
      jsonObjectArray,
      1,
      content instanceof Array ? 'array' : 'object',
      Object.keys(content).length
    );

    if (content instanceof Array) {
      fillArray(jsonObjectArray);
    } else if (content instanceof Object) {
      fillObject(jsonObjectArray);
    }
  }

  console.log(jsonObjectArray);

  return (
    <div
      className="tool-set-json-viewer-content"
      style={{
        background: 'rgb(245, 245, 245)',
        padding: 5,
        boxSizing: 'border-box',
        overflowY: 'auto',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      {jsonObjectArray}
    </div>
  );
};

export default Content;
