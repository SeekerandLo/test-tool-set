import React from 'react';
import Key from './key';
import Punctuation from './punctuation';
import Value from './value';

type LineContent = {
  // 该行的 key
  key: string | null;
  // 该展示的内容
  value: string | Record<string, unknown> | Array<unknown>;
  // 是否展示 key
  showKey: boolean;
  // 是否展示 value 的引号
  showValueQuotation: boolean;
  // 这一行的类型，TODO 可枚举
  type: string;
  // value 的类型，TODO 可枚举
  valueType: string;
  // 行末尾是否添加逗号
  addComma: boolean;
};

type LineProps = {
  offset: number;
  line: LineContent;
};

const Line = (props: LineProps, state: any) => {
  const { offset, line } = props;

  const { key, value, showKey, showValueQuotation, type, valueType, addComma } = line;

  const showArray = [];

  function parse() {
    if (showKey && key !== null) {
      if (type !== 'array content') {
        showArray.push(<Key value={key} />);
        showArray.push(<Punctuation type=":" />);
      }
    }

    // value 的类型，决定了这一行如何展示
    // if (typeof value === 'string' || typeof value === 'number') {
    showArray.push(
      <Value
        valueType={valueType}
        value={value}
        showValueQuotation={showValueQuotation}
        addComma={addComma}
        type={type}
      />
    );
  }

  parse();

  return (
    <div
      className="tool-set-json-line"
      style={{ display: 'flex', marginLeft: offset * 20 }}
    >
      {showArray}
    </div>
  );
};

export default Line;
