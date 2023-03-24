import React, { useRef } from 'react';
import './ScrollingDial.css';

const ScrollingDial = ({ segments, selectedSegment }) => {
  const dialRef = useRef(null);

  const scrollToSelectedSegment = () => {
    const segmentHeight = dialRef.current.scrollHeight / segments.length;
    const scrollToY = selectedSegment * segmentHeight;

    dialRef.current.scrollTo({
      top: scrollToY,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    if (selectedSegment !== null) {
      scrollToSelectedSegment();
    }
  }, [selectedSegment]);

  return (
    <div className="scrolling-dial-container">
      <div className="scrolling-dial" ref={dialRef}>
        {segments.map((segment, index) => (
          <div key={index} className={`dial-segment ${index % 2 === 0 ? 'even' : 'odd'}`}>
            {segment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingDial;
