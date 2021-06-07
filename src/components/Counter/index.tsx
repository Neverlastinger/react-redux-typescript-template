import React, { useState } from 'react';
import styles from './index.module.scss';
import useCounter from './useCounter';

export default function Counter(): JSX.Element {
  const [incrementAmount, setIncrementAmount] = useState('2');
  const { isLoading, data, increment } = useCounter({ incrementAmount: Number(incrementAmount) });

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{isLoading ? 'loading' : data!.data}</span>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.asyncButton}
          onClick={increment}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
