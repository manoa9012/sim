<template>
  <v-card>
    <v-container>
      <v-row class="justify-end">
        <v-col><v-btn color="primary">Adicionar</v-btn></v-col>
      </v-row>
      <v-row>
        <v-col
          ><v-data-table :headers="headers" :items="desserts"></v-data-table>
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialogCreate"
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title> Crear Historia Clinica </v-card-title>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "medical-history",
  data() {
    return {
      dialogCreate: false,
      newMedical: { name: "" },
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
      ],
    };
  },
};
</script>
<style lang=""></style>
