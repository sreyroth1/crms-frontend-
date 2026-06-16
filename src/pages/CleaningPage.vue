<template>
  <div>
    <div class="page-header">
      <h1>Cleaning</h1>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="grid cards">
      <div class="card small">
        <h3>Schedules</h3>
        <ul>
          <li v-for="schedule in schedules" :key="schedule.id">
            {{ schedule.name }} ({{ schedule.date }})
          </li>
        </ul>
      </div>
      <div class="card small">
        <h3>Tasks</h3>
        <ul>
          <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchCleaningSchedules, fetchCleaningTasks } from "../auth/api";
import type { CleaningSchedule, CleaningTask } from "../types";

const schedules = ref<CleaningSchedule[]>([]);
const tasks = ref<CleaningTask[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    schedules.value = await fetchCleaningSchedules();
    tasks.value = await fetchCleaningTasks();
  } catch (err) {
    error.value = (err as Error).message;
  }
});
</script>
