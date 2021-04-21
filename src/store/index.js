import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [],
  },
  getters: {
    allCountries: (state) => state.countries,
  },
  actions: {
    fetchCountries: ({ commit }) => {
      axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        commit("setCountries", response.data);
      });
    },
  },
  mutations: {
    setCountries: (state, payload) => (state.countries = payload),
  },
  modules: {},
});