<template>
  <section id="single">
      <div class="overlay" v-if="loading">
          <scaling-squares-spinner :color="`#777`"/>
      </div>
      <div class="container">
          <router-link to="/"><button><i class="fa fa-arrow-left"></i> Back</button></router-link>
          <main>
              <div class="flag">
                  <img :src="country.flag" width="100%" :alt="`${country.name} flag`">
              </div>
              <div class="details">
                  <h3 class="title">{{ country.name }}</h3>
                  <div class="content">
                      <ul>
                          <li><strong>Native Name:</strong> {{ country.nativeName }}</li>
                          <li><strong>Population:</strong> {{ country.population }}</li>
                          <li>Region: {{ country.region }}</li>
                          <li>Sub Region: {{ country.subRegion }}</li>
                          <li>Capital: {{ country.capital }}</li>
                      </ul>
                      <ul>
                          <li>Top Level Domain: {{ country.topLevelDomain[0] }}</li>
                          <li>Currencies: {{ country.currencies }} </li>
                          <li>languages: {{ country.languages }} </li>
                      </ul>
                  </div>
              </div>
          </main>
      </div>
  </section>
</template>

<script>
import { ScalingSquaresSpinner } from "epic-spinners";
import axios from "axios";
export default {
    name: "SingleCountry",
    data() {
        return {
            country: [],
            code: this.$route.params.code,
            loading: true
        }
    },
    components: {
        ScalingSquaresSpinner
    },
    async created() {
        const vm = this;
        await axios.get(`https://restcountries.eu/rest/v2/alpha/${vm.code}`).then(res => this.country = res.data);
        this.loading = false;
    }
}
</script>

<style lang="sass" scoped>
section
    position: relative
    min-height: 90vh
    padding: 1.75rem 0
    .overlay
        position: absolute
button
    padding: .5rem 1.75rem
main
    display: flex
    justify-content: space-between
.flag
    min-height: 50vh
h3
    font-size: x-large
.content
    padding-top: 1rem
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    gap: 1rem
    ul
        margin: 0
        li 
            padding: .5rem 0
</style>