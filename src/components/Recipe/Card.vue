<template>
    <div
      class="card max-w-lg overflow-hidden"
    >
      <div class="mb-2">
        <img
          :src="recipe.RecipeImages[0].path"
          class="w-full h-40 sm:h-48 object-cover"
          alt=""
        />
      </div>
      <div v-if="recipe.RecipeImages.length > 1" class="grid grid-cols-4 mx-1 gap-px shadow-sm rounded">
        <div class="" v-for="(image, i) in recipe.RecipeImages" :key="i">
          <img :src="image.path" class="w-20 h-12 object-cover" />
        </div>
      </div>
      <div class="p-4">
        <div class="mb-1">
          <div class="font-bold text-xl mb-2 border-b border-gray-300">
            {{recipe.title}}
          </div>
          <p class="text-gray-700 text-base">
            {{getDescription(recipe.description)}}
          </p>
        </div>
        <div class="flex items-center text-sm text-gray-600">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current"
            v-for="i in 5" :key="i"
            :class="[rating >= i ? 'text-yellow-500' : 'text-gray-500']"
          >
            <path
              d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
            ></path></svg
          ><span class="ml-2">(4)</span>
        </div>

        <!-- <StarRating :value="rating" v-model="rating" /> -->
        
        <div class="mt-1 flex justify-between items-center flex-wrap">
          <p class="flex align-center text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-5 inline-block fill-current text-yellow-500"
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
            <span class="ml-2 text-md">General</span>
          </p>
          <!-- <span class="mr-2 font-medium text-gray-400 ml-4">2020/20/02</span> -->
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
                src="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"
              />
              <span class="flex items-center px-3 py-2"> John Doe </span>
            </span>
            <button class="text-grey-darker hover:text-red-dark">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" class="hover:fill-current text-red-700" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" class="hover:fill-current hover:text-red-500" height="24px" viewBox="0 0 24 24" width="24px" fill="gray"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
        </div>
      </div>
      <div class="badge">
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
        <span class="ml-1">20min</span>
      </div>
    </div>
</template>

<script>
export default {
  components: {
  },
  props: ['recipe'],
  data: () => ({
    rating: 3
  }),
  methods: {
    getDescription(description){
      return description.length > 40? description.substring(0,45) + '...' : description
    }
  }
}
</script>


<style lang="postcss">
.card {
  @apply bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl relative;
}

.badge {
  @apply bg-red-500 text-white text-xs text-center font-bold rounded-full p-2 absolute top-0 right-0 mt-2 ml-2;
}
</style>