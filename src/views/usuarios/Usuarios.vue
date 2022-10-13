<template>
  <v-card class="ma-2">
    <v-card-title primary-title>
      <v-tabs v-model="tab" icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#create">
          Crear Usuario
          <v-icon>mdi-account-plus</v-icon>
        </v-tab>
        <v-tab href="#patients">
          Usuarios
          <v-icon>mdi-account-multiple</v-icon>
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item value="create">
          <create-user @topatients="emitedExt" />
        </v-tab-item>
        <v-tab-item value="patients">
          <v-data-table
            :loading="loading"
            :headers="headers"
            :items="usuarios"
            :options.sync="options"
            :server-items-length="total"
            :footer-props="footerProps"
            item-key="uuid"
            @click:row="goToPatient"
          >
            <template v-slot:[`item.name`]="{ item }">
              <span>{{ item.name + " " + item.lastname }}</span>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>
<script>
import { getAPI } from "@/api/axios-base";

import CreateUser from "./CreateUser.vue";
export default {
  components: { CreateUser },
  name: "patients",
  data() {
    return {
      tab: "patients",
      loading: false,
      footerProps: { "items-per-page-options": [10, 15, 25, 50, 100] },
      options: {},
      total: 0,
      headers: [
        { text: "Nombre y Apellidos", align: "start", value: "name" },
        { text: "Rol", align: "start", value: "rol" },
        { text: "Correo", align: "start", value: "email" },
        { text: "Telefono", align: "start", value: "phone" },
      ],
      usuarios: [],
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
      this.getUsers();
    },
    getUsers() {
      const { page, itemsPerPage } = this.options;
      const itmper = itemsPerPage != -1 ? itemsPerPage : 10;
      this.filterRequest.range = {
        limit: itmper,
        offset: (page - 1) * itmper,
      };
      this.loading = true;
      getAPI
        .post("/user/list", this.filterRequest)
        .then((res) => {
          this.total = res.data.count;
          this.usuarios = res.data.result;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },

    goToPatient(user) {
      this.$router.push("/usuario/" + user.uuid);
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
<style lang=""></style>
