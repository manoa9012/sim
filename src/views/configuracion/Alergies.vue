<template>
  <v-card>
    <v-container>
      <v-row class="justify-end mt-4">
        <v-col><v-btn color="primary" @click="goAdd">Adicionar</v-btn></v-col>
      </v-row>
      <v-row>
        <v-col
          ><v-data-table
            :headers="headers"
            :items="alergies"
            :options.sync="options"
            :server-items-length="total"
            :footer-props="footerProps"
          ></v-data-table>
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
          <v-card-title primary-title> Adicionar Alergia </v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              v-model="newAlergie.name"
              label="Nombre"
              id="id"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="cancelAdd" text>cancelar</v-btn>
            <v-btn
              color="success"
              :loading="loading"
              :disabled="newAlergie.name == '' || loading"
              text
              @click="addAlergies"
              >adiccionar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>
<script>
import { getAPI } from "@/api/axios-base";
export default {
  name: "alergies",
  data() {
    return {
      dialogCreate: false,
      newAlergie: { name: "" },
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
        { text: "Nombre", align: "start", value: "name" },
      ],
      alergies: [],

      filterRequest: {
        range: {
          offset: 0,
          limit: 100,
        },
      },
    };
  },
  methods: {
    getAlergies() {
      const { page, itemsPerPage } = this.options;
      const itmper = itemsPerPage != -1 ? itemsPerPage : 10;
      this.filterRequest.range = {
        limit: itmper,
        offset: (page - 1) * itmper,
      };
      this.loading = true;
      getAPI
        .post("/alergy/list", this.filterRequest)
        .then((res) => {
          this.total = res.data.count;
          this.alergies = res.data.result;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },

    addAlergies() {
      this.loading = true;
      getAPI
        .post("/alergy/create", this.newAlergie)
        .then(() => {
          this.cancelAdd();
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    goAdd() {
      this.dialogCreate = true;
      this.newAlergie = { name: "" };
      this.loading = false;
    },
    cancelAdd() {
      this.dialogCreate = false;
      this.loading = false;
      this.newAlergie = { name: "" };
    },
  },
  mounted() {
    this.getAlergies();
  },
};
</script>
<style lang=""></style>
