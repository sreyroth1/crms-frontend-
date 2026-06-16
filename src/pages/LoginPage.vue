<template>
  <div class="centered-page">
    <form class="card form" @submit.prevent="handleSubmit">
      <h2>Login</h2>
      <label>
        Email
        <input v-model="email" type="email" required />
      </label>
      <label>
        Password
        <input v-model="password" type="password" required />
      </label>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Login</button>
      <p>
        Don't have an account?
        <RouterLink to="/register">Register</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { login as loginRequest } from '../auth/api';
import { useAuth } from '../stores/useAuth';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const auth = useAuth();

auth.init();

async function handleSubmit() {
  error.value = null;
  try {
    const data = await loginRequest(email.value, password.value);
    auth.login(data.token, data.user);
    router.push('/dashboard');
  } catch (err) {
    error.value = (err as Error).message || 'Login failed';
  }
}
</script>
