<template>
  <div>
    <div class="page-header">
      <h1>Teachers</h1>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="card-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers" :key="teacher.id">
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.subject || "—" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchTeachers } from "../auth/api";
import type { Teacher } from "../types";

const teachers = ref<Teacher[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    teachers.value = await fetchTeachers();
  } catch (err) {
    error.value = (err as Error).message;
  }
});
</script>
