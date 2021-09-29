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
    fetchCountries: async ({ commit }) => {
      await axios
        .get("https://restcountries.com/v2/all")
        .then((response) => {
          commit("setCountries", response.data);
        });
    },
  },
  mutations: {
    setCountries: (state, payload) => (state.countries = payload),
  },
  modules: {},
});
