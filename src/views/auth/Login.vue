<template>
  <div class="h-screen font-nunito">
    <div class="flex flex-wrap w-full">
      <!-- Error Message -->
      <div class="flex flex-col w-full md:w-1/2">
        <div
          v-if="errorMsg"
          class="p-4 my-10 rounded-md shadow-lg bg-light-grey"
        >
          <p class="text-center text-red">{{ errorMsg }}</p>
        </div>

        <!-- Login Section -->
        <div
          class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32"
        >
          <p class="text-3xl text-center">Login</p>
          <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="SignIn">
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
                v-model="password"
                class="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
            >
              Log In
            </button>
          </form>
          <div class="pt-12 pb-12 text-center">
            <p>
              Don't have an account?
              <Router-link
                :to="{ name: 'SignUp' }"
                class="font-semibold underline"
                >Signup.</Router-link
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
    const email = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();
    const errorMsg = ref(null);

    // SignIn function
    const SignIn = async () => {
      try {
        await store.dispatch("signIn", {
          email: email.value,
          password: password.value,
        });
        router.push({ name: "Home" });
      } catch (err) {
        errorMsg.value = `Error: ${err.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    return { email, password, SignIn, errorMsg };
  },
};
</script>
