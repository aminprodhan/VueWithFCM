
<template>
    <!-- Hello World - {{store.state}} -->
    <div style="padding: 5px;min-height:98vh">
        <template v-if="pageInfo.loading">
            <a-spin tip="Loading...">
                <a-alert
                    message="Loading..."
                    description="Content has loading...">
                </a-alert>
            </a-spin>
        </template>
        <a-row v-else :gutter="24">
            <a-col 
                v-for="(room,key) in pageInfo.rooms"
                :key="key" 
                :span="8">
                <RoomCard
                    :item="room"
                    :style="{'max-height':'300px'}">
                </RoomCard>
            </a-col>  
        </a-row>
    </div>        
</template>
<script setup>
  import { useStore } from "vuex";
  import RoomCard from './shared/RoomCard.vue';
  import { reactive } from '@vue/reactivity';
  import { onMounted } from "@vue/runtime-core";
import { getToken } from "../../services/fcm.service";
  

  const store = useStore();
  const pageInfo=reactive({
      rooms:[],
      loading:false,
  });
  const get=async()=>{
    pageInfo.loading=true;
    const api=await store.dispatch("customer/landing/getRooms", {});
    if(api.error == undefined){
        console.log(api);
        pageInfo.rooms=api.rooms;
    }
    pageInfo.loading=false;
  }
  onMounted(() =>{
    get();
    getToken();
  })
</script>
<style scoped>

</style>
