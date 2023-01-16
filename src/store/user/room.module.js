import ApiService from "../../services/api.service";
const initialState = {
    rooms:[]
}
export default  {
    namespaced: true,
    state: () => initialState,
    actions: {
        async store({ commit }, data) {
            const api=await ApiService.post("user/room/store",data,"admin").then(
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
        async delete({ commit }, data) {
            const api=await ApiService.post("user/room/delete",data,"admin").then(
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
            const api=await ApiService.get("user/room/index",data,"admin").then(
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
        async getAmenities({ commit }, data){
            const api=await ApiService.get("user/room/get-amenities",data,"admin").then(
                response => {
                    return response;
                },
                error => {
                    return {error:error.response.data};
                }
            );
            console.log("api=",api);
            return api;
        }
    },
    mutations: {
        successStore(state, data){
            state.rooms=data;
        }
    },
    getters: {
        getRooms(state){
            return state.rooms;
          }
    }
}