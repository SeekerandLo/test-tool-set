import React, { useState } from 'react';

import Punctuation from './punctuation';

type ValueProps = {
  value: string | number | Array<unknown> | Record<string, unknown>;
  showValueQuotation: boolean;
  // 是 token 还是 content
  valueType: string;
  // 是否添加逗号
  addComma: boolean;
  type: string;
};

const quotationMark = <Punctuation type={'"'} />;

const Value = (props: ValueProps, state) => {
  const { value, showValueQuotation, valueType, addComma, type } = props;

  const valueArray = [];

  // 当 value 只是一个字符串时，增加引号
  if (typeof value === 'string') {
    valueArray.push(value);

    if (showValueQuotation) {
      valueArray.unshift(quotationMark);
      valueArray.push(quotationMark);
    }
  } else if (typeof value === 'number') {
    valueArray.push(value);
  }

  if (
    valueType === 'content' ||
    type === 'object end' ||
    type === 'array end'
  ) {
    if (addComma) {
      valueArray.push(',');
    }
  }

  function getColor() {
    if (valueType === 'content') {
      if (typeof value === 'string') {
        return '#007777';
      }
      return '#AA00AA';
    }
    return 'black';
  }

  const color = getColor();

  return (
    <div
      className="tool-set-json-value"
      style={{
        display: 'flex',
        color,
      }}
    >
      {valueArray}
    </div>
  );
};

export default Value;
