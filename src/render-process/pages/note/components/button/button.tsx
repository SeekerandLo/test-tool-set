import React from 'react';

type NoteToolBtnType = {
  children: string | React.ReactChildren;
  onClick: null | any;
  title: string;
};

function Button(props: NoteToolBtnType) {
  const { onClick, children, title } = props;

  return (
    <button className="note-tool-btn" onClick={onClick} type="button" title={title}>
      {children}
    </button>
  );
}

export default Button;
