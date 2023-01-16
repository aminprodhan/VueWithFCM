<template>
    <LayoutDefault>
        <template #content_body>
            <a-row v-if="auth">
                <a-col :span="8"><h1>Customer Panel</h1></a-col>
                <a-col :span="8" :offset="8" style="text-align:right;">
                    <a-button type="primary" @click="handleLogout()" danger>Logout</a-button>
                </a-col>
            </a-row>
            <router-view></router-view>
        </template>    
    </LayoutDefault>
</template>
<script setup>
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import LayoutDefault from '../../layouts/default-layout.vue';
    const router = useRouter();
    const store=useStore();
    const auth = computed(() => store.getters['customer/auth/getAuthInfo']);
    const handleLogout=async()=>{
        const api=await store.dispatch("customer/auth/logout", {});
        setTimeout(()=> {
            router.push({ path: '/customer/login'})
        },500);
    }
</script>
