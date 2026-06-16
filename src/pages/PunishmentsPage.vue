<template>
  <div>
    <div class="page-header">
      <h1>Punishments</h1>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="card-table">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="punishment in punishments" :key="punishment.id">
            <td>{{ punishment.studentName }}</td>
            <td>{{ punishment.reason }}</td>
            <td>{{ punishment.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchPunishments } from "../auth/api";
import type { Punishment } from "../types";

const punishments = ref<Punishment[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    punishments.value = await fetchPunishments();
  } catch (err) {
    error.value = (err as Error).message;
  }
});
</script>
