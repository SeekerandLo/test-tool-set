import React from 'react';
import Key from './key';
import Punctuation from './punctuation';
import Value from './value';
import Bracket from './bracket';

type LineProps = {
  offset: number;
  keyV: string;
  value: string | number | Array<unknown> | Record<string, unknown>;
  showKey: boolean;
  showValueQuotation: boolean;
};

const LeftBraces = <Bracket type="{" />;
const LeftMidBracket = <Bracket type="[" />;
const RightMidBracket = <Bracket type="]" />;

const Line = (props: LineProps, state: any) => {
  const { offset, keyV: key, value, showKey, showValueQuotation } = props;

  const showArray = [];

  function parse() {
    if (showKey) {
      showArray.push(<Key value={key} />);
      showArray.push(<Punctuation type=":" />);
    }

    // value 的类型，决定了这一行如何展示
    // if (typeof value === 'string' || typeof value === 'number') {
      showArray.push(<Value value={value} showValueQuotation={showValueQuotation} />);
  }

  parse();

  return (
    <div style={{ display: 'flex', marginLeft: offset * 20 }}>{showArray}</div>
  );
};

export default Line;
