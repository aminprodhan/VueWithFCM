<template>
    <a-row type="flex" justify="center">
        <a-col :xs="24" :sm="4" :md="6" :lg="8" :xl="10"> 
            <a-card title="Booking">
                <a-form
                    :model="formState"
                    v-bind="layout"
                    name="nest-messages"
                    :validate-messages="validateMessages"
                    @finish="onFinish">

                    
                    <a-form-item :name="['data', 'check_in_date']" label="Check In Date">
                        <a-date-picker 
                            v-model:value="formState.data.check_in_date" 
                            :format="dateFormat" />
                    </a-form-item>
                    <a-form-item :name="['data', 'check_out_date']" label="Check Out Date">
                        <a-date-picker 
                            v-model:value="formState.data.check_out_date" 
                            :format="dateFormat" />
                    </a-form-item>
                    <a-form-item :name="['data', 'name']" label="Name" :rules="[{ required: true }]">
                        <a-input v-model:value="formState.data.name" />
                    </a-form-item>
                    <a-form-item :name="['data', 'contact_no']" label="Contact No" :rules="[{ required: true }]">
                        <a-input v-model:value="formState.data.contact_no" />
                    </a-form-item>
                    <a-form-item :name="['data', 'address']" label="Address">
                        <a-textarea v-model:value="formState.data.address" />
                    </a-form-item>

                    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                        <a-button :loading="pageInfo.loading" type="primary" html-type="submit">Submit</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
</template>
<script setup>
    import { defineComponent, onMounted, reactive,ref } from 'vue';
    import dayjs from 'dayjs';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { message } from 'ant-design-vue';
    import { getToken } from '../../../services/fcm.service';

    const route = useRoute();
    const store=useStore();
    const router = useRouter()
    let user = store.getters[`customer/auth/getAuthInfo`];
    const {roomId} =route.query;
    const pageInfo=reactive({
      loading:false,
    });
    const init_form={
        name: '',
        check_in_date: dayjs('2023/01/12'),
        email: '',
        contact_no:'',
        check_out_date: dayjs('2023/01/12'),
        address: '',
    };
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    onMounted(() =>{
      getToken();
    })
    const dateFormat = 'YYYY/MM/DD';
    const validateMessages = {
      required: '${label} is required!',
    };
    const formState = reactive({
      data: {...init_form},
    });
    const reset=()=>{
      Object.assign(formState.data,init_form)
    }
    const onFinish = async(values) => {
      values['updateId']=null;
      values['data']['room_id']=parseInt(roomId);
      values['data']['user_id']=user.id ?? null;
      console.log('Success:', values);

      pageInfo.loading=true;
      const api=await store.dispatch("customer/reservation/store", values);
      if(api.error == undefined){
          console.log(api);
          message.info(api.message);
          reset();
          router.push({ path: '/customer/booking-list'})
      }
      else{
        message.info(api.message);
      }
      pageInfo.loading=false;


    };
</script>