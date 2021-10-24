import React from 'react';

type ANoteType = {
  title: string;
  onClick: any;
};

function ANote(props: ANoteType) {
  const { title, onClick } = props;
  return (
    <div className="a-note" onClick={onClick}>
      {title}
    </div>
  );
}

export default ANote;
