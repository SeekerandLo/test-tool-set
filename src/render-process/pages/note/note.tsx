import React, { useEffect, useState } from 'react';
import ToolButton from './components/button/button';
import ANoteEditor from './components/a-note-editor/a-note-editor';
import ANoteSider from './components/sider-note-list/sider-note-list';
import { initSync, notesPath, update, read } from './db';

function Note() {
  const [notes, setNotes] = useState([]);
  const [noteIndex, setNoteIndex] = useState(-1);

  useEffect(() => {
    initSync();
    const tempNotes = read(notesPath);
    setNotes(tempNotes);

    if (tempNotes.length > 0) {
      setNoteIndex(tempNotes.length - 1);
    }
  }, []);

  function add() {
    const tempNotes = [...notes];
    const aNote = {
      text: '✍',
      html: '',
    };

    tempNotes.push(aNote);
    setNotes(tempNotes);

    const tempNoteIndex = noteIndex + 1;
    setNoteIndex(tempNoteIndex);
  }

  function deleteNote() {
    // must 没有保存的文件删除不了
    // 删除之后，转到最新的一个note

    const currentIndex = noteIndex;
    const tempNotes = notes;
    tempNotes.splice(currentIndex, 1);
    setNotes(tempNotes);
    setNoteIndex(tempNotes.length - 1);
    update(tempNotes);
  }

  function save(html: string, text: string) {
    const tempNotes = [...notes];
    const aNode = tempNotes[noteIndex];

    aNode.html = html;
    aNode.text = text;

    setNotes(tempNotes);

    // 保存至本地
    update(tempNotes);
  }

  function renderEditor() {
    // TODO note 切换
    if (notes.length > 0) {
      const note = notes[noteIndex];
      return (
        <ANoteEditor
          haveContent
          save={save}
          text={note.text}
          html={note.html}
        />
      );
    }
    return <ANoteEditor haveContent={false} />;
  }

  function changeNote(index: number) {
    // TODO 自动保存
    setNoteIndex(index);
  }

  return (
    <div
      className=""
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <div
        style={{
          width: 30,
          padding: '5px 0 5px 0',
          background: '#fafafa',
          color: 'rgb(204, 204, 204)',
        }}
      >
        <ToolButton onClick={add} title="新建">
          ✔
        </ToolButton>
        <ToolButton onClick={deleteNote} title="删除">
          ✖
        </ToolButton>
      </div>
      <ANoteSider notes={notes} changeNote={changeNote} />
      <div style={{ flex: 1, height: '100%' }}>{renderEditor()}</div>
    </div>
  );
}

export default Note;
