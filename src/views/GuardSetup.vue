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
      @submit.prevent="createGuard"
      class="mt-8 md:mx-auto md:container font-nunito"
    >
      <div class="grid grid-cols-2 gap-4">
        <div
          class="flex flex-col py-4 pl-8 border-2 text-light-green bg-light-grey"
        >
          <h1 class="pb-2 underline">Personal Details</h1>
          <div class="flex flex-col pt-4">
            <label for="fullName" class="text-lg">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="full name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="fullName"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="address" class="text-lg">Address</label>
            <input
              type="text"
              id="address"
              placeholder="address"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="address"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="dob" class="text-lg">Date Of Birth</label>
            <input
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="date"
              id="dob"
              name="dob"
              min="1900-01-01"
              max="3000-12-31"
              v-model="birthDate"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="gender" class="text-lg">Gender</label>
            <select
              id="gender"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="gender"
            >
              <option disabled value>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="flex flex-col pt-4">
            <label for="maritalStatus" class="text-lg">Marital Status</label>
            <select
              id="maritalStatus"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="maritalStatus"
            >
              <option disabled value>Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div class="flex flex-col pt-4">
            <label for="ssnit#" class="text-lg">SSNIT #</label>
            <input
              type="text"
              id="ssnit#"
              placeholder="ssnit#"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="ssnitNo"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="contact" class="text-lg">Contact</label>
            <input
              type="text"
              id="contact"
              placeholder="contact"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="contact"
            />
          </div>
        </div>
        <div
          class="flex flex-col py-4 pl-8 border-2 bg-light-grey text-light-green"
        >
          <h1 class="pb-2 underline">Personal Details</h1>
          <div class="flex flex-col pt-4">
            <label for="gurantorFullName" class="text-lg"
              >Gurantor#1 Full Name</label
            >
            <input
              type="text"
              id="gurantorFullName"
              placeholder="gurantor#1 full name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="gurantor1FullName"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="contact" class="text-lg">Contact</label>
            <input
              type="text"
              id="contact"
              placeholder="contact"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="contact1"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="relationship" class="text-lg">Relation</label>
            <input
              type="text"
              id="relation"
              placeholder="relation"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="relation1"
            />
          </div>

          <div class="flex flex-col pt-4">
            <label for="gurantor#2FullName" class="text-lg"
              >Gurantor#2 Full Name</label
            >
            <input
              type="text"
              id="gurantor#2FullName"
              placeholder="gurantor#2 Full Name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="gurantor2FullName"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="contact" class="text-lg">Contact</label>
            <input
              type="text"
              id="contact"
              placeholder="contact"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="contact2"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="relationship" class="text-lg">Relation</label>
            <input
              type="text"
              id="relation"
              placeholder="relation"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="relation2"
            />
          </div>
        </div>
        <div
          class="flex flex-col py-4 pl-8 border-2 bg-light-grey text-light-green"
        >
          <h1 class="pb-2 underline">Employment Details</h1>
          <div class="flex flex-col pt-4">
            <label for="zone" class="text-lg">Zone</label>
            <select
              id="zone"
              v-model="zone"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option disabled value>Select zone</option>
              <option v-for="zone in zones" :key="zone.id" :value="zone.zone">
                {{ zone.zone }}
              </option>
            </select>
          </div>

          <div class="flex flex-col pt-4">
            <label for="designation" class="text-lg">Designation</label>
            <select
              id="designation"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="designation"
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
          </div>
          <div class="flex flex-col pt-4">
            <label for="offDay" class="text-lg">Off Day</label>
            <select
              id="offDay"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="offDay"
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
          </div>
          <div class="flex flex-col pt-4">
            <label for="shift" class="text-lg">Shift</label>
            <select
              @change="relieverSchedule"
              id="shift"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="shift"
            >
              <option disabled value>Select Shift</option>
              <option value="Day">Day</option>
              <option value="Night">Night</option>
              <option value="Reliever">Reliever</option>
            </select>
          </div>
          <div v-if="shift === 'Reliever'" class="mt-8">
            <h2>Reliever Schedule</h2>
            <div v-for="(item, index) in scheduleList" :key="index">
              <div class="flex">
                <select
                  id="Days"
                  class="w-1/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                <select
                  id="location"
                  class="w-1/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                <select
                  id="shift"
                  class="w-1/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  v-model="item.shift"
                >
                  <option disabled value>Select shift</option>
                  <option value="Day">Day</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>
            <button @click="addSchedule" type="button">Add</button>
          </div>
          <div class="flex flex-col pt-4" v-else>
            <label for="location/Client" class="text-lg">Location/Client</label>
            <select
              id="location/client"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="location"
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
          </div>
        </div>
        <div
          class="flex flex-col py-4 pl-8 border-2 bg-light-grey text-light-green"
        >
          <h1 class="pb-2 underline">Account Details</h1>
          <div class="flex flex-col pt-4">
            <label for="accountName" class="text-lg">Account Name</label>
            <input
              type="text"
              id="accountName"
              placeholder="account name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="accountName"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="bankName" class="text-lg">Bank Name</label>
            <input
              type="text"
              id="bankName"
              placeholder="bank name"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="bankName"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="branch" class="text-lg">Branch</label>
            <input
              type="text"
              id="branch"
              placeholder="branch"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="branch"
            />
          </div>
          <div class="flex flex-col pt-4">
            <label for="account#" class="text-lg">Account #</label>
            <input
              type="text"
              id="account#"
              placeholder="Account#"
              class="w-3/4 px-3 py-2 mt-1 leading-tight text-black text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="accountNo"
            />
          </div>
          <button
            v-if="!isPending"
            type="submit"
            class="self-start px-6 py-2 mt-6 text-sm text-white duration-200 border-2 border-transparent border-solid rounded-sm bg-light-green hover:border-light-green hover:bg-white hover:text-light-green"
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
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import { uid } from "uid";
export default {
  setup() {
    const isPending = ref(false);

    const fullName = ref("");
    const address = ref("");
    const birthDate = ref("");
    const gender = ref("");
    const maritalStatus = ref("");
    const ssnitNo = ref("");
    const contact = ref("");
    const gurantor1FullName = ref("");
    const contact1 = ref("");
    const relation1 = ref("");
    const gurantor2FullName = ref("");
    const contact2 = ref("");
    const relation2 = ref("");
    const accountName = ref("");
    const bankName = ref("");
    const branch = ref("");
    const accountNo = ref("");
    const offDay = ref("");
    const zone = ref("");
    const designation = ref("");
    const location = ref("");
    const scheduleList = ref([]);
    const shift = ref("select-shift");
    const store = useStore();

    const errorMsg = ref(null);
    const statusMsg = ref(null);

    // add schedule function
    const addSchedule = () => {
      scheduleList.value.push({
        id: uid(),
        day: "",
        location: "",
        shift: "",
      });
    };

    // create guard function
    const createGuard = async () => {
      isPending.value = true;
      try {
        await store.dispatch("addGuard", {
          fullName: fullName.value,
          address: address.value,
          birthDate: birthDate.value,
          gender: gender.value,
          maritalStatus: maritalStatus.value,
          ssnitNo: ssnitNo.value,
          contact: contact.value,
          gurantor1FullName: gurantor1FullName.value,
          contact1: contact1.value,
          relation1: relation1.value,
          gurantor2FullName: gurantor2FullName.value,
          contact2: contact2.value,
          relation2: relation2.value,
          accountName: accountName.value,
          bankName: bankName.value,
          branch: branch.value,
          accountNo: accountNo.value,
          offDay: offDay.value,
          shift: shift.value,
          zone: zone.value,
          designation: designation.value,
          location: location.value,
          scheduleList: scheduleList.value,
        });
        isPending.value = false;
        statusMsg.value = "Success: Guard Created!";

        fullName.value = null;
        address.value = null;
        birthDate.value = null;
        gender.value = "Select Gender";
        maritalStatus.value = "Select status";
        ssnitNo.value = null;
        contact.value = null;
        gurantor1FullName.value = null;
        contact1.value = null;
        relation1.value = null;
        gurantor2FullName.value = null;
        contact2.value = null;
        relation2.value = null;
        accountName.value = null;
        bankName.value = null;
        branch.value = null;
        accountNo.value = null;
        offDay.value = "Select off day";
        shift.value = "Select shift";
        zone.value = "Select zone";
        designation.value = "Select  designation";
        location.value = "Select  location";
        scheduleList.value = [];
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

    // toggle reliever schedule function
    const toggle_Reliever_Schedule = () => {
      store.dispatch("toggleRelieverSchedule", shift.value);
    };

    store.dispatch("getZones");
    const zones = computed(() => store.getters.readZones);

    store.dispatch("getLocations");
    const locations = computed(() => store.getters.readLocations);

    store.dispatch("getDesignations");
    const designations = computed(() => store.getters.readDesignations);

    return {
      toggle_Reliever_Schedule,
      shift,
      zones,
      locations,
      designations,
      fullName,
      address,
      birthDate,
      gender,
      maritalStatus,
      ssnitNo,
      contact,
      gurantor1FullName,
      contact1,
      relation1,
      gurantor2FullName,
      contact2,
      relation2,
      accountName,
      bankName,
      branch,
      accountNo,
      offDay,
      zone,
      designation,
      location,
      scheduleList,
      addSchedule,
      createGuard,
      errorMsg,
      statusMsg,
      isPending,
    };
  },
};
</script>
