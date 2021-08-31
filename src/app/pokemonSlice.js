import { createSlice } from "@reduxjs/toolkit";
import fetch from "node-fetch";

export const initialState = {
  pokemon: [],
  filters: [],
  searchPokemon: [],
  loading: false,
  searchLoading: false,
  searchError: false,
  hasErrors: false,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    getPokemon: (state) => {
      state.loading = true;
    },
    getPokemonSuccess: (state, { payload }) => {
      state.pokemon = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getPokemonFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getFilters: (state) => {
      return state.filters;
    },
    getSearchPokemon: (state) => {
      return state.searchPokemon;
    },
    pokemonSearch: (state) => {
      state.searchLoading = true;
    },
    searchPokemonSuccess: (state, { payload }) => {
      state.searchError = false;
      state.searchLoading = false;
      state.searchPokemon = payload;
    },
    searchPokemonFailed: (state) => {
      state.searchLoading = false;
      state.searchError = true;
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
export const searchSelector = (state) => state;

export const {
  getPokemon,
  getPokemonSuccess,
  getPokemonFailure,
  getFilters,
  getSearchPokemon,
  pokemonSearch,
  searchPokemonSuccess,
  searchPokemonFailed,
  addFilter,
  removeFilter,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;

// This function will run and only return a singular pokemon
//  when submit is pressed on the input
export function searchPokemonByName(name) {
  name = name.toLowerCase(); // ensure lowercase is passed
  return async (dispatch) => {
    pokemonSearch(true);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const json = await response.json();
      dispatch(searchPokemonSuccess(json));
    } catch (error) {
      console.log("error");
      dispatch(searchPokemonFailed());
    }
  };
}

export function fetchPokemon() {
  return async (dispatch) => {
    dispatch(getPokemon());

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=151`
      );
      const json = await response.json();

      const { results = [] } = json;

      const pokemon = await Promise.all(
        results.map(async (result) => {
          const { url } = result;
          const pokeResponse = await fetch(url);
          return await pokeResponse.json();
        })
      );

      dispatch(getPokemonSuccess(pokemon));
    } catch (error) {
      console.log("error");
      dispatch(getPokemonFailure());
    }
  };
}
