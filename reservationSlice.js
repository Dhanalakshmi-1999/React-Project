import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
  name: "reservations",

  initialState: {
    items: [],
  },

  reducers: {
    addReservation: (state, action) => {
      state.items.unshift(action.payload);
    },

    updateReservation: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteReservation: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addReservation,
  updateReservation,
  deleteReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;