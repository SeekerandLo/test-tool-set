import React from 'react';
import Punctuation from './punctuation';

type KeyProps = {
  value: string | null;
};

const Key = (props: KeyProps, state) => {
  const { value } = props;

  return (
    <div className="tool-set-json-key" style={{ display: 'flex' }}>
      <Punctuation type={'"'} />
      <div style={{ color: 'var(--color-accent)' }}>{value}</div>
      <Punctuation type={'"'} />
    </div>
  );
};

export default Key;
