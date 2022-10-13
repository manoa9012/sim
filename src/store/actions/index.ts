import { getAPI } from "@/api/axios-base";

export async function refreshToken({ state, commit }: any) {
  const refreshUrl = "/users/refresh";
  try {
    await getAPI
      .post(refreshUrl, { refresh_token: state.refreshToken })
      .then((res) => {
        if (res.status === 201) {
          commit("setAccessToken", res.data.access_token);
        }
      });
  } catch (error) {
    console.log(error, "error");
  }
}
