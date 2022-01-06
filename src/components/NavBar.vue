<template>
  <header class="z-10 py-4 bg-gray-50 shadow-md">
    <div
      class="
        container
        flex
        items-center
        justify-between
        h-full
        px-6
        mx-auto
        text-purple-600
        dark:text-purple-300
      "
    >
      <!-- Mobile hamburger -->
      <button
        class="
          p-1
          mr-5
          -ml-1
          rounded-md
          md:hidden
          focus:outline-none focus:shadow-outline-purple
        "
        @click="toggleSideMenu"
        aria-label="Menu"
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <!-- Search input -->
      <div class="flex justify-center flex-1 lg:mr-32">
        <div class="relative w-full max-w-xl mr-6 focus-within:text-yellow-500">
          <div class="absolute inset-y-0 flex items-center pl-2">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              fill="#f57a0f"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            class="
              w-full
              pl-8
              py-3
              pr-2
              text-sm text-gray-700
              placeholder-gray-600
              bg-gray-100
              border-0
              rounded-full
              focus:placeholder-gray-600
              focus:bg-white
              focus:border-yellow-600
              focus:outline-none
              form-input
            "
            type="text"
            placeholder="Search for Recipes"
            aria-label="Search"
            v-model="searchTerm"
            @input="handleSearchRecipes"
          />
        </div>
      </div>
      <div
        v-if="searchResults.length"
        class="
          pt-2
          px-2
          mt-12
          w-3/4
          rounded
          shadow-sm
          absolute
          z-10
          top-6
          bg-white
        "
      >
        <div
          @click="gotoDetailPage(result.id)"
          v-for="result in searchResults"
          :key="result.id"
          class="my-1 border-b-2 border-gray-200 pb-2"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shirik-0">
              <img
                class="h-12 w-12 rounded-full"
                :src="result.RecipeImages[0].path"
                alt=""
              />
            </div>
            <div>
              <div class="text-xl font-semibold text-black">
                {{ result.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="flex items-center flex-shrink-0 space-x-6">
        <!-- Notifications menu -->
        <li v-if="!isUserLoggedIn">
          <button
            class="
              border-blue-400
              hover:text-white 
              hover:bg-blue-600
              border-2
              text-black
              rounded-lg
              focus:outline-none
              px-6
              py-1
              font-normal
              shadow
            "
            @click="gotoLogin"
          >
            login
          </button>
        </li>
        <!-- Profile menu -->
        <li class="relative" v-else>
          <button
            class="
              align-middle
              rounded-full
              focus:shadow-outline-purple focus:outline-none
            "
            @click="toggleProfileMenu"
            @keydown.escape="closeProfileMenu"
            aria-label="Account"
            aria-haspopup="true"
          >
            <img
              class="object-cover w-8 h-8 rounded-full"
              src="../assets/logo.png"
              alt=""
              aria-hidden="true"
            />
          </button>
          <template v-if="isProfileMenuOpen">
            <ul
              class="
                absolute
                right-0
                w-56
                p-2
                mt-2
                space-y-2
                text-gray-600
                bg-white
                border border-gray-100
                rounded-md
                shadow-md
                dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700
              "
              aria-label="submenu"
            >
              <li class="flex">
                <router-link
                  class="
                    inline-flex
                    items-center
                    w-full
                    px-2
                    py-1
                    text-sm
                    font-semibold
                    transition-colors
                    duration-150
                    rounded-md
                    hover:bg-gray-100 hover:text-gray-800
                    dark:hover:bg-gray-800 dark:hover:text-gray-200
                  "
                  to="/profile"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <span>Profile</span>
                </router-link>
              </li>
              <li class="flex">
                <button
                  class="
                    inline-flex
                    items-center
                    w-full
                    px-2
                    py-1
                    text-sm
                    font-semibold
                    transition-colors
                    duration-150
                    rounded-md
                    hover:bg-gray-100 hover:text-gray-800
                    dark:hover:bg-gray-800 dark:hover:text-gray-200
                  "
                  @click="handleSignout"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import {isLoggedIn, unset} from '../utils/Auth/user'
export default {
  name: "navBar",
  data() {
    return {
      searchTerm: "",
      isProfileMenuOpen: false,
      isUserLoggedIn: isLoggedIn.value
    };
  },
  methods: {
    toggleSideMenu() {
      this.$emit("toggle-side-menu");
    },
    handleSearchRecipes() {
      if(this.searchTerm){
        this.$store.dispatch("searchRecipes", {
          searchTerm: this.searchTerm,
        });
      }else {
        this.searchTerm=''
      }

    },
    gotoDetailPage(recipeId) {
      this.searchTerm = "";
      this.$router.push(`/recipes/${recipeId}`);
      this.$store.commit("clearSearchResult");
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },

    handleSignout(){
      unset();
      this.$store.dispatch("clearUser");
      
    },
    gotoLogin(){
      this.$router.push('/user/signin')
    }
  },
  computed: {
    ...mapGetters(["searchResults","user"]),
  },
};
</script>