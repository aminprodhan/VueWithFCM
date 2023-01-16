
import ApiService from '../../services/api.service';
const initialState = {
    resv_list:[]
}
export default {
  namespaced: true,
  state: initialState,
  actions: { 
    async store({ commit }, data) {
      const api=await ApiService.post("customer/reservation/store",data).then(
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
    async index({ commit }, data) {
      const api=await ApiService.post("customer/reservation/index",data).then(
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