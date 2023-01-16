<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <div class="logo" />
            <a-menu
                v-model:selectedKeys="selectedKeys"
                theme="dark"
                mode="horizontal"
                :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">                  
                    <router-link to="/user/index" active-class="active">Dashboard</router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/user/room" active-class="active">Room</router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content :style="{ padding: '0 5px', marginTop: '64px' }">
            <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
                <slot name="content_body"></slot>
            </div>
        </a-layout-content>
    </a-layout>
</template>
<script setup>
    import { ref,computed } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";
    import { getToken } from "../services/fcm.service";


    const router=useRouter();
    const store=useStore();
    const selectedKeys=ref(['1']);
    getToken('user');
    const auth = computed(() => store.getters['user/auth/getAuthInfo']);
    if(!auth.value){
        console.log("auth");
        router.push({ path: '/user/login'})
    }

</script>
<style>
    .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub, .ant-menu.ant-menu-dark .ant-menu-sub{
        background: #820014 !important;
    }
    .ant-layout-header{padding: 0 !important;}
</style>