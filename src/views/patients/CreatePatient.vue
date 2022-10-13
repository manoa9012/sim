<template>
  <v-card class="pa-4">
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              dense
              v-model="newPatient.name"
              label="Nombre"
              id="id"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              v-model="newPatient.lastname"
              label="Apellido"
              id="id"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Fecha de Nacimiento"
                  prepend-icon="mdi-calendar"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-radio-group v-model="gender" row>
              <v-radio label="Hombre" value="male"></v-radio>
              <v-radio label="Mujer" value="female"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              dense
              v-model="newPatient.phone"
              label="Telefono"
              id="id"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              label="Correo"
              v-model="newPatient.email"
              id="id"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              dense
              v-model="newPatient.address"
              label="Direccion"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              label="Numero de Emergencia"
              v-model="newPatient.emergencyPhone"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" text @click="goPatients">Cancelar</v-btn>
      <v-btn
        color="success"
        :loading="loading"
        :disabled="loading"
        @click="createPatient"
        text
        >Crear</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import moment from "moment";
import { getAPI } from "@/api/axios-base";
export default {
  name: "create-patient",
  data() {
    return {
      loading: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      gender: "male",
      newPatient: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        emergencyPhone: "",
        isMale: false,
        address: "",
        bornDate: "",
      },
    };
  },

  methods: {
    createPatient() {
      this.loading = true;
      const body = Object.assign({}, this.newPatient);
      if (this.gender == "male") {
        body.isMale = true;
      } else {
        body.isMale = false;
      }
      if (this.date != null && this.date != "") {
        body.bornDate = moment(this.date).toISOString();
      } else {
        body.bornDate = "";
      }
      getAPI
        .post("/patient/create", body)
        .then((res) => {
          this.goPatients();
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    goPatients() {
      this.loading = false;
      this.$emit("topatients");
    },
  },
};
</script>
<style lang=""></style>
