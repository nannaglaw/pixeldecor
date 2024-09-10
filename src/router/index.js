import {createRouter, createWebHistory} from 'vue-router';
import Frontpage from "@/views/Frontpage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: "/",
          name: "frontpage",
          component: Frontpage,
      },
  ]
})

export default router;