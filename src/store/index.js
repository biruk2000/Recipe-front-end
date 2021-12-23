import { createStore } from "vuex";

import { SIGNUP, LOGIN } from "../queries/User.js";
import { GET_RECIPES } from "../queries/Recipes.js";
import router from '../router/index'

import { apolloClient } from "../utils/apollo";


export default createStore({
  state: {
    user: null,
    recipes: []
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    },

    // recipe mutations


    setRecipes(state, payload){
      state.recipes = payload
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
        router.push('/')
      })
    },

    getCurrentUser: () => {
       
    },







    // recipes action
    getAllRecipes: ({commit})=> {
      apolloClient.query({
        query: GET_RECIPES
      }).then(({data}) => {
        console.log(data.Recipes)
        commit("setRecipes", data.Recipes);
      })
    }
  },
  getters: {
    user: state => state.user,



    // recipes getters
    totalRecipes: state => state.recipes
  }
});
