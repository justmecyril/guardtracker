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
    <!-- Location Setup -->
    <form
      @submit.prevent="createLocation"
      class="flex flex-col p-8 rounded-md shadow-lg bg-light-grey text-light-green"
    >
      <h1 class="mb-4 text-3xl">Location/Client</h1>
      <div class="flex flex-col mb-2">
        <label for="locationName" class="text-lg">Location Name</label>
        <input
          type="text"
          id="locationName"
          placeholder="location name"
          class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          v-model="locationName"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label for="totalGuards" class="text-lg">Total Guards</label>
        <input
          type="text"
          id="totalGuards"
          placeholder="total guards"
          class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          v-model="totalGuards"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label for="#dayGuards" class="text-lg"># of Day Guards</label>
        <input
          type="text"
          id="#dayGuards"
          placeholder="day guards"
          class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          v-model="dayGuards"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label for="#nightGuards" class="text-lg"># of Night Guards</label>
        <input
          type="text"
          id="#nightGuards"
          placeholder="night guards"
          class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          v-model="nightGuards"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label for="zone" class="text-lg">Zone</label>
        <select
          id="zone"
          class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          v-model="zone"
        >
          <option disabled value>Select Zone</option>
          <option v-for="zone in zones" :key="zone.id" :value="zone.zone">
            {{ zone.zone }}
          </option>
        </select>
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
          <h3 class="text-xl font-bold leading-none">Location List</h3>
        </div>
        <router-link
          :to="{ name: 'LocationDetails', params: { locationId: location.id } }"
          v-for="location in locations"
          :key="location.id"
        >
          <ul>
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-28">
                <div class="flex-auto min-w-0">
                  <p class="text-sm font-bold">Total Guards</p>
                  <p class="text-lg text-black">
                    {{ location.totalGuards }}
                  </p>
                </div>
                <div class="flex-auto min-w-0">
                  <p class="text-sm font-bold">Day Guards</p>
                  <p class="text-lg text-black">
                    {{ location.dayGuards }}
                  </p>
                </div>
                <div class="flex-auto min-w-0">
                  <p class="text-sm font-bold">Night Guards</p>
                  <p class="text-lg text-black">
                    {{ location.nightGuards }}
                  </p>
                </div>
                <div class="flex-auto min-w-0">
                  <p class="text-sm font-bold">Zone</p>
                  <p class="text-lg text-black">
                    {{ location.zone }}
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base text-lg font-semibold text-black"
                >
                  {{ location.location }}
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
              </div>
            </li>
          </ul>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const zone = ref("");
    const locationName = ref("");
    const totalGuards = ref("");
    const dayGuards = ref("");
    const nightGuards = ref("");
    const store = useStore();
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    // Location Setup function
    const createLocation = async () => {
      try {
        await store.dispatch("addLocation", {
          location: locationName.value,
          totalGuards: totalGuards.value,
          dayGuards: dayGuards.value,
          nightGuards: nightGuards.value,
          zone: zone.value,
        });
        statusMsg.value = "Success: Location Created!";
        locationName.value = "";
        totalGuards.value = "";
        dayGuards.value = "";
        nightGuards.value = "";
        zone.value = "Select Zone";
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

    store.dispatch("getZones");

    const zones = computed(() => store.getters.readZones);

    store.dispatch("getLocations");

    const locations = computed(() => store.getters.readLocations);

    return {
      zone,
      locationName,
      totalGuards,
      dayGuards,
      nightGuards,
      createLocation,
      zones,
      locations,
      errorMsg,
      statusMsg,
    };
  },
};
</script>
