<template>
  <div>
    <!-- Status Message/ Error Message -->
    <div
      v-if="statusMsg || errorMsg"
      class="p-4 mb-10 rounded-md shadow-lg bg-light-grey"
    >
      <p class="text-center text-green">{{ statusMsg }}</p>
      <p class="text-center text-red">{{ errorMsg }}</p>
    </div>
    <form
      @submit.prevent="updateGuard"
      class="mt-8 md:mx-auto md:container font-nunito"
    >
      <div
        class="grid grid-cols-2 gap-4"
        v-for="guard in singleGuard"
        :key="guard.id"
      >
        <div
          class="flex flex-col py-4 pl-8 border-2 bg-light-grey text-light-green"
        >
          <h1 class="pb-2 text-lg font-bold underline">Personal Details</h1>
          <div class="flex flex-col pt-4">
            <label for="fullName" class="text-sm">Full Name</label>
            <input
              v-if="edit"
              type="text"
              id="fullName"
              placeholder="full name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.fullName"
            />
            <p v-else class="text-lg text-black">{{ guard.fullName }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="address" class="text-sm">Address</label>
            <input
              v-if="edit"
              type="text"
              id="address"
              placeholder="address"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.address"
            />
            <p v-else class="text-lg text-black">{{ guard.address }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="dob" class="text-sm">Date Of Birth</label>
            <input
              v-if="edit"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="date"
              id="dob"
              name="dob"
              min="1900-01-01"
              max="3000-12-31"
              v-model="guard.birthDate"
            />

            <p v-else class="text-lg text-black">{{ guard.birthDate }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="gender" class="text-sm">Gender</label>
            <select
              v-if="edit"
              id="gender"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.gender"
            >
              <option disabled value>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <p v-else class="text-lg text-black">{{ guard.gender }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="maritalStatus" class="text-sm">Marital Status</label>
            <select
              v-if="edit"
              id="maritalStatus"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.maritalStatus"
            >
              <option disabled value>Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            <p v-else class="text-lg text-black">{{ guard.maritalStatus }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="ssnit#" class="text-sm">SSNIT #</label>
            <input
              v-if="edit"
              type="text"
              id="ssnit#"
              placeholder="ssnit#"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.ssnitNo"
            />
            <p v-else class="text-lg text-black">{{ guard.ssnitNo }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="contact" class="text-sm">Contact</label>
            <input
              v-if="edit"
              type="text"
              id="contact"
              placeholder="contact"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.contact"
            />
            <p v-else class="text-lg text-black">{{ guard.contact }}</p>
          </div>
        </div>
        <div
          class="flex flex-col py-4 pl-8 border-2 bg-light-grey text-light-green"
        >
          <h1 class="pb-2 text-lg font-bold underline">Personal Details</h1>
          <div class="flex flex-col pt-4">
            <label for="gurantorFullName" class="text-sm"
              >Gurantor#1 Full Name</label
            >
            <input
              v-if="edit"
              type="text"
              id="gurantorFullName"
              placeholder="gurantor#1 full name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.gurantor1FullName"
            />
            <p v-else class="text-lg text-black">
              {{ guard.gurantor1FullName }}
            </p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="contact" class="text-sm">Contact</label>
            <input
              v-if="edit"
              type="text"
              id="contact"
              placeholder="contact"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.contact1"
            />
            <p v-else class="text-lg text-black">{{ guard.contact1 }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="relationship" class="text-sm">Relation</label>
            <input
              v-if="edit"
              type="text"
              id="relation"
              placeholder="relation"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.relation1"
            />
            <p v-else class="text-lg text-black">{{ guard.relation1 }}</p>
          </div>

          <div class="flex flex-col pt-4">
            <label for="gurantor#2FullName" class="text-sm"
              >Gurantor#2 Full Name</label
            >
            <input
              v-if="edit"
              type="text"
              id="gurantor#2FullName"
              placeholder="gurantor#2 Full Name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.gurantor2FullName"
            />
            <p v-else class="text-lg text-black">
              {{ guard.gurantor2FullName }}
            </p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="contact" class="text-sm">Contact</label>
            <input
              v-if="edit"
              type="text"
              id="contact"
              placeholder="contact"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.contact2"
            />
            <p v-else class="text-lg text-black">{{ guard.contact2 }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="relationship" class="text-sm">Relation</label>
            <input
              v-if="edit"
              type="text"
              id="relation"
              placeholder="relation"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.relation2"
            />
            <p v-else class="text-lg text-black">{{ guard.relation2 }}</p>
          </div>
        </div>
        <div
          class="flex flex-col py-4 pl-8 border-2 bg-light-grey text-light-green"
        >
          <h1 class="pb-2 text-lg font-bold underline">Employment Details</h1>
          <div class="flex flex-col pt-4">
            <label for="zone" class="text-sm">Zone</label>
            <select
              v-if="edit"
              id="zone"
              v-model="guard.zone"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option disabled value>Select zone</option>
              <option v-for="zone in zones" :key="zone.id" :value="zone.zone">
                {{ zone.zone }}
              </option>
            </select>
            <p v-else class="text-lg text-black">{{ guard.zone }}</p>
          </div>

          <div class="flex flex-col pt-4">
            <label for="designation" class="text-sm">Designation</label>
            <select
              v-if="edit"
              id="designation"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.designation"
            >
              <option disabled value>Select designation</option>
              <option
                v-for="designation in designations"
                :key="designation.id"
                :value="designation.designation"
              >
                {{ designation.designation }}
              </option>
            </select>
            <p v-else class="text-lg text-black">{{ guard.designation }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="offDay" class="text-sm">Off Day</label>
            <select
              v-if="edit"
              id="offDay"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.offDay"
            >
              <option disabled value>Select day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
            <p v-else class="text-lg text-black">{{ guard.offDay }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="shift" class="text-sm">Shift</label>
            <select
              v-if="edit"
              id="shift"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.shift"
            >
              <option disabled value>Select Shift</option>
              <option value="Day">Day</option>
              <option value="Night">Night</option>
              <option value="Reliever">Reliever</option>
            </select>
            <p v-else class="text-lg text-black">{{ guard.shift }}</p>
          </div>
          <div>
            <div class="mt-8" v-if="guard.shift === 'Reliever'">
              <h2
                class="px-5 py-1 mt-6 mr-2 text-xs text-center text-white rounded-lg shadow-md bg-light-green"
              >
                Reliever Schedule
              </h2>
              <div v-for="(item, index) in guard.scheduleList" :key="index">
                <div class="flex">
                  <select
                    v-if="edit"
                    id="Days"
                    class="w-1/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    v-model="item.day"
                  >
                    <option disabled value>Select day</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                  <p
                    v-else
                    class="px-5 py-1 mt-6 mr-2 text-xs text-center text-white rounded-lg shadow-md bg-light-green"
                  >
                    {{ item.day }}
                  </p>

                  <select
                    v-if="edit"
                    id="location"
                    class="w-1/4 px-3 py-2 mt-1 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    v-model="item.location"
                  >
                    <option disabled value>Select location</option>
                    <option
                      v-for="location in locations"
                      :key="location.id"
                      :value="location.location"
                    >
                      {{ location.location }}
                    </option>
                  </select>
                  <p
                    v-else
                    class="px-5 py-1 mt-6 mr-2 text-xs text-center text-white rounded-lg shadow-md bg-light-green"
                  >
                    {{ item.location }}
                  </p>

                  <select
                    v-if="edit"
                    id="shift"
                    class="w-1/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    v-model="item.shift"
                  >
                    <option disabled value>Select shift</option>
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                  </select>
                  <p
                    v-else
                    class="px-5 py-1 mt-6 text-xs text-center text-white rounded-lg shadow-md bg-light-green"
                  >
                    {{ item.shift }}
                  </p>
                </div>
              </div>
              <button
                v-if="guard.shift === 'Reliever' && edit"
                @click="addSchedule"
                type="button"
                class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
              >
                Add
              </button>
            </div>

            <div v-else class="flex flex-col pt-4">
              <label for="location/Client" class="text-sm"
                >Location/Client</label
              >
              <select
                v-if="edit"
                id="location/client"
                class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                v-model="guard.location"
              >
                <option disabled value>Select location</option>
                <option
                  v-for="location in locations"
                  :key="location.id"
                  :value="location.location"
                >
                  {{ location.location }}
                </option>
              </select>
              <p v-else class="text-lg text-black">{{ guard.location }}</p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col py-4 pl-8 border-2 bg-light-grey text-light-green"
        >
          <h1 class="pb-2 text-lg font-bold underline">Account Details</h1>
          <div class="flex flex-col pt-4">
            <label for="accountName" class="text-sm">Account Name</label>
            <input
              v-if="edit"
              type="text"
              id="accountName"
              placeholder="account name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.accountName"
            />
            <p v-else class="text-lg text-black">{{ guard.accountName }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="bankName" class="text-sm">Bank Name</label>
            <input
              v-if="edit"
              type="text"
              id="bankName"
              placeholder="bank name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.bankName"
            />
            <p v-else class="text-lg text-black">{{ guard.bankName }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="branch" class="text-sm">Branch</label>
            <input
              v-if="edit"
              type="text"
              id="branch"
              placeholder="branch"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.branch"
            />
            <p v-else class="text-lg text-black">{{ guard.branch }}</p>
          </div>
          <div class="flex flex-col pt-4">
            <label for="account#" class="text-sm">Account #</label>
            <input
              v-if="edit"
              type="text"
              id="account#"
              placeholder="Account#"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="guard.accountNo"
            />
            <p v-else class="text-lg text-black">{{ guard.accountNo }}</p>
          </div>
          <button
            type="button"
            @click="editMode"
            class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
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
    </form>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { uid } from "uid";
export default {
  setup() {
    const shift = ref("select-shift");
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const store = useStore();
    const route = useRoute();

    const currentId = route.params.guardId;
    const edit = computed(() => store.getters.readEdit);

    const addSchedule = () => {
      singleGuard.value.scheduleList.push({
        id: uid(),
        day: "",
        location: "",
        shift: "",
      });
    };

    const editMode = () => {
      store.dispatch("toggleEdit");
    };

    const toggle_Reliever_Schedule = () => {
      store.dispatch("toggleRelieverSchedule", shift.value);
    };

    store.dispatch("getZones");

    const zones = computed(() => store.getters.readZones);

    store.dispatch("getLocations");

    const locations = computed(() => store.getters.readLocations);

    store.dispatch("getDesignations");

    const designations = computed(() => store.getters.readDesignations);

    store.dispatch("getSingleGuard", currentId);
    const singleGuard = computed(() => store.getters.readSingleGuard);

    const updateGuard = async () => {
      try {
        await store.dispatch(
          "updateGuard",
          {
            id: singleGuard.value[0].id,
            fullName: singleGuard.value[0].fullName,
            address: singleGuard.value[0].address,
            birthDate: singleGuard.value[0].birthDate,
            gender: singleGuard.value[0].gender,
            maritalStatus: singleGuard.value[0].maritalStatus,
            ssnitNo: singleGuard.value[0].ssnitNo,
            contact: singleGuard.value[0].contact,
            gurantor1FullName: singleGuard.value[0].gurantor1FullName,
            contact1: singleGuard.value[0].contact1,
            relation1: singleGuard.value[0].relation1,
            gurantor2FullName: singleGuard.value[0].gurantor2FullName,
            contact2: singleGuard.value[0].contact2,
            relation2: singleGuard.value[0].relation2,
            accountName: singleGuard.value[0].accountName,
            bankName: singleGuard.value[0].bankName,
            branch: singleGuard.value[0].branch,
            accountNo: singleGuard.value[0].accountNo,
            zone: singleGuard.value[0].zone,
            designation: singleGuard.value[0].designation,
            offDay: singleGuard.value[0].offDay,
            shift: singleGuard.value[0].shift,
            location: singleGuard.value[0].location,
            scheduleList: singleGuard.value[0].scheduleList,
          },
          currentId
        );
        statusMsg.value = "Success: Guard Updated!";
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
      shift,
      editMode,
      singleGuard,
      edit,
      locations,
      updateGuard,
      zones,
      designations,
      toggle_Reliever_Schedule,
      addSchedule,
      errorMsg,
      statusMsg,
    };
  },
};
</script>
