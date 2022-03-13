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
    <form @submit.prevent="updateDesignation" class="max-w-2xl mx-auto">
      <div class="my-24">
        <div
          class="max-w-2xl p-4 border rounded-lg shadow-md text-light-green bg-light-grey sm:p-8"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold leading-none">Update Designation</h3>
          </div>
          <div v-for="designation in singleDesignation" :key="designation.id">
            <ul>
              <li class="py-3 sm:py-4">
                <div class="flex flex-col gap-x-6 gap-y-2">
                  <div class="flex flex-col">
                    <p class="text-sm font-bold">Designation</p>
                    <input
                      v-if="edit"
                      type="text"
                      class="w-3/4 p-2 ml-5 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
                      v-model="designation.designation"
                    />
                    <p v-else class="text-lg text-black">
                      {{ designation.designation }}
                    </p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm font-bold">Description</p>
                    <input
                      v-if="edit"
                      type="text"
                      class="w-3/4 p-2 ml-5 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
                      v-model="designation.description"
                    />
                    <p v-else class="text-lg text-black">
                      {{ designation.description }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
                    @click="editMode"
                  >
                    Edit
                  </button>
                  <button
                    v-if="edit"
                    type="submit"
                    class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
                  >
                    Update
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import { ref } from "vue";
export default {
  setup() {
    const route = useRoute();

    const store = useStore();
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const currentId = route.params.designationId;

    const edit = computed(() => store.getters.readEdit);

    const editMode = () => {
      store.dispatch("toggleEdit");
    };

    store.dispatch("getSingleDesignation", currentId);
    const singleDesignation = computed(
      () => store.getters.readSingleDesignation
    );

    // Update designation function
    const updateDesignation = async () => {
      try {
        await store.dispatch(
          "updateDesignation",
          {
            id: singleDesignation.value[0].id,
            designation: singleDesignation.value[0].designation,
            description: singleDesignation.value[0].description,
          },
          currentId
        );
        statusMsg.value = "Success: Designation Updated!";
        editMode();
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

    return {
      editMode,
      edit,
      singleDesignation,
      updateDesignation,
      errorMsg,
      statusMsg,
    };
  },
};
</script>
