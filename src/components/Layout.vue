<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">School Admin</div>
      <nav>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/students">Students</RouterLink>
        <RouterLink to="/teachers">Teachers</RouterLink>
        <RouterLink to="/classes">Classes</RouterLink>
        <RouterLink to="/cleaning">Cleaning</RouterLink>
        <RouterLink to="/punishments">Punishments</RouterLink>
      </nav>
      <div class="sidebar-footer">
        <div>Role: {{ auth.state.user?.role ?? "Guest" }}</div>
        <button class="secondary" @click="logout">Logout</button>
      </div>
    </aside>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuth } from "../stores/useAuth";

const auth = useAuth();

function logout() {
  auth.logout();
  window.location.href = "/login";
}
</script>
