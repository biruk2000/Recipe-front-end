<template>
  <div
    class="
      flex-1
      h-full
      max-w-4xl
      mx-auto
      overflow-hidden
      bg-white
      rounded-lg
      shadow-xl
    "
  >
    <div class="flex flex-col overflow-y-auto md:h-96 md:flex-row">
      <div class="h-32 md:h-full md:w-1/2">
        <img
          arial-hidden="true"
          class="object-cover w-full h-full"
          src="../../assets/img/login-food.jpg"
          alt="login image"
        />
      </div>
      <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div class="w-full">
          <h1 class="mb-4 text-xl font-semibold text-gray-700">Login</h1>
          <VeeForm action="" @submit="loginUser" :validation-schema="schema">
            <label for="" class="block text-sm">
              <span class="text-gray-700">Email</span>
              <VeeField
                name="email"
                type="text"
                placeholder="Enter your email"
                v-model="item.email"
                class="
                  mt-1
                  px-3
                  py-2
                  block
                  placeholder-blueGray-300
                  text-blueGray-600 text-sm
                  border
                  rounded
                  outline-none
                  focus:outline-none focus:ring-2 focus:ring-yellow-600
                  w-full
                "
              />
              <ErrorMessage class="text-red-600" name="email" />
            </label>
            <label for="" class="block mt-4 text-sm">
              <span class="text-gray-700">Password</span>
              <VeeField
                v-model="item.password"
                name="password"
                type="password"
                placeholder="Enter Your password"
                class="
                  mt-1
                  px-3
                  py-2
                  block
                  placeholder-blueGray-300
                  text-blueGray-600 text-sm
                  border
                  rounded
                  outline-none
                  focus:outline-none focus:ring-2 focus:ring-yellow-600
                  w-full
                "
              />
              <ErrorMessage class="text-red-600" name="password" />
            </label>
            <button
              class="
                block
                w-full
                px-4
                py-2
                mt-4
                text-sm
                font-medium
                leading-5
                text-center text-white
                transition-colors
                duration-150
                border-transparent
                rounded-lg
                focus:outline-none focus:shadow-outline-blue
              "
              :class="{'bg-gray-400' : loading, 'bg-red-600 hover:bg-red-700': !loading}"
              :disabled="loading"
            >
              Log in
            </button>
            
          </VeeForm>
          <hr class="my-8" />
          <!-- <button
            class="
              flex
              items-center
              justify-center
              w-full
              px-4
              py-2
              text-sm
              font-medium
              leading-5
              text-white
              transition-colors
              duration-150
              border border-gray-300
              bg-red-600
              rounded-lg
            "
          >
            Google
          </button> -->
          <p class="mt-2">
            <span class="text-sm font-medium text-blue-600"
              >Dont't have an account?</span
            >
            <router-link
              to="/user/signup"
              class="text-sm font-medium hover:underline"
            >
              Sign up
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LOGIN } from "../../queries/User";
import { useQuery } from "@vue/apollo-composable";
import { ref, reactive } from "vue";
import { useToast } from "vue-toastification";

// eslint-disable-next-line no-unused-vars
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// eslint-disable-next-line no-unused-vars
import { set } from "../../utils/Auth/user";

const item = reactive({});
// eslint-disable-next-line no-unused-vars
const store = useStore();

const toast = useToast();
// eslint-disable-next-line no-unused-vars
const router = useRouter();

const enabled = ref(false);
const loading = ref(false);
const errorMessage = ref('')
const schema = {
  email: "required|email|min:4",
  password: "required|min:4",
};



const { onResult, onError } = useQuery(LOGIN, item, () => ({
  enabled,
}));

onResult(({ data }) => {
  if (data && data.login && data.login.token) {
    loading.value = false;
    let claims = data.login.token.split(".")[1];
    let d = JSON.parse(window.atob(claims));
    d["https://hasura.io/jwt/claims"].accessToken = data.login.token;
    localStorage.removeItem("session");
    localStorage.removeItem("token");
    const state = useStorage("session", d["https://hasura.io/jwt/claims"]);
    localStorage.setItem("token", data.login.token);
    set(state.value);
    store.dispatch("setUser", data.login);
    // router.push("/");
    location.replace("/")
    toast.success("login successfully");
  }
});

onError((error) => {
  enabled.value = false;
  loading.value = false;
  errorMessage.value = error.message;
  toast.error(`${errorMessage.value} Please try again.`);
});
const loginUser = () => {
  loading.value = true;
  enabled.value = true;
};
</script>