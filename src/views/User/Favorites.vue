<template>
   <div class="main-section mt-3">
    <div class="bg-white max-w-full p-4">
      <p class="font-bold text-3xl text-gray-600">Your Favorite Recipes</p>
    </div>
    <div class="container mx-auto px-6 mb-8 mt-4">
      <div class="grid lg:grid-cols-3 gap-10">
        <div v-for="recipe in favRecipes" :key="recipe.id">
          <Card :recipe="recipe"></Card>
        </div>
      </div>
    </div>
    <!-- <div v-if="favRacipes">
      <li v-for="(favorite,i) in favRacipes" :key="i">{{favorite.Recipe.title}}</li>
    </div> -->
   </div>
</template>

<script>
import {USER_FAVORITES_RECIPE_IDS} from '../../queries/Favorites'
import {GET_RECIPE} from '../../queries/Recipes'
import {userId} from '../../utils/Auth/user'
import Card from '../../components/Recipe/Card.vue'
export default {
  data(){
    return{
      favRacipesIds:[],
      favRecipes: []
    }
  },
  components: {
    Card
  },
  mounted(){
    this.getUserFavoritesIds();
  },
  methods: {
    getUserFavoritesIds(){
      this.$apollo.query({
        query: USER_FAVORITES_RECIPE_IDS,
        variables: {
          userId: userId.value
        }
      }).then(({data}) => {
        console.log(data.Favorites)
        this.favRacipesIds = data.Favorites
        this.getAllFavoriteRecipes()
      }).catch(err => console.log(err))
    },

    getAllFavoriteRecipes(){
      for(let i=0; i<this.favRacipesIds.length; i++){
        this.$apollo.query({
          query: GET_RECIPE,
          variables: {
            id: this.favRacipesIds[i].recipe_id 
          }
        }).then(({data}) => {
          console.log(data.Recipes_by_pk)
          this.favRecipes.push(data.Recipes_by_pk)
        })
      }
    }
  },
  computed: {
    // get recipe ids
  },
  
}
</script>