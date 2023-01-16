
import ApiService from '../../services/api.service';
const initialState = {
    resv_list:[]
}
export default {
  namespaced: true,
  state: initialState,
  actions: {
    async index({ commit }, data) {
      const api=await ApiService.post("user/reservation/index",data,"admin").then(
        response => {
          commit('successStore',response.list);  
          return response;
        },
        error => {
          return {error:error.response.data};
        }
      );
      console.log("api=",api);
      return api;
    },
    async statusChange({ commit }, data) {
      const api=await ApiService.post("user/reservation/status-change",data,"admin").then(
        response => {
          commit('successStore',response.list);  
          return response;
        },
        error => {
          return {error:error.response.data};
        }
      );
      console.log("api=",api);
      return api;
    },
  },
  mutations: {
    successStore(state, data){
        state.resv_list=data;
    }
  },
  getters : {
    getReservationList(state){
      return state.resv_list;
    }
  }
};