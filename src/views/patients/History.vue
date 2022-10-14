<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="tonewHistory">Agregar Historia</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :loading="loading"
            :headers="headers"
            :items="histories"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialog"
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title> Agregar Historia </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="description"
              outlined
              dense
              label="Descripcion"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="canceladd" text>cancelar</v-btn>
            <v-btn :loading="loading" color="success" @click="newHistory" text
              >agregar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios-base";
export default {
  name: "History",
  props: {
    patientId: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      description: "",
      histories: [],
      headers: [
        {
          text: "Descripcion",
          align: "start",
          sortable: false,
          value: "description",
        },
      ],
    };
  },
  mounted() {
    this.getPatientData();
  },
  methods: {
    getPatientData() {
      this.loading = true;
      getAPI
        .get("/patient/" + this.$route.params.id)
        .then((res) => {
          this.loading = false;
          this.histories = res.data.histories;
        })
        .catch((error) => {
          this.loading = false;
        });
    },

    tonewHistory() {
      this.dialog = true;
    },
    canceladd() {
      this.dialog = false;
      this.description = "";
      this.loading = false;
    },
    newHistory() {
      this.loading = true;
      getAPI
        .post("/history/create", {
          description: this.description,
          patientId: this.patientId,
        })
        .then(() => {
          this.canceladd();
          this.getPatientData();
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang=""></style>
