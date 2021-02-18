<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main class="ma-3 ma-md-6">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  })
});
</script>
