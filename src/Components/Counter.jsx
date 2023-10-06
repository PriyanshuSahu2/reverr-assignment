import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCounterName,
  decrement,
  deleteCounter,
  increment,
  resetCounter,
  setCounter,
} from "../redux/counterReducer";
import styles from "./Counter.module.css"; // Import the CSS module

const Counter = ({ index }) => {
  const [openLabel, setOpenLabel] = useState(false);
  const [openSetCounter, setOpenSetCounter] = useState(false);
  const count = useSelector((state) => state.counter.counters[index].count);
  const name = useSelector((state) => state.counter.counters[index].name);
  const dispatch = useDispatch();
  const [countInput, setCountInput] = useState(0);
  const [nameInput, setNameInput] = useState("");

  const handleIncrement = () => {
    dispatch(increment({ index }));
  };

  const handleDecrement = () => {
    if (count > 0) {
      dispatch(decrement({ index }));
    }
  };

  const reset = () => {
    dispatch(resetCounter({ index }));
  };

  const handleSetCount = () => {
    if (openSetCounter) {
      dispatch(setCounter({ index, value: Number(countInput) }));
      setOpenSetCounter(false);
    } else {
      setOpenSetCounter(true);
    }
  };

  const handleChangeName = () => {
    if (openLabel) {
      dispatch(changeCounterName({ index, value: nameInput }));
      setOpenLabel(false);
    } else {
      setOpenLabel(true);
    }
  };

  const handleDeleteCounter = () => {
    dispatch(deleteCounter({ index }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
        <button className={styles.closeButton} onClick={handleDeleteCounter}>
          X
        </button>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.display}>{count}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleDecrement}>
            -
          </button>
          <button className={styles.button} onClick={handleIncrement}>
            +
          </button>
        </div>
        <button className={styles.nameButtons} onClick={reset}>
          Reset Counter
        </button>
        <button className={styles.nameButtons} onClick={handleSetCount}>
          {openSetCounter ? "Apply" : "Set Counter"}
        </button>
        {openSetCounter && (
          <input
            className={styles.input}
            placeholder="Enter Count"
            type="number"
            onChange={(e) => {
              setCountInput(e.target.value);
            }}
          />
        )}
        <button className={styles.nameButtons} onClick={handleChangeName}>
          {openLabel ? "Apply" : "Change Label"}
        </button>
        {openLabel && (
          <input
            className={styles.input}
            placeholder="Enter Label"
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Counter;
