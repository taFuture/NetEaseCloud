<template>
    <div @click="ClickSong(comment.resources[0].resourceId)">
        <div class="relative mr-[2.5vw]"> 
            <img :src="comment.uiElement.image.imageUrl" alt="" class="w-[30vw] h-[30vw] rounded-2xl mb-[1.3vw]">
            <Icon icon="ion:play" width="10" class='absolute bottom-[2vw] right-[2.5vw] w-[5vw] h-[5vw] text-[#f0f0f0]  '/>
            <div class='absolute top-[2vw] right-[2.5vw] font-[800] text-[#fff] flex items-center'>
                <Icon icon="ion:play" width="10" class='w-[3vw] h-[3vw] text-[#f0f0f0]' />
                <span class='font-[800] text-[2.5vw] text-[#f0f0f0]'>{{dataTruncation(comment.resources[0].resourceExtInfo?.playCount)}}</span>
            </div>
        </div>
        <span class="text-[0.5rem] text-[color:#333333] dark:text-[#f0f0f0]">{{comment.uiElement.mainTitle.title}}</span>
    </div>
</template>
<script>
    export default {
        props:['comment'],
        methods:{
            dataTruncation(playVolume) {
                if (playVolume > 100000000) {
                    return `${Math.floor(playVolume / 100000000)}亿`;
                } else if (playVolume > 100000) {
                    return `${Math.floor(playVolume / 10000)}万`;
                } else {
                    return playVolume;
                }
            },
            ClickSong(id) {
                // console.log(id);
                this.$router.push({path:'/SongSheet/',query:{id}})
            }
        }
    }
</script>