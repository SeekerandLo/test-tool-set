import React from 'react';
import Punctuation from './punctuation';

type ValueProps = {
  value: string | number | Array<unknown> | Record<string, unknown>;
  showValueQuotation: boolean;
};

const quotationMark = <Punctuation type={'"'} />;

const Value = (props: ValueProps, state) => {
  const { value, showValueQuotation } = props;

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

  return <div style={{ display: 'flex' }}>{valueArray}</div>;
};

export default Value;
