<template>
  <nav class="bg-gray-800 w-full">
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <!--
              Heroicon name: menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <svg @click="menuToggle = !menuToggle" :class="['h-6 w-6', menuToggle ? 'hidden' : 'block']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open. -->
            <!--
              Heroicon name: x

              Menu open: "block", Menu closed: "hidden"
            -->
            <svg @click="menuToggle = !menuToggle" :class="['h-6 w-6', menuToggle ? 'block' : 'hidden']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p class="menu-link-text text-white m-auto font-cinzel">Debt Amortization</p>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4 font-cinzel">
              <p class="menu-link-text text-white my-auto">Debt Amortization</p>
              <p class="mx-auto text-3xl text-gray-400">|</p>
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link to="/" class="menu-link text-sm">Home</router-link>
              <p class="mx-auto text-3xl text-gray-400">|</p>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="ml-4 flex items-center md:ml-6">
            <button @click="toggleDarkMode" class="focus:outline-none transition duration-200 ease-out p-2 relative text-gray-50 dark:text-purple-500 bg-yellow-50 dark:bg-purple-500 bg-opacity-12.5 rounded-full" aria-label="Dark mode toggle">
              <svg fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 overflow-visible">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Menu open: "block", Menu closed: "hidden"
    -->
    <div :class="[menuToggle ? 'block sm:block' : 'hidden sm:hidden']">
      <div class="px-2 pt-2 pb-3 space-y-1 font-cinzel  ">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <router-link to="/" class="menu-link text-base">Home</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Nav',
  data () {
    return {
      menuToggle: false
    }
  },
  methods: {
    ...mapActions([
      'toggleTheme'
    ]),
    toggleDarkMode () {
      this.toggleTheme()
    }
  }
}
</script>
