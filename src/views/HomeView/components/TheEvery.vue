<template>
    <div>
        <img :src="every.iconUrl" alt="" class="w-[15vw] h-[15vw] red-image">
        <span class="dark:text-[#f0f0f0]  text-[color:#333333]">{{every.name}}</span>
    </div>
</template>
<script>
    export default {
        props:['every']
    }
</script>