import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddRecipe from "../views/User/AddRecipe.vue"
import EditRecipe from "../views/User/EditRecipe.vue"
import Favorites from "../views/User/Favorites.vue"
import Profile from "../views/User/Profile.vue"
import Saved from "../views/User/Saved.vue"
import Recipe from "../views/Recipes/Recipe.vue"
import FilteredRecipe  from "../views/User/FilterRecipe.vue"

import NotFound from "../views/NotFound/index.vue" 

import SignIn from '../views/Auth/SignIn.vue'
import SignUp from '../views/Auth/SignUp.vue'

import AuthLayout from "../layouts/AuthLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";

import AuthGuard from '../utils/AuthGuard'


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
        beforeEnter: AuthGuard
      },
    ],
  },
  {
    path: "/editrecipe/:recipeId",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "editRecipe",
        props: true,
        component: EditRecipe,
        beforeEnter: AuthGuard
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
        beforeEnter: AuthGuard
      },
    ],
  },
  {
    path: "/recipes/filter",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "filterRecipe",
        props: true,
        component: FilteredRecipe,
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
        beforeEnter: AuthGuard
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
        beforeEnter: AuthGuard
      },
    ],
  },
  {
    path: "/saved",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "saved",
        component: Saved,
        beforeEnter: AuthGuard
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
  {
    path: '/:pathMatch(.*)*',
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "notfound",
        component: NotFound,
      },
    ],
  },


]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes,
})

export default router
