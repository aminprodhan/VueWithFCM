<template>
    <LayoutDefault>
        <template #content_body>
            <a-row>
                <a-col :span="8"><h1>Admin Panel</h1></a-col>
                <a-col :span="8" :offset="8" style="text-align:right;">
                    <a-button type="primary" @click="handleLogout(text)" danger>Logout</a-button>
                </a-col>
            </a-row>
            <router-view></router-view>
        </template>    
    </LayoutDefault>
</template>
<script setup>
    import LayoutDefault from '../../layouts/user-layout.vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    const router = useRouter();
    const store=useStore();
    const handleLogout=async()=>{
        const api=await store.dispatch("user/auth/logout", {});
        setTimeout(()=> {
            router.push({ path: '/user/login'})
        },500);
    } 
</script>
<style scoped>
    .flex{
        display: flex;
        flex-direction: row;
    }
</style>
