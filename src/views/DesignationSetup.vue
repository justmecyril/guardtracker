<template>
  <div class="max-w-screen-sm px-4 py-10 mx-auto">
    <!-- Status Message/ Error Message -->
    <div
      v-if="statusMsg || errorMsg"
      class="p-4 mb-10 rounded-md shadow-lg bg-light-grey"
    >
      <p class="text-center text-green">{{ statusMsg }}</p>
      <p class="text-center text-red">{{ errorMsg }}</p>
    </div>
    <!-- Designation Setup-->
    <form
      @submit.prevent="createDesignation"
      class="flex flex-col p-8 rounded-md shadow-lg text-light-green bg-light-grey"
    >
      <h1 class="mb-4 text-3xl">Designation</h1>
      <div class="flex flex-col mb-2">
        <label for="designationName" class="text-lg">Designation Name</label>
        <input
          type="text"
          id="designationName"
          placeholder="designation name"
          class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          v-model="designationName"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label for="description" class="text-lg">Description</label>
        <textarea
          class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="description"
          id="description"
          cols="30"
          rows="3"
          v-model="designationDescription"
        ></textarea>
      </div>
      <input
        type="submit"
        value="Add"
        class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm cursor-pointer bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
      />
    </form>
    <div class="my-8">
      <div
        class="max-w-2xl p-4 border rounded-lg shadow-md text-light-green bg-light-grey sm:p-8"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold leading-none">Designation list</h3>
        </div>
        <router-link
          :to="{
            name: 'DesignationDetails',
            params: { designationId: designation.id },
          }"
          v-for="designation in designations"
          :key="designation.id"
        >
          <ul>
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold">Description</p>
                  <p class="text-lg text-black">
                    {{ designation.description }}
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base text-lg font-semibold text-black"
                >
                  {{ designation.designation }}
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
              </div>
            </li>
          </ul>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";
import {} from "vue-router";
export default {
  setup() {
    const designationName = ref("");
    const designationDescription = ref("");
    const store = useStore();

    const errorMsg = ref(null);
    const statusMsg = ref(null);

    // Create Description function
    const createDesignation = async () => {
      try {
        await store.dispatch("addDesignation", {
          designation: designationName.value,
          description: designationDescription.value,
        });
        statusMsg.value = "Success: Designation Created!";
        designationName.value = "";
        designationDescription.value = "";
        setTimeout(() => {
          statusMsg.value = false;
        }, 5000);
      } catch (err) {
        errorMsg.value = `Error: ${err.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    store.dispatch("getDesignations");

    const designations = computed(() => store.getters.readDesignations);

    return {
      designationName,
      designationDescription,
      createDesignation,
      errorMsg,
      statusMsg,
      designations,
    };
  },
};
</script>
