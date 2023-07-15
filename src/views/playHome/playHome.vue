<template>
    <div class="html">
        <!-- 背景图 -->
        <div class="fixed z-[1] top-0 left-0 bottom-0 right-0 bg" :style="`background-image:url(${$player._currentTrack.al?.picUrl})`"></div>
        <!-- 模糊蒙版 -->
        <div class="fixed z-[2] top-0 left-0 bottom-0 right-0 mask"></div>
        <div class="text-[#fff] h-screen relative text-[1vw] z-[3]">
            <header class="px-[5.8vw] flex justify-between items-center pt-[3vw]">
                <Icon icon="simple-line-icons:arrow-up" color="white" :verticalFlip="true" class="w-[5vw] h-[5vw]" @click.native="go"/>
                <div class="text-center">
                    <p class="text-[4vw]">{{ $player._currentTrack.name}}</p>
                    <p v-if="Array.isArray($player._currentTrack?.ar)" class="text-[3.5vw] mt-[1vw] text-[9da4a7]">{{$player._currentTrack?.ar[0]?.name}}<span class="text-[2vw] rounded-[1.3vw] text-[#fff] bg-white bg-opacity-30 text-center py-[1vw] px-[1vw] ml-[3vw]">关注</span></p>
                </div>
                <Icon icon="ri:share-circle-line" color="white" class="w-[6vw] h-[6vw]"/>
            </header>
            <!-- 磁片 -->
            <div class="relative top-[10%] w-[100vw] h-[120vw]" v-if="!lyricsShow" @click="lyricsShow = !lyricsShow">
                <!-- 唱片 -->
                <div class="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-60%]">
                    <img src="/static/record.png" alt="" class="w-[65.7vw] h-[65.7vw]">
                    <img :src="$player._currentTrack.al?.picUrl" alt="" class="w-[43vw] h-[43vw] rounded-full absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] spinning" :class="{ 'paused-animation': !this?.$player ?._playing }">
                </div>
                <!-- 指针 -->
                <div class="absolute top-[-3%] left-[50%] translate-x-[-50%]  z-[10] rotated w-[30vw] h-[43vw] rotated" :style="!$player._playing ? `transform:rotate(-20deg)`:`transform:rotate(5deg)`" ref="pointer">
                    <img src="/static/needle-ab.png" alt="" class="h-[40vw] absolute top-[-3vw] left-[-3vw] ">
                </div>
            </div>
            <!-- 歌词 -->
            <div class="w-[100%] h-[120vw] px-[7.5vw] mt-[6.48vw] relative overflow-hidden" v-if="lyricsShow" @click="lyricsShow = !lyricsShow">
                <div class="flex justify-between">
                    <Icon icon="clarity:volume-up-line" color="#717171" class="w-[7vw] h-[7vw]"/>
                    <div class="w-[24vw] h-[7.8vw] rounded-[3.9vw] border-[0.7vw] border-[#717171] flex justify-between items-center p-[0.5vw]">
                        <p class="text-[#fff] bg-[#3a3a3a] bg-opacity-20 text-center py-[1vw] rounded-[3vw] w-[11.5vw]">歌词</p>
                        <p class="text-[#fff] text-center w-[11.5vw]">百科</p>
                    </div>
                    <Icon icon="fluent:tv-16-regular" color="#717171" class="w-[7vw] h-[7vw]"/>
                </div>
                <!-- 内容 -->
                <div class="absolute top-[7vw] left-[50%] translate-x-[-50%] transition-all duration-1000 mx-auto text-center" :style="{ top: -$player.lineHieght + 'vw'}">
                    <div v-for="(item,index) in $player.lyricLines" :key="index" class="text-[hsla(0,0%,88.2%,.8)] line-clamp-2 w-[100%] h-[12vw] px-[4vw] flex justify-center text-center" :style="{color:index === $player.lineIndex ? '#fff' : 'hsla(0,0%,88.2%,.7)'}">
                        {{ item.txt }}
                    </div>
                </div>
            </div>
            <!-- 收藏下载评论更多 -->
            <div class="px-[10vw] flex justify-between items-center mt-[25vw]">
                <Icon icon="icon-park-outline:like" color="white" class="w-[8vw] h-[8vw]"/>
                <Icon icon="circum:save-down-1" color="white" class="w-[8vw] h-[8vw]"/>
                <Icon icon="solar:microphone-linear" color="white" class="w-[8vw] h-[8vw]"/>
                <Icon icon="uil:comment-message" color="white" class="w-[8vw] h-[8vw]"/>
                <Icon icon="ant-design:more-outlined" color="white" class="w-[8vw] h-[8vw]"/>
            </div>
            <!-- 进度条 -->
            <div class="px-[5vw] mt-[10vw] flex justify-between items-center">
                <div class="">{{convertSecondsToFormattedTime($player._progress)}}</div>
                <!-- <vue-slider v-model="value"></vue-slider> -->
                <vue-slider v-model="$player.progress" :duration="0" :process="true" tooltip="none" :drag-on-click="true" :min="0" :max="$player._duration" :interval="0.1"  class="flex-1 mx-[2.5vw] h-[1vw] vue-slider"/>
                <div class="">{{convertSecondsToFormattedTime($player._duration)}}</div>
            </div>
            <!-- 暂停开始循环列表 -->
            <div class="flex justify-between items-center px-[10vw] mt-[6.5vw]">
                <Icon icon="ps:random" color="white" class="w-[8vw] h-[8vw]"/>
                <Icon icon="fluent:next-16-filled" color="white" :horizontalFlip="true" class="w-[8vw] h-[8vw]" @click.native="previousSongPlay"/>
                <div class="w-[15.7vw] h-[15.7vw] relative border-2 border-[#fff] rounded-full" @click="$player.playOrPause()">
                    <Icon :icon="`${$player._playing ? 'carbon:pause-filled' : 'ph:play-fill'}`"  color="white" class="w-[7vw] h-[7vw] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"/>
                </div>
                <Icon icon="fluent:next-16-filled" color="white" class="w-[8vw] h-[8vw]" @click.native="nextSongPlay"/>
                <Icon icon="iconamoon:playlist-fill" color="white" class="w-[8vw] h-[8vw]" @click.native="showMenu"/>
            </div>
            <van-popup v-model="showBottom" round position="bottom" :style="{ height: '75%' }">
                <div class="px-[5vw] text-[1vw]">
                    <!-- 头部 -->
                    <header class="h-[27.5vw] pt-[5.6vw] border-b border-[#f3f3f3] sticky top-0 bg-[#fff] flex flex-col justify-between text-[#333]">
                        <div class="font-bold text-[5vw]">当前播放<span class="text-[3vw] text-[#929293]">({{ music?.length }})</span></div>
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
                    <section class="text-[#333]">
                        <ul>
                            <li v-for="item in music" :key="item" class="flex justify-between my-[5vw]" @click="playSingle(item.id)">
                                <div class="flex items-center w-[65vw] truncate">
                                    <img src="/static/wave (1).gif" alt="" class="w-[3vw] h-[3vw] mr-[2vw] red-image" v-if="item.id === $player._currentTrack.id">
                                    <p class="text-[4vw] " :class="item.id === $player._currentTrack.id ? 'text-[#D15B57]' : ''">
                                        {{ item.name }}·
                                        <span class="" :class="item.id === $player._currentTrack.id ? 'text-[#D15B57]' : 'text-[#b1b1b1]'"> {{ item.ar[0].name }}</span>
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
    </div>
</template>
<script>
    import store from 'storejs';
    export default {
        data() {
            return {
                action:"heroicons:play-20-solid",
                isPlaying: false,
                showBottom:false, // 列表显示
                music:[],
                lyricsShow:true,
            }
        },
        async created() {
            this.music = store.get('cookie_music')
        },
        methods: {
            // 去上一个页面
            go() {
                this.$router.go(-1)
            },
            playSingle(id) {
                this.$player.replacePlaylist(
                    this.music.map((song) => song.id),
                    '',
                    '',
                    id
                );
            },
            isAction() {
                this.isPlaying = !this.isPlaying;
                console.log(this.isPlaying);
                // console.log(111);
                if(this.action == "heroicons:play-20-solid") {
                    return this.action = "line-md:play-filled-to-pause-transition"
                }else {
                    return this.action = "heroicons:play-20-solid"
                }
            },
            // 分秒格式
            convertSecondsToFormattedTime (seconds) {
                const minutes = Math.floor((seconds % 3600) / 60);
                const remainingSeconds =  Math.floor(seconds % 60);

                const formatNumber = (num) => {
                    return num.toString().padStart(2, '0');
                };

                return `${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
            },
            // 音乐列表的显示隐藏
            showMenu() {
                this.showBottom = !this.showBottom
            },
            // 点击播放下一个
            nextSongPlay() {
                if(this.$refs.pointer) this.$refs.pointer.style = "transform:rotate(-20deg)";
                setTimeout(() => {
                    this.$player.playOrPause();
                    this.$player._nextTrackCallback();
                },500)
            },
            // 点击播放上一首
            previousSongPlay() {
                if(this.$refs.pointer) this.$refs.pointer.style = "transform:rotate(-20deg)";
                setTimeout(() => {
                    this.$player.playOrPause();
                    if (this.$player.list.indexOf(this.$player._currentTrack.id) == 0) {
                        this.playSingle(this.$player.list[this.$player.list.length - 1]);
                    }else {
                        this.playSingle(this.$player.list[this.$player.list.indexOf(this.$player._currentTrack.id) - 1]);
                    }
                }, 500)
            }
        }
        
    }
</script>
<style>
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

    .paused-animation {
        animation-play-state: paused;
    }

    .rotated {
        transition: all .5s ease-in-out;
        transform-origin: 15% 8%
    }

    .vue-slider-rail {
        background-color: #6d6d6d;
        
    }

    .vue-slider-process {
        background-color: #fff;
    }

    .vue-slider {
        height: 0.8vw !important;
    }

    .mask {
        background-color: rgba(0, 0, 0, 0.4); /* 背景色，可以调整透明度 */
        backdrop-filter: blur(30px); /* 模糊半径，可以调整模糊程度 */
        pointer-events: none; /* 防止蒙版影响交互 */
    }

    .bg {
        background-size: cover;
    }

    .red-image {
        filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
    }

    
    .transition-container {
        animation: slide-up 0.5s ease-out;
        /* 过渡动画 */
        position: relative;
        /* 相对定位 */
        top: 0;
        /* 初始位置在视口底部之外 */
    }

    @keyframes slide-up {
        0% {
            top: 100vh;
            /* 初始位置在视口底部之外 */
        }

        100% {
            top: 0;
            /* 结束位置为视口顶部 */
        }
    }
</style>