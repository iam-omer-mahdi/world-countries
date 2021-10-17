<template>
  <section id="country">
    <div class="overlay" style="position: absolute" v-if="loading">
      <hollow-dots-spinner :color="'#666'" />
    </div>
    <div class="container">
      <router-link to="/"
        ><button><i class="fa fa-arrow-left"></i> Back</button></router-link
      >
      <article>
        <div
          class="flag"
          :style="`background: url(${country.flag}) center/cover no-repeat`"
        ></div>
        <div class="details">
          <h3 class="title">{{ country.name }}</h3>
          <div class="content">
            <ul>
              <li><strong>Native Name:</strong> {{ country.nativeName }}</li>
              <li><strong>Population:</strong> {{ country.population }}</li>
              <li><strong>Region:</strong> {{ country.region }}</li>
              <li><strong>Sub Region:</strong> {{ country.subregion }}</li>
              <li><strong>Capital:</strong> {{ country.capital }}</li>
            </ul>
            <ul>
              <li><strong>Alfa 3 Code</strong>: {{ country.alpha3Code }}</li>
              <li>
                <strong>Timezones</strong>:
                <span v-for="zone in country.timezones" :key="zone.name">
                  <span> {{ zone }}, </span>
                </span>
              </li>
              <li>
                <strong>Currencies</strong>:
                <span
                  v-for="currency in country.currencies"
                  :key="currency.name"
                >
                  <span> {{ currency.name }}, </span>
                </span>
              </li>
              <li>
                <strong>Languages</strong>:
                <span v-for="lang in country.languages" :key="lang.name">
                  <span> {{ lang.name }}, </span>
                </span>
              </li>
            </ul>
          </div>
          <div>
            <strong>Border Countries</strong>:
            <span class="borders">
              <router-link
                tag="span"
                :to="`/country/${border}`"
                v-for="border in country.borders"
                :key="border"
              >
                <button class="borderCountry">{{ border }}</button>
              </router-link>
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import HollowDotsSpinner from "../components/HollowDotsSpinner";
import axios from "axios";
import { gsap } from "gsap";
export default {
  name: "SingleCountry",
  data() {
    return {
      country: [],
      code: this.$route.params.code,
      loading: true,
    };
  },
  components: {
    HollowDotsSpinner,
  },
  async created() {
    const vm = this;
    // Getting data from api
    await axios
      .get(`https://restcountries.com/v2/alpha/${vm.code}`)
      .then((res) => (this.country = res.data));
    // Stoping the loader
    this.loading = false;
    // Animation
    gsap.from(".flag", {
      duration: 0.8,
      x: -100,
      opacity: 0,
      ease: "back",
    });
    gsap.from("h3", {
      duration: 0.8,
      x: 50,
      opacity: 0,
      ease: "back",
    });
    gsap.from("li", {
      duration: 0.5,
      y: -20,
      opacity: 0,
      ease: "back",
      stagger: {
        from: "start",
        grid: "auto",
        amount: 1,
      },
    });
  },
};
</script>

<style lang="sass" scoped>
section
  position: relative
  min-height: 90vh
  padding: 1.75rem 0
  display: flex
  align-items: center
  overflow: hidden
button
    padding: .5rem 1.75rem
article
    display: grid
    gap: 1rem
    margin-top: 1rem
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))
.flag
    height: 60vh
    min-width: 40vw
    max-width: 92vw
    margin-right: 1rem
h3
    font-size: x-large
.details
    display: flex
    flex-direction: column
    justify-content: center
.content
    padding-top: 1rem
    display: grid
    place-content: center
    grid-template-columns: repeat(auto-fit,minmax(250px, 1fr))
    justify-content: start
    gap: 1rem
    ul
        margin: 0
        li
            padding: .5rem 0
.borders
    display: inline-block
    padding-right: 1rem
.borderCountry
    padding: .5rem 1rem
    margin: .4rem
</style>
