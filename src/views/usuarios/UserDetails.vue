<template>
  <div>
    <v-card>
      <template v-if="user != null && user != undefined">
        <v-card-title primary-title>
          {{ user.name + " " + user.lastname }}
        </v-card-title>
        <v-card-text>
          <v-tabs v-model="tab">
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#detalles">
              <v-icon>mdi-account</v-icon>
              Detalles
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
                          <strong>Nombre: </strong>{{ user.name }}
                        </v-col>
                        <v-col>
                          <strong>Apellidos: </strong>{{ user.lastname }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex flex-column">
                          <strong>Fecha de Nacimiento: </strong
                          >{{ prettyDate(user.bornDate) }}
                        </v-col>
                        <v-col>
                          <strong>Telefono: </strong>{{ user.phone }}
                        </v-col>
                        <v-col>
                          <strong>Correo: </strong>{{ user.email }}
                        </v-col>
                        <v-col> <strong>Rol: </strong>{{ user.rol }} </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </template>
    </v-card>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios-base";
import moment from "moment";
export default {
  name: "user-details",
  data() {
    return {
      user: null,
      tab: null,
    };
  },
  methods: {
    getuserData() {
      getAPI
        .get("/user/getUser/" + this.$route.params.uuid)
        .then((res) => {
          this.user = res.data;
        })
        .catch((error) => {
          console.log("first");
        });
    },
    prettyDate(date) {
      const dat = moment(date).format("YYYY-MM-DD");
      return dat;
    },
  },
  mounted() {
    console.log("este");
    this.getuserData();
  },
};
</script>
<style lang=""></style>
