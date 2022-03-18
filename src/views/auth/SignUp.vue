<template>
  <div class="h-screen bg-yellow-50 font-nunito">
    <div class="flex flex-wrap w-full">
      <!-- Error Message -->
      <div class="flex flex-col w-full md:w-1/2">
        <div
          v-if="errorMsg"
          class="p-4 my-10 rounded-md shadow-lg bg-light-grey"
        >
          <p class="text-center text-red">{{ errorMsg }}</p>
        </div>
        <!-- Sign Up Section -->
        <div
          class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32"
        >
          <p class="text-3xl text-center">Sign Up.</p>
          <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="SignUp">
            <div class="flex flex-col pt-4">
              <label for="email" class="text-lg">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                v-model="email"
              />
            </div>

            <div class="flex flex-col pt-4">
              <label for="password" class="text-lg">Password</label>
              <input
                type="password"
                id="password"
                placeholder="password"
                class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                v-model="password"
              />
            </div>
            <div class="flex flex-col pt-4">
              <label for="confirmPassword" class="text-lg"
                >Confirm Password</label
              >
              <input
                type="password"
                id="confirmPassword"
                placeholder="password"
                class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                v-model="confirmPassword"
              />
            </div>

            <button
            v-if="!isPending"
              type="submit"
              class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
            >
              Sign Up
            </button>
             <button
      v-if="isPending"
        disabled
        type="button"
        class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
      >
        <svg
          role="status"
          class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
        Saving...
      </button>
          </form>
          <div class="pt-12 pb-12 text-center">
            <p>
              Don't have an account?
              <Router-link
                :to="{ name: 'Login' }"
                class="font-semibold underline"
                >Log In.</Router-link
              >
            </p>
          </div>
        </div>
      </div>

      <!-- Image Section -->
      <div class="w-1/2 shadow-2xl">
        <img
          class="hidden object-cover w-full h-screen md:block"
          src="@/assets/security.jpg"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const isPending = ref(false)
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMsg = ref(null);
    const router = useRouter();
    const store = useStore();

    // Sign Up function
    const SignUp = async () => {
      if (password.value === confirmPassword.value) {
        try {
          isPending.value = true;
          await store.dispatch("signUp", {
            email: email.value,
            password: password.value,
          });
          isPending.value = false;
          router.push({ name: "Login" });
        } catch (err) {
          errorMsg.value = `Error ${err.message}`;

          setTimeout(() => {
            errorMsg.value = false;
          }, 5000);
          isPending.value = false;
        }
      } else {
        errorMsg.value = "Password values do not match!";
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
        isPending.value = false;
      }
    };

    return { email, password, confirmPassword, SignUp, errorMsg };
  },
};
</script>
