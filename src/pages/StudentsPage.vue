<template>
  <div>
    <div class="page-header">
      <h1>Students</h1>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="card-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.classId }}</td>
            <td>{{ student.status || "Active" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchStudents } from "../auth/api";
import type { Student } from "../types";

const students = ref<Student[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    students.value = await fetchStudents();
  } catch (err) {
    error.value = (err as Error).message;
  }
});
</script>
