<template>
  <div
    v-if="showModal"
    class="
      overflow-x-hidden overflow-y-auto
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      justify-center
      items-center
      flex
    "
  >
    <div class="relative my-6 mx-auto w-1/3">
      <!--content-->
      <div
        class="
          border-0
          rounded-lg
          shadow-lg
          relative
          flex flex-col
          w-full
          bg-white
          outline-none
          focus:outline-none
        "
      >
        <!--header-->
        <div
          class="
            flex
            items-start
            justify-between
            p-2
            border-b border-solid border-blueGray-200
            rounded-t
          "
        >
          <slot name="title"></slot>
        </div>
        <!--main-->
        <div class="relative p-6 flex-auto">
          <slot name="main"></slot>
        </div>
        <!--action-->
        <div
          class="
            flex
            items-center
            justify-end
            px-6 py-1
            border-t border-solid border-blueGray-200
            rounded-b
          "
        >
         <slot name="action"></slot>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showModal"
    class="opacity-25 fixed inset-0 z-40 bg-black"
  ></div>
</template>

<script>
export default {
  name: "modal",
  props: ["showModal"],
  methods: {
  },
};
</script>