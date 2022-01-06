<template>
  <div class="container mx-auto pl-2 pr-6 mb-8">
    <div class="flex mx-4 my-4">
      <div
        class="
          w-2/3
          bg-white
          h-auto
          tracking-wide
          mb-14
          border border-black-800
          mx-1
          rounded-lg
          relative
        "
      >
        <div
          class="small-banner w-1 h-20 bg-blue-600 absolute rounded-tl-md"
        ></div>
        <h5 class="text-4xl font-bold pl-6 py-4 pr-6">Recipe Filter Results</h5>
      </div>
    </div>
    <div class="border-2 bg-white flex  flex-wrap p-3">
      <div class="mt-2 mr-2">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Title</label
        >
        <input
          id="title"
          name="title"
          type="text"
          class="
            mt-1
            p-2
            block
            w-full
            text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-400
            border
            rounded
          "
          v-model="title"
          placeholder="Enter Recipe Title"
        />
      </div>
      <div class="mt-2 mr-2">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Duration</label
        >
        <div class="flex">
          <div class="flex-1 mr-2">
            <input
              id="title"
              name="title"
              type="number"
              class="
                mt-1
                p-2
                text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-400
                border
                rounded
              "
              v-model="prepTime"
              placeholder="Enter Recipe Duration"
            />
          </div>
          <div class="flex-1">
            <select
              v-model="prpeTimeMeasurement"
              class="
                mt-1 w-20
                p-2
                border border-gray-300
                bg-white
                rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-400
                sm:text-sm
              "
            >
              <option v-for="(time, i) in times" :key="i">
                {{ time }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="mt-2 mr-2">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Ingredient</label
        >
        <input
          id="title"
          name="title"
          type="text"
          class="
            mt-1
            p-2
            block
            w-full
            text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-400
            border
            rounded
          "
          v-model="ingredient"
          placeholder="Enter Recipe Ingredinet"
        />
      </div>
      <div class="mt-8 ml-6 sm:w-full md:w-auto">
        <button
          @click="filterRecipe"
          type="button"
          class="
            py-2
            px-4
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-white
            bg-yellow-900
            hover:bg-yellow-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-yellow-500
          "
        >
          Show Results
        </button>
      </div>
    </div>
    <div class="mx-auto my-4">
      <p class="font-bold border-b-4 pb-1 border-yellow-600 w-20">
        {{ Recipes.length > 0 ? Recipes.length : 0 }}, Results
      </p>
    </div>
    <div v-if="hasData" class="mx-auto">
      <div  class="grid lg:grid-cols-3 gap-4 gap-y-6">
        <div v-for="recipe in Recipes" :key="recipe.id">
          <Card :recipe="recipe"></Card>
        </div>
      </div>
    </div>
    <div v-else class="w-full mx-auto">
      <p class="text-center mt-10">No Recipe please Try again.</p>
    </div>
  </div>
  <div v-observe-visibility="fetchMore"></div>
</template>

<script>
import { FILTER_RECIPE, INFINITE_SCROLL_POST } from "../../queries/Recipes";
import Card from "../../components/Recipe/Card.vue";

const pageSize = 6;
export default {
  name: "filterRecipe",
  data() {
    return {
      Recipes: [],
      times: ["Hr", "Min"],
      page: 0,
      prepTime: "",
      prpeTimeMeasurement: "",
      title: "",
      ingredient: "",
      hasData: true,
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
            Recipes: [...existing.Recipes, ...newRecipes],
          };
        },
      });
    },
    filterRecipe() {
      if(this.prepTime && this.prpeTimeMeasurement && this.title && this.ingredient){  
        let prepTime = `${this.prepTime} ${this.prpeTimeMeasurement}`;
        let variables = {
          title: this.title.trim().toLowerCase(),
          prepTime: prepTime,
          ingName: this.ingredient.trim(),
        };
        this.Recipes = this.$apollo
          .mutate({
            mutation: FILTER_RECIPE,
            variables,
          })
          .then(({ data }) => {
            if (data.Recipes.length > 0) {
              this.Recipes = data.Recipes;
            } else {
              this.hasData = false;
            }
          });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.card {
  @apply bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl relative;
}

.badge {
  @apply bg-red-500 text-white text-xs text-center font-bold rounded-full p-2 absolute top-0 right-0 mt-2 ml-2;
}
</style>