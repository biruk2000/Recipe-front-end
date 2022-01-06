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
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div class="h-32 md:h-auto md:w-1/2">
        <img
          arial-hidden="true"
          class="object-cover w-full h-full"
          src="../../assets/img/login-food.jpg"
          alt="login image"
        />
      </div>
      <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div class="w-full">
          <h1 class="mb-4 text-xl font-semibold text-gray-700">Sign up</h1>
          <VeeForm action="" @submit="signUpUser" :validation-schema="schema">
            <label for="" class="block text-sm">
              <span class="text-gray-700">User Name</span>
              <VeeField
                v-model="item.username"
                name="username"
                type="text"
                placeholder="Enter User name"
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
              <ErrorMessage class="text-red-600" name="username" />
            </label>
            <label for="" class="block text-sm">
              <span class="text-gray-700">Email</span>
              <VeeField
                v-model="item.email"
                name="email"
                type="text"
                placeholder="Enter Email"
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
            <label for="" class="block mt-4 text-sm">
              <span class="text-gray-700">Confirm Password</span>
              <VeeField
                type="password"
                name="confirm_password"
                placeholder="confirm Your password"
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
              <ErrorMessage class="text-red-600" name="confirm_password" />
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
              type="submit"
            >
              Sign Up
            </button>
          </VeeForm>
          <hr class="my-8" />
          
          <p class="mt-2">
            <span class="text-sm font-medium text-blue-600"
              >Already have an account?</span
            >
            <router-link
              to="/user/signin"
              class="text-sm font-medium hover:underline"
            >
              Login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { SIGNUP } from "../../queries/User";
import { useMutation } from "@vue/apollo-composable";
import { reactive,ref } from "vue";
import { useStorage } from "@vueuse/core";
import { useToast } from "vue-toastification";
// eslint-disable-next-line no-unused-vars
import {set} from '../../utils/Auth/user'

let item = reactive({});
// const enabled = ref(false);
const loading = ref(false);
const toast = useToast();
const schema = {
  username: "required|max:10",
  email: "required|email",
  password: "required|min:4",
  confirm_password: "password_mismatch:@password",
};

const { mutate: signUpUserMutation, onDone, onError } = useMutation(SIGNUP, () => ({
      variables: {
        ...item,
      },
    }))

onDone(({data}) => {
  if(data.Signup && data){
    loading.value = false;
    item= null
    let claims = data.Signup.token.split('.')[1]
    let d = JSON.parse(window.atob(claims))
    d['https://hasura.io/jwt/claims'].accessToken = data.Signup.token;
    localStorage.removeItem("session");
    const state = useStorage("session", d['https://hasura.io/jwt/claims']);
    set(state.value);
    toast.success("Wellcome");
    window.history.back();
  }
});

onError((error) => {
  console.log(error);
  loading.value = false;
  toast.error(`${error.message}`);
})

const signUpUser =() => {
  loading.value = true;
  signUpUserMutation()
}
</script>