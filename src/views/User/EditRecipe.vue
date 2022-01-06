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
      <p class="font-semibold text-4xl text-gray-500 uppercase">
        Update Recipe
      </p>
    </div>
    <div class="mt-5 md:mt-0">
      <VeeForm
        @submit="updateRecipe"
        :validation-schema="schema"
        :initial-values="userData"
      >
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <VeeField
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
              <ErrorMessage class="text-red-600" name="title" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="category"
                class="block text-sm font-medium text-gray-700"
                >Category</label
              >
              <select
                name="category"
                id="category"
                as="select"
                v-model="category"
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
                <option value="" disabled selected>Select your option</option>
                <option v-for="(category, i) in categories" :key="i">
                  {{ category }}
                </option>
              </select>
              <!-- <ErrorMessage class="text-red-600" name="category" /> -->
              <span v-if="!isCategoryValid" class="col-span-6 -mt-4 text-red-600">This field category is required</span>
            </div>

            <div class="col-span-6">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <VeeField
                id="description"
                name="description"
                as="textarea"
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
              ></VeeField>
              <ErrorMessage class="text-red-600" name="description" />
            </div>

            <div class="col-span-6 flex flex-wrap">
              <div class="mr-10">
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
                  <option value="" disabled selected>Select your option</option>
                  <option v-for="(time, i) in times" :key="i">
                    {{ time }}
                  </option>
                </select>
              </div>

              <div class="mt-2 sm:mt-0">
                <label for="time" class="block text-sm font-medium text-gray-700"
                  >Preparation Time</label
                >
                <VeeField
                  id="time"
                  name="preparation time"
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
                <ErrorMessage class="text-red-600" name="preparation time" />
              </div>
            </div>

            <div class="col-span-6 sm:col-span-6">
              <label
                for="servants"
                class="block text-sm font-medium text-gray-700"
                >Number of Servant</label
              >
              <VeeField
                v-model="numberServant"
                name="servant"
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
              <ErrorMessage class="text-red-600" name="servant" />
            </div>
            <div class="w-full block">
              <p class="font-bold uppercase text-lg">Ingredients</p>
            </div>
            <div v-if="ingredients.length > 0" class="col-span-6 sm:col-span-6">
              <table class="m-1 w-10/12">
                <thead>
                  <tr
                    class="
                      text-xs
                      font-semibold
                      tracking-wide
                      text-left
                      uppercase
                      border-b
                    "
                  >
                    <th class="pl-4 py-3">#</th>
                    <th class="px-4 py-3">Ingredient Name</th>
                    <th class="px-4 py-3">Amount</th>
                    <th class="px-4 py-3">Measurement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ing, i) in ingredients" :key="i">
                    <td class="px-4 text-sm font-semibold">{{ i + 1 }}</td>
                    <td class="px-4 py-3 text-sm">{{ ing.name }}</td>
                    <td class="px-4 py-3 text-sm">{{ ing.amount }}</td>
                    <td class="px-4 py-3 text-sm">{{ ing.measurement }}</td>
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
                          <path
                            d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"
                          />
                        </svg>
                      </button>
                    </td>
                    <td class="py-3 text-sm">
                      <button
                        type="button"
                        class="ml-4"
                        @click="openIngEditDialog(ing)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="green"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path
                            d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-full block">
              <p class="font-bold uppercase text-lg">Steps/Instructions</p>
            </div>
            <div v-if="steps.length > 0" class="col-span-6 sm:col-span-6">
              <table class="m-1 w-2/3">
                <thead>
                  <tr
                    class="
                      text-xs
                      font-semibold
                      tracking-wide
                      text-left
                      uppercase
                      border-b
                    "
                  >
                    <th class="px-4 py-3">#</th>
                    <th class="px-4 py-3">Instruction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(st, i) in steps" :key="i">
                    <td class="px-4 text-sm font-semibold">{{ i + 1 }}</td>
                    <td class="pl-4 py-3 text-sm">{{ st.instruction }}</td>
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
                          <path
                            d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"
                          />
                        </svg>
                      </button>
                    </td>
                    <td class="py-3 text-sm">
                      <button type="button" @click="openStepEditDialog(st)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="green"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path
                            d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <div class="w-full block">
                <p class="font-bold uppercase text-lg">Old Images</p>
              </div>
              <div class="mt-8 flex overflow-y-hidden overflow-x-auto">
                <div
                  class="relative flex w-32 mr-3"
                  v-for="(image, i) in oldImages"
                  :key="i"
                >
                  <img class="w-full" :key="i" :src="image.path" alt="" />
                  <button
                    type="button"
                    class="rounded shadow-lg absolute top-0 bg-gray-400"
                    @click="removeImage(i, 'old')"
                  >
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
                </div>
              </div>
            </div>
            <div class="col-span-6 sm:col-span-4">
              <div class="mb-3 w-96">
                <label
                  for="formFileMultiple"
                  class="form-label inline-block font-medium mb-2 text-gray-700"
                  >Upload New Images</label
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
                <div
                  class="relative flex w-32 mr-3"
                  v-for="(image, i) in images"
                  :key="i"
                >
                  <img class="w-full" :key="i" :src="image" alt="" />
                  <button
                    type="button"
                    class="rounded shadow-lg absolute top-0 bg-gray-400"
                    @click="removeImage(i, 'new')"
                  >
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
                </div>
              </div>
              <span v-if="!isImageValid" class="col-span-6 -mt-4 text-red-600">at least one image is required</span>
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
              bg-green-600
              hover:bg-green-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-green-500
            "
          >
            Update
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
            @click="cancel"
          >
            cancel
          </button>
        </div>
      </VeeForm>
    </div>
  </div>

  <!-- modal for ingredients -->
  <EditModal :showModal="ingredientEditModal">
    <template v-slot:title>
      <h3 class="text-xl font-semibold">Update Ingredient</h3>
    </template>
    <template v-slot:main>
      <div class="mx-7">
        <VeeForm
          action=""
          @submit="updateIngredient"
          :validation-schema="ingSchema"
        >
          <div class="md:grid md:grid-cols-4 md:gap-2">
            <div class="col-span-5 sm:col-span-2">
              <label
                for="ingredient"
                class="block text-sm font-medium text-gray-700"
                >Ingredient Name</label
              >
              <VeeField
                v-model="ingredient.name"
                name="name"
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
              <ErrorMessage class="text-red-600" name="name" />
            </div>

            <div class="col-span-6 sm:col-span-1 mt-3 md:mt-0">
              <label
                for="ingAmount"
                class="block text-sm font-medium text-gray-700"
                >Ingredient Amount</label
              >
              <VeeField
                v-model="ingredient.amount"
                name="amount"
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
              <ErrorMessage class="text-red-600" name="amount" />
            </div>

            <div class="col-span-6 sm:col-span-1 mt-3 md:mt-0">
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
          </div>
          <div class="flex items-center justify-end mt-3 px-6 py-1 rounded-b">
            <button
              class="
                text-green-500
                background-transparent
                px-6
                py-2
                text-sm
                outline-none
                focus:outline-none
                mr-1
                mb-1
                font-bold
                ease-linear
                transition-all
                duration-150
              "
              type="submit"
            >
              Update
            </button>
            <button
              class="
                text-red-500
                bg-transparent
                border border-solid border-red-500
                hover:bg-red-500 hover:text-white
                active:bg-red-600
                font-bold
                text-sm
                px-6
                py-2
                rounded
                outline-none
                focus:outline-none
                mr-1
                mb-1
                ease-linear
                transition-all
                duration-150
              "
              type="button"
              v-on:click="closeModel('ingredient')"
            >
              Close
            </button>
          </div>
        </VeeForm>
      </div>
    </template>
  </EditModal>

  <!-- modal for steps -->
  <EditModal :showModal="stepEditModal">
    <template v-slot:title>
      <h3 class="text-xl font-semibold">Update Ingredient</h3>
    </template>
    <template v-slot:main>
      <div class="mx-7">
        <VeeForm action="" @submit="updateStep" :validation-schema="stepSchema">
          <div class="md:grid md:grid-cols-4 md:gap-2">
            <div class="col-span-6 sm:col-span-4">
              <label
                for="email_address"
                class="block text-sm font-medium text-gray-700"
                >Instruction Step</label
              >
              <VeeField
                type="text"
                name="step"
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
              <ErrorMessage class="text-red-600" name="step" />
            </div>
          </div>
          <div class="flex items-center justify-end mt-3 px-6 py-1 rounded-b">
            <button
              class="
                text-green-500
                background-transparent
                px-6
                py-2
                text-sm
                outline-none
                focus:outline-none
                mr-1
                mb-1
                font-bold
                ease-linear
                transition-all
                duration-150
              "
              type="submit"
            >
              Update
            </button>
            <button
              class="
                text-red-500
                bg-transparent
                border border-solid border-red-500
                hover:bg-red-500 hover:text-white
                active:bg-red-600
                font-bold
                text-sm
                px-6
                py-2
                rounded
                outline-none
                focus:outline-none
                mr-1
                mb-1
                ease-linear
                transition-all
                duration-150
              "
              type="button"
              v-on:click="closeModel('step')"
            >
              Close
            </button>
          </div>
        </VeeForm>
      </div>
    </template>
  </EditModal>
</template>

<script>
import EditModal from "../../components/Editmodal.vue";

import { useToast } from "vue-toastification";

// eslint-disable-next-line no-unused-vars
import { GET_RECIPE, UPDATE_RECIPE } from "../../queries/Recipes";
import {
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../queries/Ingredients";
import { DELETE_STEP, UPDATE_STEPS } from "../../queries/Steps";
import {
  DELETE_IMAGE,
  UPLOAD_RECIPE_IMAGE,
  INSER_RECIPE_IMAGE,
} from "../../queries/Images";
// eslint-disable-next-line no-unused-vars
import { userId } from "../../utils/Auth/user";
export default {
  name: "updateRecipe",
  components: {
    EditModal,
  },
  data() {
    return {
      ingredientEditModal: false,
      stepEditModal: false,
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
      ingredients: [],
      steps: [],
      images: [],
      oldImages: [],
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
      times: ["Hr", "Min"],
      measurements: ["Kg", "g", "L", "ml", "Tea Spoon"],
      recipe: null,
      // for validation
      schema: {
        title: "required|alpha",
        category: "required",
        description: "required|min:10|max:200",
        "preparation time": "required",
        servant: "required",
      },
      ingSchema: {
        name: "required",
        amount: "required",
      },
      stepSchema: {
        step: "required",
      },
      userData: {
        category: "General",
      },
      isCategoryValid: true,
      isImageValid: true
    };
  },

  methods: {
    loadRecipeData() {
      this.$apollo
        .query({
          query: GET_RECIPE,
          variables: {
            id: this.$route.params.recipeId,
          },
        })
        .then(({ data }) => {
          this.recipe = data.Recipes_by_pk;
          this.loadRecipeDataToFields(data.Recipes_by_pk);
        })
        .catch((err) => console.error(err));
    },
    loadRecipeDataToFields(recipe) {
      this.title = recipe.title;
      this.description = recipe.description;
      this.category = recipe.categories;
      this.numberServant = recipe.noServant;

      let prepTime = recipe.prepTime.split(" ");
      this.preparationTimeMeasurement = prepTime[1];
      this.preparationTime = prepTime[0];
      for (let i = 0; i < recipe.Ingredients.length; i++) {
        this.ingredients.push({
          id: recipe.Ingredients[i].id,
          name: recipe.Ingredients[i].name,
          amount: recipe.Ingredients[i].amount,
          measurement: recipe.Ingredients[i].unit,
        });
      }

      for (let i = 0; i < recipe.Steps.length; i++) {
        this.steps.push({
          id: recipe.Steps[i].id,
          instruction: recipe.Steps[i].step,
        });
      }

      for (let i = 0; i < recipe.RecipeImages.length; i++) {
        this.oldImages.push({
          id: recipe.RecipeImages[i].id,
          path: recipe.RecipeImages[i].path,
        });
        // this.images.push(recipe.RecipeImages[i].path);
      }
    },
    async updateRecipe() {
      
      this.isCategoryValid = true;
      try {

        if(!this.category){
          this.isCategoryValid =false;
          return;
        }

        if(this.images.length ===0 && this.oldImages.length === 0){
          this.isImageValid = false;
          return;
        }
        this.preparationTime = `${this.preparationTime} ${this.preparationTimeMeasurement}`;

        let variables = {
          recipeId: this.$route.params.recipeId,
          title: this.title,
          description: this.description,
          prepTime: this.preparationTime,
          noServant: this.numberServant,
          category: this.category,
          userId: userId.value,
        };

        let recipe = await this.$apollo.mutate({
          mutation: UPDATE_RECIPE,
          variables,
        });

        if (recipe.data && recipe.data.update_Recipes_by_pk) {
          // for ingredients
          for (let i = 0; i < this.ingredients.length; i++) {
            variables = {
              id: this.recipe.Ingredients[i].id,
              amount: this.ingredients[i].amount,
              name: this.ingredients[i].name,
              unit: this.ingredients[i].measurement,
            };

             await this.$apollo.mutate({
              mutation: UPDATE_INGREDIENT,
              variables,
            });
          }

          // for steps
          for (let j = 0; j < this.steps.length; j++) {
            variables = {
              id: this.recipe.Steps[j].id,
              step: this.steps[j].instruction,
            };
            await this.$apollo.mutate({
              mutation: UPDATE_STEPS,
              variables,
            });
          }
          // for images if there is new images
          if (this.images.length > 0) {
            for (let k = 0; k < this.images.length; k++) {
              const variables = {
                image: this.images[k],
                folder: "Images",
              };

              let path = await this.$apollo.mutate({
                mutation: UPLOAD_RECIPE_IMAGE,
                variables,
              });

              if (path) {
                const imageVariables = {
                  path: path.data.uploadImage.path,
                  recipeId: this.$route.params.recipeId,
                };
                 await this.$apollo.mutate({
                  mutation: INSER_RECIPE_IMAGE,
                  variables: imageVariables,
                });
              }
            }
          }

          this.toast.success("succussfully updated")
        }
      } catch (error) {
        this.toast.info("Something went wrong, Please try again?");
      }
    },
    removeIngredient(index) {
      let removedIngredient = this.ingredients.splice(index, 1);
      // here ther must be an pop permission modal to remove from the database
      this.$apollo
        .mutate({
          mutation: DELETE_INGREDIENT,
          variables: {
            id: removedIngredient[0].id,
          },
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => console.error(err));
    },
    removeInstruction(index) {
      let removedStep = this.steps.splice(index, 1);
      this.$apollo
        .mutate({
          mutation: DELETE_STEP,
          variables: {
            id: removedStep[0].id,
          },
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => console.error(err));
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
    },
    removeImage(index, type) {
      if (type === "old") {
        let removedImage = this.oldImages.splice(index, 1);
        // here there should be asking permision
        this.$apollo
          .mutate({
            mutation: DELETE_IMAGE,
            variables: {
              id: removedImage[0].id,
            },
          })
          .then(({ data }) => {
            console.log(data);
          })
          .catch((err) => console.error(err));
      } else if (type === "new") {
        this.images.splice(index, 1);
      }
    },

    updateIngredient() {
      var foundIndex = this.ingredients.findIndex(
        (ing) => ing.id === this.ingredient.id
      );
      this.ingredients[foundIndex] = this.ingredient;
      this.ingredientEditModal = false;
    },

    updateStep() {
      var stepIndex = this.steps.findIndex((step) => step.id === this.step.id);
      this.steps[stepIndex] = this.step;
      this.stepEditModal = false;
    },

    openIngEditDialog(ingredient) {
      this.ingredientEditModal = true;
      let ing = this.ingredients.find((ing) => ing.id === ingredient.id);
      this.ingredient = {
        id: ingredient.id,
        name: ing.name,
        amount: ing.amount,
        measurement: ing.measurement,
      };
    },
    openStepEditDialog(step) {
      this.stepEditModal = true;
      let foundStep = this.steps.find((st) => st.id === step.id);
      this.step = {
        id: step.id,
        instruction: foundStep.instruction,
      };
    },
    closeModel(type) {
      if (type === "ingredient") {
        this.ingredientEditModal = false;
      } else if (type === "step") {
        this.stepEditModal = false;
      }
    },
  },
  created() {
    this.loadRecipeData();
  },

  setup() {
    const toast = useToast();

    // Make it available inside methods
    return { toast };
  },
};
</script>