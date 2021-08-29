import React from 'react';

type PunctuationProps = {
  type: string;
};

const Punctuation = (props: PunctuationProps, state) => {
  const { type } = props;

  return (
    <div
      className="tool-set-json-punctuation"
      style={{ margin: '0 2px 0 2px' }}
    >
      {type}
    </div>
  );
};

export default Punctuation;
