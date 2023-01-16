<template>
    <a-modal v-model:visible="openStatus" :title="title" @ok="handleClose">
        <slot />
    </a-modal>
</template>
<script>
    import { ref,defineProps,defineEmits,watch } from 'vue'
    import _ from "lodash";
    export default {
        props:{
            params_dialog:Object,
        },
        setup (props, { emit }) {
            const openStatus=ref(false);
            const title=ref('');
            const message=ref();
            const handleClose=()=>{               
                emit('closeDialogAlert');
            }
            watch(() => _.cloneDeep(props.params_dialog),(newVal,oldVal) => {
                console.log("change dia=",newVal.openStatus);
                title.value=newVal.title;
                message.value=newVal.message;
                openStatus.value=newVal.openStatus;
            })
            return {
                openStatus,
                title,
                handleClose,
                message
            }
        }
    }
</script>