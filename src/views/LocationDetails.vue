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
    <form @submit.prevent="updateLocation" class="max-w-2xl mx-auto">
      <div class="my-8">
        <div
          class="max-w-2xl p-4 border rounded-lg shadow-md text-light-green bg-light-grey sm:p-8"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold leading-none">Update Location</h3>
          </div>
          <div v-for="location in singleLocation" :key="location.id">
            <ul>
              <li class="py-3 sm:py-4">
                <div class="flex flex-col gap-x-6 gap-y-2">
                  <div class="flex flex-col">
                    <p class="text-sm font-bold">Location</p>
                    <input
                      v-if="edit"
                      type="text"
                      class="w-3/4 p-2 ml-5 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
                      v-model="location.location"
                    />
                    <p v-else class="text-lg text-black">
                      {{ location.location }}
                    </p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm font-bold">Total Guards</p>
                    <input
                      v-if="edit"
                      type="text"
                      class="w-3/4 p-2 ml-5 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
                      v-model="location.totalGuards"
                    />
                    <p v-else class="text-lg text-black">
                      {{ location.totalGuards }}
                    </p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm font-bold">Day Guards</p>
                    <input
                      v-if="edit"
                      type="text"
                      class="w-3/4 p-2 ml-5 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
                      v-model="location.dayGuards"
                    />
                    <p v-else class="text-lg text-black">
                      {{ location.dayGuards }}
                    </p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm font-bold">Night Guards</p>
                    <input
                      v-if="edit"
                      type="text"
                      class="w-3/4 p-2 ml-5 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
                      v-model="location.nightGuards"
                    />
                    <p v-else class="text-lg text-black">
                      {{ location.nightGuards }}
                    </p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm font-bold">Zone</p>
                    <select
                      v-if="edit"
                      id="zone"
                      class="w-3/4 p-2 ml-5 text-gray-500 bg-transparent border-b-2 outline-none focus:outline-none"
                      v-model="location.zone"
                    >
                      <option
                        v-for="zone in zones"
                        :key="zone.id"
                        :value="zone.zone"
                      >
                        {{ zone.zone }}
                      </option>
                    </select>
                    <p v-else class="text-lg text-black">{{ location.zone }}</p>
                  </div>
                  <div class="flex flex-col">
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
import { computed, ref } from "vue";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const currentId = route.params.locationId;

    const edit = computed(() => store.getters.readEdit);

    const editMode = () => {
      store.dispatch("toggleEdit");
    };

    store.dispatch("getZones");

    const zones = computed(() => store.getters.readZones);

    store.dispatch("getSingleLocation", currentId);
    const singleLocation = computed(() => store.getters.readSingleLocation);

    const updateLocation = async () => {
      try {
        await store.dispatch(
          "updateLocation",
          {
            id: singleLocation.value[0].id,
            location: singleLocation.value[0].location,
            totalGuards: singleLocation.value[0].totalGuards,
            dayGuards: singleLocation.value[0].dayGuards,
            nightGuards: singleLocation.value[0].nightGuards,
            zone: singleLocation.value[0].zone,
          },
          currentId
        );
        statusMsg.value = "Success: Location Updated!";
        setTimeout(() => {
          statusMsg.value = false;
        }, 5000);
        editMode();
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
      singleLocation,
      updateLocation,
      zones,
      statusMsg,
      errorMsg,
    };
  },
};
</script>
