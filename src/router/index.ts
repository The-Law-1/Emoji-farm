import { createRouter, createWebHistory } from "vue-router";
import defaultLayout from "@/layouts/default.vue";
import farmVue from "@/pages/farm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/Emoji-farm/",
      name: "farm",
      component: farmVue,
      meta: {
        layout: defaultLayout,
      },
    },
  ],
});

router.beforeEach(async (to) => {

});

export default router;