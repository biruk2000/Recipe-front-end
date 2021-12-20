import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddRecipe from "../views/User/AddRecipe.vue"
import Favorites from "../views/User/Favorites.vue"
import Profile from "../views/User/Profile.vue"
import Recipe from "../views/Recipes/Recipe.vue"

import SignIn from '../views/Auth/SignIn.vue'
import SignUp from '../views/Auth/SignUp.vue'

import AuthLayout from "../layouts/AuthLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";


const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
    ],
  },
  {
    path: "/addrecipe",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "AddRecipe",
        component: AddRecipe,
      },
    ],
  },
  {
    path: "/recipes/:recipeId",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "recipe",
        props: true,
        component: Recipe,
      },
    ],
  },
  {
    path: "/favorites",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "favorites",
        component: Favorites,
      },
    ],
  },
  {
    path: "/profile",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "profile",
        component: Profile,
      },
    ],
  },

  // auth routes
  {
    path: "/user/signin",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "signin",
        component: SignIn,
      },
    ],
  },
  {
    path: "/user/signup",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "signup",
        component: SignUp,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes,
})

export default router
