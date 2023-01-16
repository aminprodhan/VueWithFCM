
import ApiService from '../../services/api.service';
export const customer_auth_key='customer';
export const customer_device_key='customer_device_key';

const user = JSON.parse(localStorage.getItem(customer_auth_key));
const deviceKey = localStorage.getItem(customer_device_key);

const initialState = user
  ? { status: { loggedIn: true },deviceKey:null, user }
  : { status: { loggedIn: false },deviceKey:null, user: null };

if(deviceKey){
  initialState['deviceKey']=deviceKey;
}  

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      console.log("user=",user);
      const api=await ApiService.post("customer/login",user).then(
        response => {
          commit('loginSuccess', response.user);
          return response;
        },
        error => {
          commit('loginFailure');
          return {error:error.response.data};
        }
      );
      return api;
    },
    async updateDeviceKey({ commit }, deviceKey) {
      console.log("user=",deviceKey);
      const api=await ApiService.post("customer/update-device-key",{device_key:deviceKey}).then(
        response => {
          commit('updateDeviceKeySuccess', deviceKey);
          return response;
        },
        error => {
          return {error:error.response.data};
        }
      );
      return api;
    },
    logout({ commit }) {
      //ApiService.logout();
      commit('logout');
    },
  },
  mutations: {
    updateDeviceKeySuccess(state, key) {
      localStorage.setItem(customer_device_key,key)
      state.deviceKey=key;
    },
    loginSuccess(state, user) {
      localStorage.setItem(customer_auth_key,JSON.stringify(user))
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.deviceKey=null;
      localStorage.removeItem(customer_auth_key);
      localStorage.removeItem(customer_device_key);
    },
  },
  getters : {
    getAuthInfo(){
      let user = JSON.parse(localStorage.getItem( customer_auth_key));
      return user;
    }
  }
};