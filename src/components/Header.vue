<template>
  <div>
    <header class="header">
      <div class="header__container">
        <div class="container">
          <nav>
            <p class="header__logo active">Country Flags</p>

            <NavSwitch />
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import NavSwitch from './Switch.vue';

export default {
  name: 'AppHeader',
  components: {
    NavSwitch
  }
};
</script>
