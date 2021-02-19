<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn v-if="$route.path !== '/'" to="/" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Veather</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App"
});
</script>

<style lang="scss">
@for $i from 1 through 10 {
  .gap-#{$i} {
    gap: 0.5rem * $i;
  }
}
</style>
