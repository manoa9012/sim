<template>
  <v-card class="ma-2">
    <v-card-title primary-title>
      <v-tabs v-model="tab" icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#create">
          Crear Paciente
          <v-icon>mdi-account-plus</v-icon>
        </v-tab>
        <v-tab href="#patients">
          Pacientes
          <v-icon>mdi-account-multiple</v-icon>
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item value="create">
          <create-patient @topatients="emitedExt" />
        </v-tab-item>
        <v-tab-item value="patients">
          <v-data-table
            :loading="loading"
            :headers="headers"
            :items="patients"
            :options.sync="options"
            :server-items-length="total"
            :footer-props="footerProps"
            item-key="id"
            @click:row="goToPatient"
          >
            <template v-slot:[`item.name`]="{ item }">
              <span>{{ item.name + " " + item.lastname }}</span>
            </template>
            <template v-slot:[`item.isMale`]="{ item }">
              <template v-if="item.isMale == 'true'">
                <span>Hombre</span>
              </template>
              <template v-else>
                <span>Mujer</span>
              </template>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>
<script>
import { getAPI } from "@/api/axios-base";
import CreatePatient from "./CreatePatient.vue";
export default {
  components: { CreatePatient },
  name: "patients",
  data() {
    return {
      tab: "patients",
      loading: false,
      footerProps: { "items-per-page-options": [10, 15, 25, 50, 100] },
      options: {},
      total: 0,
      headers: [
        {
          text: "id",
          align: "start",
          filterable: false,
          value: "id",
        },
        { text: "Nombre y Apellidos", align: "start", value: "name" },
        { text: "Sexo", align: "start", value: "isMale" },
        { text: "Telefono", align: "start", value: "phone" },
      ],
      patients: [],
      filterRequest: {
        range: {
          offset: 0,
          limit: 100,
        },
      },
    };
  },
  methods: {
    emitedExt() {
      this.tab = "patients";
      this.getPatients();
    },
    getPatients() {
      const { page, itemsPerPage } = this.options;
      const itmper = itemsPerPage != -1 ? itemsPerPage : 10;
      this.filterRequest.range = {
        limit: itmper,
        offset: (page - 1) * itmper,
      };
      this.loading = true;
      getAPI
        .post("/patient/list", this.filterRequest)
        .then((res) => {
          this.total = res.data.count;
          this.patients = res.data.result;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },

    goToPatient(patient) {
      this.$router.push("/paciente/" + patient.id);
    },
  },
  mounted() {
    this.getPatients();
  },
};
</script>
<style lang=""></style>
