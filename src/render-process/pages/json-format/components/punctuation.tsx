import React from 'react';

type PunctuationProps = {
  type: string;
};

const Punctuation = (props: PunctuationProps, state) => {
  const { type } = props;

  return <div>{type}</div>;
};

export default Punctuation;
