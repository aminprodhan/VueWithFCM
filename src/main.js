import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'; 
// import './assets/main.css'
import Antd from 'ant-design-vue/es';
import router from './router'
import store from './store';
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
  .use(Antd)
  .use(store)
  .use(router)
  .use(Notifications);
app.mount('#app');

import { useStore } from "vuex";
import { customer_auth_key } from './store/customer/auth.module';
const storeSS = useStore();

console.log("log=",storeSS);

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    console.log("path",to.path);
    if(to.path == '/customer/booking' || to.path == '/customer/booking-list'){
      const loggedIn = localStorage.getItem(customer_auth_key);
      if (!loggedIn) 
      {
        next('/customer/login');
      } 
    }
    next();
});