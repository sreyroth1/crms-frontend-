<template>
  <div class="centered-page">
    <form class="card form" @submit.prevent="handleSubmit">
      <h2>Register</h2>
      <label>
        Username
        <input v-model="username" type="text" required />
      </label>
      <label>
        Name
        <input v-model="name" type="text" required />
      </label>
      <label>
        Email
        <input v-model="email" type="email" required />
      </label>
      <label>
        Password
        <input v-model="password" type="password" required />
      </label>
      <label>
        Role
        <select v-model="role">
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
          <option value="admin">Student</option>
        </select>
      </label>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Register</button>
      <p>
        Already have an account?
        <RouterLink to="/login">Login</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { register as registerRequest } from "../auth/api";
import { useAuth } from "../stores/useAuth";

const username = ref("");
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("teacher");
const error = ref<string | null>(null);
const router = useRouter();
const auth = useAuth();

async function handleSubmit() {
  error.value = null;
  try {
    const data = await registerRequest(
      username.value,
      name.value,
      email.value,
      password.value,
      role.value,
    );
    auth.login(data.token, data.user);
    router.push("/dashboard");
  } catch (err) {
    error.value = (err as Error).message || "Registration failed";
  }
}
</script>
