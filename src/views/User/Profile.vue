<template>
  <div class="main-section mt-3">
    <div class="bg-white max-w-full p-4">
      <p class="font-bold text-3xl text-gray-600">Profile</p>
    </div>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 my-6">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title font-bold">
            <span class="font-bold"
              ><svg
                class="w-4 h-4 mr-3"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path></svg
            ></span>
            Edit Profile
          </p>
        </header>
        <div class="mx-7 mb-2">
          <form action="">
            <div class="my-3">
              <label for="" class="block font-bold mb-2">Image</label>
              <div class="mb-0">
                <label
                  for=""
                  class="
                    inline-flex
                    relative
                    bg-blue-500
                    text-white
                    p-2
                    rounded
                  "
                >
                  <a href="">Upload </a>
                  <input
                    type="file"
                    class="
                      absolute
                      top-0
                      left-0
                      w-full
                      h-full
                      opacity-0
                      outline-none
                      cursor-pointer
                      -z-1
                    "
                  />
                </label>
              </div>
            </div>
            <hr />
            <div class="my-3">
              <label for="title" class="block text-lg font-bold"
                >User Name</label
              >
              <div class="field">
                <div class="block mt-2">
                  <input
                    type="text"
                    autocomplete="on"
                    name="name"
                    value="John Doe"
                    class="
                      p-2
                      w-full
                      text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      border
                      rounded
                    "
                    required
                  />
                </div>
              </div>
            </div>
            <div class="my-3">
              <label for="title" class="block text-lg font-bold">Email</label>
              <div class="field">
                <div class="block mt-2">
                  <input
                    type="text"
                    autocomplete="on"
                    name="name"
                    value="johndoe@gmail.com"
                    class="
                      p-2
                      w-full
                      text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-400
                      border
                      rounded
                    "
                    required
                  />
                </div>
              </div>
            </div>
            <hr />
            <div class="mt-6">
              <div class="">
                <button
                  type="submit"
                  class="bg-green-500 p-3 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title font-bold">
            <span class="font-bold"
              ><svg
                class="w-4 h-4 mr-3"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path></svg
            ></span>
            User Info
          </p>
        </header>
        <div class="mx-7 mb-6">
            <div class="text-center mt-4 mx-auto w-48 h-48">
                <img src="https://avatars.dicebear.com/v2/initials/john-doe.svg" alt="John Doe" class="text-center rounded-full block h-auto w-full max-w-full">
            </div>
            <hr>
            <div class="my-3">
              <label for="title" class="block text-lg font-bold"
                >User Name</label
              >
              <div class="field">
                <div class="block mt-2">
                  <input
                    type="text"
                    readonly
                    value="John Doe"
                    class="
                      p-2
                      w-full
                      text-sm
                      border outline-none
                      bg-gray-100
                      rounded
                    "
                  />
                </div>
              </div>
            </div>
            <div class="my-3">
              <label for="title" class="block text-lg font-bold"
                >Email</label
              >
              <div class="field">
                <div class="block mt-2">
                  <input
                    type="text"
                    readonly
                    value="johndoe@gmail.com"
                    class="
                      p-2
                      w-full
                      text-sm
                      border outline-none
                      bg-gray-100
                      rounded
                    "
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="postcss" scoped>
.card {
  @apply bg-white rounded border-gray-100  border;
}
.card-header {
  @apply flex items-stretch border-b border-gray-100 p-4;
}
.card-header-title {
  @apply flex items-center;
}
</style>