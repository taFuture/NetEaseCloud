<template>
    <div class="text-[1vw] bg-[#394e66]">
        <!-- 头部 -->
        <header class="w-screen fixed top-0 left-0 flex justify-between items-center px-[4.722vw] box-border bg-[#394e66] h-[13vw] z-[3]">
            <div class="flex items-center">
                <Icon icon="ep:back" class="w-[5vw] h-[5vw]" @click.native="Home" color="#f9fcfb"/>
                <div v-if="over" class="ml-[5.18vw]">
                    <span class="text-[#f9fcfb] text-[4vw]">歌单</span>
                </div>
                <div v-else class="flex justify-between items-center">
                    <van-notice-bar scrollable :text="songsheet.name" class="text-[#f9fcfb] text-[4vw] w-[49vw] text-ellipsis inline-block"/>
                    <span class="rounded-[3vw] text-center bg-[#fff] bg-opacity-20 w-[15vw] h-[7vw] text-[#fff] pt-[1.5vw]">
                        <Icon icon="fluent:collections-20-filled" color="#f9fcfb" class="w-[5vw] h-[5vw] inline-block"/>
                        收藏
                    </span>
                </div>
            </div>
            <div class="flex items-center">
                <Icon icon="iconamoon:search" color="#f9fcfb" class="w-[5vw] h-[5vw] mr-[3.44vw]"/>
                <Icon icon="mingcute:more-2-line" color="#f9fcfb" class="w-[7vw] h-[7vw]"/>
            </div>
        </header>
        <!-- 歌单详情 -->
        <section class=" mt-[13vw] px-[4.074vw] pt-[3.3vw] pb-[10vw] box-border" ref="wrapper">
            <div v-show="show">
                <div class="flex mr-[3vw] mb-[4.07vw]">
                    <div class="flex justify-between relative mr-[3.3vw]">
                        <div class="relative z-[1]">
                            <img :src="songsheet?.coverImgUrl" alt="" class="w-[25.55vw] h-[26.019vw] rounded-xl">
                            <div class="absolute top-[2.22vw] right-[1.296vw] flex items-center">
                                <Icon icon="ion:play" width="10" class='w-[3vw] h-[3vw] text-[#f0f0f0]' />
                                <span class='font-[800] text-[2.5vw] text-[#f0f0f0]'>{{dataTruncation(songsheet?.playCount)}}</span>
                            </div>
                        </div>
                        <div class="w-[21.111vw] h-[26.019vw] bg-[#a0755d] rounded-xl absolute z-[0] top-[-1.3vw] left-[2.3vw]"></div>
                    </div>
                    <div class="flex flex-col justify-around">
                        <p class="text-[#f7fcf1] w-[51.852vw] text-[4vw] mb-[2vw]">{{songsheet?.name}}</p>
                        <div class="flex items-center mb-[2vw]">
                            <img :src="songsheet?.creator?.backgroundUrl" alt="" class="rounded-full w-[6.3vw] h-[6.3vw] mr-[2vw]" >
                            <div class="flex items-center">
                                <span class="text-[#dfbfb0] mr-[1vw]">{{songsheet?.creator?.nickname}}</span>
                                <span class="text-[0.8vw] text-[#ecd8c8] text-center bg-white bg-opacity-25 rounded-xl box-border inline-block w-[14.037vw] h-[5.55vw] leading-[5.55vw]">
                                    <Icon icon="carbon:add" color="#f9fcfb" class="w-[3.68vw] h-[3.68vw] inline-block"/>
                                    关注
                                </span>
                            </div>
                        </div>
                        <div>
                            <span class="bg-white bg-opacity-25 rounded-[1.2vw] inline-block pl-[2vw] box-border mr-[1vw]" v-for="item in label" :key="item">
                                <span class="text-[#f9fcfb]">{{item}}</span>
                                <Icon icon="ep:arrow-left" color="#f9fcfb" class="w-[3vw] h-[3vw] inline-block" :horizontalFlip="true"/>
                            </span>
                        </div>
                    </div>
                </div>
                <p class="mb-[5.185vw] text-[#e5c4ae] flex items-center">
                    <span class="w-[86vw] text-ellipsis">{{songsheet?.description}}</span>
                    <Icon icon="ep:arrow-left" color="#f9fcfb" class="w-[3vw] h-[3vw] inline-block" :horizontalFlip="true"/>
                </p>
            </div>
            <div v-show="!show">
                <p class="text-[#a8bfca]">喜欢这个歌单的用户也听了</p>
                <div class="scroll-wrapper overflow-hidden mb-[5vw] pt-[5vw] box-border" ref="scshow">
                    <div class="flex justify-between scroll-content w-[150vw]">
                        <div v-for="item in songplaylist" :key="item" class="scroll-item relative w-[29vw]">
                            <div class="relative mr-[2.5vw]"> 
                                    <Icon icon="ion:play" width="10" class='w-[3vw] h-[3vw] text-[#f0f0f0] absolute top-[2vw] right-[0.5vw]' />
                                    <img :src="item.coverImgUrl" alt="" class="w-[28vw] h-[28vw] rounded-2xl mb-[1.3vw]" />
                            </div>
                            <span class="text-[0.5rem] text-[#8b9bb1] dark:text-[#f0f0f0]">{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute right-[3.8vw] top-[15vw] w-[5.3vw] h-[5.3vw] rounded-full bg-white bg-opacity-10 leading-[7.3vw]" @click="arrow">
                <Icon icon="iconamoon:arrow-up-2-thin" color="#f9fcfb" :verticalFlip="true"  class="w-[5vw] h-[5vw]"/>
            </div>
            <div class="flex justify-between ">
                <div class="w-[29.047vw] h-[10.37vw] bg-white bg-opacity-25 rounded-3xl text-center leading-[10.37vw]">
                    <Icon icon="basil:forward-outline" color="#f9fcfb" class="w-[7vw] h-[7vw] inline-block"/>
                    <span class="text-[#f9fcfb] font-bold">{{dataTruncation(songsheet?.shareCount) }}</span>
                </div>
                <div class="w-[29.047vw] h-[10.37vw] bg-white bg-opacity-25 rounded-3xl text-center leading-[10.37vw]">
                    <Icon icon="ant-design:message-outlined" color="#f9fcfb" class="w-[7vw] h-[7vw] inline-block"/>
                    <span class="text-[#f9fcfb] font-bold">{{dataTruncation(songsheet.trackCount) }}</span>
                </div>
                <div class="w-[29.047vw] h-[10.37vw] bg-[#f83743]  rounded-3xl text-center leading-[10.37vw]">
                    <Icon icon="fluent:collections-20-filled" color="#f9fcfb" class="w-[7vw] h-[7vw] inline-block"/>
                    <span class="text-[#f9fcfb] font-bold">{{dataTruncation(songsheet.subscribedCount)}}</span>
                </div>
            </div>
        </section>
        <!-- 歌单列表 -->
        <section class="rounded-tl-[4vw] rounded-tr-[4vw] bg-[#fefffc] mt-[-4vw] relative  dark:bg-[#4e667d]">
            <!-- 播放全部头部 -->
            <div class="px-[4.074vw] box-border h-[14vw] flex justify-between items-center sticky top-[13vw] bg-[#fefffc] z-[3] dark:bg-[#4e667d] dark:text-[#fff] rounded-tl-[4vw] rounded-tr-[4vw]" >
                <div class="flex items-center" @click="playHome">
                    <p class="w-[5vw] h-[5vw] relative bg-[#fd4c38] rounded-full text-center mr-[4.5vw]">
                        <Icon @click.native="playAll" icon="ph:play-fill" color="#f9fcfb" class="w-[2vw] h-[2vw] absolute top-1/2 left-1/2 translate-x-[-50%]  translate-y-[-50%]"/>
                    </p>
                    <p class="text-[3.5vw] font-bold mr-[1vw]">播放全部</p>
                    <p>({{ songlist.length }})</p>
                </div>
                <div class="flex items-center">
                    <Icon icon="charm:download" class="mr-[6.75vw] w-[6vw] h-[6vw] text-[#373231] dark:text-[#fff]" />
                    <Icon icon="bx:list-check" class="w-[9vw] h-[9vw] text-[#373231] dark:text-[#fff]"/>
                </div>
            </div>
            <!-- 播放全部的内容 -->
            <div class="mx-[4.074vw]">
                <ul class="pt-[4vw] box-border">
                    <li v-for="(item,index) in songlist" :key="index" class="flex justify-between items-center mb-[8vw] dark:text-[#fff]" @click="playShow(item);playHome()">
                        <div class="flex items-center">
                            <div class="mr-[5.8vw] text-[#808080] dark:text-[#a3aebf]">{{ index+1 }}</div>
                            <div>
                                <div class="flex">
                                    <p>{{item.name}}</p>
                                    <!-- <p>({{ item.alia }})</p> -->
                                </div>
                                <div class="w-[60vw] text-ellipsis">
                                    <span class="text-[#ada16a] dark:text-[#b09858]">超清母带</span>
                                    <span v-for="key in item.ar" :key="key" class="dark:text-[#b9c6df]">{{key.name}} </span>
                                    <span class="text-[#808080] dark:text-[#b9c6df]">- {{ item.al.name }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="mr-[5vw]">
                                <Icon icon="arcticons:fpt-play" color="#b1b1b1" class="w-[5vw] h-[5vw]"/>
                            </div>
                            <div>
                                <Icon icon="ant-design:more-outlined" color="#b1b1b1" class="w-[5vw] h-[5vw]"/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
    import _ from 'lodash';
    import BScroll from '@better-scroll/core';
    import store from 'storejs'
    import StickyElement from 'vue-sticky-element';
    import {fetchSongSheet,fetchSongList,fetchSongPlaylist} from '@/request'
    export default {
        components: {
            StickyElement
        },
        updated() { 
            this.bs.refresh();
        },
        data() {
            return {
                songsheet:{}, // 歌单头部
                label:[], // 歌单头部标签
                songlist:{}, // 歌单列表
                songar:[], // 名字数组
                checked:null, // 暗黑模式
                over:true, // 替换文字
                show:true, // 用户也听了这些歌单
                songplaylist:[], // 用户也听了这些歌单的数据
            }
        },
        created(){
            // 歌单头部
            fetchSongSheet(this.$route.query.id).then((res) => {
                this.songsheet = res.data.playlist
                this.label = this.songsheet?.algTags
                // let song = res.data.playlist
                // console.log(this.songsheet);
                // console.log(song);
                // console.log($route);
                // console.log(this.label)
            }),
            // 歌单列表
            fetchSongList(this.$route.query.id).then((res) => {
                this.songlist = res.data.songs
                this.songar = this.songlist.ar;
                // console.log(this.songar);
                console.log(this.songlist);
            }),
            fetchSongPlaylist(this.$route.query.id).then((res) => {
                this.songplaylist = res.data.playlists
                console.log(res);
            })
        },
        methods: {
            // 跳转到playHome页面
            playHome() {
                this.$router.push('/playHome')
            },
            // 播放全部
            playAll() {
                store.set('cookie_music',this.songlist)
                this.$player.replacePlaylist(this.songlist.map((song) => song.id),'','');
            },
            // 点到那个播哪个
            playShow(item) {
                this.$player.replacePlaylist(this.songlist.map((song) => song.id),'','',item.id);
                console.log(111);
            },
            // 点击控制箭头
            arrow() {
                this.show = !this.show
            },
            Home() {
                this.$router.push('/HomeView')
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
            handleScroll() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                
                // 如果滚动高度超过阈值，则固定在顶部；否则取消固定
                this.over = scrollTop > this.$refs.wrapper.offsetHeight/2 ? false : true;
            },
            init(name) {
                this.bs = new BScroll(name, {
                    scrollX: true,
                    // scrollY:true,
                    probeType: 3, // listening scroll event
                    click:true
                })
            }
        },
        mounted() {
            this.init(this.$refs.scshow);    
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeDestroy() {
            this.bs.destroy()
            window.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>
<style>
    header .van-notice-bar{
        background-color: #394e66;
    }

    .van-notice-bar__wrap .van-notice-bar__content{
        color: white;
    }
    
</style>