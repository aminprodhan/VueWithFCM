
import { createLogger, createStore } from "vuex";
import UserMoudle from './user';
import CustomerMoudle from './customer';
const debug = process.env.NODE_ENV !== 'production'
export default createStore({
    state:{},
    mutations: { },
    actions: {},
    getters: { },
    modules: {
      user: UserMoudle,
      customer: CustomerMoudle
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})