<template>
  <div class="container pr-30 mt-3 p-10 bg-white">
    <div class="lg:flex justify-between items-center">
      <div class="flex space-x-4">
        <p class="font-bold text-5xl">Recipe Title</p>
        <button class="text-grey-darker hover:text-red-dark mt-2">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" class="hover:fill-current text-red-700" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="hover:fill-current hover:text-red-500"
            height="40px"
            viewBox="0 0 24 24"
            width="40px"
            fill="gray"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
        <span class="mt-4">5 likes</span>
      </div>
      <div class="flex space-x-2 mt-4">
        <button
          class="
            bg-red-500
            hover:bg-red-600
            text-white
            rounded-lg
            focus:outline-none
            px-4
            py-1
            font-semibold
            shadow
          "
        >
          Delete
        </button>
        <button
          class="
            border-green-400
            hover:text-white hover:bg-green-600
            border-2
            rounded-lg
            focus:outline-none
            px-6
            py-2
            font-semibold
            shadow
          "
        >
          Edit
        </button>
      </div>
    </div>
    <div class="flex divide-x divide-gray-600 mt-5">
      <star-rating :value="ratingValue"></star-rating>
      <p class="border-gray-500 px-4">14 Reviews</p>
      <div class="px-4">4 servants</div>
    </div>

    <p class="mt-4 text-black text-base md:w-10/12">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique rerum
      facilis quae magnam aliquam. Ullam, molestiae <br />
      totam? Quam quaerat minima quasi deserunt quos esse facere! Magnam,
      necessitatibus! Assumenda, voluptate optio!
    </p>
    <div class="flex space-x-2 items-center justify-between mt-6">
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
        <img
          class="rounded-full w-11 h-11 max-w-none"
          alt="A"
          src="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"
        />
        <span class="text-gray-800 items-center flex ml-3">By -</span>
        <span class="flex text-black items-center px-3 py-2"> John Doe </span>
      </span>
    </div>
    <div class="md:mx-10 divide-y-2 divide-gray-600">
      <div
        class="
          mt-7
          pb-5
          w-full
          md:w-4/5
          grid
          gap-6
          md:gap-0
          grid-flow-row
          md:grid-cols-2
        "
      >
        <div class="shadow border-2 p-2 grid grid-flow-row gap-4">
          <div class="rounded">
            <img
              src="../../assets/recipe2.jpg"
              class="object-cover md:h-60 w-full"
              alt=""
            />
          </div>
          <div class="grid grid-cols-4 md:mx-1 gap-0 shadow-sm rounded">
            <div class="p-1 md:p-0" v-for="(image, i) in 4" :key="i">
              <img
                src="../../assets/recipe2.jpg"
                class="w-12 h-10 md:w-20 md:h-12 object-cover"
              />
            </div>
          </div>
        </div>
        <div class="ml-8 border-2 border-gray-300 w-60">
          <div class="p-5">
            <p class="mb-3">
              <span class="font-semibold text-gray-700 pr-1">Prep:</span>20mins
            </p>
            <p>
              <span class="font-semibold text-gray-700 pr-1">Category:</span
              >General
            </p>
          </div>
        </div>
      </div>
      <div class="mt-10 py-6 md:w-4/5">
        <p class="font-bold text-3xl">Ingredients</p>
        <div class="mt-10 mx-2">
          <ul>
            <li v-for="i in 5" :key="i" class="mb-6">
              <span class="font-bold">{{ i }}</span>
              <p class="inline-block mx-4">this is the first ingredient</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-10 pt-5">
        <p class="font-bold text-3xl">Steps</p>
        <div class="mt-10 mx-2">
          <ul class="mx-1">
            <li v-for="i in 5" :key="i" class="mb-6 md:w-4/5">
              <p class="font-bold mb-4">Step {{ i }}</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
                id iste dolores! Laudantium assumenda minus necessitatibus
                tempora, excepturi vitae autem a, libero voluptate id veritatis,
                mollitia illo perspiciatis. Eligendi, totam!
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-10 pt-5">
        <div>
          <form class="w-full">
            <div class="flex items-center py-2">
              <p
                class="
                  flex-shrink-0
                  bg-teal-500
                  hover:bg-teal-700
                  border-teal-500
                  hover:border-teal-700
                  text-sm
                  pt-2
                  px-2
                  rounded
                "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7zm8 0h2v2h-2zm-4 0h2v2h-2z"
                  />
                </svg>
              </p>
              <input
                class="
                  appearance-none
                  focus:border-blue-700
                  border-b-2
                  w-full
                  text-gray-700
                  mr-3
                  py-1
                  px-2
                  leading-tight
                  focus:outline-none
                "
                type="text"
                placeholder="Add Review"
                v-model="reviewMessage"
              />
              <button
                class="
                  flex-shrink-0
                  bg-teal-500
                  hover:bg-teal-700
                  border-teal-500
                  hover:border-teal-700
                  text-sm text-white
                  py-1
                  px-2
                  rounded
                "
                type="button"
                v-if="reviewMessage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z"
                  />
                </svg>
              </button>
              <button
                class="
                  flex-shrink-0
                  border-transparent border-4
                  text-teal-500
                  hover:text-teal-800
                  text-sm
                  py-1
                  px-2
                  rounded
                "
                type="button"
                v-if="reviewMessage"
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
          </form>
        </div>
        <div class="mt-6 bg-gray-300">
          <div class="border-b border-teal-500 p-3">
            <p class="font-semibold text-xl">Reviews(200)</p>
          </div>
          <div class="flex items-center p-4">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src="../../assets/logo.png"
              alt="Avatar of Jonathan Reinink"
            />
            <div class="text-sm">
              <p class="leading-none text-black font-semibold">
                Jonathan Reinink
              </p>
              <p class="p-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt non molestias sequi delectus cupiditate illo, nulla
                quam, consequatur qui officia magnam, expedita beatae
                reprehenderit quo voluptate porro maxime in repudiandae.
              </p>
              <p class="text-gray-600 p-2">Aug 18</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "../../components/Recipe/StarRating.vue";
export default {
  components: {
    StarRating,
  },
  props: ["recipeId"],
  data() {
    return {
      ratingValue: 3,
      reviewMessage: "",
    };
  },
};
</script>