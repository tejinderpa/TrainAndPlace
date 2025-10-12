import React, { useState, useEffect } from 'react';

const HookTest = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello from React!');

  useEffect(() => {
    setMessage('Hello from React with useEffect!');
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <h1>React Hook Test</h1>
      <p>{message}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default HookTest;