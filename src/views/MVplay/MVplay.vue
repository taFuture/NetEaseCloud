<template>
    <div class="bg-[#000] text-[1vw] text-[#fff] h-screen">
        <!-- 头部 -->
        <header class="flex justify-between items-center px-[4.6vw] h-[16vw]" v-show="!getMsg">
            <div>
                <Icon icon="ph:arrow-left-light" color="white" class="w-[7vw] h-[7vw]" @click.native="() => $router.push('/MV')"/>
            </div>
            <div class="flex justify-between items-center">
                <Icon icon="carbon:shrink-screen-filled" color="white" :horizontalFlip="true"  class="w-[7vw] h-[7vw] mr-[3vw]"/>
                <Icon icon="ant-design:more-outlined" color="white" class="w-[7vw] h-[7vw]"/>
            </div>
        </header>
        <!-- 视频 -->
        <section class="relative transition-all" @click="playVideo" :class="getMsg ? 'mt-[0vw] z-[9999]' : 'mt-[40vw]'">
            <video :src="videoUrl" ref="video" autoplay loop></video>
            <Icon icon="ph:play-fill" class="text-[#fff] opacity-60 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[5] w-[20vw] h-[20vw]" v-if="showIcon"/>
        </section>
        <!-- 视频信息 -->
        <section class="h-[69.8vw] mt-[5vw] flex justify-between px-[4.6vw]">
            <div class="flex justify-between items-end">
                <div class="flex flex-col justify-between mb-[3.4vw] ">
                    <div class="relative">
                        <img :src="item.img1v1Url" alt="" class="w-[9.5vw] h-[9.5vw] border-2 border-[#fff] rounded-full absolute top-[-3vw]" v-for="(item,index) in MvDetailImg" :key="index" :class="index === 0 ? 'z-30' : 'z-10 ml-[4vw]'">
                        <p class="absolute w-[3.2vw] h-[3.2vw] rounded-full bg-[#ec2e2d] text-center top-[6vw] left-[6.5vw]" v-if="index == 0">V</p>
                        <div class="flex ml-[13vw] pb-[3vw]">
                            <span class="mr-[2vw]">{{ MvDetail?.artists[0]?.name }}</span>
                            <span class="w-[6.6vw] h-[5.18vw] bg-[#ec2e2d] rounded-[3.5vw] flex justify-center">
                                <Icon icon="carbon:add" color="white" class="w-[5vw] h-[5vw]"/>
                            </span>
                        </div>
                    </div>
                    <van-collapse v-model="activeName" accordion class="w-[73.2vw]">
                        <van-collapse-item name="1">
                            <template #title>
                                <div>
                                    <h1>
                                        <span class="w-[7.3vw] mr-[2vw] leading-[5.2vw] text-center inline-block bg-[#333333] text-[#ACACAC]">MV</span>
                                        {{ MvDetail.name }}
                                    </h1>
                                </div>
                            </template>    
                            {{ MvDetail.desc }}
                        </van-collapse-item>
                    </van-collapse>
                    <div class="mt-[3.8vw]">{{MvDetail.publishTime}}</div>
                </div>
            </div>
            <div>
                <div class="mb-[5vw] flex flex-col items-center">
                    <Icon icon="ant-design:like-filled" color="white" class="w-[7vw] h-[7vw]"/>
                    <span>{{ dataTruncation(loveCount.likedCount) }}</span>
                </div>    
                <div class="mb-[5vw] flex flex-col items-center">
                    <Icon icon="ant-design:message-outlined" color="white" class="w-[7vw] h-[7vw]" @click.native="showMsg"/>
                    <span>{{ dataTruncation(loveCount.commentCount) }}</span>
                </div>            
                <div class="mb-[5vw] flex flex-col items-center">
                    <Icon icon="majesticons:share" color="white" class="w-[7vw] h-[7vw]" @click.native="showForward"/>
                    <span>{{ dataTruncation(loveCount.shareCount) }}</span>
                </div>
                <div class="flex flex-col items-center">
                    <Icon icon="fluent:collections-20-regular" color="white" class="w-[7vw] h-[7vw]"/>
                    <span>收藏</span>
                </div>
            </div>
        </section>
        <!-- 视频播放 -->
        <section class="flex justify-between px-[4.6vw] items-center">
            <div class="flex justify-between items-center w-[42.9vw]">
                <Icon icon="iconamoon:music-1-fill" color="white" class="w-[5vw] h-[5vw]" />
                <van-notice-bar scrollable :text="MvDetail.name" class="text-[#f9fcfb] text-[4vw] truncate w-[28vw] inline-block" >
                    {{MvDetail.name}}- <span v-for="item in MvDetail.artists" :key="item">{{ item.name }}/</span>
                </van-notice-bar>
                <!-- <p class="truncate w-[28vw]">{{ MvDetail.name }} - <span v-for="item in MvDetail.artists" :key="item">{{ item.name }}/</span></p> -->
                <Icon icon="solar:heart-linear" color="white" class="w-[5vw] h-[5vw]" />
            </div>
            <div class="relative w-[11vw] h-[11vw]">
                <img src="/static/record.png" alt="" class="w-[11vw] h-[11vw]">
                <img :src="MvDetail?.cover" alt="" class="w-[7.6vw] h-[7.6vw] rounded-[50%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] spinning">
            </div>
        </section>
        <!-- 进度条 -->
        <vue-slider v-model="$player.progress" :duration="0" :process="true" tooltip="none" :drag-on-click="true" :min="0" :max="videoUrl.length" :interval="0.1"  class="flex-1 h-[1vw] vue-slider"/>
        <!-- 留言 -->
        <section class="mx-[4.4vw] flex justify-between items-center mt-[5vw]">
            <input type="text" placeholder="说点好听的吧~" class="bg-transparent">
            <Icon icon="system-uicons:scale-extend" color="#7f7f7f" :horizontalFlip="true" class="w-[5vw] h-[5vw]"/>
        </section>
        <!-- 点击看评论并留言 -->
        <van-popup v-model="getMsg" position="bottom" :style="{ height: '74%' }" class="text-[#000] pt-[7.13vw]">
            <header class="px-[4.3vw] flex justify-between items-center">
                <div class="text-[3vw]">评论</div>
                <div class="flex justify-between w-[30vw]">
                    <span>推荐</span>
                    <span class="text-[#bdbdbd]">最热</span>
                    <span class="text-[#bdbdbd]">最新</span>
                </div>
            </header>
            <section class="flex flex-col justify-between pl-[4vw] mt-[6vw] ">
                <div v-for="item in commentMv" :key="item" class="flex">
                    <div class="mr-[2.4vw] mt-[2vw]">
                        <img :src="item.user.avatarUrl" alt="" class="w-[9.5vw] h-[9.5vw] rounded-full">
                    </div>
                    <div class="border-b border-[#f0f0f0] pt-[4vw] pr-[4vw] pb-[3.6vw] w-[100%]">
                        <div class="flex justify-between items-center">
                            <p class="text-[#676767]">{{ item.user.nickname }}</p>
                            <div class="flex justify-between items-center">
                                <span v-if="item.likedCount != 0" class="text-[#676767] mr-[1vw]">{{ item.likedCount }}</span>
                                <Icon icon="icon-park-outline:good-one" color="#9b9b9b" class="w-[5vw] h-[5vw]"/>
                            </div>
                        </div>
                        <p class="text-[#9b9b9b] mb-[3.7vw]">
                            <span>{{ item.timeStr }} {{ item.ipLocation.location }}</span>
                        </p>
                        <p class="">{{ item.content }}</p>
                    </div>
                </div>
            </section>
        </van-popup>
        <!-- 转发 -->
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" class="share"/>
    </div>
</template>
<script>
    import {featMvUrl,featMvDetail,featMvDetailInfo,featCommentMv} from '@/request'
    export default {
        data() {
            return {
                videoUrl:'',
                MvDetail:[],
                loveCount:[],
                MV:[],
                showIcon: false, // 暂停图标的显示
                currentTime: 0,
                duration: 0,
                activeName: '0', // 折叠
                getMsg:false, // 留言抽屉
                commentMv:[], // 评论数据
                showShare:false, // 转发
                options: [
                    [   
                        { name: '微信', icon: 'wechat' },
                        { name: '朋友圈', icon: 'wechat-moments' },
                        { name: '微博', icon: 'weibo' },
                        { name: 'QQ', icon: 'qq' },
                    ]
                ],
            }
        },
        async created() {
            // 视频
            const res1 = await featMvUrl(this.$route.params.id);
            this.videoUrl = res1.data.data.url;
            // // 视频信息
            const res2 = await featMvDetail(this.$route.params.id);
            this.MvDetail = res2.data.data;
            this.MvDetailImg = this.MvDetail.artists.slice(0,3);
            console.log(this.MvDetail);
            // // 点赞详情
            const res3 = await featMvDetailInfo(this.$route.params.id);
            this.loveCount = res3.data;
            console.log(res1,res2,res3);
            const res4 = await featCommentMv(this.$route.params.id)
            this.commentMv = res4.data.comments;
            console.log(this.commentMv);
            // this.MV = res4.data.data;
        },
        methods:{
            // 点击出留言
            showMsg() {
                this.getMsg = !this.getMsg
            },
            // 转发
            showForward() {
                this.showShare = !this.showShare
            },
            dataTruncation(playVolume) {
                if (playVolume > 100000000) {
                    return `${Math.floor(playVolume / 100000000)}亿`;
                } else if (playVolume > 100000) {
                    return `${Math.floor(playVolume / 10000)}万`;
                } else {
                    return playVolume;
                }
            },
            playVideo() {
                if(!this.getMsg) {
                    if(this.$refs.video.paused) {
                        this.$refs.video.play();
                        this.showIcon = false;
                    }else {
                        this.$refs.video.pause();
                        this.showIcon = true;
                    }
                }else {
                    this.getMsg = false
                }
            }
        }
    }
</script>
<style>
    .vue-slider-rail {
        background-color: #6d6d6d;
        
    }

    .vue-slider-process {
        background-color: #fff;
    }

    .vue-slider {
        height: 0.8vw !important;
    }

    input::placeholder {
        color: #333;
    }

    .van-cell, .van-collapse-item__content {
        background: transparent;
        color: white;
        /* position: static; */
        font-size: 1vw;
        padding: 0;
    }

    .van-collapse-item__content {
        max-height: 97vw;
        overflow: auto;
    }

    .van-cell--clickable:active {
        background-color: #000;
    }

    .van-hairline--top-bottom,
    .van-collapse {
        border: none;
        /* position: static; */
    }

    .van-hairline--top-bottom::after,
    .van-cell::after {
        border: none;
    }

    .van-notice-bar{
        background-color: transparent !important;
    }

    .van-notice-bar__wrap .van-notice-bar__content{
        color: white;
    }

    .spinning {
        animation:spin 5s linear infinite;
    }

    @keyframes spin {
        from {
            transform: translate(-50%,-50%) rotate(0deg);
            
        }
        to {
            transform: translate(-50%,-50%) rotate(360deg);
        }
    }

    .van-share-sheet__cancel{
        display: none !important;
    }

    .van-share-sheet__option img {
        width: 13.7vw;
        height: 13.7vw;
    }

    .van-share-sheet__options {
        padding: 5.5vw 0 5.5vw 5.5vw;
    }

    .share {
        background: #212121;
        opacity: 0.9;
    }

    .van-share-sheet__title {
        color: #7c7c7c;
    }

    .van-share-sheet__name {
        color: #ccc;
    }
</style>