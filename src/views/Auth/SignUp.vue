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
          src="../../assets/img/login-office.jpeg"
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
                v-model="username"
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
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  w-full
                "
              />
              <ErrorMessage class="text-red-600" name="username" />
            </label>
            <label for="" class="block text-sm">
              <span class="text-gray-700">Email</span>
              <VeeField
                v-model="email"
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
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  w-full
                "
              />
              <ErrorMessage class="text-red-600" name="email" />
            </label>
            <label for="" class="block mt-4 text-sm">
              <span class="text-gray-700">Password</span>
              <VeeField
                v-model="password"
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
                  focus:outline-none focus:ring-2 focus:ring-blue-400
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
                  focus:outline-none focus:ring-2 focus:ring-blue-400
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
                bg-blue-600
                border-transparent
                rounded-lg
                hover:bg-blue-700
                focus:outline-none focus:shadow-outline-blue
              "
              type="submit"
            >
              Sign Up
            </button>
          </VeeForm>
          <hr class="my-8" />
          <button
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
          </button>
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
<script>

export default {
  name: "signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      schema:{
        username: 'required|max:10',
        email: 'required|email',
        password: 'required|min:4',
        confirm_password: 'password_mismatch:@password'
      }
    };
  },
  methods: {
    signUpUser() {
      this.$store.dispatch("signupUser", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      // const values = {
      //   username: this.username,
      //   email: this.email,
      //   password: this.password
      // }
      // console.log(values)
    },
  },
};
</script>