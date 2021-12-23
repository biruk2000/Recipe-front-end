<template>
<div class="container mx-auto px-6 mb-8">
    <div class="flex mx-4 my-4 justify-between">
      <h4 class="font-bold mt-12 border-b border-gray-200">Recipes</h4>
      <select
        class="
          mt-12
          focus:ring-blue-500 focus:border-blue-500
          border
          h-10
          pl-2
          pr-7
          text-gray-500
          sm:text-sm
          rounded-md
        "
      >
        <option>USD</option>
        <option>CAD</option>
        <option>EUR</option>
      </select>
    </div>
    <div class="grid lg:grid-cols-3 gap-10">
      <div v-for="recipe in Recipes"
      :key="recipe.id">
        <router-link to="/recipes/55">
          <Card :recipe="recipe"></Card>
        </router-link>
      </div>
    </div>
    <div class="mx-auto container mt-5" v-if="showMoreEnabled">
      <button @click="fetchMore" class="py-5 text-white bg-blue-600">Fech more</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {INFINITE_SCROLL_POST} from "../queries/Recipes"
import Card from '../components/Recipe/Card.vue'
import {mapGetters} from 'vuex'
const pageSize = 3;

export default {
  name: 'Home',
  data(){
    return{
      Recipes: [],
      page: 0,
      showMoreEnabled: true
      // totalRecipes: this.totalRecipes.length
    }
  },
  components: {
    Card
  },
  apollo: {
    Recipes: {
      query: INFINITE_SCROLL_POST,
      variables: {
        offset: 0,
        limit: pageSize
      }
    }
  },
  methods: {
    // handleGetRecipes(){
    //   this.$store.dispatch('getAllRecipes');
    // }
    fetchMore(){
      this.page++;
      this.$apollo.queries.Recipes.fetchMore({
        variables: {
          offset: (this.page * pageSize),
          limit: pageSize
        },
        updateQuery: (existing, incoming) => {
          const newRecipes = incoming.fetchMoreResult.Recipes;
          if(this.totalRecipes.length > this.Recipes.length){
            this.showMoreEnabled = true
          }else{
            this.showMoreEnabled = false
          }
          return {
            Recipes: [
              ...existing.Recipes,
              ...newRecipes

            ]
          }
          // Recipes: [...existing.Recipes, ...incoming.fetchMoreResult.Recipes]
        },
      })
    }
  },
  created(){
    // this.handleGetRecipes();
  },
  computed: {
    ...mapGetters(['totalRecipes'])
  }

}
</script>
