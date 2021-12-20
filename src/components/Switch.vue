<template>
  <button
    class="switch"
    :class="{ 'switch--end': isDarkMode, 'switch--start': isLightMode }"
    @click="toggleTheme"
  >
    <span class="switch__handle">
      <span
        class="switch__icon"
        :class="{ 'icon-moon': isDarkMode, 'icon-sun': isLightMode }"
      />
    </span>
  </button>
</template>

<script>
import themes from '../plugins/themes';

export default {
  name: 'NavSwitch',

  mixins: [themes],

  computed: {
    isDarkMode() {
      return this.currentTheme === 'dark-theme';
    },

    isLightMode() {
      return this.currentTheme === 'light-theme';
    }
  },

  watch: {}
};
</script>
