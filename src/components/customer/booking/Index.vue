<template>
    <a-card
        style="width: 100%"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="key => onTabChange(key)">

        <p v-if="noTitleKey === 'create'">
            <Create></Create>
        </p>
        <p v-else-if="noTitleKey === 'list'">
            <List></List>
        </p>
        <p v-else>Not Found</p>
  </a-card>
</template>
<script setup>

    import Create from '@/components/customer/booking/Create.vue';
    import List from '@/components/customer/booking/ListTab.vue';
    import { defineComponent, inject, onMounted, reactive,ref } from 'vue';
    import {getToken} from '../../../services/fcm.service';
    onMounted(() => {
        getToken();
    })

    const noTitleKey = ref('create');
    const tabListNoTitle = [{
            key: 'create',
            tab: 'Booking',
        }, 
        {
            key: 'list',
            tab: 'Booking List',
        }];
    const onTabChange = (value, type) => {
      noTitleKey.value = value;
    };
</script>