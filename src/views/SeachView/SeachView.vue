<template>
    <div class="bg-[#faf7fc] dark:bg-[#2c2c2c]">
        <div class="pb-[2.5vw]">
            <section class="w-screen fixed top-0 pt-[4.5vw] left-0 z-[30] h-[28vw] bg-[#faf7fc] dark:bg-[#1a1c23] dark:text-[#fff]">
                <!-- 头部 -->
                <header class="flex justify-around items-center mx-[4.722vw] ">
                    <Icon icon="ep:back" class="w-[5vw] h-[5vw]" @click.native="Home"/>
                    <form action="" class="relative">
                        <input type="text" name="" id="" :placeholder="defaultSearch.showKeyword" class="outline-none w-[73.148vw] h-[9.444vw] rounded-2xl pl-[11.204vw] box-border" v-model="userSearchkeywords">
                        <Icon icon="iconamoon:search-light" color="#9b9b9b"  class="absolute left-[4.444vw] top-[2.3vw] text-center w-[5vw] h-[5vw]"/>
                        <ul v-if="SeachSuggestList" class="absolute top-[7vw] bg-[#fff] bg-opacity-[0.8] z-50 w-[73vw] rounded-2xl ">
                            <li v-for="item in SeachSuggestList" :key="item.id" @click="searchHandler(item.name)" class="pl-[7vw] box-border my-[3vw]">{{item.name}}</li>
                        </ul>
                    </form>
                    <span @click.native="searchHandler(userSearchkeywords)" class="text-[3.5vw]">搜索</span>
                </header>
                <!-- 歌手 -->
                <main class="mt-[5vw] w-[91.944vw] mx-auto">
                    <ul class="flex">
                        <li v-for="item in SingDate" :key="item" class="flex items-center justify-center w-[25vw] border-r border-[#e2e5e7]">
                            <Icon :icon="item.icon" color="#f93e3f" class="w-[3.981vw] h-[4.073vw] mr-[2.3vw]"/>
                            <span class="text-[3.5vw] font-bold">{{item.name}}</span>
                        </li>
                    </ul>
                </main>
            </section>
            <section class="box-border dark:bg-[#1a1c23] text-[1vw] mt-[28vw] dark:text-[#fff]">
                <!-- 猜你喜欢 -->
                <main class="mx-[7.5vw]">
                    <p class="flex justify-between items-center">
                        <span class="font-bold">猜你喜欢</span>
                        <Icon icon="basil:refresh-solid" color="#c3c6c8" :horizontalFlip="true" class="w-[4.44vw] h-[4.44vw]" @click.native="GuessLike"/>
                    </p>
                    <ul>
                        <li v-for="item in LikesDate" :key="item" class="float-left p-[2.3vw] box-border bg-[#fff] rounded-2xl mr-[1.944vw] mt-[3.333vw] text-[#616066] text-[1.5vw]">{{ item.searchWord }}</li>
                    </ul>
                </main>
                <!-- 轮播 -->
                <HorizontalSlidingList :List="List"></HorizontalSlidingList>
            </section>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
    import store from "storejs"
    import {fetchSearchDefault,fetchSearchResult,fetchSeachSuggest,fetchSeachList,fetchSeachLike} from '@/request';
    import HorizontalSlidingList from './components/HorizontalSlidingList.vue'
    export default {
        components:{
            HorizontalSlidingList
        },
        data() {
            return {
                defaultSearch:[], // 搜索框
                userSearchkeywords:'', // 搜索框关键字
                SeachSuggestList:[], // 搜索建议
                List:[], // 榜单
                ListName:[], // 榜单里的歌名
                Likes:null, // 猜你喜欢
                LikesDate:[],
                checked:null, // 暗黑模式
                SingDate:[
                    {icon:'majesticons:user',name:'歌手'},
                    {icon:'fontisto:apple-music',name:'曲风'},
                    {icon:'fluent-emoji-high-contrast:musical-notes',name:'专区'},
                    {icon:'bxs:microphone-alt',name:'识曲'},
                ],
            }
        },
        methods:{
            GuessLike() {
                this.Likes.push(...this.Likes.splice(0,5));
                this.LikesDate = this.Likes.slice(0,5)
            },
            Home() { // 返回主页面
                this.$router.push('/HomeView')
            },
            async searchHandler(keywords) {
                const res = await fetchSearchResult({keywords:this.userSearchKeywords || this.defaultSearch.realkeyword})
                console.log(res);
            },
            init(name) {
                this.bs = new BScroll(name, {
                    scrollX: true,
                    probeType: 3, // listening scroll event
                    click:true
                })
            },
            ListNameColor(index) {
                if(index === 0 || index === 1 || index === 2) {
                    return '#eb3d47'
                }else {
                    return '#818086'
                }
            }
        },
        watch: {
            userSearchkeywords:_.debounce(async function(keywords) {
                const res = await fetchSeachSuggest(keywords);
                console.log(res);
                this.SeachSuggestList = res.data.result.songs
            },200) 
        },
        async created() {
            // 深色模式
            this.checked = store.get('switch')
            
            const res = await fetchSearchDefault(); // 搜索框
            this.defaultSearch = res.data.data
            // console.log(this.defaultSearch);
            const res2 = await fetchSeachList();  // 热榜
            this.List = res2.slice(0,11);
            // console.log(this.List);
            // console.log(List[0].name);
            const res3 = await fetchSeachLike();  // 猜你喜欢
            this.Likes = res3.data.data
            this.LikesDate = this.Likes.slice(0,5)
            // console.log(this.Likes);
        }
    }
</script>
<style>
    ul li:nth-of-type(4) {
        border-right: none;
    }

    .bold {
        font-weight: bold;
    }

    .van-swipe__track {
        display: flex;
    }

</style>