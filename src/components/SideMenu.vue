<template>
  <aside
    :class="
      isSideMenuOpen
        ? 'fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-gray-50 md:hidden'
        : 'z-20 hidden w-64 overflow-y-auto bg-gray-50 md:block flex-shrink-0 h-full'
    "
  >
    <div class="py-4 text-gray-500 dark:text-gray-400 h-full flex flex-col">
      <div class="text-center p-6">
        <p class="text-5xl font-bold uppercase" style="color: #f57a0f">Food</p>
        <p class="font-bold text-lg uppercase text-gray-800">Recipe</p>
      </div>
      <div class="flex flex-col justify-between h-full">
        <ul class="mt-12">
          <router-link
            v-for="item in items"
            :key="item.title"
            class="
              relative
              inline-flex
              items-center
              tracking-widest
              w-full
              text-sm
              uppercase
              font-semibold
              text-gray-800
              transition-colors
              duration-150
              hover:text-gray-800 hover:bg-gray-300
              px-6
              py-4
            "
            :to="item.to"
            tag="li"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path :d="item.svgPath"></path>
            </svg>
            <span 
              :class="{'bounce': badgeAnimated}"
              v-if="item.name == 'Favorites'" class="text-white text-xs absolute top-0 right-20 border rounded-full px-2 py-1 bg-red-600">
              {{userFavoritesIds.length}}
            </span>
            <span class="ml-4">{{ item.name }}
              
            </span>
          </router-link>
        </ul>
        <div class="px-6 my-12 align-bottom" v-if="!userIsLoggedIn">
          <button
            class="
              w-full
              px-4
              py-2
              rounded-lg
              bg-blue-500
              text-sm
              leading-5
              font-medium
              text-white
              transition-colors
              duration-150
              border border-transparent
              hover:bg-blue-700
              focus:outline-none
            "
            @click="signUpUser"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>


<script>
import { mapGetters } from 'vuex';
import { isLoggedIn } from "../utils/Auth/user";
export default {
  name: "sideMenu",
  props: ["isSideMenuOpen"],
  data(){
    return{
      badgeAnimated: false,
      userIsLoggedIn: isLoggedIn.value,
      items : [
          {
            name: "Recipes",
            to: "/",
            svgPath:
              "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
          },
          {
            name: "Create Recipe",
            to: "/addrecipe",
            svgPath:
              "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
          },
          {
            name: "Favorites",
            to: "/favorites",
            svgPath:
              "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z",
          },
          {
            name: "Saved",
            to: "/saved",
            svgPath:
              "M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z",
          },
        ]
    }
  },
  methods: {
    signUpUser(){
      if(!isLoggedIn.value){
        this.$router.push('/user/signup')
      }
    }
  },
  created() {
    
  },
  computed: {
    ...mapGetters(['userFavoritesIds']),
  },
  watch: {
    userFavoritesIds(value){
      if(value){
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000)
      }
    }
  }
};
</script>

<style scoped>
.bounce {
  animation: bounce 1s both;
}
.active {
  background-color: rgb(192, 192, 192);
  color: black;
}

.active:hover {
  color: rgb(31, 31, 31);
}
</style>