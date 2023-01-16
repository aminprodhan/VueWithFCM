<template>
    <a-card
        style="width: 100%"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="key => onTabChange(key)">

        <p v-if="noTitleKey === 'create'">
            <Create @handleFormReset="handleFormReset" :params_update="pageInfo.updateParams" />
        </p>
        <p v-else-if="noTitleKey === 'list'">
            <List @handleEdit="handleEdit" />
        </p>
        <p v-else>Not Found</p>
  </a-card>
</template>
<script setup>

    import Create from '@/components/user/room/Create.vue';
    import List from '@/components/user/room/List.vue';
    import { defineComponent, inject, onMounted, reactive,ref } from 'vue';


    const pageInfo=reactive({
        updateParams:null,
    });

    // import {getToken} from '../../../services/fcm.service';
    // onMounted(() => {
    //     getToken();
    // })
    const handleFormReset=()=>{
        pageInfo.updateParams=null;
    }
    const handleEdit=(row)=>{
        //console.log("update-",id);
        noTitleKey.value='create';
        pageInfo.updateParams=row;
    }
    const noTitleKey = ref('create');
    const tabListNoTitle = [{
            key: 'create',
            tab: 'Create Room',
        }, 
        {
            key: 'list',
            tab: 'Room List',
        }];
    const onTabChange = (value, type) => {
      noTitleKey.value = value;
    };
</script>