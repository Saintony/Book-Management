import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import BookList from "../views/BookList.vue";
import AddBook from "../views/AddBook.vue";
import EditBook from "../views/EditBook.vue";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      { path: "", name: "BookList", component: BookList },
      { path: "add", name: "AddBook", component: AddBook },
      { path: "/edit/:id", name: "EditBook", component: EditBook },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
