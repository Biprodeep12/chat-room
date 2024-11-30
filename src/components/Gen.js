import React, { useState, useEffect } from 'react';

export default function Gen() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('totalDonation');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('totalDonation', count.toString());
  }, [count]);

  return (
    <div className='gen'>
      <a
        href='https://youtu.be/Ezo-CO6iWiY?si=-I7_L6c_CeFCZ9yl'
        className='gen-ad1'>
        <p id='gen-sec1'>Learn Cinematography and singing</p>
        <p id='gen-sec2'>by Professionals</p>
        <p id='gen-sec3'>(Click Here)</p>
      </a>
      <a href='https://drug-shop-k8vj.vercel.app' className='gen-ad2'>
        <p id='ad-sec1'>Get 100% Off on Medicines</p>
        <p id='ad-sec2'>Get Delevried in 24 years</p>
        <img src='medicine_ff.webp' alt='drug' />
      </a>
      <div className='gen-donation'>
        <h2>DONATE</h2>
        <div className='total-dont'>Total Donation: ${count}</div>
        <div className='dont'>
          <button className='dont-a' onClick={() => setCount(count + 10)}>
            10
          </button>
          <button className='dont-b' onClick={() => setCount(count + 100)}>
            100
          </button>
          <button className='dont-c' onClick={() => setCount(count + 1000)}>
            1000
          </button>
        </div>
      </div>
    </div>
  );
}
