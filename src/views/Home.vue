<template>
  <section id="home">
    <div class="container">
      <header>
        <input
          type="text"
          v-model="search"
          placeholder="search by (name, capital, code) ..."
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
          <div
            :style="`background: url(${country.flag}) center/cover;height: 150px;width:100%`"
          ></div>
          <div class="card-body">
            <div class="card-title">
              <h4>{{ country.name }}</h4>
              <h4>Code: {{ country.callingCodes[0] }}</h4>
            </div>
            <h5>Capital: {{ country.capital }}</h5>
          </div>
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
export default {
  name: "Home",
  data() {
    return {
      search: "",
      region: "",
      slice: 20,
    };
  },
  computed: {
    ...mapGetters({
      countries: "allCountries",
    }),
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
  created() {
    this.fetchCountries();
  },
};
</script>

<style lang="css" scoped>
section {
  padding: 2rem 0;
  min-height: 90vh;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  /* flex-wrap: wrap; */
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

.dark select {
  background: var(--light-dark);
  color: var(--lighter);
}

main {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding-top: 1.5rem;
}

.card {
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  background: var(--lighter);
}

.card-title {
  display: flex;
  justify-content: space-between;
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
</style>
