<template>
    <a-row type="flex" justify="center">
        <a-col :xs="24" :sm="4" :md="6" :lg="8" :xl="10"> 
            <a-card title="Customer Login">
                <a-form
                    :model="formState"
                    name="basic"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed">
                    <a-form-item
                        label="Email"
                        name="email"
                        type="email"
                        :rules="[{ required: true, message: 'Please input your email!' }]">
                        <a-input v-model:value="formState.email" />
                    </a-form-item>
                    <a-form-item
                        label="Password"
                        name="password"
                        :rules="[{ required: true, message: 'Please input your password!' }]">
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button :loading="pageInfo.loading" type="primary" html-type="submit">Submit</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
    <Alert
        @closeDialogAlert="closeDialogAlert"
        :params_dialog="pageInfo.params_dialog">
            <h1>{{pageInfo.params_dialog.message}}</h1>
    </Alert>
</template>
<script setup>
    import { reactive } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";
    import Alert from '../../shared/Alert.vue'
    const router = useRouter()
    const store=useStore();
    console.log("store=",store);
    const init_alert={
            message:'',
            openStatus:false,
            title:'',
    };
    const pageInfo=reactive({
        loading:false,
        params_dialog:{...init_alert}
    });
    const closeDialogAlert=()=>{
        Object.assign(pageInfo.params_dialog,init_alert);
    }
    const formState = reactive({
        email: 'customer@example.com',
        password: 'customer@example.com',
        remember: true,
    });
    const onFinish = async (values) => {
        pageInfo.loading = true;
        const api=await store.dispatch("customer/auth/login", values);
        if(api.error == undefined){
            console.log(api);
            setTimeout(() => {
                router.push({ path: '/customer'})
            },1000)
            
        }
        else{
            pageInfo.params_dialog={
                openStatus: true,
                title:"Error",
                message:api.error,
            }
        }
        pageInfo.loading = false;
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
</script>