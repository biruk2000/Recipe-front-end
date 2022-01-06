<template>
  <div class="main-section mt-3">
    <div class="bg-white max-w-full p-4">
      <p class="font-bold text-3xl text-gray-600">Profile</p>
    </div>
    <div class="container mt-8">
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
          <button
            class="
              text-green-500
              bg-transparent
              border border-solid border-green-500
              active:bg-red-600
              font-bold
              uppercase
              text-sm
              px-6
              py-3
              rounded
              outline-none
              focus:outline-none
              mr-1
              mb-1
              ease-linear
              transition-all
              duration-150
            "
            type="button"
            v-on:click="showEditModelDialog"
          >
            Edit
          </button>
        </header>
        <div class="mx-7 mb-6">
          <div class="text-center mt-4 mx-auto w-48 h-48">
            <img
              :src="user.path?user.path: 'https://avatars.dicebear.com/v2/initials/john-doe.svg'"
              alt=""
              class="text-center object-cover rounded-full block h-32 w-32 max-w-full"
            />
          </div>
          <hr />
          <div class="my-3">
            <label for="title" class="block text-lg font-bold">User Name</label>
            <div class="field">
              <div class="block mt-2">
                <input
                  type="text"
                  readonly
                  :value="user ? user.user_name : ''"
                  class="
                    p-2
                    w-full
                    text-sm
                    border
                    outline-none
                    bg-gray-100
                    rounded
                  "
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
                  readonly
                  :value="user ? user.email : ''"
                  class="
                    p-2
                    w-full
                    text-sm
                    border
                    outline-none
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
  <EditModal :showModal="showEditModal">
    <template v-slot:title>
      <h3 class="text-xl font-semibold">Edit Profile</h3>
    </template>
    <template v-slot:main>
      <div class="mx-7 mb-2">
        <VeeForm action="" @submit="editProfile" :validation-schema="schema">
          <div class="mt-3">
            <label for="" class="block font-bold mb-2">Profile Image</label>
            <div class="mb-0">
              <label
                for=""
                class="inline-flex relative bg-blue-500 text-white p-2 rounded"
              >
                <a href="">Upload </a>
                <input
                  accept="image/*"
                  @change="handleImage"
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
            <div class="mt-4">
              <label for="" class="block text-sm">
                <span class="text-gray-700">User Name</span>
                <VeeField
                  name="username"
                  v-model="username"
                  type="text"
                  placeholder="Enter your email"
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
            </div>
            <div class="mt-4">
              <label for="" class="block text-sm">
                <span class="text-gray-700">Email</span>
                <VeeField
                  name="email"
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
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
            </div>
          </div>
          <div class="flex items-center justify-end mt-3 px-6 py-1 rounded-b">
            <button
              class="
                text-green-500
                background-transparent
                px-6
                py-2
                text-sm
                outline-none
                focus:outline-none
                mr-1
                mb-1
                font-bold
                ease-linear
                transition-all
                duration-150
              "
              type="submit"
            >
              Save
            </button>
            <button
              class="
                text-red-500
                bg-transparent
                border border-solid border-red-500
                hover:bg-red-500 hover:text-white
                active:bg-red-600
                font-bold
                text-sm
                px-6
                py-2
                rounded
                outline-none
                focus:outline-none
                mr-1
                mb-1
                ease-linear
                transition-all
                duration-150
              "
              type="button"
              v-on:click="toggleModal"
            >
              Close
            </button>
          </div>
        </VeeForm>
      </div>
    </template>
  </EditModal>
</template>

<script>
import EditModal from "../../components/Editmodal.vue";
import { userId } from "../../utils/Auth/user";
import { GET_USER, UPDATE_USER, UPDATE_USER_IMAGE } from "../../queries/User";
import { UPLOAD_USER_IMAGE } from '../../queries/Images';
import { useToast } from "vue-toastification";
// import { ref } from "vue";
export default {
  name: "profile",
  components: {
    EditModal,
  },
  data() {
    return {
      username: "",
      email: "",
      image: null,
      user: null,
      showEditModal: false,
      schema: {
        email: "required|email|min:4",
        username: "required",
      },
    };
  },
  methods: {
    handleImage(e) {
      if (userId) {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result;
        };
        reader.readAsDataURL(selectedImage);
      }
    },
    getUser(userId) {
      this.$apollo
        .query({
          query: GET_USER,
          variables: {
            userId: userId,
          },
        })
        .then(({ data }) => {
          this.user = data.Users_by_pk;
        });
    },
    showEditModelDialog() {
      this.showEditModal = true;
      this.username = this.user.user_name;
      this.email = this.user.email;
    },
    toggleModal() {
      this.showEditModal = !this.showEditModal;
    },
    editProfile() {
      if(userId){
        this.$apollo.mutate({
          mutation: UPDATE_USER,
          variables: {
            userId: userId.value,
            email: this.email,
            userName: this.username
          },
        // eslint-disable-next-line no-unused-vars
        }).then(({data}) => {
          // console.log(data)
          if(this.image !== null){
            const variables = {
              image: this.image,
              folder: "User"
            }
            this.$apollo.mutate({
              mutation: UPLOAD_USER_IMAGE,
              variables
            }).then(({data}) => {
              console.log(data);
              const variables = {
                path: data.uploadImage.path,
                userId: userId.value
              };

              this.$apollo.mutate({
                mutation: UPDATE_USER_IMAGE,
                variables
              }).then(({data}) => {
                console.log(data);
              }).catch((err) => console.log(err))
            })
          }
          this.showEditModal = false;
          this.toast.success("you successfully updated your profile");
          // this.$router.go()
        }).catch((err) => {
          console.log(err)
          this.toast.error("something went wrong please try again?");
          });
      }

    }
  },
  created() {
    this.getUser(userId.value);
  },
  computed: {
  },
  setup() {
    const toast = useToast();

    // Make it available inside methods
    return { toast };
  },
};
</script>


<style lang="postcss" scoped>
.card {
  @apply flex-1 max-w-4xl mx-auto bg-white rounded border-gray-100  border;
}
.card-header {
  @apply flex items-stretch justify-between border-b border-gray-100 p-4;
}
.card-header-title {
  @apply flex items-center;
}
</style>