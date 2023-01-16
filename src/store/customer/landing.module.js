
import ApiService from '../../services/api.service';
const initialState = {
    rooms:[]
};
export const landing = {
  namespaced: true,
  state: initialState,
  actions: {
    async getRooms({ commit }, data) {
      const api=await ApiService.get("customer/rooms",data).then(
        response => {
          commit('roomList', response.rooms);
          return response;
        },
        error => {
          return {error:error.response.data};
        }
      );
      return api;
    },
  },
  mutations: {
    roomList(state, data) {
      state.rooms = data;
    },
  },
  getters : {}
};