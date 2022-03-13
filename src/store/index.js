import { createStore } from "vuex";
import { supabase } from "@/supabase/init";

export default createStore({
  state: {
    show: null,
    shift: null,
    showHideRelieverSchedule: null,
    user: null,
    zone: null,
    error: null,
    zones: [],
    designation: null,
    designations: [],
    location: null,
    locations: [],
    guard: null,
    edit: null,
    guards: [],
    singleZone: [],
    singleLocation: [],
    singleDesignation: [],
    singleGuard: [],
  },
  getters: {
    getUser(state) {
    return state.user
    },
    readShow(state) {
      return state.show;
    },
    readZones(state) {
      return state.zones;
    },
    readLocations(state) {
      return state.locations;
    },
    readDesignations(state) {
      return state.designations;
    },
    readGuards(state) {
      return state.guards;
    },

    readEdit(state) {
      return state.edit;
    },
    readSingleZone(state) {
      return state.singleZone;
    },
    readSingleLocation(state) {
      return state.singleLocation;
    },
    readSingleDesignation(state) {
      return state.singleDesignation;
    },
    readSingleGuard(state) {
      return state.singleGuard;
    },
  },
  mutations: {
    TOGGLE_NAV(state) {
      state.show = !state.show;
    },
    TOGGLE_RELIEVER_SCHEDULE(state, shift) {
      if (state.shift === shift) {
        state.showHideRelieverSchedule = !state.showHideRelieverSchedule;
      }
    },

    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    SET_ZONE(state, payload) {
      state.zone = payload;
    },
    SET_GUARD(state, payload) {
      state.guard = payload;
    },

    SET_DESIGNATION(state, payload) {
      state.designation = payload;
    },
    SET_LOCATION(state, payload) {
      state.location = payload;
    },
    GET_GUARDS(state, payload) {
      state.guards = payload;
    },
    GET_ZONES(state, payload) {
      state.zones = payload;
    },
    GET_DESIGNATIONS(state, payload) {
      state.designations = payload;
    },
    GET_LOCATIONS(state, payload) {
      state.locations = payload;
    },
    TOOGLE_EDIT(state) {
      state.edit = !state.edit;
    },

    GET_SINGLE_ZONE(state, payload) {
      state.singleZone = payload;
    },
    GET_SINGLE_LOCATION(state, payload) {
      state.singleLocation = payload;
    },
    GET_SINGLE_DESIGNATION(state, payload) {
      state.singleDesignation = payload;
    },
    GET_SINGLE_GUARD(state, payload) {
      state.singleGuard = payload;
    },
    UPDATE_ZONE(state, payload) {
      let zones = state.zones.filter((zone) => zone.id == payload.id);
      state.zones.splice(zones, 1, payload);
    },
    UPDATE_LOCATION(state, payload) {
      let locations = state.locations.filter(
        (location) => location.id == payload.id
      );
      state.locations.splice(locations, 1, payload);
    },
    UPDATE_DESIGNATION(state, payload) {
      let designations = state.designations.filter(
        (designation) => designation.id == payload.id
      );
      state.designations.splice(designations, 1, payload);
    },
    UPDATE_GUARD(state, payload) {
      let guards = state.guards.filter((guard) => guard.id == payload.id);
      state.guards.splice(guards, 1, payload);
    },
  },
  actions: {
    toggleNav(context) {
      context.commit("TOGGLE_NAV");
    },

    toggleRelieverSchedule(context, shift) {
      context.commit("TOGGLE_RELIEVER_SCHEDULE", shift);
    },

    async signUp(context, { email, password }) {
      let { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      } else if (user) {
        context.commit("SET_USER", user);
      }
    },

    async signIn(context, { email, password }) {
      let { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        throw error;
      } else if (user) {
        context.commit("SET_USER", user);
      }
    },

    async logout(context) {
      await supabase.auth.signOut();
      context.commit("SET_USER", null);
    },

    async addZone(context, { zone, description }) {
      const res = await supabase.from("zones").insert([{ zone, description }]);
      if (res) {
        context.commit("SET_ZONE", res.zone);
      } else {
        throw new Error("could not create zone");
      }
    },

    async addDesignation(context, { designation, description }) {
      const res = await supabase
        .from("designation")
        .insert([{ designation, description }]);
      if (res) {
        context.commit("SET_DESIGNATION", res.zone);
      } else {
        throw new Error("could not create designation");
      }
    },

    async addLocation(
      context,
      { location, totalGuards, dayGuards, nightGuards, zone }
    ) {
      const res = await supabase
        .from("locations")
        .insert([{ location, totalGuards, dayGuards, nightGuards, zone }]);
      if (res) {
        context.commit("SET_LOCATION", res.location);
      } else {
        throw new Error("could not create location");
      }
    },
    async addGuard(
      context,
      {
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
        zone,
        designation,
        offDay,
        shift,
        location,
        scheduleList,
      }
    ) {
      const res = await supabase.from("guards").insert([
        {
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
          zone,
          designation,
          offDay,
          shift,
          location,
          scheduleList,
        },
      ]);
      if (res) {
        context.commit("SET_GUARD", res.guard);
      } else {
        throw new Error("could not create location");
      }
    },
    async getZones({ commit }) {
      try {
        const { data: zones, error } = await supabase.from("zones").select("*");
        commit("GET_ZONES", zones);
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },
    async getLocations({ commit }) {
      try {
        const { data: locations, error } = await supabase
          .from("locations")
          .select("*");
        commit("GET_LOCATIONS", locations);
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },
    async getDesignations({ commit }) {
      try {
        const { data: designations, error } = await supabase
          .from("designation")
          .select("*");
        commit("GET_DESIGNATIONS", designations);
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },
    async getGuards({ commit }) {
      try {
        const { data: guards, error } = await supabase
          .from("guards")
          .select("*");
        commit("GET_GUARDS", guards);
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },

    toggleEdit(context) {
      context.commit("TOOGLE_EDIT");
    },

    async getSingleZone({ commit }, payload) {
      try {
        const { data: singleZone, error } = await supabase
          .from("zones")
          .select("*")
          .eq("id", payload);
        commit("GET_SINGLE_ZONE", singleZone);
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },
    async getSingleLocation({ commit }, payload) {
      try {
        const { data: singleLocation, error } = await supabase
          .from("locations")
          .select("*")
          .eq("id", payload);
        commit("GET_SINGLE_LOCATION", singleLocation);
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },
    async getSingleDesignation({ commit }, payload) {
      try {
        const { data: singleDesignation, error } = await supabase
          .from("designation")
          .select("*")
          .eq("id", payload);
        commit("GET_SINGLE_DESIGNATION", singleDesignation);
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },
    async getSingleGuard({ commit }, payload) {
      try {
        const { data: singleGuard, error } = await supabase
          .from("guards")
          .select("*")
          .eq("id", payload);
        commit("GET_SINGLE_GUARD", singleGuard);
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },

    async updateZone({ commit }, { id, zone, description }) {
      try {
        const { error } = await supabase
          .from("zones")
          .update({ zone, description })
          .eq("id", id);
        commit("UPDATE_ZONE", { zone, description });
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },

    async updateLocation(
      { commit },
      { id, location, totalGuards, dayGuards, nightGuards, zone }
    ) {
      try {
        const { error } = await supabase
          .from("locations")
          .update({ location, totalGuards, dayGuards, nightGuards, zone })
          .eq("id", id);
        commit("UPDATE_LOCATION", {
          location,
          totalGuards,
          dayGuards,
          nightGuards,
          zone,
        });
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },

    async updateDesignation({ commit }, { id, designation, description }) {
      try {
        const { error } = await supabase
          .from("designation")
          .update({ designation, description })
          .eq("id", id);
        commit("UPDATE_DESIGNATION", { designation, description });
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },

    async updateGuard(
      { commit },
      {
        id,
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
        zone,
        designation,
        offDay,
        shift,
        location,
        scheduleList,
      }
    ) {
      try {
        const { error } = await supabase
          .from("guards")
          .update({
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
            zone,
            designation,
            offDay,
            shift,
            location,
            scheduleList,
          })
          .eq("id", id);
        commit("UPDATE_GUARD", {
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
          zone,
          designation,
          offDay,
          shift,
          location,
          scheduleList,
        });
        commit("SET_ERROR", error);
      } catch (error) {
        commit("SET_ERROR", error);
      }
    },
  },
  modules: {},
});
