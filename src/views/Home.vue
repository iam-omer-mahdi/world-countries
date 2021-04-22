<template>
  <section id="home">
    <!-- Pre Loader -->
    <div class="overlay" v-if="loading">
      <scaling-squares-spinner
        :animation-duration="1000"
        :size="60"
        :color="'#777'"
      />
    </div>
    <div class="container">
      <header>
        <input
          type="text"
          v-model="search"
          placeholder="Search by (name, capital, code) ..."
        />
        <select name="filter" id="filter" v-model="region">
          <option selected disabled hidden plceholder="filter" value="">
            Filter By Region
          </option>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="America">America</option>
          <option value="Europe">Europe</option>
        </select>
      </header>
      <main>
        <div
          class="card"
          v-for="country in filteredCountries.slice(0, slice)"
          :key="country.name"
        >
          <router-link tag="div" :to="`/country/${country.alpha3Code}`">
            <div
              :style="`background: url(${country.flag}) center/cover;height: 150px;width:100%`"
            ></div>
            <div class="card-body">
              <h4>{{ country.name }}</h4>
              <div class="card-title">
                <h5>Capital: {{ country.capital }}</h5>
                <h5>Code: {{ country.callingCodes[0] }}</h5>
              </div>
            </div>
          </router-link>
        </div>
      </main>
      <div id="load-more">
        <button @click="slice += 16">
          Load More <i class="fa fa-sync"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ScalingSquaresSpinner } from "epic-spinners";
export default {
  name: "Home",
  data() {
    return {
      search: "",
      region: "",
      slice: 20,
      loading: true,
    };
  },
  components: {
    ScalingSquaresSpinner,
  },
  computed: {
    ...mapGetters({
      countries: "allCountries",
    }),
    // Search Filter
    filteredCountries() {
      return this.countries.filter((country) => {
        return (
          (country.name.toLowerCase().match(this.search.toLowerCase()) ||
            country.callingCodes[0]
              .toLowerCase()
              .match(this.search.toLowerCase()) ||
            country.capital.toLowerCase().match(this.search.toLowerCase())) &&
          country.region.match(this.region)
        );
      });
    },
  },
  methods: {
    ...mapActions(["fetchCountries"]),
  },
  async created() {
    await this.fetchCountries();
    this.loading = false;
  },
};
</script>

<style lang="css" scoped>
section {
  padding: 2rem 0;
  min-height: 90vh;
  position: relative;
}

.overlay {
  position: absolute;
}

header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

input {
  flex-basis: 50%;
  padding: 0.75rem 1rem;
  border: none;
  box-shadow: var(--shadow);
  border-radius: var(--radius);
}

.dark input {
  background: var(--light-dark);
  color: var(--lighter);
}

select {
  padding: 0.75rem 1rem;
  border: none;
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  background: var(--lighter);
}

.dark select,
.dark select option {
  background: var(--light-dark);
  color: var(--lighter);
}

main {
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding-top: 1.5rem;
}

.card {
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  background: var(--lighter);
  cursor: pointer;
}

.card-title {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  letter-spacing: 1px;
}

.card-title h4:first-child {
  max-width: 70%;
}
.dark .card {
  background: var(--light-dark);
}

.card-body {
  padding: 0.4rem 0.75rem;
}

#load-more {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.dark #load-more button {
  background: var(--light-dark);
}

@media screen and (max-width: 575px) {
  header input {
    flex-grow: 1;
  }

  main {
    gap: 0.75rem;
  }
}
</style>
