<template>
    <a-row type="flex" justify="center">
        <a-col :xs="24" :sm="4" :md="6" :lg="8" :xl="10"> 
            <a-card :title="pageInfo.title">
                <a-form
                    :model="formState"
                    v-bind="layout"
                    name="nest-messages"
                    :validate-messages="validateMessages"
                    @finish="onFinish">

                    <a-form-item :name="['data', 'name']" label="Name" :rules="[{ required: true }]">
                        <a-input v-model:value="formState.data.name" />
                    </a-form-item>
                    <a-form-item :name="['data', 'description']" label="Description">
                        <a-textarea v-model:value="formState.data.description" />
                    </a-form-item>
                    <a-form-item :name="['data', 'price']" label="Price" :rules="[{ required: true }]">
                        <a-input-number v-model:value="formState.data.price" />
                    </a-form-item>
                    <a-form-item :name="['data', 'maximum_occupancy']" label="Maximum Occupancy" :rules="[{ required: true }]">
                        <a-input-number v-model:value="formState.data.maximum_occupancy" />
                    </a-form-item>
                    <a-form-item :name="['data', 'amenities']" label="Amenities" :rules="[{ required: true }]">
                        <a-select
                            v-model:value="formState.data.amenities"
                            mode="multiple"
                            style="width: 100%"
                            placeholder="Please select"
                            :options="options"
                        />
                    </a-form-item>
                    <a-form-item :name="['files']" label="Image">
                        <a-upload
                            :max-count="1"
                            list-type="picture"
                            :file-list="formState.files" 
                            :before-upload="beforeUpload" 
                            @remove="handleRemove">
                            <a-button>
                                <upload-outlined></upload-outlined>
                                Select File
                            </a-button>
                        </a-upload>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                        <a-button 
                          :loading="pageInfo.loading" 
                          type="primary" 
                          html-type="submit">Submit</a-button>
                        <a-button 
                          :loading="pageInfo.loading" 
                          type="primary"
                          @click="reset" 
                          danger>Reset</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
</template>
<script setup>
    import { defineComponent, onMounted, reactive,ref, watch } from 'vue';
    import dayjs from 'dayjs';
    import _ from "lodash";
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import { message } from 'ant-design-vue';
    //import { getToken } from '../../../services/fcm.service';

    const route = useRoute();
    const store=useStore();
    let user = store.getters[`customer/auth/getAuthInfo`];
    const {id} =route.query;
    const props=defineProps(['params_update']);
    const emit =defineEmits(['handleFormReset']);

    console.log("params=",props);
    const pageInfo=reactive({
      loading:false,
      title:'Create',
    });
    const options=ref([])
    const init_form={
        name: '',
        amenities: [],
        maximum_occupancy: '',
        price:'',
        description: '',
    };
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    // watch(() => _.cloneDeep(props.params_update),(newVal,oldVal) => {
    //     console.log("params upate=",newVal);
    // })
    const validateMessages = {
      required: '${label} is required!',
    };
    const formState = reactive({
      data: {...init_form},
      updateId:null,
      files:[],
    });

    const beforeUpload = file => {
        ///formState.data.files = [...formState.data.files, file];
        console.log("before upload=",file);
        formState.files = [file];
        return false;
    };
    const handleRemove = file => {
      const index = formState.files.indexOf(file);
      const newFileList = formState.files.slice();
      newFileList.splice(index, 1);
      formState.files = newFileList;
    };
    const reset=()=>{
      Object.assign(formState.data,init_form)
      formState.updateId=null;
      pageInfo.title="Create";
      emit('handleFormReset');
    }
    const onFinish = async(values) => {

      //values['data']['room_id']=parseInt(roomId);
      //values['data']['user_id']=user.id ?? null;
      console.log('Success:', values);

      const formData = new FormData();
          formState.files.forEach(file => {
            console.log(file);
            formData.append('files[]', file);
        });
      formData.append("data",JSON.stringify(formState.data));
      formData.append("updateId",formState.updateId);

      pageInfo.loading=true;
      const api=await store.dispatch("user/room/store", formData);
      if(api.error == undefined){
          console.log(api);
          message.info(api.message);
          reset();
      }
      else{
        message.info(api.message);
      }
      pageInfo.loading=false;


    };
    const getAmenities=async()=>{
        const api=await store.dispatch("user/room/getAmenities", {});
        if(api.error == undefined)
          options.value=api;
        if(props.params_update){
            Object.assign(formState.data,props.params_update);
            formState.updateId=props.params_update.id;
            
            //formState.files=[]
            pageInfo.title="Update";
        }
    }
    onMounted(() =>{
      getAmenities();
    })
</script>