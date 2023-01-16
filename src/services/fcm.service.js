import { inject } from "vue"
import { useStore } from "vuex"
import { getMessaging, getToken as fcmToken, onMessage } from "firebase/messaging";
import { notify } from "@kyvg/vue3-notification";
import { message } from 'ant-design-vue';

export const initFCM =()=>{
    messaging.onTokenRefresh(() => {
      messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.',refreshedToken)
        setTokenSentToServer(false)
        sendTokenToServer(refreshedToken)
      })
    })
}
export const sendTokenToServer =(token)=>{
    // TODO: Send Token To Your Server
}
export const setTokenSentToServer =(type)=>{
    if (type) return
    // TODO: Delete Register Token From Your Server
}
export const registeFCM =()=> {

    messaging.requestPermission().then(() => {
      console.log('Notification permission granted.')
      getToken()
    }).catch((err) => {
      console.log('Unable to get permission to notify.', err)
    })
}
export const getToken=(auth_type='customer')=>{

  const messaging_inject = inject('messaging');
  const store=useStore();

  console.log("store=",store.state.customer.auth.deviceKey);
  //const messaging = getMessaging();
  fcmToken(messaging_inject, 
      {vapidKey: "BEFjuJp0aVcmMz8_GXuEJi6Jgb4P2D5Tcmp0VRBtv7_4MGfpCTlV2F0e7eKkyuQvqkuyRi3AnSaeQOVH_wyAX6M"}).then((currentToken) => {
        if (currentToken) {
          console.log("client token manual", currentToken);
          //if(!store.state[auth_type].auth.deviceKey){
              console.log("client token manual", currentToken);
              store.dispatch(`${auth_type}/auth/updateDeviceKey`,currentToken);
          //}
          onMessage(messaging_inject, (payload) => {
            const {data} = payload;
            console.log("Message received 55. ", payload);
            message.warning(data.body,30);
          });
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
  });


    // messaging_inject.getToken(messaging_inject, {
    //   vapidKey:"BEFjuJp0aVcmMz8_GXuEJi6Jgb4P2D5Tcmp0VRBtv7_4MGfpCTlV2F0e7eKkyuQvqkuyRi3AnSaeQOVH_wyAX6M",
    // })
    // .then((currentToken) => {
    //   if (currentToken) {
    //     if(!store.state[auth_type].auth.deviceKey){
    //       console.log("client token manual", currentToken);
    //       store.dispatch(`${auth_type}/auth/updateDeviceKey`,currentToken);
    //     }
    //     messaging_inject.onMessage(messaging_inject, (payload) => {
    //       console.log("Message received. ", payload);
    //     });
    //     //send token to server-side
    //   } 
    //   else {
    //     console.log(
    //       "No registration token available. Request permission to generate one"
    //     );
    //   }
    // })
    // .catch((err) => {
    //   console.log("An error occurred while retrieving token.", err);
    // });
}