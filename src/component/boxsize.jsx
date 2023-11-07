import React, { useRef } from 'react';

const MyComponent = () => {
  const elementRef = useRef(null);

  const getBoundingRect = () => {
    const element = elementRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      console.log(rect, element.offsetWidth, element.offsetHeight);
    }
  };

  return (
    <div>
      <div ref={elementRef} style={{ width: '100px', height: '100px', background: 'blue' }}>
        {/* Content */}
      </div>
      <button onClick={getBoundingRect}>Get Bounding Rect</button>
    </div>
  );
};

export default MyComponent;
