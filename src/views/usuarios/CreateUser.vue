<template>
  <v-card class="pa-4">
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              :items="roles"
              item-text="label"
              item-value="value"
              v-model="userNew.rol"
              outlined
              dense
              label="Rol"
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              v-model="userNew.username"
              label="Usuario"
              id="id"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              type="password"
              v-model="userNew.password"
              label="Contraseña"
              id="id"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              dense
              v-model="userNew.name"
              label="Nombre"
              id="id"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              v-model="userNew.lastname"
              label="Apellido"
              id="id"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              dense
              v-model="userNew.phone"
              label="Telefono"
              id="id"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              label="Correo"
              v-model="userNew.email"
              id="id"
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
      userNew: {
        username: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        rol: "",
      },
      roles: [
        { label: "SUPER", value: "SUPER" },
        { label: "ADMIN", value: "ADMIN" },
        { label: "DOCTOR", value: "DOCTOR" },
      ],
    };
  },

  methods: {
    createPatient() {
      this.loading = true;
      const body = Object.assign({}, this.userNew);

      getAPI
        .post("/user/create", body)
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
