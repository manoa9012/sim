import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "autenticar",
  },
  {
    path: "/autenticar",
    name: "autenticar",
    component: () => import("@/views/auth/LoginView.vue"),
    meta: {
      requiresLogged: true,
    },
  },
  {
    path: "/inicio",
    name: "Inicio",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: () => import("@/views/usuarios/Usuarios.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:uuid",
    name: "usuario",
    component: () => import("@/views/usuarios/UserDetails.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/pacientes",
    name: "pacientes",
    component: () => import("@/views/patients/Patients.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/paciente/:id",
    name: "paciente",
    component: () => import("@/views/patients/PatientDetails.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/configuracion",
    name: "configuracion",
    component: () => import("@/views/configuracion/Configuracion.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireAuth) &&
    !store.getters.loggedIn
  ) {
    next({ name: "autenticar" });
  } else {
    next();
  }
});

export default router;
