import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";
import Home from "@/views/Home.vue";
import Login from "@/views/auth/Login";
import SignUp from "@/views/auth/SignUp";
import GuardSetup from "@/views/GuardSetup";
import ZoneSetup from "@/views/ZoneSetup";
import DesignationSetup from "@/views/DesignationSetup";
import LocationSetup from "@/views/LocationSetup";
import ZoneDetails from "@/views/ZoneDetails";
import LocationDetails from "@/views/LocationDetails";
import DesignationDetails from "@/views/DesignationDetails";
import GuardDetails from "@/views/GuardDetails";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      auth: true
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      auth: false
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      title: "SignUp",
      auth: false
    },
  },
  {
    path: "/guard-setup",
    name: "GuardSetup",
    component: GuardSetup,
    meta: {
      title: "GuardSetup",
      auth: true
    },
  },
  {
    path: "/zone-setup",
    name: "ZoneSetup",
    component: ZoneSetup,
    meta: {
      title: "ZoneSetup",
      auth: true
    },
  },
  {
    path: "/location-setup",
    name: "LocationSetup",
    component: LocationSetup,
    meta: {
      title: "LocationSetup",
      auth: true
    },
  },
  {
    path: "/designation-setup",
    name: "DesignationSetup",
    component: DesignationSetup,
    meta: {
      title: "DesignationSetup",
      auth: true
    },
  },
  {
    path: "/zone-details/:zoneId",
    name: "ZoneDetails",
    component: ZoneDetails,
    meta: {
      title: "ZoneDetails",
      auth: true
    },
  },
  {
    path: "/location-details/:locationId",
    name: "LocationDetails",
    component: LocationDetails,
    meta: {
      title: "LocationDetails",
      auth: true
    },
  },
  {
    path: "/designation-details/:designationId",
    name: "DesignationDetails",
    component: DesignationDetails,
    meta: {
      title: "DesignationDetails",
      auth: true
    },
  },
  {
    path: "/guard-details/:guardId",
    name: "GuardDetails",
    component: GuardDetails,
    meta: {
      title: "GuardDetails",
      auth: true
    },
  },
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Last Mile`;
  next();
});

//Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next()
      return
    }
    next({ name: 'Login' });
    return
  }
  next()
});

export default router;
