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
      class="flex flex-col p-8 text-black rounded-md shadow-lg bg-light-grey"
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
      <button
        v-if="!isPending"
        type="submit"
        class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm cursor-pointer bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
      >
        Add
      </button>
      <button
        v-if="isPending"
        disabled
        type="button"
        class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green "
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
    const isPending = ref(false);
    const designationName = ref("");
    const designationDescription = ref("");
    const store = useStore();

    const errorMsg = ref(null);
    const statusMsg = ref(null);

    store.dispatch("getDesignations");
    const designations = computed(() => store.getters.readDesignations);

    // Create Description function
    const createDesignation = async () => {
      isPending.value = true;
      try {
        await store.dispatch("addDesignation", {
          designation: designationName.value,
          description: designationDescription.value,
        });
        isPending.value = false;
        statusMsg.value = "Success: Designation Created!";
        store.dispatch("getDesignations");
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
        isPending.value = false;
      }
    };

    return {
      designationName,
      designationDescription,
      createDesignation,
      errorMsg,
      statusMsg,
      designations,
      isPending,
    };
  },
};
</script>
