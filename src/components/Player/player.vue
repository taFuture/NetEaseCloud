<template>
   <div class="text-[1vw]">
        <div class="h-[11vw] px-[4.7vw] flex justify-between items-center bg-[#fbfefe] dark:bg-[#1f2129]" @click="playShow">
            <div class="flex items-center">
                <div class="rounded-full w-[9vw] h-[9vw] bg-[#333] relative mr-[3vw] rotate" :class="{ 'paused-animation': !this?.$player ?._playing }">
                    <img :src="$player._currentTrack.al?.picUrl" alt="" class="w-[5vw] h-[5vw] rounded-full absolute top-[2vw] left-[2vw]"/>
                </div>
                <p class="text-ellipsis w-[62vw]">
                    <span class="dark:text-[#e3e6e8]">{{$player._currentTrack.name}} -</span>
                    <!-- <div>{{ $player._playing }}</div> -->
                    <span class="dark:text-[#e3e6e8] text-[#a1a4a3]" v-if="Array.isArray($player._currentTrack?.ar)">{{ $player._currentTrack?.ar[0]?.name }}</span>
                </p>
            </div>
            <div class="flex items-center">
                <div class="w-[5.6vw] h-[5.6vw] relative ml-[2.2vw]" @click="$player.playOrPause()">
                    <van-circle v-model="currentRate" :rate="($player._progress * 100) / $player._duration" size="5.6vw" :stroke-width="120" color="#475165" layer-color="#C7CBD2" class="dark:text-[#e3e6e8]"/>
                    <Icon :icon="`${$player._playing ? 'carbon:pause-filled' : 'ph:play-fill'}`" width="11px"  class="top-1/2 left-1/2 translate-x-[-50%]  translate-y-[-50%] absolute dark:text-[#e3e6e8]" />
                </div>
                <Icon icon="iconamoon:playlist-fill" class="text-[6vw] text-[#3b4152] ml-[4.5vw] dark:text-[#e3e6e8]" @click.native="showMenu"/>
            </div>
        </div>
        <van-popup v-model="showBottom" round position="bottom" :style="{ height: '75%' }">
            <div class="px-[5vw] text-[1vw]">
                <!-- 头部 -->
                <header class="h-[27.5vw] pt-[5.6vw] border-b border-[#f3f3f3] sticky top-0 bg-[#fff] flex flex-col justify-between">
                    <div class="font-bold text-[5vw]">当前播放<span class="text-[3vw] text-[#929293]">({{ music.length }})</span></div>
                    <div class="flex justify-between items-center mb-[4vw]">
                        <div class="flex items-center">
                            <Icon icon="icon-park-outline:loop-once" color="#b1b1b1" class="w-[5.5vw] h-[5.5vw] mr-[2vw]"/>
                            <span>列表循环</span>
                        </div>
                        <div class="flex items-center">
                            <Icon icon="circum:save-down-1" color="#b1b1b1" class="w-[5.5vw] h-[5.5vw]"/>
                            <Icon icon="ic:outline-add-box" color="#b1b1b1" class="w-[5.5vw] h-[5.5vw] mx-[7vw]"/>
                            <Icon icon="gg:trash" color="#b1b1b1" class="w-[5.5vw] h-[5.5vw]"/>
                        </div>
                    </div>
                </header>
                <section>
                    <ul>
                        <li v-for="item in music" :key="item" class="flex justify-between my-[5vw]">
                            <div class="flex items-center w-[65vw] text-ellipsis">
                                <p class="text-[4vw] ">
                                    {{ item.name }}·
                                    <span class="text-[#b1b1b1] text-[3vw]"> {{ item.ar[0].name }}</span>
                                </p>
                            </div>
                            <div>
                                <Icon icon="mdi:remove" color="#b1b1b1" class="w-[5vw] h-[5vw]"/>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import store from 'storejs'
    // import $player from './$player';
    export default {
        data() {
            return {
                currentRate:0,
                showBottom:false, // 列表显示
                music:[],
            }
        },
        created() {
            this.music = store.get('cookie_music')
        },
        methods: {
            // 去playHome页面
            playShow() {
                console.log(111);
                this.$router.push('/playHome')
            },
            // 音乐列表的显示隐藏
            showMenu() {
                this.showBottom = !this.showBottom
            }
        },
        
    }
</script>
<style>
    .rotate {
        animation:rotateAnimation 5s linear infinite;
    }

    @keyframes rotateAnimation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .paused-animation {
        animation-play-state: paused;
    }

    .red-image {
        filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
    }   
</style>