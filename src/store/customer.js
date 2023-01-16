import { createLogger, createStore } from "vuex";
import {auth} from './customer/auth.module';
import { landing } from "./customer/landing.module";
import reservation_module from "./customer/reservation.module";
const debug = process.env.NODE_ENV !== 'production'
export default {
    namespaced: true,
    state:{},
    mutations: { },
    actions: { 
        async test(){
            console.log("hello");
        }
    },
    getters: {},
    modules: {
        auth:auth,
        landing:landing,
        reservation:reservation_module,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
}