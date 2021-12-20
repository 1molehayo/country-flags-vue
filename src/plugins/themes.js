export default {
  data() {
    return {
      currentTheme: ''
    };
  },

  mounted() {
    const storedTheme = localStorage.getItem('theme');

    if (!storedTheme) {
      this.currentTheme = 'light-theme';
      return;
    }
    this.currentTheme = localStorage.getItem('theme');
  },

  methods: {
    setTheme(theme) {
      localStorage.setItem('theme', theme);
      this.currentTheme = theme;
      document.documentElement.className = theme;
    },

    toggleTheme() {
      const currentTheme = localStorage.getItem('theme');

      if (currentTheme === 'light-theme') {
        this.setTheme('dark-theme');
      } else {
        this.setTheme('light-theme');
      }
    }
  }
};
