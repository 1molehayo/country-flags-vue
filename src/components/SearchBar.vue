<template>
  <div>
    <div class="searchbar">
      <input
        type="text"
        placeholder="Search by country"
        v-model="reactiveValue"
      />

      <button class="searchbar__icon" @click="search">
        <span class="icon-search" />
      </button>
    </div>

    <div class="text-center">
      <button @click="search" class="searchbar__button">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: { type: String, default: undefined },
    showClear: { type: Boolean, default: false }
  },

  computed: {
    buttonText() {
      return this.showClear ? 'Clear results' : 'Search';
    }
  },

  data() {
    return {
      reactiveValue: this.value
    };
  },

  watch: {
    value(newVal) {
      this.reactiveValue = newVal;
    },

    reactiveValue(newVal) {
      this.$emit('input', newVal);
    }
  },

  methods: {
    search() {
      this.$emit('search');
    }
  }
};
</script>
