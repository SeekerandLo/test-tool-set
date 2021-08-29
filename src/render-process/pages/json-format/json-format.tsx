import React, { useState } from 'react';

import Content from './components/content';

const JsonFormat = () => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  // 获取输入框中数据
  function inputJsonContent(e) {
    try {
      if (e.target.value === '') {
        setContent(null);
        setError(null);
      } else {
        const json = JSON.parse(e.target.value);
        setContent(json);
      }
    } catch (err) {
      setContent(null);
      setError(err.toString());
    }
  }

  return (
    <div
      className="tool-set-json"
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div
        className="tool-set-json-editor"
        style={{ height: '100%', width: '49%' }}
      >
        <textarea
          style={{
            height: '100%',
            boxSizing: 'border-box',
            width: '100%',
            resize: 'none',
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            outline: 'none',
            fontSize: 14,
            padding: 5,
          }}
          onChange={inputJsonContent}
        />
      </div>
      <div
        className="tool-set-json-viewer"
        style={{ height: '100%', width: '49%' }}
      >
        <Content content={content} error={error} />
      </div>
    </div>
  );
};

export default JsonFormat;
