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

    <!-- Update Zone -->
    <form @submit.prevent="updateZone" class="max-w-2xl mx-auto my-52">
      <div
        class="max-w-2xl p-4 border rounded-lg shadow-md bg-light-grey text-light-green"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold leading-none">Update Zone</h3>
        </div>
        <div v-for="zone in singleZone" :key="zone.id">
          <ul>
            <li class="py-3 sm:py-4">
              <div class="flex flex-col gap-x-6 gap-y-2">
                <div class="flex flex-col">
                  <p class="text-md">Zone</p>
                  <input
                    v-if="edit"
                    type="text"
                    class="w-3/4 p-2 ml-5 text-black bg-transparent border-b-2 outline-none focus:outline-none"
                    v-model="zone.zone"
                  />
                  <p v-else class="text-lg text-black">{{ zone.zone }}</p>
                </div>
                <div class="flex flex-col">
                  <p class="text-md">Description</p>
                  <input
                    v-if="edit"
                    type="text"
                    class="w-3/4 p-2 ml-5 text-black bg-transparent border-b-2 outline-none focus:outline-none"
                    v-model="zone.description"
                  />
                  <p v-else class="text-lg text-black">
                    {{ zone.description }}
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
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
export default {
  setup() {
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const store = useStore();
    const route = useRoute();

    const currentId = route.params.zoneId;

    const edit = computed(() => store.getters.readEdit);

    const editMode = () => {
      store.dispatch("toggleEdit");
    };

    store.dispatch("getSingleZone", currentId);
    const singleZone = computed(() => store.getters.readSingleZone);

    // Update Zone function
    const updateZone = async () => {
      try {
        await store.dispatch(
          "updateZone",
          {
            id: singleZone.value[0].id,
            zone: singleZone.value[0].zone,
            description: singleZone.value[0].description,
          },
          currentId
        );
        statusMsg.value = "Success: Zone Updated!";
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

    return { singleZone, editMode, edit, updateZone, errorMsg, statusMsg };
  },
};
</script>
