import React from 'react';
import { useSpring, animated } from 'react-spring';
import '../../../App.global.css';

const Index = () => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 300,
  });

  return (
    <div>
      <animated.div
        style={{
          borderLeft: '4px solid #e0e3e6',
          padding: '0 15px',
          color: 'var(--color-subtle)',
          ...props,
        }}
      >
        TTS
      </animated.div>
    </div>
  );
};

export default Index;
