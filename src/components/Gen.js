import React, { useState } from 'react';

export default function Gen() {
  const [count, setcount] = useState(0);

  return (
    <div className='gen'>
      <div className='gen-ad1'></div>
      <div className='gen-ad2'></div>
      <div className='gen-donation'>
        <h2>DONATE</h2>
        <div className='total-dont'>Total Donation: {count}</div>
        <div className='dont'>
          <button className='dont-a' onClick={() => setcount(count + 10)}>
            10
          </button>
          <button className='dont-b' onClick={() => setcount(count + 100)}>
            100
          </button>
          <button className='dont-c' onClick={() => setcount(count + 1000)}>
            1000
          </button>
        </div>
      </div>
    </div>
  );
}
