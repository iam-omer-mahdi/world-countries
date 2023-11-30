import { createStore } from 'vuex';
import axios from "axios";

const store = createStore({
  state() {
    return {
      countries: [],
      country: {},
      code: '',
      pics: [],
      error: null,
    }
  },
  getters: {
    getError: (state) => state.error,
    allCountries: (state) => state.countries,
    getCountryPics: (state) => {
      let randomPics = [];

      randomPics.push(state.pics[Math.floor(Math.random() * 2)]);
      randomPics.push(state.pics[Math.floor(Math.random() * 2) + 3]);
      randomPics.push(state.pics[Math.floor(Math.random() * 2) + 6]);

      return randomPics
    },
  },
  actions: {
    fetchCountries: async ({ commit }) => {
      try {
        await axios
          .get("https://restcountries.com/v2/all")
          .then((response) => {
            commit("setCountries", response.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    fetchCountry: async ({ commit, dispatch }, countryCode) => {
      try {
        await axios
        .get(`https://restcountries.com/v2/alpha/${countryCode}`)
        .then((response) => {
          commit("setCountry", response.data)
          commit("setCode", response.data.alpha3Code)
          commit("setError", null)
          commit("setPics", [])
          dispatch('fetchPics', response.data.name);
        });  
      } catch (error) {
        if (error.response.status === 404 || error.response.status === 400) {
          await commit("setError", {status: 404, message: 'Error 404 not found'})
        }
        if (error.status === 404 || error.status === 400) {
          await commit("setError", {status: 404, message: 'Error 404 not found'})
        }
      }
    },
    fetchPics: async ({ commit }, countryName) => {
      try {
        
        await axios
        .get(`https://api.unsplash.com/search/photos/?client_id=${import.meta.env.VITE_CLIENT_ID}&query=${countryName}`)
        .then((response) => {
          commit("setPics", response.data.results)
        });
        
      } catch (error) {
        console.log(error); 
      }
    }
  },
  mutations: {
    setCountries: (state, payload) => (state.countries = payload),
    setCountry: (state, payload) => (state.country = payload),
    setCode: (state, payload) => (state.code = payload),
    setPics: (state, payload) => (state.pics = payload),
    setError: (state, payload) => (state.error = payload),
  },
});

export default store;