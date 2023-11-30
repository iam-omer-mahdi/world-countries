<template>
    <section id="home" class="min-h-screen">

        <div class="container mx-auto px-2">
            <header class="flex items-center justify-between my-6">
                <input class="input input-bordered bg-base-100 shadow-inner w-full md:w-1/2" type="search" name="search" title="search" v-model="search" placeholder="Search by (name, code) ..." />
                <select class="select select-bordered bg-base-100" name="filter" id="filter" v-model="region" title="Filter By Region">
                    <option selected disabled hidden value="">
                        Filter By Region
                    </option>
                    <option value="">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="America">America</option>
                    <option value="Europe">Europe</option>
                </select>
            </header>

            <Skeleton type="grid" v-if="loading" />

            <div class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6" v-else>
                <article class="card bg-base-100 border border-base-200 rounded-sm relative" v-for="(country, index) in filteredCountries.slice(0, slice)" :key="country.name">
                    
                    <RouterLink tag="a" :to="`/${country.alpha3Code}`">
                    <figure class="border border-base-200">
                        <img loading="lazy" :src="country.flag" class="w-full object-cover h-56" :alt="country.name + ' flag'" />
                    </figure>
                    <div class="card-body p-0 md:p-4">
                        <table class="table">
                            <thead>
                                <tr class="border-0 uppercase">
                                    <th class="font-normal">Country</th>
                                    <th class="font-normal">Capital</th>
                                    <th class="font-normal">Population</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-0 break-words">
                                    <td>{{ country.name }}</td>
                                    <td>{{ country.capital ?? '-' }}</td>
                                    <td>{{ new Intl.NumberFormat('en-GB').format(country.population) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </RouterLink>
                
                </article>
            </div>

            <div id="load-more" class="flex justify-center my-6">
                <button class="btn btn-neutral" @click="slice += 16">
                    Load More
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M94,208a6,6,0,0,1-6,6H40a22,22,0,0,1-19-33l36.71-63.44-18.76,5a6,6,0,0,1-3.1-11.6l32.77-8.77A6,6,0,0,1,76,106.45l8.8,32.76a6,6,0,0,1-4.24,7.35,6.09,6.09,0,0,1-1.56.21,6,6,0,0,1-5.79-4.45l-5-18.8L31.38,187A10,10,0,0,0,40,202H88A6,6,0,0,1,94,208Zm141-27-23.14-40a6,6,0,0,0-10.38,6l23.14,40A10,10,0,0,1,216,202H142.48l13.76-13.76a6,6,0,0,0-8.48-8.48l-24,24a6,6,0,0,0,0,8.48l24,24a6,6,0,0,0,8.48-8.48L142.48,214H216a22,22,0,0,0,19-33ZM136.65,35l36.72,63.44-18.76-5A6,6,0,0,0,151.5,105l32.78,8.79a6,6,0,0,0,7.34-4.25l8.79-32.78a6,6,0,1,0-11.58-3.11l-5.05,18.82L147,29A22,22,0,0,0,109,29L85.8,69a6,6,0,0,0,10.39,6l23.16-40a10,10,0,0,1,17.3,0Z"/></svg>
                </button>
            </div>
        </div>
    </section>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";
import Skeleton from "../components/Skeleton.vue";

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
    computed: {
        ...mapGetters({
            countries: "allCountries",
        }),
        // Search Filter
        filteredCountries() {
            return this.countries.filter((country) => {
                return ((country.name.toLowerCase().match(this.search.toLowerCase()) ||
                    country.callingCodes[0]
                        .toLowerCase()
                        .match(this.search.toLowerCase())) &&
                    country.region.match(this.region));
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
    components: { Skeleton }
};
</script>