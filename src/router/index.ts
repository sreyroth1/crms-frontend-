import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import StudentsPage from "../pages/StudentsPage.vue";
import TeachersPage from "../pages/TeachersPage.vue";
import ClassesPage from "../pages/ClassesPage.vue";
import CleaningPage from "../pages/CleaningPage.vue";
import PunishmentsPage from "../pages/PunishmentsPage.vue";
import AppLayout from "../components/Layout.vue";

const routes = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/",
    component: AppLayout,
    children: [
      { path: "", component: DashboardPage },
      { path: "dashboard", component: DashboardPage },
      { path: "students", component: StudentsPage },
      { path: "teachers", component: TeachersPage },
      { path: "classes", component: ClassesPage },
      { path: "cleaning", component: CleaningPage },
      { path: "punishments", component: PunishmentsPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
