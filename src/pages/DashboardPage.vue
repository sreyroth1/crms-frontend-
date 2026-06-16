<template>
  <div>
    <div class="page-header">
      <h1>Dashboard</h1>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="grid cards">
      <div class="card small">
        <h3>Total Students</h3>
        <p>{{ stats.totalStudents ?? "—" }}</p>
      </div>
      <div class="card small">
        <h3>Total Teachers</h3>
        <p>{{ stats.totalTeachers ?? "—" }}</p>
      </div>
      <div class="card small">
        <h3>Total Classes</h3>
        <p>{{ stats.totalClasses ?? "—" }}</p>
      </div>
      <div class="card small">
        <h3>Pending Punishments</h3>
        <p>{{ stats.pendingPunishments ?? "—" }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { fetchDashboardStats } from "../auth/api";

interface Stats {
  totalStudents?: number;
  totalTeachers?: number;
  totalClasses?: number;
  pendingPunishments?: number;
}

const stats = reactive<Stats>({});
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    Object.assign(stats, await fetchDashboardStats());
  } catch (err) {
    error.value = (err as Error).message;
  }
});
</script>
