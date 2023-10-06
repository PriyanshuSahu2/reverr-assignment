// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counters: [{ count: 0 }],
  },
  reducers: {
    addCounter: (state) => {
      state.counters.push({ count: 0, name: "Counter" });
    },
    increment: (state, action) => {
      const { index } = action.payload;
      state.counters[index].count += 1;
    },
    decrement: (state, action) => {
      const { index } = action.payload;
      if (state.counters[index].count > 0) {
        state.counters[index].count -= 1;
      }
    },
    setCounter: (state, action) => {
      const { index, value } = action.payload;
      state.counters[index].count = value;
    },
    changeCounterName: (state, action) => {
      const { index, value } = action.payload;
      state.counters[index].name = value;
    },
    deleteCounter: (state, action) => {
      const { index } = action.payload;
      state.counters.splice(index, 1);
    }
  },
});

export const {
  addCounter,
  increment,
  decrement,
  setCounter,
  changeCounterName,
  deleteCounter
} = counterSlice.actions;

export default counterSlice.reducer;
