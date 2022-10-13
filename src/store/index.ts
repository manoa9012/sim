import Vue from "vue";
import Vuex from "vuex";
import * as mutations from "@/store/mutations";
import * as getters from "@/store/getters";

Vue.use(Vuex);
const accessToken = localStorage.getItem("accessToken") || null;
const refreshToken = localStorage.getItem("refreshToken") || null;
const profile = JSON.parse(localStorage.getItem("profile") || "{}");
export default new Vuex.Store({
  state: {
    accessToken: accessToken,
    profile: profile,
    refreshToken: refreshToken,
    drawerExpanded: false,
    showDrawer: false,
  },
  getters: getters,
  mutations: mutations,
  actions: {},
  modules: {},
});
