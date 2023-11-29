<template>
  <section id="country" class="min-h-screen relative">

    <div class="grid md:grid-cols-3">
        <div class="skeleton h-96 w-full">
          <img fetchpriority="high" :src="pics[0]?.urls.regular" :alt="pics[0]?.alt_description" class="object-cover object-center aspect-video w-full h-96">
        </div>
        <div class="skeleton h-96 w-full hidden md:flex">
          <img fetchpriority="high" :src="pics[1]?.urls.regular" :alt="pics[0]?.alt_description" class="object-cover object-center aspect-video w-full h-96">
        </div>
        <div class="skeleton h-96 w-full hidden md:flex">
          <img fetchpriority="high" :src="pics[2]?.urls.regular" :alt="pics[0]?.alt_description" class="object-cover object-center aspect-video w-full h-96">
        </div>
    </div>
    
    <div class="relative">
    <div class="container mx-auto px-2 py-8">
      <article class="grid grid-cols-12 gap-6">
        <img class="w-full sm:w-auto object-cover h-52 rounded col-span-12 lg:col-span-3 border border-base-300" :src="country.flag" />
        <div class="grid gap-4 py-4 col-span-12 lg:col-span-9 ">
          <h1>{{ country.name }}</h1>
          
          <div class="overflow-x-auto">
            <table class="table">              
              <thead>
                <tr>
                  <th>Native Name</th>
                  <th>Capital</th>
                  <th>Region</th>
                  <th>Sub Region</th>
                  <th>Population</th>
                </tr>
              </thead>
              <tbody>              
                <tr>
                  <th>{{ country.nativeName }}</th>
                  <td>{{ country.capital }}</td>
                  <td>{{ country.region }}</td>
                  <td>{{ country.subregion }}</td>
                  <td>{{ new Intl.NumberFormat('en-GB').format(country.population) }}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <table class="table">
              <thead>
                <tr>
                  <th>Alfa 3 Code</th>
                  <th>Timezone</th>
                  <th>Currencies</th>
                  <th>Languages</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{{ country.alpha3Code }}</th>
                  <td>
                    <div v-for="zone in country.timezones" :key="zone.name">
                      <span> {{ zone }}, </span>
                    </div>
                  </td>
                  <td>
                    <div v-for="currency in country.currencies" :key="currency.name">
                      <span> {{ currency.name }} </span>
                    </div>
                  </td>
                  <td>
                    <div v-for="lang in country.languages" :key="lang.name">
                      <span> {{ lang.name }} </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex flex-col gap-4">
            <h2 class="text-2xl">Border Countries :</h2>
            <div class="flex flex-wrap gap-2">
              <div v-for="border in country.borders" :key="border">
                <RouterLink :to="`/country/${border}`" class="btn px-8">{{ border }}</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
  </section>
</template>

<script>
import { RouterLink } from "vue-router";
import { mapGetters, mapActions, mapState } from "vuex";
import { getBlurHashAverageColor } from 'fast-blurhash';
import { nextTick, version } from "vue";

export default {
  name: "SingleCountry",
  data() {
    return {
      loading: 3
    }
  },
  computed: {
    ...mapGetters({
      pics: 'getCountryPics',
    }),
    ...mapState({
      country() { return this.$store.state.country },
      code() { return this.$store.state.code },
    })
  },
  methods: {
    ...mapActions(["fetchPics", "fetchCountry"]),
    averageColor(blurHash) {
      const rgbAverageColor = getBlurHashAverageColor(blurHash ?? '');
      return `rgb(${rgbAverageColor.join(',')})`;
    },
  },
  created() {
    // Fetch Country info
    this.$watch(
      () => this.$route.params,
      async () => {
        await this.fetchCountry(this.$route.params.code)
      },
      { immediate: true }
      )
  },
};
</script>