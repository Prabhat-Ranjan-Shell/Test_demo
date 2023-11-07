import React, { useState, useMemo } from 'react';

const ExpensiveComponent = ({ value }) => {
  const expensiveResult = useMemo(() => {
    console.log('Calculating expensiveResult...');
    let result = 0;
    for (let i = 0; i < value; i++) {
      result += i;
    }
    return result;
  }, [value]);

  return <div>Expensive Result: {expensiveResult}</div>;
};

const App = () => {
  const [count, setCount] = useState(5);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setCount(count - 1)}>Decremement Count</button>
      <input type="text" name="name" id="username" />
      <ExpensiveComponent value={count} />
    </div>
  );
};

export default App;
