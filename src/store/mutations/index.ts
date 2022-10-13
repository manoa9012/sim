import { ResponseLogin } from "@/models/models";

export function setData(state: any, value: ResponseLogin) {
  state.accessToken = value.access_token;
  state.profile = value.user;
  state.refreshToken = value.refresh_token;
  localStorage.setItem("accessToken", value.access_token);
  localStorage.setItem("profile", JSON.stringify(value.user));
  localStorage.setItem("refreshToken", value.refresh_token);
}

export function destroyToken(state: any): any {
  state.accessToken = null;
  state.refreshToken = null;
  // state.profile = null;
  // state.student = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("profile");
  // localStorage.removeItem("student");
}

export function mutShowDrawer(state: any, status: boolean): void {
  state.showDrawer = status;
}
export function mutDrawerExpand(state: any, drawerExpanded: boolean): void {
  state.drawerExpanded = drawerExpanded;
}

export function setAccessToken(state: any, accessToken: string) {
  state.accessToken = accessToken;
}
