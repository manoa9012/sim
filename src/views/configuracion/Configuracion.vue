<template>
  <div>
    <v-card>
      <v-tabs v-model="tab" icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Alergias
          <v-icon>mdi-svg</v-icon>
        </v-tab>
        <v-tab href="#tab-2">
          Laboratorios
          <v-icon>mdi-note-text</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <alergies />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <medical-history />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import Alergies from "./Alergies.vue";
import MedicalHistory from "./MedicalHistory.vue";
export default {
  name: "configuracion",
  components: { MedicalHistory, Alergies },
  data() {
    return {
      tab: null,
    };
  },
};
</script>
<style lang=""></style>
