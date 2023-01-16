import axios from 'axios';
import { useStore } from 'vuex';
import { customer_auth_key } from '../store/customer/auth.module';
import withHeader from './auth-header';
const API_URL = 'http://localhost:8000/api/';
class ApiService {
     
  //  witheader(auth_type){
  //     const store=useStore();
  //     const key=`${auth_type}/auth/getAuthInfo`;
  //     console.log("key-",store);
  //     let user = store.getters[key];
  //     const config = {
  //       headers: { Authorization: `Bearer ${user ? user.token : null}` }
  //     };
  //     return config;
  //  }
   post(api,payload={},auth_type='customer') {
      return axios
        .post(API_URL + api, payload,withHeader(auth_type))
        .then(response => {
          return response.data;
        });
    }
    get(api,params={},auth_type='customer') {
      return axios
        .get(API_URL + api, withHeader(auth_type),{params:params})
        .then(response => {
          return response.data;
        });
    }
}
export default new ApiService();