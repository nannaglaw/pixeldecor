import {createRouter, createWebHistory} from 'vue-router';
import Frontpage from "@/views/Frontpage.vue";
import Decor from "@/views/Decor.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: "/",
          name: "frontpage",
          component: Frontpage,
      },
      {
          path: "/Decor",
          name: "decor",
          component: Decor,
      },
  ]
})

export default router;