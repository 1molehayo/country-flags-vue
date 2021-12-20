<template>
  <div class="country-details">
    <div class="country__grid">
      <div class="country__content">
        <div class="mb-5">
          <p class="country__label">Country name</p>
          <p class="country__text">
            {{ officialName }}, <em>also commonly known as</em>
            {{ commonName }}
          </p>
        </div>

        <div class="mb-5">
          <p class="country__label">Capital city</p>
          <p class="country__text">{{ capital }}</p>
        </div>

        <div class="mb-5">
          <p class="country__label">Official currencies</p>
          <p class="country__text">
            {{ currencies }}
          </p>
        </div>

        <div class="mb-5">
          <p class="country__label">Population count</p>
          <p class="country__text">{{ population }}</p>
        </div>

        <div class="mb-5">
          <p class="country__label">ISO code</p>
          <p class="country__text">{{ country.cca3 }}</p>
        </div>

        <div class="mb-5">
          <p class="country__label">List of official languages</p>
          <p class="country__text">{{ languages }}</p>
        </div>
      </div>

      <div class="country__image">
        <img :src="flag" :alt="commonName" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  convertArrayToString,
  formatNumberWithCommas,
  getLanguagues
} from '../utility';

export default {
  name: 'CountryDetails',
  props: {
    country: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    flag() {
      return this.country.flags.svg;
    },

    officialName() {
      return this.country.name.official;
    },

    commonName() {
      return this.country.name.common;
    },

    capital() {
      return this.country.capital.join(', ');
    },

    currencies() {
      return convertArrayToString(this.country.currencies, 'name');
    },

    population() {
      return formatNumberWithCommas(this.country.population);
    },

    languages() {
      return getLanguagues(this.country.languages);
    }
  }
};
</script>
