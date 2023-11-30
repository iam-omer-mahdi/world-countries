<template>
  <section id="country" class="min-h-screen relative">
    <!-- Loader -->
    <Skeleton type="country" v-if="loading" />
    <!-- Error Page -->
    <template v-if="error">
      <Error />
    </template>
    <!-- Content -->
    <template v-if="!loading && error === null">
      <div class="grid md:grid-cols-3 gap-2">
        <template v-for="pic in pics">
            <img :src="pic?.urls.regular" :alt="pic?.alt_description" class="object-cover object-center aspect-video w-full h-44 md:h-96 skeleton rounded-none" />
        </template>
      </div>

      <div class="relative">
        <div class="container mx-auto px-2 py-8">
          <article class="grid grid-cols-12 gap-6">
            <img class="object-cover h-52 rounded col-span-12 lg:col-span-3 border border-base-content"
              :src="country.flag" />
            <div class="grid gap-6 py-4 col-span-12 lg:col-span-9">
              <h1>{{ country.name }}</h1>

              <ul class="md:grid md:grid-cols-4 justify-center">
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Native Name</span>
                  <span class="font-bold text-lg  md:w-full px-4 py-2 text-end md:text-start">{{ country.nativeName
                  }}</span>
                </li>
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Capital</span>
                  <span class="font-bold text-lg  md:w-full px-4 py-2 text-end md:text-start">{{ country.capital }}</span>
                </li>
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Region</span>
                  <span class="font-bold text-lg  md:w-full px-4 py-2 text-end md:text-start">{{ country.region }}</span>
                </li>
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Sub Region</span>
                  <span class="font-bold text-lg  md:w-full px-4 py-2 text-end md:text-start">{{ country.subregion
                  }}</span>
                </li>
              </ul>

              <ul class="md:grid md:grid-cols-5 justify-center items-start mt-6">
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Population</span>
                  <span class="font-bold text-lg  md:w-full px-4 py-2 text-end md:text-start">{{ new Intl.NumberFormat('en-GB').format(country.population) }}</span>
                </li>
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Alfa 3 Code</span>
                  <span class="font-bold text-lg  md:w-full px-4 py-2 text-end md:text-start">{{ country.alpha3Code
                  }}</span>
                </li>
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Timezones</span>
                  <div class="flex flex-wrap font-bold text-lg md:w-full px-4 py-2">
                    <div class="text-end md:text-start w-full" v-for="zone in country.timezones" :key="zone.name"> {{ zone
                    }}, </div>
                  </div>
                </li>
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Currencies</span>
                  <div class="flex flex-wrap font-bold text-lg  md:w-full px-4 py-2">
                    <div class="text-end md:text-start w-full" v-for="currency in country.currencies"
                      :key="currency.name"> {{ currency.name }} </div>
                  </div>
                </li>
                <li
                  class="flex items-center justify-between flex-row md:flex-col md:items-start border-b border-base-content md:border-none">
                  <span class="font-normal text-lg md:border-b border-base-content px-4 py-2 md:w-full">Languages</span>
                  <div class="flex flex-wrap font-bold text-lg  md:w-full px-4 py-2">
                    <div class="text-end md:text-start w-full" v-for="lang in country.languages" :key="lang.name"> {{
                      lang.name }} </div>
                  </div>
                </li>
              </ul>

              <div class="flex flex-col gap-4">
                <h2 class="text-2xl">Border Countries :</h2>
                <div class="flex flex-wrap gap-2">
                  <div v-for="border in country.borders" :key="border">
                    <RouterLink :to="`/${border}`" class="btn px-8">{{ border }}</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </template>

  </section>
</template>

<script>
import { RouterLink } from "vue-router";
import { mapGetters, mapActions, mapState } from "vuex";
import Error from "../components/Error.vue";
import Skeleton from "../components/Skeleton.vue";

export default {
  name: "SingleCountry",
  data() {
    return {
      loading: true,
    }
  },
  components: { Error, Skeleton },
  computed: {
    ...mapGetters({
      pics: 'getCountryPics',
    }),
    ...mapState({
      country() { return this.$store.state.country },
      code() { return this.$store.state.code },
      error() { return this.$store.state.error }
    })
  },
  methods: {
    ...mapActions(["fetchPics", "fetchCountry"]),
  },
  created() {
    // Fetch Country info
    this.$watch(
      () => this.$route.params,
      async () => {
        this.loading = true

        await this.fetchCountry(this.$route.params.code)

        this.loading = false
      }, { immediate: true })
  },
};
</script>