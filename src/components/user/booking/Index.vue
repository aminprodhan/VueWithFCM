<template>
    <a-card title="Booking List">
        <a-table :dataSource="data" :columns="columns" :loading="pageInfo.loading">
            <template #status="{ text,record }">
                <a-button v-if="record.approval_status != 3" @click="handleStatusChange(text,1)" type="primary">
                    <span v-if="record.approval_status != 1">Approve</span>
                    <span v-else>Approved</span>
                </a-button>
                <a-button v-if="record.approval_status != 1" @click="handleStatusChange(text,3)" type="primary" danger>
                    <span v-if="record.approval_status != 3">Reject</span>
                    <span v-else>Rejected</span>
                </a-button>
            </template>
            <template #room="{ text }">
                <a>{{text.name}}</a>
            </template>
            <template #customer="{ text }">
                <a>{{text.name}}</a><br>
                <a>{{text.email}}</a>
            </template>
        </a-table>
    </a-card>
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
            dataIndex: 'id',
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
    const data = computed(() => store.getters['user/reservation/getReservationList']);
    onMounted(() => {
        console.log("test");
        getResvList();
    })
    const handleStatusChange=async(id,status_id)=>{
        //console.log("id="+id+",sid="+status_id);
        pageInfo.loading=true;
        const api=await store.dispatch("user/reservation/statusChange", {id:id,status_id:status_id});
        if(api.error == undefined){
            console.log(api);     
        }
        pageInfo.loading=false;
    }
    const getResvList=async()=>{
        pageInfo.loading=true;
        const api=await store.dispatch("user/reservation/index", {});
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