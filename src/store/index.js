import { createStore } from 'vuex';
import axios from "axios";

const store = createStore({
  state() {
    return {
      countries: [],
      country: {},
      code: '',
      pics: [],
    }
  },
  getters: {
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
          dispatch('fetchPics', response.data.name);
        });  
      } catch (error) {
        console.log(error);
      }
    },
    fetchPics: async ({ commit, state }, countryName) => {
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
  },
});

export default store;