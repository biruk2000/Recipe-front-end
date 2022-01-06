<template>
  <div class="container mb-8">
    <div class="flex w-full my-4 p-4 items-center bg-white justify-between">
      <div class="">
        <h4 class="font-bold text-2xl  border-b border-gray-200 mb-4">All Recipes</h4>
        <router-link class="border-b-4 mt-5 pb-1 border-yellow-600" to="/recipes/filter">Filter Recipes here</router-link>
      </div>
      <div class="align-center text-center">
        <p class="text-gray-600 font-bold font-sans">Showing {{Recipes.length}} of 8 results</p>
      </div>
    </div>
    <div class="mx-auto px-6">
      <div class="grid lg:grid-cols-3 gap-10">
        <div v-for="recipe in Recipes" :key="recipe.id">
          <Card :recipe="recipe" :show="true"></Card>
        </div>
      </div>
    </div>
  </div>
  <div v-observe-visibility="fetchMore"></div>
</template>

<script>
// @ is an alias to /src
import { INFINITE_SCROLL_POST } from "../queries/Recipes";
import Card from "../components/Recipe/Card.vue";

import { useToast } from "vue-toastification";
const pageSize = 6;

export default {
  name: "Home",
  data() {
    return {
      Recipes: [],
      page: 0,
      // totalRecipes: this.totalRecipes.length
    };
  },
  components: {
    Card,
  },
  apollo: {
    Recipes: {
      query: INFINITE_SCROLL_POST,
      variables: {
        offset: 0,
        limit: pageSize,
      },
    },
  },
  methods: {
    fetchMore() { 
      this.page++;
      this.$apollo.queries.Recipes.fetchMore({
        variables: {
          offset: this.page * pageSize,
          limit: pageSize,
        },
        updateQuery: (existing, incoming) => {
          const newRecipes = incoming.fetchMoreResult.Recipes;
          return {
            Recipes: [
              ...existing.Recipes, ...newRecipes],
          };
          
        },
      });
    },
  }, 
  setup() {
    const toast = useToast();

    // Make it available inside methods
    return { toast };
  },
};
</script>
