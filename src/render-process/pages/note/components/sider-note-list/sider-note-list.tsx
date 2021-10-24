import React from 'react';
import ANote from '../a-note/a-note';

type SiderNoteListType = {
  notes: [];
  changeNote: any;
};

function SiderNoteList(props: SiderNoteListType) {
  const { notes, changeNote } = props;

  function renderList() {
    if (notes.length > 0) {
      return notes.map((note, index) => {
        const title = note.text.substring(0, 50);

        return <ANote onClick={() => changeNote(index)} title={title} />;
      });
    }
    return (
      <div
        className="no-content"
        style={{
          borderTop: '1px solid var(--color-border)',
          boxSizing: 'border-box',
        }}
      >
        暂无
      </div>
    );
  }

  return (
    <div
      style={{
        width: 200,
        height: '100%',
        boxSizing: 'border-box',
        // borderTop: '1px solid var(--color-border)',
      }}
    >
      {renderList()}
    </div>
  );
}

export default SiderNoteList;
