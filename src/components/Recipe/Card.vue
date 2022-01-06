<template>
  <div class="card max-w-lg overflow-hidden">
    <div class="mb-2" @click="gotoDetailsPage(recipe.id)">
      <img
        :src="currentImage"
        class="w-full h-40 sm:h-52 object-cover"
        alt=""
      />
    </div>
    <!-- <div v-if="recipe.RecipeImages.length > 1 && type" class="grid grid-cols-4 mx-1 gap-px shadow-sm rounded">
        <div class="" v-for="(image, i) in recipe.RecipeImages" :key="i" @click="changeImage(i)">
          <img :src="image.path" loading="lazy" class="w-20 h-12 object-cover" />
        </div>
      </div> -->
    <div class="p-4">
      <div class="mb-1">
        <div class="font-bold text-3xl mb-2 border-b border-gray-300">
          {{ formatTitle(recipe.title) }}
        </div>
        <p class="text-gray-700 text-base">
          {{ getDescription(recipe.description) }}
        </p>
      </div>
      <div
        class="
          flex
          divide-x divide-gray-600
          items-center
          text-sm text-gray-600
          mt-2
        "
      >
        <p class="flex items-center">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current"
            v-for="i in 5"
            :key="i"
            :class="[formatRatingColor(recipe.Rating, i) ? 'text-red-600' : 'text-gray-500']"
          >
            <path
              d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
            ></path></svg
          ><span class="mr-2 ml-1">({{formatRateValue(recipe.Rating)}})</span>
        </p>
        <p class="border-gray-500 px-4 text-gray-500" v-if="show">
          {{ recipe.Comments.length }} Reviews
        </p>
        <div class="px-4 text-gray-500" v-if="show">
          {{ recipe.noServant }} servants
        </div>
      </div>

      <!-- <StarRating :value="rating" v-model="rating" /> -->

      <div class="mt-2 flex justify-between items-center flex-wrap">
        <p class="flex align-center text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="23px"
            viewBox="0 0 24 24"
            class=""
            width="23px"
            fill="#f57a0f"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"
            />
          </svg>
          <span class="ml-2 text-md">{{recipe.categories}}</span>
        </p>
        <!-- <span class="mr-2 font-medium text-gray-400 ml-4">2020/20/02</span> -->
      </div>
      <div v-if="!show" class="">
        <p class="flex align-center text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="23px"
            viewBox="0 0 24 24"
            width="23px"
            fill="#f57a0f"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"
            />
          </svg>
          <span class="ml-2 text-md">{{ recipe.noServant }} servants</span>
        </p>
      </div>
      <div class="flex space-x-2 items-center justify-between mt-1">
        <span
          class="
            rounded-full
            text-gray-500
            font-semibold
            text-sm
            flex
            align-center
            cursor-pointer
            active:bg-gray-300
            transition
            duration-300
            ease
            w-max
          "
        >
          <span class="text-gray-500 items-center flex pr-3">By -</span>
          <img
            class="rounded-full w-9 h-9 max-w-none"
            alt="A"
            :src="recipe.User.path? recipe.User.path: 'https://avatars.dicebear.com/v2/initials/john-doe.svg'"
          />
          <span class="flex items-center px-3 py-2"> {{recipe.User.user_name}} </span>
        </span>
        <button class="text-grey-darker hover:text-red-dark" @click="handleToggleFavorite(recipe.id)">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" class="hover:fill-current text-red-700" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="hover:fill-current hover:text-red-500"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            :fill="checkIfRecipeLiked(recipe.id) ? 'red': 'gray'"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="badge" style="background-color: #f57a0f">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-5 inline-block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="ml-1">{{recipe.prepTime}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../../queries/Favorites';
import { userId } from '../../utils/Auth/user';
export default {
  components: {},
  props: ["recipe", "show"],
  data: () => ({
    rating: 3,
    activeImage: 0,
    isRecipeLiked: false
  }),
  methods: {
    getDescription(description) {
      return description.length > 40
        ? description.substring(0, 45) + "..."
        : description;
    },
    gotoDetailsPage(recipeId) {
      this.$router.push(`/recipes/${recipeId}`);
    },
    changeImage(imageIndex) {
      this.activeImage = imageIndex;
    },
    checkIfRecipeLiked(recipeId){
      if(this.userFavoritesIds && this.userFavoritesIds.some((fav) => fav.recipe_id === recipeId)){
        this.isRecipeLiked = true;
        return true;
      }else{
        this.isRecipeLiked = false;
        return false;
      }
    },
    handleToggleFavorite(recipeId){
      console.log(recipeId);
      if(this.isRecipeLiked){
        this.removeFavorite(recipeId);
      }else{
        this.addToFavorite(recipeId)
      }
    },
    removeFavorite(recipeId){
      let variables = {
        recipe_id: recipeId,
        user_id: userId.value
      };
      this.$apollo.mutate({
        mutation: REMOVE_FAVORITE,
        variables,
      }).then(({data}) => {
        const removedRecipeId = data.delete_Favorites.returning[0].recipe_id;
        const updatedUserFavoritesIds = this.userFavoritesIds.filter(
            (fav) => fav.recipe_id != removedRecipeId
          );
       this.$store.commit("setUserFavoritesIds", updatedUserFavoritesIds);
      }).catch((err) => console.error(err));
    },
    addToFavorite(recipeId){
      let variables = {
        recipe_id: recipeId,
        user_id: userId.value
      };

      this.$apollo.mutate({
        mutation: ADD_FAVORITE,
        variables,
      }).then(({data}) => {
        const updatedUserFavoriteIds = [
          ...this.userFavoritesIds,
          data.insert_Favorites_one
        ];
        this.$store.commit("setUserFavoritesIds", updatedUserFavoriteIds)
      }).catch((err) => console.error(err));
    },
    formatRateValue(rating){
      if(rating){
        if(rating.ratingValue > 5){
          return 5;
        }else if(rating.ratingValue < 5){
          return parseInt(rating.ratingValue);
        }
      }else{
        return 0;
      }
    },
    formatRatingColor(rating, i){
      if(rating){
        if(rating.ratingValue >=i){
          return true;
        }else{
          return false
        }
      }else{
        return false
      }
    },
    formatTitle(title){
     return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
    }
  },
  computed: {
    currentImage() {
      return this.recipe.RecipeImages[this.activeImage].path;
    },
    ...mapGetters(["userFavoritesIds"])
  },
};
</script>


<style lang="postcss" scoped>
.card {
  @apply bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl relative;
}

.badge {
  @apply text-white text-xs text-center font-bold rounded-full p-2 absolute top-0 right-0 mt-2 ml-2;
}
</style>