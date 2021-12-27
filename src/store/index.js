import { createStore } from "vuex";

import { SIGNUP, LOGIN } from "../queries/User.js";
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
    userFavoritesRecipes: []
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
    signupUser: ({commit}, payload) => {
      apolloClient.mutate({
        mutation: SIGNUP,
        variables: payload
      }).then(({data}) => {
        console.log(data);
        localStorage.setItem("token", data.Signup.token);
        commit("setUser", data.Signup);
        router.push('/');
      })
    },

    loginUser: ({commit}, payload) => {
      apolloClient.mutate({
        mutation: LOGIN,
        variables: payload
      }).then(({data}) => {
        console.log(data.login);
        localStorage.setItem("token", data.login.token);
        commit("setUser", data.login);
        
      })
    },

    getCurrentUser: () => {
       
    },

    // eslint-disable-next-line no-unused-vars
    getUserFavoritesIds: ({commit}) => {
      if(isLoggedIn){
        apolloClient.mutate({
          mutation: USER_FAVORITES_RECIPE_IDS,
          variables: {
            userId: userId.value
          }
        }).then(({data}) => {
          console.log(data.Favorites)
          commit('setUserFavoritesIds', data.Favorites);
        }).catch(err => console.error(err))
      }
    },

    // eslint-disable-next-line no-unused-vars
    getUserBookmarksIds: ({commit}) => {
      if(isLoggedIn){
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
        console.log(data.Recipes)
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
    }
  },
  getters: {
    user: state => state.user,



    // recipes getters
    totalRecipes: state => state.recipes,
    searchResults: state => state.searchResults,
    userFavoritesIds: state => state.userFavoritesIds,
    userBookmarksIds: state => state.userBookmarksIds,
    userFavoritesRecipes: state => state.userFavoritesRecipes
  }
});
