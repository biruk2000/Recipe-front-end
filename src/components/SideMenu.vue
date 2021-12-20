<template>
  <aside
    :class="
      isSideMenuOpen
        ? 'fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-gray-800 md:hidden'
        : 'z-20 hidden w-64 overflow-y-auto bg-gray-800 md:block flex-shrink-0 h-full'
    "
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <p class="ml-6 text-lg font-bold text-white dark:text-gray-200">Admin</p>
      <ul class="mt-12">
        <router-link
          v-for="item in items"
          :key="item.title"
          class="
            inline-flex
            items-center
            w-full
            text-sm
            font-semibold
            text-white
            transition-colors
            duration-150
            hover:text-gray-200
            px-6
            py-3
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
            <path
              :d="item.svgPath"
            ></path>
          </svg>
          <span class="ml-4">{{item.name}}</span>
        </router-link>
      </ul>
    </div>
  </aside>
</template>


<script>
export default {
  name: "sideMenu",
  data() {
    return {
      items: [
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
            "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
          name: "Favorites",
          to: "/favorites",
          svgPath:
            "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
          name: "Profile",
          to: "/profile",
          svgPath:
            "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },

      ],
    };
  },
  props: ["isSideMenuOpen"],
};
</script>

<style scoped>
.active {
  background-color: rgb(192, 192, 192);
  color: black;
}

.active:hover {
  color: rgb(31, 31, 31);
}
</style>