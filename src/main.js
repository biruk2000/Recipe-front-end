import { createApp, h, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./utils/validation";
import { ObserveVisibility } from "vue-observe-visibility";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { DefaultApolloClient } from "@vue/apollo-composable";

import "./index.css";

// import Vue from 'vue'
import { apolloProvider, apolloClient } from "./utils/apollo.js";

const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const app = createApp({
  render: () => h(App),
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  created() {
    store.dispatch("getUserFavoritesIds");
    store.dispatch("getUserBookmarksIds");
  },
});
app.use(store).use(router);
app.use(apolloProvider);
app.directive("observe-visibility", {
  beforeMount: (el, binding, vnode) => {
    vnode.context = binding.instance;
    ObserveVisibility.bind(el, binding, vnode);
  },
  update: ObserveVisibility.update,
  unmounted: ObserveVisibility.unbind,
});
app.use(VeeValidatePlugin);
app.use(Toast, options);
app.mount("#app");
