<template>
  <div>
    <v-card>
      <template v-if="patient != null && patient != undefined">
        <v-card-title primary-title>
          {{ patient.name + " " + patient.lastname }}
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="gotoEdit" icon
            ><v-icon>mdi-account-edit</v-icon></v-btn
          >
          <v-btn color="error" icon><v-icon>mdi-delete</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-tabs v-model="tab">
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#detalles">
              <v-icon>mdi-account</v-icon>
              Detalles
            </v-tab>

            <v-tab href="#alergias">
              <v-icon>mdi-svg</v-icon>
              Alergias
            </v-tab>
            <v-tab href="#history">
              <v-icon>mdi-note-text</v-icon>
              Historias
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item value="detalles">
              <v-card flat>
                <v-card-text class="d-flex">
                  <div class="col-sm-6">
                    <v-avatar size="avatarSize">
                      <v-icon>mdi-account</v-icon> Avatar
                    </v-avatar>
                  </div>
                  <v-divider vertical></v-divider>
                  <div class="col-sm-6">
                    <v-container>
                      <v-row>
                        <v-col>
                          <strong>Nombre: </strong>{{ patient.name }}
                        </v-col>
                        <v-col>
                          <strong>Apellidos: </strong>{{ patient.lastname }}
                        </v-col>
                        <v-col>
                          <strong>Sexo: </strong
                          >{{ patient.isMale == "true" ? "Hombre" : "Mujer" }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex flex-column">
                          <strong>Fecha de Nacimiento: </strong
                          >{{ prettyDate(patient.bornDate) }}
                        </v-col>
                        <v-col>
                          <strong>Telefono: </strong>{{ patient.phone }}
                        </v-col>
                        <v-col>
                          <strong>Correo: </strong>{{ patient.email }}
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="alergias">
              <v-card flat>
                <v-card-text>{{
                  patient.alergies.length == 0
                    ? "No tiene alergias"
                    : patient.lastname
                }}</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="history">
              <v-card flat>
                <v-card-text>{{
                  patient.histories.length == 0
                    ? "No tiene historias"
                    : patient.lastname
                }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </template>
      <v-dialog
        v-model="dialogEdit"
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title> Editar Paciente </v-card-title>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios-base";
import moment from "moment";
export default {
  name: "patient-details",
  data() {
    return {
      patient: null,
      tab: null,
      dialogEdit: false,
    };
  },
  methods: {
    getPatientData() {
      getAPI
        .get("/patient/" + this.$route.params.id)
        .then((res) => {
          this.patient = res.data;
        })
        .catch((error) => {
          console.log("first");
        });
    },
    prettyDate(date) {
      const dat = moment(date).format("YYYY-MM-DD");
      return dat;
    },

    gotoEdit() {
      this.dialogEdit = true;
    },
  },
  mounted() {
    this.getPatientData();
  },
};
</script>
<style lang=""></style>
