<template>
  <a-table :dataSource="data" :columns="columns">
    <template #status="{ text }">
        <a-button v-if="text == 1" type="primary">APPROVED</a-button>
        <a-button v-else-if="text == 2" type="primary" class="bg_pending" >PENDING</a-button>
        <a-button v-else type="primary" danger>REJECTED</a-button>
    </template>
    <template #room="{ text }">
        <a>{{text.name}}</a>
    </template>
    <template #customer="{ text }">
        <a>{{text.name}}</a><br>
        <a>{{text.email}}</a>
    </template>
  </a-table>
</template>
<script setup>

    import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
    import { defineComponent, onMounted,ref,reactive, computed } from 'vue';
    import { useStore } from 'vuex';

    const store=useStore();
    const pageInfo=reactive({
      loading:false,
    });
    const columns = [
        {
            title: 'Status',
            dataIndex: 'approval_status',
            key: 'approval_status',
            slots: {
                customRender: 'status',
            },
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
            slots: {
                title: 'customTitle',
                customRender: 'room',
            },
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            slots: {
                title: 'customTitle',
                customRender: 'customer',
            },
        },
        {
            title: 'Check In Date',
            dataIndex: 'check_in_date',
            key: 'check_in_date',
        },
        {
            title: 'Check Out Date',
            dataIndex: 'check_out_date',
            key: 'check_out_date',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Contact No',
            dataIndex: 'contact_no',
            key: 'contact_no',
        }, 
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        
    ];
    const data = computed(() => store.getters['customer/reservation/getReservationList']);
    onMounted(() => {
        console.log("test");
        getResvList();
    })
    const getResvList=async()=>{
        pageInfo.loading=true;
        const api=await store.dispatch("customer/reservation/index", {});
        if(api.error == undefined){
            console.log(api);
                
        }
        pageInfo.loading=false;
    }
</script>
<style>
    .bg_pending{
        background-color: #613400;
        color: white;
    }
</style>