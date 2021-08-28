import React from 'react';

type BracesProps = {
  type: string;
};

const Braces = (props: BracesProps, state) => {
  const { type } = props;

  return <div>{type}</div>;
};

export default Braces;
