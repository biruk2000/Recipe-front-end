<template>
  <div class="main-section mt-3">
    <div class="bg-white max-w-full p-4 flex justify-between">
      <p class="font-bold text-3xl text-gray-600">Your Bookmarked Recipes</p>
      <button @click="refresh">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        viewBox="0 0 24 24"
        width="30px"
        fill="blue"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
        />
      </svg></button>
    </div>
    <div class="container mx-auto px-6 mb-8 mt-4">
      <div  v-if="bookmarks.length > 0" class="grid lg:grid-cols-3 gap-10">
        <div v-for="recipe in bookmarks" :key="recipe.id">
          <Card :recipe="recipe"></Card>
        </div>
      </div>
      <div v-else class="m-auto">
        <p class="justify-center text-center mt-72">You Don't have Bookmarded Recipe yet!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {GET_RECIPE} from '../../queries/Recipes'
import Card from '../../components/Recipe/Card.vue'
import { USER_BOOKMARK_RECIPES_IDS } from '../../queries/BookMarks';
import { userId } from '../../utils/Auth/user';
export default {
  name: "bookmark",
  data(){
      return{
          bookmarks: []
      }
  },
  components: {
      Card
  },
  methods: {
    refresh(){
      this.$router.go();
    },
    getUserBookmarksIds(){
      if(userId.value){
        this.$apollo.query({
            query: USER_BOOKMARK_RECIPES_IDS,
            variables: {
                userId: userId.value
            }
        }).then(({data}) => {
            this.getAllBookmarkedRecipes(data.BookMarks)
        })
      }
    },
    getAllBookmarkedRecipes(bookmarkedIds) {
      for (let i = 0; i < bookmarkedIds.length; i++) {
        this.$apollo
          .query({
            query: GET_RECIPE,
            variables: {
              id: bookmarkedIds[i].recipe_id,
            },
          })
          .then(({ data }) => {
            this.bookmarks.push(data.Recipes_by_pk);
          });
      }
    },
  },
  mounted(){
      this.getUserBookmarksIds();
  },
  computed: {
    ...mapGetters(["userBookmardedRecipes"]),
  },
};
</script>