<template>
  <div role="button" class="country-card" @click="click">
    <div class="country-card__image card-image">
      <img :src="flag" :alt="name" />
    </div>

    <div class="country-card__content">
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountryCard',
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

    name() {
      return this.country.name.common;
    }
  },

  methods: {
    click() {
      this.$emit('click');
    }
  }
};
</script>
