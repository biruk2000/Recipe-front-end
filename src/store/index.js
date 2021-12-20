import { createStore } from "vuex";

import { SIGNUP } from "../queries/User.js";

import { apolloClient } from "../utils/apollo";


export default createStore({
  state: {
    user: null
  },
  mutations: {},
  actions: {
    signupUser: ( payload) => {
      apolloClient.mutate({
        mutation: SIGNUP,
        variables: payload
      }).then(({data}) => {
        console.log(data);
      })
    },
  },
  modules: {},
});
