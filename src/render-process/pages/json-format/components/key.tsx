import React from 'react';
import Punctuation from './punctuation';

type KeyProps = {
  value: string;
};

const Key = (props: KeyProps, state) => {
  const { value } = props;

  return (
    <div style={{ display: 'flex' }}>
      <Punctuation type={'"'} />
      <div style={{ color: 'var(--color-accent)' }}>{value}</div>
      <Punctuation type={'"'} />
    </div>
  );
};

export default Key;
