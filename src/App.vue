<template>
  <div>
    <Navigation />
    <div >
      <router-view />
    </div>
  </div>
</template>
<script>
import Navigation from "@/components/Navigation";

export default {
  components: { Navigation },
  setup() {},
};
</script>
<style></style>
