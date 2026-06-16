<template>
  <div>
    <div class="page-header">
      <h1>Classes</h1>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="card-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Teacher ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="classItem in classes" :key="classItem.id">
            <td>{{ classItem.name }}</td>
            <td>{{ classItem.teacherId || "—" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchClasses } from "../auth/api";
import type { ClassItem } from "../types";

const classes = ref<ClassItem[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    classes.value = await fetchClasses();
  } catch (err) {
    error.value = (err as Error).message;
  }
});
</script>
