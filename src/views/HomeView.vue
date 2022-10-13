<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <v-card class="blue lighten-4" height="100">
            <v-card-text> Usuarios:10 </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="green lighten-4" height="100">
            <v-card-text> Pacientes:10 </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="orange lighten-4" height="100">
            <v-card-text> Alergies:10 </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
});
</script>
