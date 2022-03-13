<template>
  <div>
    <!-- Guard List -->
    <div class="flex items-center justify-center min-h-full px-20">
      <div class="space-y-8">
        <h1 class="mt-10 mb-6 text-4xl font-bold text-center">Guard List</h1>

        <router-link
          :to="{ name: 'GuardDetails', params: { guardId: guard.id } }"
          v-for="guard in guards"
          :key="guard.id"
          class="flex items-center w-screen p-6 space-x-6 transition duration-500 transform shadow-lg md:mx-auto md:container text-light-green bg-light-grey rounded-xl hover:shadow-xl hover:scale-105"
        >
          <div class="flex p-4 space-x-4 rounded-lg w-72">
            <label for="">{{ guard.fullName }}</label>
          </div>
          <div class="flex p-4 space-x-4 rounded-lg w-72">
            <label for="">{{ guard.designation }}</label>
          </div>
          <div class="flex p-4 space-x-4 rounded-lg w-72">
            <label for="">{{ guard.zone }}</label>
          </div>
          <div class="flex p-4 space-x-4 rounded-lg w-72">
            <label for="">{{ guard.location }}</label>
          </div>
          <div class="flex p-4 space-x-4 rounded-lg w-72">
            <label for="">{{ guard.shift }}</label>
          </div>
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              /></svg
          ></span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Home",

  setup() {
    const store = useStore();

    store.dispatch("getGuards");

    const guards = computed(() => store.getters.readGuards);
    return { guards };
  },
};
</script>

