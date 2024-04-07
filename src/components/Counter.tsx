import React, { useState } from 'react';
import * as classes from "./counter.module.scss";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count => count + 1);
  }

  return (
    <div>
      <div>{count}</div>
      <button className={classes.button} onClick={increment}>click me</button>
    </div>
  );
};

export default Counter;
