<template>
  <v-app class="appsim">
    <template v-if="!loginform">
      <v-app-bar
        absolute
        class="appbar"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>SIM</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y :close-on-content-click="closeOnContentClick">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list width="100">
            <v-list-item>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        class="sidebar"
        app
        v-cloak
        :mini-variant="drawerExpanded"
        v-model="drawer"
        @update:mini-variant="mutDrawerExpand($event)"
        absolute
      >
        <v-list nav dense>
          <v-subheader>SIM</v-subheader>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item v-for="(item, i) in siteRoutes" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </template>

    <v-main>
      <router-view :class="drawerExpanded ? 'container' : 'containerfull'" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import { getAPI } from "./api/axios-base";

export default Vue.extend({
  name: "App",

  data: () => ({
    drawer: true,
    group: "",
    siteRoutes: [
      {
        title: "Inicio",
        to: "/inicio",
        icon: "mdi-home",
      },
      {
        title: "Usuarios",
        to: "/usuarios",
        icon: "mdi-account-star",
      },
      {
        title: "Pacientes",
        to: "/pacientes",
        icon: "mdi-account-multiple",
      },

      {
        title: "Configuracion",
        to: "/configuracion",
        icon: "mdi-wrench",
      },
    ],
  }),
  computed: {
    ...mapState(["drawerExpanded", "showDrawer"]),
    loginform() {
      if (this.$route.path.includes("autenticar")) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapMutations(["mutDrawerExpand", "mutShowDrawer", "destroyToken"]),

    logout() {
      this.destroyToken();
      this.$router.push("/autenticar");
    },
  },
});
</script>
<style lang="scss" scoped>
.container {
  margin-top: 100px !important;
  margin-left: 20px !important;
  margin-right: 15px !important;
  width: 90%;
}
.containerfull {
  margin-top: 100px !important;
  margin-left: 35px !important;
  margin-right: 25px !important;
  width: 90%;
}
.sidebar {
  max-width: 200px;
}
.appsim {
  background-color: aqua;
}
.appbar {
  background-color: aqua !important;
}
</style>
