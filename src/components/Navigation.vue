<template>
  <header class="text-white bg-green font-nunito">
    <!-- Navbar -->
    <nav class="flex items-center gap-4 px-4 py-5">
      <router-link
        :to="{ name: 'Home' }"
        class="flex items-center text-lg cursor-pointer gap-x-4"
        >Guard Tracker</router-link
      >

      <div class="flex justify-end flex-1 gap-x-10">
        <div class="relative group">
          <button v-if="user" class="cursor-pointer">Menü</button>
          <nav
            tabindex="0"
            class="absolute left-0 invisible w-40 text-white transition-all border border-2 border-gray-800 rounded bg-light-green top-full group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
          >
            <ul class="py-1">
              <li>
                <router-link
                  :to="{ name: 'ZoneSetup' }"
                  class="block px-4 py-2 bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
                >
                  Zone
                </router-link>
              </li>
              <li>
               <router-link
                  :to="{ name: 'LocationSetup' }"
                  class="block px-4 py-2 bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
                >
                  Location
                </router-link>
              </li>
              <li>
               <router-link
                  :to="{ name: 'DesignationSetup' }"
                  class="block px-4 py-2 bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
                >
                  Designation
                </router-link>
              </li>
              <li>
               <router-link
                  :to="{ name: 'GuardSetup' }"
                  class="block px-4 py-2 bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
                >
                  Guard
                </router-link>
              </li>
            </ul>
          </nav>
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
        <button @click="handleLogout" v-if="user" class="cursor-pointer">LogOut</button>
        
      </div>
    </nav>
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
