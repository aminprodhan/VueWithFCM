<template>
  <a-card hoverable>
        <template #cover>
            <img alt="example"
                :style="props.style" 
                :src="props.item.photo" />
        </template>
        <a-card-meta 
            :title="props.item.name">
            <template #description>
                <p class="mn">{{props.item.description}}</p>
                <div>
                    <b>Amenities</b> : 
                    <a-tag color="success">{{props.item.amenities}}</a-tag>
                </div>
                <p class="mn">Price Starting From</p>
                <h2 class="mn">{{props.item.price}} BDT</h2>
                <div>
                    <a-button @click="handleBook(props.item)" type="primary" block>Book Now</a-button>
                </div>
            </template>
        </a-card-meta>
    </a-card>
</template>
<style>
    .mn{margin: 0;padding: 0;}
</style>
<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const props=defineProps({
        item:Object,
        style:Object,
    });
    const handleBook=(room)=>{
        console.log(room);
        router.push({ path: '/customer/booking', query: { roomId: room.id }})
    }
</script>