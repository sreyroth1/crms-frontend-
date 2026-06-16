import { reactive } from "vue";

interface User {
  id: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const state = reactive<AuthState>({
  token: null,
  user: null,
});

export function useAuth() {
  function init() {
    const token = localStorage.getItem("authToken");
    const userJson = localStorage.getItem("authUser");
    if (token && userJson) {
      state.token = token;
      state.user = JSON.parse(userJson);
    }
  }

  function login(token: string, user: User) {
    state.token = token;
    state.user = user;
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
  }

  function logout() {
    state.token = null;
    state.user = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }

  return { state, init, login, logout };
}
