import React from 'react';
import Content from './components/content';
import example3 from './example/example3.json';

const JsonFormat = () => {
  return (
    <div className="tool-set-json">
      <Content content={example3} />
    </div>
  );
};

export default JsonFormat;
