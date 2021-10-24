import React, { useEffect, useState } from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';

type ANodteEditorType = {
  haveContent: boolean;
  text?: string;
  html?: string;
  save?: any;
};

function ANoteEditor(props: ANodteEditorType) {
  const { haveContent, text, html, save } = props;

  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState('')
  );
  const [currentHtml, setCurrentHtml] = useState('');
  const [currentText, setCurrentText] = useState('');

  const controls = [
    'bold',
    'italic',
    'underline',
    'list-ol',
    'list-ul',
    'separator',
    'link',
    'separator',
  ];

  const extendControls = [
    {
      key: 'save',
      type: 'button',
      text: '保存',
      onClick: () => {
        // 调用外部的 save 方法
        save(currentHtml, currentText);
      },
    },
  ];

  function handleChange(editorState) {
    setEditorState(editorState);
    setCurrentHtml(editorState.toHTML());
    setCurrentText(editorState.toText());
  }

  useEffect(() => {
    handleChange(BraftEditor.createEditorState(html));
  }, [html]);

  function renderEditor() {
    if (haveContent) {
      return (
        <BraftEditor
          value={editorState}
          controls={controls}
          onChange={handleChange}
          extendControls={extendControls}
        />
      );
    }
    return <div className="no-content">暂无内容</div>;
  }

  return (
    <div className="note-editor" style={{ height: '100%' }}>
      <div className="editor-wrapper">{renderEditor()}</div>
    </div>
  );
}

ANoteEditor.defaultProps = {
  text: '',
  html: '',
  save: null,
};

export default ANoteEditor;
