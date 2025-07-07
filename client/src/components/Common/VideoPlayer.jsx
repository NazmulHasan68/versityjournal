import React, { useState } from 'react';
import YouTube from 'react-youtube';

export default function VideoPlayer() {
  const [ended, setEnded] = useState(false);

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      fs: 1,
      loop: 0,
      playlist: 'm_ftVZmXHvo',
      start: 0,
      end: 0,
      disablekb: 0,
      playsinline: 1,
      cc_load_policy: 0,
      color: 'red',
      theme: 'dark',
      enablejsapi: 1,
    },
  };

  // ভিডিও শেষ হলে কলব্যাক ফাংশন
  const handleVideoEnd = () => {
    setEnded(true);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', paddingTop: 40, textAlign: 'center' }}>
      {!ended ? (
        <YouTube videoId="m_ftVZmXHvo" opts={opts} onEnd={handleVideoEnd} />
      ) : (
        <h2 className='py-40 mx-auto'>Hello World</h2>  
      )}
    </div>
  );
}
