<template>
  <div class="flex h-screen bg-gray-100" :class="{'overflow-hidden': isSideMenuOpen}">
    <SideMenu />
    <transition name="fade">
      <div
        class="
          fixed
          inset-0
          z-10
          flex
          items-end
          bg-black bg-opacity-50
          sm:items-center sm:justify-center
          md:hidden
        "
        v-if="isSideMenuOpen"
        @click="toggleSideMenu"
      ></div>
    </transition>
    <transition name="fade">
      <SideMenu v-if="isSideMenuOpen" :isSideMenuOpen="isSideMenuOpen" />
    </transition>
    <div class="flex flex-col flex-1 w-full">
      <NavBar @toggle-side-menu="toggleSideMenu" />
      <main class="h-full overflow-y-auto">
        <div class="container px-6 mx-auto grid">
          <transition name="main" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideMenu from "@/components/SideMenu.vue";
export default {
  components: {
    NavBar,
    SideMenu,
  },
  data() {
    return {
      isSideMenuOpen: false,
    };
  },
  methods: {
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-enter-active,
.main-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.main-enter-active {
  transition-delay: 0.25s;
}

.main-enter,
.main-leave-active {
  opacity: 0;
}
</style>