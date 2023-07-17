<template>
    <div class="bg-[#000] text-[1vw] text-[#fff] h-screen">
        <!-- 头部 -->
        <header class="flex justify-between items-center px-[4.6vw] h-[16vw]">
            <div>
                <Icon icon="ph:arrow-left-light" color="white" class="w-[7vw] h-[7vw]"/>
            </div>
            <div class="flex justify-between items-center">
                <Icon icon="carbon:shrink-screen-filled" color="white" :horizontalFlip="true"  class="w-[7vw] h-[7vw] mr-[3vw]"/>
                <Icon icon="ant-design:more-outlined" color="white" class="w-[7vw] h-[7vw]"/>
            </div>
        </header>
        <!-- 视频 -->
        <section class="mt-[40vw]">
            <video :src="playUrl"></video>
        </section>
        <!-- 视频信息 -->
        <section class="h-[69.8vw] mt-[5vw] flex justify-between overflow-hidden px-[4.6vw]">
            <div class="mt-[41.296vw]">
                <div class="flex w-[30vw] justify-between items-center mb-[3.4vw]">
                    <div class="relative">
                        <div>{{ videoDetail?.artists[0]?.img1v1Url }}</div>
                        <img :src="videoDetail?.artists[0]?.img1v1Url" alt="" class="w-[9.5vw] h-[9.5vw] border border-[#fff] rounded-full">
                        <p class="absolute w-[3.2vw] h-[3.2vw] rounded-full bg-[#ec2e2d] text-center top-[6vw] left-[6.5vw]" >V</p>
                    </div>
                    <span>{{ videoDetail?.artists[0]?.name }}</span>
                    <span class="w-[6.6vw] h-[5.18vw] bg-[#ec2e2d] rounded-[3.5vw]">
                        <Icon icon="carbon:add" color="white" class="w-[5vw] h-[5vw]"/>
                    </span>
                </div>
                <div class="flex items-center w-[73.2vw]">
                    <span class="w-[8vw] h-[5vw] text-center bg-[#333] font-bold text-[4vw]">MV</span>
                    <p>{{ videoDetail.name }}</p>
                </div>
                <div>2023-06-25</div>
            </div>
            <div>
                <div class="mb-[5vw]">
                    <Icon icon="ant-design:like-filled" color="white" class="w-[7vw] h-[7vw]"/>
                    <span>{{ dataTruncation(videoDetail.playCount) }}</span>
                </div>    
                <div class="mb-[5vw]">
                    <Icon icon="ant-design:message-outlined" color="white" class="w-[7vw] h-[7vw]"/>
                    <span>{{ dataTruncation(videoDetail.commentCount) }}</span>
                </div>            
                <div class="mb-[5vw]">
                    <Icon icon="majesticons:share" color="white" class="w-[7vw] h-[7vw]"/>
                    <span>{{ dataTruncation(videoDetail.shareCount) }}</span>
                </div>
                <div>
                    <Icon icon="fluent:collections-20-regular" color="white" class="w-[7vw] h-[7vw]"/>
                    <span>收藏</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import {featMvUrl,featMvDetail,featMvDetailInfo} from '@/request'
    export default {
        data() {
            return {
                playUrl:'',
                videoDetail:'',
            }
        },
        async created() {
            // 视频
            await featMvUrl(this.$route.params.id).then((res) => {
                console.log(res);
                this.playUrl = res.data.data.url
            }).catch((err) => {
                console.log(err);
            })
            // 视频信息
            await featMvDetail(this.$route.params.id).then((res) => {
                console.log(res);
                this.videoDetail = res.data.data
                console.log(this.videoDetail);
            }).catch((err) => {
                console.log(err);
            })
        },
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
        }
    }
</script>
<style>

</style>