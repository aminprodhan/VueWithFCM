

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <button @click="registeFCM">Register</button>

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>
<script setup>
  import HelloWorld from './components/HelloWorld.vue'
  import TheWelcome from './components/TheWelcome.vue'
  import { onMounted, provide } from 'vue'
  import messaging from '../src/assets/js/firebase.js'
  provide('messaging', messaging)


  const initFCM =()=>{
      messaging.onTokenRefresh(() => {
        messaging.getToken().then((refreshedToken) => {
          console.log('Token refreshed.',refreshedToken)
          setTokenSentToServer(false)
          sendTokenToServer(refreshedToken)
        })
      })
  }
  const sendTokenToServer =(token)=>{
      // TODO: Send Token To Your Server
  }
  const setTokenSentToServer =(type)=>{
      if (type) return
      // TODO: Delete Register Token From Your Server
  }
  const registeFCM =()=> {
      messaging.requestPermission().then(() => {
        console.log('Notification permission granted.')
        getToken()
      }).catch((err) => {
        console.log('Unable to get permission to notify.', err)
      })
  }
  const getToken=()=>{
    messaging.getToken(messaging, {
        vapidKey:"BEFjuJp0aVcmMz8_GXuEJi6Jgb4P2D5Tcmp0VRBtv7_4MGfpCTlV2F0e7eKkyuQvqkuyRi3AnSaeQOVH_wyAX6M",
      })
      .then((currentToken) => {
        if (currentToken) {
          console.log("client token", currentToken);
          messaging.onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
          });
          //send token to server-side
        } else {
          console.log(
            "No registration token available. Request permission to generate one"
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token.", err);
      });
  }
  //console.log("fcm msg=",messaging);
  onMounted(() => {
      initFCM();
  })
  //const token=firebaseMessaging.getToken({ vapidKey: "BEFjuJp0aVcmMz8_GXuEJi6Jgb4P2D5Tcmp0VRBtv7_4MGfpCTlV2F0e7eKkyuQvqkuyRi3AnSaeQOVH_wyAX6M" })
  //console.log("token=",token);
</script>
<style scoped>

  header {
    line-height: 1.5;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
