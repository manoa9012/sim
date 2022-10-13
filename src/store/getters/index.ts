export function loggedIn(state: any): boolean {
  return state.accessToken != null || state.accessToken != undefined;
}
