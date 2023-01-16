import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './user';
import customerRoutes from './customer';
const baseRoutes= [];
const routes=[...baseRoutes,...userRoutes,...customerRoutes];
console.log("routes",routes);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes
})
export default router
