import { createLogger } from "vuex";
import room_module from "./user/room.module";
import auth_module from "./user/auth.module";
import reservation_module from "./user/reservation.module";
const debug = process.env.NODE_ENV !== 'production'
export default  {
    namespaced: true,
    modules:{
        auth:auth_module,
        room:room_module,
        reservation:reservation_module,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
}