<template>
    <div :style="{width:'100vw'}">
        <notifications position="bottom right" classes="my-custom-class" />
        <router-view></router-view>
    </div>
    
</template>
<script setup>
  import {provide } from 'vue'
  import messaging from '../src/assets/js/firebase.js'
  provide('messaging', messaging)
  import { useNotification } from "@kyvg/vue3-notification";
  const { notify}  = useNotification()
  notify({
    title: "Authorization",
    text: "You have been logged in!",
  });
</script>
<style>
    /* #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: #FFF;
      min-height: 98vh;
    } */
</style>
