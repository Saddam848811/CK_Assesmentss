import React, { useState, useMemo } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // Expensive calculation: sum from 1 to 10,000,000 multiplied by multiplier
  useMemo(() => {
    console.log('Running expensive calculation...');
    let total = 0;
    for (let i = 1; i <= 10000000; i++) {
      total += i;
    }
    return total * multiplier;
  }, [multiplier]); // Re-run only when multiplier changes

  return (
    <div>
      <h1>useMemo Example with Big Loop</h1>
      {/* <p>Expensive calculation result: {expensiveCalculation}</p> */}

      <button onClick={() => setCount(count + 1)}>
        Increment Count ({count})
      </button>

      <button onClick={() => setMultiplier(multiplier + 1)}>
        Change Multiplier ({multiplier})
      </button>
    </div>
  );
}

export default App;
