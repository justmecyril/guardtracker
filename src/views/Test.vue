<template>
  <header class="text-white bg-green font-nunito">
    <!-- Navbar -->
    <nav class="flex flex-col items-center gap-4 px-4 py-5 sm:flex-row">
      <div class="flex items-center gap-x-4">
        <router-link :to="{ name: 'Home' }" class="text-lg cursor-pointer"
          >Guard Tracker</router-link
        >
      </div>
      <ul class="flex justify-end flex-1 gap-x-10">
        <div class="flex" v-if="user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clip-rule="evenodd"
            />
          </svg>
          <button class="cursor-pointer" @click="toggle_Nav">Setup</button>
        </div>






        

        <router-link :to="{ name: 'Login' }" v-if="!user" class="cursor-pointer"
          >Login</router-link
        >

        <router-link
          :to="{ name: 'SignUp' }"
          v-if="!user"
          class="cursor-pointer"
          >SignUp</router-link
        >
        <li @click="handleLogout" v-if="user" class="cursor-pointer">LogOut</li>
      </ul>
    </nav>
    <!-- Setup Navbar -->
    <div
    v-if="show"
      class="flex flex-col items-center gap-4 px-4 py-5"
    >
      <ul class="flex justify-end flex-1 gap-x-10">
        <router-link :to="{ name: 'ZoneSetup' }" class="cursor-pointer"
          >Zone</router-link
        >
        <router-link :to="{ name: 'LocationSetup' }" class="cursor-pointer"
          >Location</router-link
        >
        <router-link :to="{ name: 'DesignationSetup' }" class="cursor-pointer"
          >Designation</router-link
        >
        <router-link :to="{ name: 'GuardSetup' }" class="cursor-pointer"
          >Guard</router-link
        >
      </ul>
    </div>

    
  </header>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Navigation",
  setup() {
    const store = useStore();
    const router = useRouter();

    // Get user from store
    const user = computed(() => store.getters.getUser);

    const show = computed(() => store.getters.readShow);

    // Toggle Setup Navbar function
    const toggle_Nav = () => {
      store.dispatch("toggleNav");
    };

    // logout function
    const handleLogout = () => {
      store.dispatch("logout");
      toggle_Nav();
      router.push({ name: "Login" });
    };

    return { show, toggle_Nav, handleLogout, user };
  },
};
</script>
