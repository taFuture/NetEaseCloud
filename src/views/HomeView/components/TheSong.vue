<template>
    <div>
        <div v-for="key in song.resources" :key="key.id" class="flex mb-[2.8vw]">
            <div>
                <img :src="key.uiElement.image.imageUrl" alt="" class="w-[18vw] h-[18vw] rounded-lg mr-5">
            </div>
            <div class="flex flex-col justify-around">
                <p class="w-[65vw] font-bold text-[4vw] dark:text-[#fff]  text-[color:#333333]">{{key.uiElement.mainTitle.title}}</p>
                <p class="text-[#7a8490]">{{key.uiElement.subTitle.title}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['song']
    }
</script>