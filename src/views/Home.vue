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
      <div v-for="i in 2"
      :key="i">
        <Card></Card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Recipe/Card.vue'
export default {
  name: 'Home',
  components: {
    Card
  }
}
</script>
