<template>
    <div class="text-[1vw] dark:bg-[#151515]">
        <header class="px-[4.5vw] w-screen h-[15vw] fixed top-0 pt-[5vw] bg-[#fff] z-[3] dark:bg-[#2c2c2c]">
            <div class="flex items-center mb-[4.14vw]">
                <Icon icon="ph:arrow-left-light" class="w-[7vw] h-[7vw] mr-[3vw] dark:text-[#fff]" @click.native="go" />
                <p class="text-[5vw] dark:text-[#fff]" >MV排行榜</p>
            </div>
        </header>
        <div class="dark:bg-[#151515]">
            <van-tabs swipeable animated class="mt-[15vw]" v-model="currentDisplayIndex">
                <van-tab v-for="index in title" :key="index" :title="index" :name="index" class="sticky top-[10vw] dark">
                    <section class="mt-[5.5vw] w-[92vw] mx-auto font-bold">
                        <div class="flex items-center mb-[5.2vw] dark:text-[#fff]" >更新时间：{{ convertDate(date) }}
                            <Icon icon="quill:warning-alt" color="#b3b3b3" class="w-[5vw] h-[5vw]" />
                        </div>
                        <div>
                            <div class="mb-[4.07vw]" v-for="(key, index) in MV" :key="index">
                                <div class="relative">
                                    <img :src="key.cover" alt="" class="w-[91vw] h-[51.8vw] rounded-[1.5vw]">
                                    <span class="absolute top-[2.2vw] right-[2.5vw] flex items-center text-[#fff]">
                                        <Icon icon="ion:play-outline" color="white" class="w-[3vw] h-[3vw] mr-[1vw]" />
                                        {{ dataTruncation(key.playCount) }}
                                    </span>
                                </div>
                                <div class="flex items-center mt-[4.07vw]">
                                    <div class="mr-[5vw] text-[5vw] flex flex-col items-center" :class="index < 3 ? 'text-[#f83e3c]' : 'text-[#999]'">
                                        <div>{{ index + 1 }}</div>
                                        <div class="flex">
                                            <span v-if="key.lastRank == index + 1" class="text-[#898989] flex">
                                                <Icon icon="ci:line-m" :rotate="1" />
                                            </span>
                                            <span v-else-if="key.lastRank <= index + 1 && key.lastRank != -1" class="text-[#71b3e2] flex text-[2vw] items-center">
                                                <Icon icon="ph:triangle-fill" :rotate="2" />
                                                <i>{{index + 1 - key.lastRank}}</i>
                                            </span>
                                            <span v-else-if="key.lastRank >= index + 1" class="text-[#e66263] flex text-[2vw] items-center">
                                                <Icon icon="ph:triangle-fill" />
                                                <i>{{key.lastRank - (index + 1)}}</i>
                                            </span>
                                            <span v-else class="text-[#6d9c65] flex text-[1vw] items-center">NEW</span>
                                        </div>
                                    </div>
                                    <div class="">
                                        <p class="text-[4vw] font-bold truncate w-[85.5vw] mb-[1vw] dark:text-[#fff]">{{ key.name }}</p>
                                        <p class="text-[#a3a3a3]">{{ key.artistName }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import { fetchMVlist } from '@/request'
export default {
    data() {
        return {
            title: ['内地', '港台', '欧美', '韩国', '日本'],
            MV: [], //MV数据 
            currentDisplayIndex: '内地',
            date:'' //更新时间
        }
    },
    methods: {
        // 返回上一级
        go() {
            this.$router.go(-1)
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
        async changeRender(index) {
            const res = await fetchMVlist(index)
            console.log(index);
            this.MV = res.data.data;
            this.date = res.data.updateTime
            console.log(res);
        },
        // 转换时分秒
        convertDate(times) {
            const date = new Date(times);
            const year = date.getFullYear();  // 提取年份
            const month = (date.getMonth() + 1).toString();  // 提取月份，并补齐两位
            const day = date.getDate().toString().padStart(2, '0');  // 提取日期，并补齐两位
            const formattedDate = `${month}月${day}日`; 
            return formattedDate
        }
    },
    async created() {
        this.changeRender('内地')
        this.$watch('currentDisplayIndex', (current) => {
            this.changeRender(current);
        });
    }
}
</script>
<style>
    .van-tabs__line {
        width: 8.4vw;
        height: 1.8vw;
        border-radius: 3vw;
        background: linear-gradient(to right, #ff3f3d, #ff7875);
        top: 8vw;
    }

    .van-tabs__wrap {
        position: sticky;
        top: 15vw;
        background-color: transparent;
        z-index: 3;
    }

    i {
        text-decoration: none;
    }

    .dark .van-tabs__wrap .van-tabs__nav{
        background-color: #2C2C2C !important;
        color: #e3e3e3;
    }
    .van-tabs__wrap .van-tabs__nav{
        color: #e3e3e3;
        background-color: #fff !important;
    }

    .dark .van-tab .van-tab__text.van-tab__text--ellipsis{
        /* font-size:4vw; */
        color:#e3e3e3;
    }
</style>