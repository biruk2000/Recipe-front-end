<template>
  <div class="mt-5 md:block"></div>
  <div
    class="
      mt-30
      md:mx-4
      rounded
      shadow-lg
      bg-white
      md:overflow-x-hidden
      overflow-y-auto
      sm:rounded-md sm:mt-0
    "
  >
    <div class="px-4 py-8 bg-gray-50 text-center sm:px-6">
      <p class="font-semibold text-4xl text-gray-500 uppercase">Add Recipe</p>
    </div>
    <div class="md:grid md:grid-cols-2 md:gap-4">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="addRecipe" method="POST">
          <div class="">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700"
                    >Title</label
                  >
                  <input
                    id="title"
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

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="category"
                    class="block text-sm font-medium text-gray-700"
                    >Category</label
                  >
                  <select
                    id="category"
                    v-model="category"
                    autocomplete="category"
                    class="
                      mt-1
                      block
                      w-full
                      p-2
                      border border-gray-300
                      bg-white
                      rounded-md
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      sm:text-sm
                    "
                  >
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option v-for="(category, i) in categories" :key="i">
                      {{ category }}
                    </option>
                  </select>
                </div>

                <div class="col-span-6">
                  <label
                    for="description"
                    class="block text-sm font-medium text-gray-700"
                    >Description</label
                  >
                  <textarea
                    id="description"
                    v-model="description"
                    class="
                      block
                      w-full
                      mt-1
                      p-2
                      text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      border
                      rounded
                    "
                    rows="3"
                    placeholder="Enter Description."
                  ></textarea>
                </div>

                <div class="col-span-6 sm:col-span-1">
                  <label
                    for="timeMeasurement"
                    class="block text-sm font-medium text-gray-700"
                    >Time Measurement</label
                  >
                  <select
                    id="timeMeasurement"
                    v-model="preparationTimeMeasurement"
                    class="
                      mt-1
                      block
                      p-2
                      border border-gray-300
                      bg-white
                      rounded-md
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      sm:text-sm
                    "
                  >
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option v-for="(time, i) in times" :key="i">
                      {{ time }}
                    </option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="time"
                    class="block text-sm font-medium text-gray-700"
                    >Preparation Time</label
                  >
                  <input
                    id="time"
                    v-model="preparationTime"
                    type="number"
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
                    placeholder="Enter Preparation Time"
                  />
                </div>
                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="servants"
                    class="block text-sm font-medium text-gray-700"
                    >Number of Servant</label
                  >
                  <input
                    v-model="numberServant"
                    id="servants"
                    type="number"
                    class="
                      mt-1
                      p-2
                      block
                      text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      border
                      rounded
                    "
                    placeholder="Enter Number of Servants"
                  />
                </div>

                <div
                  v-if="ingredients.length > 0"
                  class="col-span-6 sm:col-span-6"
                >
                  <table class="m-1 w-10/12">
                    <thead>
                      <tr
                        class="
                          text-xs
                          font-semibold
                          tracking-wide
                          text-left text-gray-500
                          uppercase
                          border-b
                        "
                      >
                        <th class="pl-4 py-3">#</th>
                        <th class="px-4 py-3">Ingredient</th>
                        <th class="px-4 py-3">Quantity</th>
                        <th class="px-4 py-3">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ingredient, i) in ingredients" :key="i">
                        <td class="px-4 text-sm font-semibold">{{ i + 1 }}</td>
                        <td class="px-4 py-3 text-sm">Name</td>
                        <td class="px-4 py-3 text-sm">quantity</td>
                        <td class="px-4 py-3 text-sm">comment</td>
                        <td class="py-3 text-sm">
                          <button type="button" @click="removeIngredient(i)">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="red"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="col-span-6 sm:col-span-2">
                  <label
                    for="ingredient"
                    class="block text-sm font-medium text-gray-700"
                    >Ingredient Name</label
                  >
                  <input
                    v-model="ingredient.name"
                    id="ingredient"
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
                    placeholder="Enter Ingredient Name"
                  />
                </div>

                <div class="col-span-6 sm:col-span-1">
                  <label
                    for="ingAmount"
                    class="block text-sm font-medium text-gray-700"
                    >Ingredient Amount</label
                  >
                  <input
                    v-model="ingredient.amount"
                    id="ingAmount"
                    step="0.5"
                    type="number"
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
                    placeholder="Enter Ingredient Amount"
                  />
                </div>

                <div class="col-span-6 sm:col-span-1">
                  <label
                    for="ingMeasurement"
                    class="block text-sm font-medium text-gray-700"
                    >Measurement</label
                  >
                  <select
                    v-model="ingredient.measurement"
                    id="ingMeasurement"
                    autocomplete="country"
                    class="
                      mt-1
                      block
                      p-2
                      border border-gray-300
                      bg-white
                      rounded-md
                      focus:outline-none
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      sm:text-sm
                    "
                  >
                    <option v-for="(measurement, i) in measurements" :key="i">
                      {{ measurement }}
                    </option>
                  </select>
                </div>
                <div class="col-span-6 sm:col-span-1">
                  <button
                    @click="addIngredient"
                    type="button"
                    class="
                      uppercase
                      mt-5
                      py-2
                      px-4
                      border border-transparent
                      shadow-sm
                      text-sm
                      font-medium
                      rounded-md
                      text-white
                      bg-blue-600
                      hover:bg-blue-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-blue-500
                    "
                  >
                    Add Ingredient
                  </button>
                </div>

                <div v-if="steps.length > 0" class="col-span-6 sm:col-span-6">
                  <table class="m-1 w-2/3">
                    <thead>
                      <tr
                        class="
                          text-xs
                          font-semibold
                          tracking-wide
                          text-left text-gray-500
                          uppercase
                          border-b
                        "
                      >
                        <th class="px-4 py-3">#</th>
                        <th class="px-4 py-3">Instruction</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(step, i) in steps" :key="i">
                        <td class="px-4 text-sm font-semibold">{{ i + 1 }}</td>
                        <td class="pl-4 py-3 text-sm">Step</td>
                        <td class="py-3 text-sm">
                          <button type="button" @click="removeInstruction(i)">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 0 24 24"
                              width="24px"
                              fill="red"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email_address"
                    class="block text-sm font-medium text-gray-700"
                    >Instruction Step</label
                  >
                  <input
                    type="text"
                    v-model="step.instruction"
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
                    placeholder="Enter Step"
                  />
                </div>
                <div class="col-span-6 sm:col-span-1">
                  <button
                    @click="addInstruction"
                    type="button"
                    class="
                      uppercase
                      mt-5
                      py-2
                      px-4
                      border border-transparent
                      shadow-sm
                      text-sm
                      font-medium
                      rounded-md
                      text-white
                      bg-blue-600
                      hover:bg-blue-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-blue-500
                    "
                  >
                    Add Instruction
                  </button>
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <div class="mb-3 w-96">
                    <label
                      for="formFileMultiple"
                      class="
                        form-label
                        inline-block
                        font-medium
                        mb-2
                        text-gray-700
                      "
                      >Upload Images</label
                    >
                    <input
                      class="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700
                        focus:bg-white
                        focus:ring-2
                        focus:ring-blue-400
                        focus:outline-none
                      "
                      type="file"
                      accept="image/*"
                      id="formFileMultiple"
                      multiple
                      @change="onImageChange"
                    />
                  </div>
                  <div class="mt-8 flex overflow-y-hidden overflow-x-auto">
                    <img
                      class="w-20 mr-3"
                      v-for="(image, i) in images"
                      :key="i"
                      :src="image"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                Save
              </button>
              <button
                class="
                  text-red-500
                  background-transparent
                  font-bold
                  uppercase
                  px-6
                  py-2
                  text-sm
                  outline-none
                  focus:outline-none
                  mr-1
                  mb-1
                  ease-linear
                  transition-all
                  duration-150
                "
                type="button"
              >
                cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from "@apollo/client/core";
// const INSERT_RECIPE = gql`
//   mutation (
//     $title: String!
//     $prepTime: String!
//     $noServant: Int!
//     $description: String!
//     $category: String!
//   ) {
//     insert_Recipes_one(
//       object: {
//         title: $title
//         prepTime: $prepTime
//         noServant: $noServant
//         description: $description
//         categories: $category
//       }
//     ) {
//       id
//       title
//       prepTime
//       noServant
//       description
//       categories
//     }
//   }
// `;
const UPLOAD_RECIPE_IMAGE = gql`
  mutation ($image: String!, $recipeId: Int!) {
    uploadImage(image: $image, recipe_id: $recipeId) {
      path
    }
  }
`;

const INSER_RECIPE_IMAGE = gql`
  mutation($path: String!, $recipeId: Int!) {
  insert_RecipeImages_one(object: {path: $path, recipe_id: $recipeId}) {
    id
    path
    recipe_id
  }
}
`;
const GET_RECIPES = gql`
  query getAllRecipes {
    Recipes {
      id
      title
      prepTime
      noServant
      Comments {
        id
        date
        comment
      }
      Ingredients {
        id
        name
        amount
        unit
      }
      Steps {
        id
        step
      }
      likes
    }
  }
`;
export default {
  name: "add-recipe",
  apollo: {
    recipes: {
      query: GET_RECIPES,
    },
  },
  created() {
    console.log(this.recipes);
  },
  data() {
    return {
      numberServant: "",
      preparationTime: "",
      preparationTimeMeasurement: "",
      description: "",
      category: "",
      title: "",
      ingredient: {
        name: "",
        amount: "",
        measurement: "",
      },
      step: {
        instruction: "",
      },
      ingredients: [this.ingredient],
      steps: [this.step],
      images: [],
      categories: [
        "General",
        "Soup",
        "Salads",
        "Appetizers",
        "Dessert",
        "Lunch",
        "Breakfast",
        "Dinner",
        "Pizza",
        "Noodles",
        "Burgers",
        "Chicken",
      ],
      times: ["Hour", "Minute"],
      measurements: ["Kg", "g", "L", "ml", "Tea Spoon"],
    };
  },

  methods: {
    async addRecipe() {
      console.log("clicked");

      // const variables = {
      //   title: "the third Recipe",
      //   description: "this is the third recipe that will not be failed",
      //   prepTime: "2hr",
      //   noServant: 4,
      //   category: "Gengeral",
      // };

      // let recipe = await this.$apollo.mutate({
      //   mutation: INSERT_RECIPE,
      //   variables,
      // });
      // console.log(recipe);
      for (let i = 0; i < this.images.length; i++) {
        const variables = {
          image: this.images[i],
          recipeId: 4,
        };

        let path = await this.$apollo.mutate({
          mutation: UPLOAD_RECIPE_IMAGE,
          variables,
        });
        if(path){
          console.log(path);
         const imageVariables = {
            path: path.data.uploadImage.path,
            recipeId: 4
          }
          let imageData = await this.$apollo.mutate({
            mutation: INSER_RECIPE_IMAGE,
            variables: imageVariables
          });
          console.log("inserted image");
          console.log(imageData)
        }
      }
    },
    addIngredient() {
      this.ingredients.push(this.ingredient);
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.steps.push(this.step);
    },
    removeInstruction(index) {
      this.steps.splice(index, 1);
    },

    onImageChange(e) {
      const selectedImages = e.target.files;

      for (let i = 0; i < selectedImages.length; i++) {
        this.createBase64Image(selectedImages[i]);
      }
    },

    createBase64Image(ImageObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result);
      };

      reader.readAsDataURL(ImageObject);
      console.log(this.images);
    },
  },
};
</script>