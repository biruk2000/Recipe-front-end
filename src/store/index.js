import { createStore } from "vuex";

import { GET_RECIPES,SEARCH_RECIPES } from "../queries/Recipes.js";
import {USER_FAVORITES_RECIPE_IDS} from '../queries/Favorites'
import {USER_BOOKMARK_RECIPES_IDS} from '../queries/BookMarks'
import router from '../router/index'

import { apolloClient } from "../utils/apollo";
import {isLoggedIn, userId} from '../utils/Auth/user'


export default createStore({
  state: {
    user: null,
    recipes: [],
    searchResults: [],
    userFavoritesIds: [],
    userBookmarksIds: [],
    userFavoritesRecipes: [],
    userBookmarkedRecipes: []
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    },

    // recipe mutations


    setRecipes(state, payload){
      state.recipes = payload
    },
    setUserFavoritesIds(state, payload){
      state.userFavoritesIds = payload
    },
    setUserFavoritesRecipes(state, payload){
      state.userFavoritesRecipes = payload
    },
    setUserBookmarksIds(state, payload){
      state.userBookmarksIds = payload
    },
    setUserBookmarkedRecipes(state, payload){
      state.userBookmarkedRecipes.push(payload);
    },
    setSearchResults(state, payload){
      if(payload !== null){
        state.searchResults = payload
      }
    },
    clearSearchResult(state){
      state.searchResults = []
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    setUser: ({commit}, payload) => {
      commit("setUser", payload)
    },

    // eslint-disable-next-line no-unused-vars
    getUserFavoritesIds: ({commit}) => {
      if(isLoggedIn.value){
        apolloClient.mutate({
          mutation: USER_FAVORITES_RECIPE_IDS,
          variables: {
            userId: userId.value
          }
        }).then(({data}) => {
          commit('setUserFavoritesIds', data.Favorites);
        }).catch(err => console.error(err))
      }
    },

    setUserBookmarkedRecipes : ({commit}, payload) => {
      commit("setUserBookmarkedRecipes", payload)
    },

    // eslint-disable-next-line no-unused-vars
    getUserBookmarksIds: ({commit}) => {
      if(isLoggedIn.value){
        apolloClient.mutate({
          mutation: USER_BOOKMARK_RECIPES_IDS,
          variables: {
            userId: userId.value
          }
        }).then(({data}) => {
          commit('setUserBookmarksIds', data.BookMarks);
        }).catch(err => console.error(err))
      }
    },





    // recipes action
    getAllRecipes: ({commit})=> {
      apolloClient.query({
        query: GET_RECIPES
      }).then(({data}) => {
        commit("setRecipes", data.Recipes);
      })
    },

    // eslint-disable-next-line no-unused-vars
    searchRecipes: ({commit}, payload) => {
      apolloClient.query({
        query: SEARCH_RECIPES,
        variables: payload
      }).then(({data}) => {
        commit("setSearchResults", data.Recipes)
      }).catch(err => console.error(err))
    },

    clearUser: ({state}) => {
      state.user  = null;
      localStorage.removeItem("token");
      
      // this.$router.go(0)
      // this.$$router.push('/')
      router.go().catch(() => {})
    }
  },
  getters: {
    user: state => state.user,
    // recipes getters
    totalRecipes: state => state.recipes,
    searchResults: state => state.searchResults,
    userFavoritesIds: state => state.userFavoritesIds,
    userBookmarksIds: state => state.userBookmarksIds,
    userFavoritesRecipes: state => state.userFavoritesRecipes,
    userBookmardedRecipes: state => state.userBookmarkedRecipes
  }
});
