
import ApiService from '../../services/api.service';
export const admin_auth_key='admin';
export const admin_device_key='admin_device_key';

const user = JSON.parse(localStorage.getItem(admin_auth_key));
const deviceKey = localStorage.getItem(admin_device_key);

const initialState = user
  ? { status: { loggedIn: true },deviceKey:null, user }
  : { status: { loggedIn: false },deviceKey:null, user: null };

if(deviceKey){
  initialState['deviceKey']=deviceKey;
}  

export default {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      console.log("user=",user);
      const api=await ApiService.post("user/login",user).then(
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
      const api=await ApiService.post("user/update-device-key",{device_key:deviceKey},'admin').then(
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
      localStorage.setItem(admin_device_key,key)
      state.deviceKey=key;
    },
    loginSuccess(state, user) {
      localStorage.setItem(admin_auth_key,JSON.stringify(user))
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
      localStorage.removeItem(admin_device_key);
      localStorage.removeItem(admin_auth_key);
    },
  },
  getters : {
    getAuthInfo(){
      let user = JSON.parse(localStorage.getItem( admin_auth_key));
      return user;
    }
  }
};