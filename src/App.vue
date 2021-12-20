<template>
  <div id="app" class="page">
    <AppHeader />

    <main class="page-body home">
      <div v-if="loading">
        <Loader />
      </div>

      <div class="section" v-if="countryIsEmpty">
        <div class="container">
          <EmptyCard />
        </div>
      </div>

      <div v-else>
        <section class="section pb-0">
          <div class="container">
            <h3 class="text-center">{{ greetingText }}</h3>

            <p class="text-center">
              Select a country flag to see details, or click
              <span role="button" class="refresh-link" @click="refresh()">
                <strong>
                  <em>here</em>
                </strong>
              </span>
              to reload the data
            </p>

            <div class="searchbar-wrapper">
              <SearchBar
                :show-clear="showResults"
                @search="showResults ? refresh() : handleSearch()"
                v-model="searchValue"
              />
            </div>
          </div>
        </section>

        <section class="section pb-0">
          <div class="container">
            <div class="card-wrapper">
              <CountryCard
                v-for="(country, countryIndex) in countries"
                :key="countryIndex"
                :country="country"
                @click="show(country)"
              />
            </div>
          </div>
        </section>

        <section class="section">
          <div class="container">
            <Pagination
              v-model="page"
              :records="totalCountries"
              theme="bootstrap4"
              class="text-center"
              :per-page="pageSize"
              @paginate="paginate"
            />
          </div>
        </section>

        <modal
          classes="modal"
          name="country-details"
          height="auto"
          :scrollable="true"
        >
          <div class="modal__header">
            <p class="mb-0">Country Details</p>

            <button class="modal__close" @click="hide">
              <span></span>
              <span></span>
            </button>
          </div>

          <div class="modal__body">
            <CountryDetails :country="selectedCountry" />
          </div>
        </modal>
      </div>
    </main>
  </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import axios from './plugins/axios';
import CountryCard from './components/CountryCard.vue';
import CountryDetails from './components/CountryDetails.vue';
import EmptyCard from './components/EmptyCard.vue';
import Loader from './components/Loader.vue';
import SearchBar from './components/SearchBar.vue';
import {
  capitalizeFirstLetter,
  isArrayEmpty,
  notify,
  greeting
} from './utility';
import AppHeader from './components/Header.vue';

export default {
  name: 'App',

  components: {
    Pagination,
    AppHeader,
    CountryCard,
    CountryDetails,
    EmptyCard,
    Loader,
    SearchBar
  },

  data() {
    return {
      loading: false,
      allCountries: [],
      countries: [],
      selectedCountry: null,
      page: 1,
      totalCountries: 1,
      pageSize: 20,
      searchValue: '',
      showResults: false
    };
  },

  computed: {
    paginationOptions() {
      const texts = {
        count: `Showing page ${this.page} out of ${this.totalPages} pages`
      };

      return {
        chunk: 10,
        chunksNavigation: 'scroll',
        texts
      };
    },

    countryIsEmpty() {
      return isArrayEmpty(this.countries);
    },

    greetingText() {
      return greeting().text;
    }
  },

  created() {
    this.fetchCountries();
  },

  watch: {
    '$route.query': 'handleSearch'
  },

  methods: {
    fetchCountries(query) {
      this.loading = true;

      let url = '/all';

      if (query) {
        const { name } = query;
        url = `/name/${name}`;
      }

      axios
        .get(url)
        .then((response) => {
          this.totalCountries = response.data.length;
          this.allCountries = response.data;
          this.showResults = !!query;
          this.paginate(1, query);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
          notify({
            type: 'error',
            message: capitalizeFirstLetter(e.message)
          });

          this.showResults = !!query;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    paginate(page) {
      const firstPageIndex = (page - 1) * this.pageSize;
      const lastPageIndex = firstPageIndex + this.pageSize;
      this.countries = this.allCountries.slice(firstPageIndex, lastPageIndex);
    },

    show(country) {
      this.$modal.show('country-details');
      this.selectedCountry = country;
    },

    hide() {
      this.$modal.hide('country-details');
      this.selectedCountry = null;
    },

    handleSearch() {
      const query = { name: this.searchValue };

      this.fetchCountries(this.searchValue ? query : null);
    },

    refresh() {
      this.fetchCountries();
      this.searchValue = '';
    }
  }
};
</script>
