<template>
  <a-table :dataSource="data" :columns="columns">
    
    <template #actions="{ text,record }">
        <a-button type="primary" @click="emit('handleEdit',record)">Edit</a-button>
        <a-button type="primary" @click="handleDelete(text)" danger>Delete</a-button>
    </template>
    <template #amenities="{ text }">
        <a-tag
            v-for="tag in text"
            :key="tag"
            color="green">
            {{ tag.toUpperCase() }}
        </a-tag>
    </template>
    <template #photo="{ text }">
        <a-image
            :width="100"
            :src="text"
        />
    </template>
  </a-table>
</template>
<script setup>

    import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
    import { defineComponent, onMounted,ref,reactive, computed,defineEmits } from 'vue';
    import { useStore } from 'vuex';

    const emit =defineEmits(['handleEdit']);

    const store=useStore();
    const pageInfo=reactive({
      loading:false,
    });
    const columns = [
        {
            title: 'Actions',
            dataIndex: 'id',
            slots: {
                customRender: 'actions',
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Maximum Occupancy',
            dataIndex: 'maximum_occupancy',
            key: 'maximum_occupancy',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Amenities',
            dataIndex: 'amenities',
            key: 'amenities',
            slots: {
                customRender: 'amenities',
            },
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            slots: {
                customRender: 'photo',
            },
        }, 
    ];
    const data = computed(() => store.getters['user/room/getRooms']);
    onMounted(() => {
        console.log("test");
        getResvList();
    })
    const getResvList=async()=>{
        pageInfo.loading=true;
        const api=await store.dispatch("user/room/index", {});
        pageInfo.loading=false;
    }
    const handleDelete=async(delId)=>{
        pageInfo.loading=true;
        const api=await store.dispatch("user/room/delete", {id:delId});
        pageInfo.loading=false;
    }
</script>
<style>
    .bg_pending{
        background-color: #613400;
        color: white;
    }
</style>