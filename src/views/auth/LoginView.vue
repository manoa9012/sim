<template>
  <div class="loginContent">
    <v-sheet
      elevation="1"
      height="450"
      width="500"
      class="rounded-xl card-login"
    >
      <v-container>
        <v-row>
          <v-col class="avatar"
            ><v-avatar width="100" height="100">
              <img
                contain
                src="https://medlink.la/blog/wp-content/uploads/2021/05/doctores-online.png"
                alt="alt"
              /> </v-avatar
          ></v-col>
        </v-row>
        <v-row class="formlogin">
          <v-form>
            <v-col
              ><v-text-field
                :rules="[rules.requireduser]"
                outlined
                v-model="formLogin.email"
                label="Correo"
                id="id"
              ></v-text-field
            ></v-col>
            <v-col
              ><v-text-field
                :rules="[rules.requiredpass]"
                outlined
                v-model="formLogin.password"
                label="Contraseña"
                type="password"
                id="id"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-btn
                :loading="loading"
                color="primary"
                rounded
                @click="onLogin"
                block
                class="full-widht"
                >Entrar</v-btn
              >
            </v-col>
          </v-form>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import { axiosBase } from "@/api/axios-base";
import { mapMutations } from "vuex";
export default {
  name: "login-view",
  data() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
      loading: false,
      rules: {
        requireduser: (val) =>
          (val !== null && val !== "") || "Username is required",
        requiredpass: (val) =>
          (val !== null && val !== "") || "Password is required",
      },
    };
  },
  methods: {
    ...mapMutations(["setData"]),
    onLogin() {
      this.loading = true;
      axiosBase
        .post("/user/login", this.formLogin)
        .then((res) => {
          this.loading = false;
          this.setData(res.data);
          this.$router.push("/inicio");
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.loginContent {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.formlogin {
  flex-direction: column;
}
.avatar {
  width: 100%;
  display: flex;
  justify-content: center;
}
.card-login {
  background-color: rgba(250, 242, 242, 0.601);
}
</style>
