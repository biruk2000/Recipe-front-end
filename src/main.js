import { createApp, h, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./utils/validation";

import { DefaultApolloClient } from '@vue/apollo-composable'

import "./index.css";

// import Vue from 'vue'
import { apolloProvider, apolloClient } from "./utils/apollo.js";

const app = createApp({
  render: () => h(App),
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  created(){
    store.dispatch('getUserFavoritesIds');
    store.dispatch('getUserBookmarksIds');
  }
});
app.use(store).use(router);
app.use(apolloProvider);
app.use(VeeValidatePlugin);
app.mount("#app");
