import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  filters: [],
  loading: false,
  hasErrors: false,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    getFilters: (state) => {
      return state.filters;
    },
    addFilter: (state, { payload }) => {
      state.filters.push(payload);
    },
    removeFilter: (state, { payload }) => {
      state.filters = state.filters.filter((filter) => filter !== payload);
    },
  },
});

export const pokemonSelector = (state) => state.pokemon;

export const {
  getFilters,
  addFilter,
  removeFilter,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
