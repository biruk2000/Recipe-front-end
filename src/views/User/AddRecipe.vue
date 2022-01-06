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
    <div class="mt-5 md:mt-0">
      <VeeForm
        @submit="addRecipe"
        :validation-schema="schema"
        :initial-values="userData"
        method="POST"
      >
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid sm:grid-cols-6 gap-6">
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
                <label
                  for="time"
                  class="block text-sm font-medium text-gray-700"
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
            
            <div v-if="ingredients.length > 0" class="col-span-6 sm:col-span-6">
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

            <div class="col-span-6 lg:col-span-2">
              <label
                for="ingredient"
                class="block text-sm font-medium text-gray-700"
                >Ingredient Name</label
              >

              <input
                v-model="ingredient.name"
                name="ingredient name"
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
              <!-- <ErrorMessage class="text-red-600" name="ingredient name" /> -->
            </div>
            

            <div class="col-span-6 lg:col-span-1">
              <label
                for="ingAmount"
                class="block text-sm font-medium text-gray-700"
                >Ingredient Amount</label
              >
              <input
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
              <!-- <ErrorMessage class="text-red-600" name="amount" /> -->
            </div>

            <div class="col-span-6 lg:col-span-1">
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
            <div class="col-span-6 lg:col-span-1">
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

            <span v-if="!isIngredientValid" class="col-span-6 -mt-4 text-red-500">at least one ingredient is required</span>

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
              <!-- <ErrorMessage class="text-red-600" name="step" /> -->
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
            <span v-if="!isStpeValid" class="col-span-6 -mt-4 text-red-500">at least one step is required</span>
            <div class="col-span-6 sm:col-span-4">
              <div class="mb-3 w-96">
                <label
                  for="formFileMultiple"
                  class="form-label inline-block font-medium mb-2 text-gray-700"
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
              
              <div  class="mt-8 flex overflow-y-hidden overflow-x-auto">
                <div
                  class="relative flex w-32 mr-3"
                  v-for="(image, i) in images"
                  :key="i"
                >
                  <img class="w-full" :key="i" :src="image" alt="" />
                  <button
                    type="button"
                    class="rounded shadow-lg absolute top-0 bg-gray-400"
                    @click="removeImage(i)"
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
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
            :disabled="loading"
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
            @click="cancel"
          >
            cancel
          </button>
        </div>
      </VeeForm>
    </div>
  </div>
  <div
    v-if="loading"
    class="
      w-full
      h-full
      fixed
      block
      top-0
      left-0
      bg-transparent
      opacity-75
      z-50
    "
  >
    <span
      class="
        text-green-500
        opacity-75
        top-1/2
        my-0
        mx-auto
        block
        relative
        w-0
        h-0
      "
      style="top: 50%"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="50px"
        viewBox="0 0 24 24"
        class="animate-spin"
        width="50px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
        />
      </svg>
    </span>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { DELETE_RECIPE, INSERT_RECIPE } from "../../queries/Recipes";
// eslint-disable-next-line no-unused-vars
import { INSERT_INGREDIENTS } from "../../queries/Ingredients";
// eslint-disable-next-line no-unused-vars
import { INSERT_STEPS } from "../../queries/Steps";
// eslint-disable-next-line no-unused-vars
import { UPLOAD_RECIPE_IMAGE, INSER_RECIPE_IMAGE } from "../../queries/Images";

import { useToast } from "vue-toastification";

import { mapGetters } from "vuex";
// eslint-disable-next-line no-unused-vars
import { userId } from "../../utils/Auth/user";
export default {
  name: "add-recipe",
  computed: {
    ...mapGetters(["user"]),
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
      ingredients: [],
      steps: [],
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
      times: ["Hr", "Min"],
      measurements: ["Kg", "g", "L", "ml", "Tea Spoon"],

      // for validation
      schema: {
        title: "required|max:30",
        category: "required",
        description: "required|min:10|max:200",
        servant: "required",
        "preparation time": "required"
      },
      userData: {
        category: "General",
      },
      loading: false,
      isIngredientValid : true,
      isStpeValid: true,
      isCategoryValid: true,
      isImageValid: true
    };
  },

  methods: {
    resetFormFields() {
      this.numberServant = "";
      this.preparationTime = "";
      this.preparationTimeMeasurement = "";
      this.description = "";
      this.category = "";
      this.title = "";
      this.ingredient = {
        name: "",
        amount: "",
        measurement: "",
      };
      this.step = {
        instruction: "",
      };
      this.ingredients = [];
      (this.steps = []), (this.images = []);
    },
    formatTitle(title) {
      return title.toLowerCase();
    },
    formatPrepTime(time) {
      return time;
    },
    async addRecipe() {
      // this.loading = true;
      let recipe;
      this.loading = true;
      this.isIngredientValid = true;
      this.isStpeValid = true;
      this.isCategoryValid = true;
      this.isImageValid = true;
      try {
        

        if(!this.category){
          this.isCategoryValid = false;
          this.loading = false;
          return;
        }
        if(this.ingredients.length <= 0){
          this.isIngredientValid =false;
          this.loading = false;
          return;
        }
        if(this.steps.length <= 0){
          this.isStpeValid = false;
          this.loading = false;
          return;
        }

        if(this.images.length <= 0){
          this.isImageValid = false;
          this.loading = false;
          return;
        }
        
        this.preparationTime = `${this.preparationTime} ${this.preparationTimeMeasurement}`;
        this.title = this.formatTitle(this.title);
        let variables = {
          title: this.title,
          description: this.description,
          prepTime: this.preparationTime,
          noServant: this.numberServant,
          categories: this.category,
          user_id: userId.value,
        };

        recipe = await this.$apollo.mutate({
          mutation: INSERT_RECIPE,
          variables,
        });
        if (recipe.data.insert_Recipes_one) {
          for (let i = 0; i < this.ingredients.length; i++) {
            variables = {
              recepi_id: recipe.data.insert_Recipes_one.id,
              name: this.ingredients[i].name,
              amount: this.ingredients[i].amount,
              unit: this.ingredients[i].measurement,
            };

             await this.$apollo.mutate({
              mutation: INSERT_INGREDIENTS,
              variables,
            });
          }

          // insert instruction steps
          for (let i = 0; i < this.steps.length; i++) {
            variables = {
              recipe_id: recipe.data.insert_Recipes_one.id,
              step: this.steps[i].instruction,
            };

            await this.$apollo.mutate({
              mutation: INSERT_STEPS,
              variables,
            });
          }

          // inserting images
          for (let i = 0; i < this.images.length; i++) {
            const variables = {
              image: this.images[i],
              folder: "Images",
            };

            let path = await this.$apollo.mutate({
              mutation: UPLOAD_RECIPE_IMAGE,
              variables,
            });
            if (path) {
              const imageVariables = {
                path: path.data.uploadImage.path,
                recipeId: recipe.data.insert_Recipes_one.id,
              };
              await this.$apollo.mutate({
                mutation: INSER_RECIPE_IMAGE,
                variables: imageVariables,
              });
            }
          }

          this.loading = false;
          this.toast.success("You created a new Recipe Successfully!!");
          this.resetFormFields();
        }
        
      }catch (error) {
        this.loading = false;
        this.toast.error("Something went wrong. Please try agian");
        this.$apollo
          .mutate({
            mutation: DELETE_RECIPE,
            variables: {
              recipeId: recipe.data.insert_Recipes_one.id,
            },
          })
          .then(({ data }) => {
            console.log(data);
          });
      }
    },

    cancel() {
      this.resetFormFields();
    },

    addIngredient() {
      if (
        this.ingredient.name &&
        this.ingredient.amount &&
        this.ingredient.measurement
      ) {
        this.isIngredientValid = true;
        let newIngredient = this.ingredient;
        this.ingredients.push(newIngredient);
        this.ingredient = {};
      }else{
        this.isIngredientValid = false;
      }
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addInstruction() {
      if (this.step.instruction) {
        this.isStpeValid = true;
        let newStep = this.step;
        this.steps.push(newStep);
        this.step = {};
      }else{
        this.isStpeValid = false;
      }
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
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
  },
  setup() {
    const toast = useToast();

    // Make it available inside methods
    return { toast };
  },
};
</script>