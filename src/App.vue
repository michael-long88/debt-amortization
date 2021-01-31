<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters({ theme: 'getTheme' })
  },
  beforeMount () {
    this.$store.dispatch('initTheme')
  },
  watch: {
    theme (newTheme, oldTheme) {
      if (newTheme === 'light') {
        document.querySelector('html').classList.remove('dark')
        document.querySelector('html').classList.remove('bg-gray-600')
      } else {
        document.querySelector('html').classList.add('dark')
        document.querySelector('html').classList.add('bg-gray-600')
      }
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
