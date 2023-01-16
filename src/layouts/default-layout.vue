<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <div class="logo" />
            <a-menu
                v-model:selectedKeys="selectedKeys"
                theme="dark"
                mode="horizontal"
                :style="{ lineHeight: '64px' }">
                <a-menu-item key="1"><router-link to="/" active-class="active">Home</router-link></a-menu-item>
                
                <a-menu-item key="1" v-if="auth">
                    <router-link to="/customer/booking-list" >Booking List</router-link>
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
    import { useStore } from "vuex";
    const selectedKeys=ref(['1']);
    const store=useStore();
    const auth = computed(() => store.getters['customer/auth/getAuthInfo']);
    
    console.log("auth=",auth);
</script>
<style scope>
    .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub, .ant-menu.ant-menu-dark .ant-menu-sub{
        background: #001d66 !important;
    }
    .ant-layout-header{padding: 0 !important;}
</style>