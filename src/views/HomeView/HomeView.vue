<template>
    <div>
        <div class="h-[100vh] mb-[7vw]" :class='switchCheckStatus ? "overflow-hidden" : "overflow-auto"' >
            <!-- 头部 -->
            <header class="fixed top-0 h-[18vw] pt-[5vw] px-[3vw] box-border flex items-center justify-around w-[100%] pb-[4vw] dark:from-[#1a1c23] dark:to-[#1a1c23] z-[30] bg-gradient-to-b from-[#e9e6fa] to-[#fff]">
                    <Icon icon="ph:list" class="w-[7vw] h-[7vw] dark:text-[#f0f0f0]  text-[color:#333333]" @click.native="drawVisibleL = !drawVisibleL,info='推荐歌单'"/>
                    <form action="" class="relative">
                        <input type="text" name="" id="" :placeholder="defaultSearch.showKeyword" class="outline-none w-[73.148vw] h-[9.444vw] rounded-2xl pl-[11.204vw] box-border bg-gradient-to-r from-[#d9dcfa] to-[#f5d8ef] dark:from-[#3e353a] dark:to-[#3e353a]" v-model="userSearchkeywords" @focus="seach">
                        <Icon icon="iconamoon:search-light" color="#79738a"  class="absolute left-[4.444vw] top-[2.3vw] text-center w-[5vw] h-[5vw]"/>
                        <Icon icon="tabler:scan" color="#79738a" class="absolute right-[2vw] top-[2.3vw] text-center w-[5vw] h-[5vw]" />
                    </form>
                    <Icon icon="iconamoon:microphone-thin" class="w-[7vw] h-[7vw] dark:text-[#f0f0f0]  text-[color:#333333]"/>
            </header>
            <section class="dark:bg-[#1a1c23] text-[1vw] mt-[18vw]" >
                <!-- 轮播图 -->
                <div class="swiper mySwiper">
                    <div class="swiper-wrapper">
                        <TheBanner class="swiper-slide " v-for="item in banner" :key="item.id" :banner="item"></TheBanner>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <!-- 每日推荐 -->
                <main class="ml-[4.5vw] mt-[2.722vw] scroll-wrapper overflow-hidden"  ref="scroll">
                    <div class="flex justify-between scroll-content w-[193vw] ">
                        <TheEvery class="text-center scroll-item" v-for="item in commend" :key="item.id" :every="item"></TheEvery>
                    </div>
                </main>
                <!-- 推荐歌单 -->
                <main class="mt-[4.722vw] dark:border-[#333] border-solid border-t border-b border-slate-[ebedf2] pt-[5.463vw] pb-[2.296vw] box-border">
                    <p class="ml-[4.5vw] mb-[2vw]">
                        <span class="font-bold text-[5vw] dark:text-[#f0f0f0]  text-[color:#333333]">推荐歌单</span>
                        <Icon icon="ep:arrow-left-bold" :horizontalFlip="true" :verticalFlip="true" class="inline-block mt-[-2vw] w-[4vw] h-[4vw] dark:text-[#f0f0f0]  text-[color:#333333]"/>
                        <Icon icon="ant-design:more-outlined" :horizontalFlip="true" :verticalFlip="true" class="float-right w-[6vw] h-[6vw] dark:text-[#f0f0f0]  text-[color:#333333]" @click.native="drawVisible = !drawVisible,info='推荐歌单'"/>
                    </p>
                    <div class="ml-[4.5vw] scroll-wrapper overflow-hidden pt-[3vw] box-border"   ref="sc">
                        <div class="flex scroll-content w-[200vw]">
                            <div class='relative mr-[2.5vw]'>
                                <div class='w-[30vw] relative z-[1]'>
                                    <div class='w-[30vw] h-[30vw] bg-[#f3f3f3] rounded-2xl overflow-hidden relative'>
                                        <transition name='abc'  v-for=" (item,index) in resources" :key="item">
                                            <div v-if='visible === index' class='absolute top-0 left-0"'>
                                                <img :src='item.uiElement.image.imageUrl' alt='' class='w-[30vw] h-[30vw] rounded-2xl'>
                                                <Icon icon="ion:play" width="10" class='absolute bottom-[2vw] right-[2.5vw] text-[#fff] w-[5vw] h-[5vw]'/>
                                                <div class='absolute top-[2vw] right-[2.5vw] font-[800] text-[#fff] flex items-center'>
                                                    <Icon icon="ion:play" width="10" class='text-[#fff] w-[3vw] h-[3vw]' />
                                                    <span class='font-[800] text-[2.5vw]'>{{dataTruncation(item.resourceExtInfo?.playCount)}}</span>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                    <p class='text-[2.78vw] scroll-item dark:text-[#f0f0f0]  text-[color:#333333]'>{{resourceData}}</p>
                                </div>
                                <div class='w-[26vw] h-[31vw] bg-[#ddd] absolute top-[-1vw] left-1/2 -translate-x-1/2 rounded-[8px] z-[0]'></div>
                            </div>
                            <TheComment class="scroll-item mr-[2.5vw] w-[32.13vw]" v-for="item in songSheet" :key="item.id" :comment="item"></TheComment>
                        </div>
                    </div>
                </main>
                <!-- 新歌新碟 -->
                <main class="mt-[4.722vw] dark:border-[#333] border-solid border-b border-slate-[ebedf2] pb-[3.296vw] box-border">
                    <p class="ml-[4.5vw]">
                        <span class="font-bold text-[5vw] dark:text-[#f0f0f0]  text-[color:#333333]">新歌新碟\数字专辑</span>
                        <Icon icon="ep:arrow-left-bold" :horizontalFlip="true" :verticalFlip="true" class="inline-block mt-[-2vw] w-[4vw] h-[4vw] dark:text-[#f0f0f0]  text-[color:#333333]"/>
                        <Icon icon="ant-design:more-outlined" :horizontalFlip="true" :verticalFlip="true" class="float-right w-[6vw] h-[6vw] dark:text-[#f0f0f0]  text-[color:#333333]" @click.native="drawVisible = !drawVisible,info='新歌新碟'"/>
                    </p>
                    <div class="ml-[4.5vw] mt-[4.722vw] scroll-wrapper overflow-hidden"  ref="song">
                        <div class="flex justify-between scroll-content w-[714vw]">
                            <TheSong class="scroll-item w-[88.819vw]" v-for="item in newSong" :key="item.id" :song="item"></TheSong>
                        </div>
                    </div>
                </main>
                <!-- 排行榜 -->
                <main class="mt-[4.722vw] dark:border-[#333] border-solid border-b border-slate-[ebedf2] pb-[2.722vw] box-border">
                    <p class="ml-[4.5vw]" @click="() => this.$router.push('/MV')">
                        <span class="font-bold text-[5vw] dark:text-[#f0f0f0]  text-[color:#333333]">排行榜</span>
                        <Icon icon="ep:arrow-left-bold" :horizontalFlip="true" :verticalFlip="true" class="inline-block mt-[-2vw] w-[4vw] h-[4vw] dark:text-[#f0f0f0]  text-[color:#333333]"/>
                        <Icon icon="ant-design:more-outlined" :horizontalFlip="true" :verticalFlip="true" class="float-right w-[6vw] h-[6vw] dark:text-[#f0f0f0]  text-[color:#333333]" @click.native="drawVisible = !drawVisible,info='排行榜'"/>
                    </p>
                    <div class="ml-[4.5vw] scroll-wrapper overflow-hidden"  ref="charts">
                        <div class="flex scroll-content w-[560vw] p-[3vw] pl-[0vw] box-border">
                            <TheChart  class="scroll-item w-[91vw] h-[54.4vw] mr-3 bg-[#fff] bg-opacity-[0.8] rounded-2xl shadow p-[3.5vw] box-border dark:bg-[#25272e]" v-for="item in charts" :key="item.id" :charts="item"></TheChart>
                        </div>
                    </div>
                </main>
                <!-- 热门话题 -->
                <main class="mt-[4.722vw] dark:border-[#333] border-solid border-b border-slate-[ebedf2] pb-[6.296vw] box-border">
                    <p class="ml-[4.5vw] mb-[3vw] overflow-hidden">
                        <span class="font-bold text-[5vw] dark:text-[#f0f0f0]  text-[color:#333333]">热门话题</span>
                        <Icon icon="ant-design:more-outlined" :horizontalFlip="true" :verticalFlip="true" class="float-right w-[6vw] h-[6vw] dark:text-[#f0f0f0]  text-[color:#333333]" @click.native="drawVisible = !drawVisible,info='热门话题'"/>
                    </p>
                    <div class="overflow-hidden scroll-wrapper " ref="hot">
                        <div class="flex scroll-content w-[235vw]">
                            <TheHot  class="ml-[4.5vw] scroll-item w-[71vw] h-[38vw] dark:bg-[#000] p-[3.6vw] box-border rounded-2xl " v-for="item in 3" :key="item" :hot="item" :style="{ 'backgroundColor': hotChartsColor(item) }"></TheHot>
                        </div>
                    </div>
                </main>
                <!-- 音乐日历 -->
                <main class="mt-[4.722vw] dark:border-[#333] pb-[6.296vw] box-border">
                    <div class="ml-[4.5vw]  overflow-hidden">
                        <div class="flex overflow-hidden">
                            <span class="font-bold mr-2 text-[5vw] dark:text-[#f0f0f0]  text-[color:#333333]">音乐日历</span>
                            <p class="w-[13vw] h-[5vw] text-center mt-[1vw] text-[3vw] dark:text-[#f0f0f0]  text-[color:#333333]">
                                更多
                                <Icon icon="ep:arrow-left-bold" :horizontalFlip="true" :verticalFlip="true" class="inline-block w-[4vw] h-[4vw] dark:text-[#f0f0f0]  text-[color:#333333]"/>
                            </p>
                        </div>
                        <Icon icon="ant-design:more-outlined" width="30" :horizontalFlip="true" :verticalFlip="true" class="float-right mt-[-6vw] dark:text-[#f0f0f0]  text-[color:#333333]" @click.native="drawVisible = !drawVisible,info='音乐日历'"/>
                    </div>
                    <div class="ml-[4.5vw] mt-[2.722vw] scroll-wrapper">
                        <ul class="flex scroll-content w-[575vw]">
                            <li class="flex flex-col justify-between scroll-item w-[91vw] h-[48vw] mr-3 bg-#fff bg-opacity-[0.8] rounded-2xl shadow p-[2.8vw] box-border">
                                <div v-for="item in date" :key="item.id" class="flex justify-between mt-[2.8vw]">
                                    <div class="flex flex-col justify-center w-[65vw] h-[15.7vw]">
                                        <p class="dark:text-[#f0f0f0]  text-[color:#333333]">今天 {{Cover(new Date().getMonth() + 1)}}/{{new Date().getDate()}}</p>
                                        <p class="mt-[1vw] font-bold text-[4vw] w-[65vw] truncate dark:text-[#f0f0f0] text-[#333]">{{ item.title }}</p>
                                    </div>
                                    <div>
                                        <img :src="item.imgUrl" alt="" class="w-[16vw] h-[16vw] rounded-lg">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </main>
                <!-- 从下往上的抽屉 -->
                <Drawer :visible.sync="drawVisible" direction="btt" :width="100" :title="info">
                    <div class="mx-[4vw] dark:bg-[#333] bg-[#fff]">
                        <ul class="mt-[5vw] pt-[3vw] box-border border-solid border-t border-slate-[ebedf2]">
                            <li class="flex mb-[5vw] items-center">
                                <Icon icon="iconamoon:like-light" width="30" class="mr-[2vw] dark:text-[#f0f0f0]  text-[color:#333333]" />
                                <span class="dark:text-[#f0f0f0]  text-[color:#333333]">优先推荐</span>
                            </li>
                            <li class="flex mb-[5vw] items-center">
                                <Icon icon="ri:dislike-line" :horizontalFlip="true" width="30" class="mr-[2vw] dark:text-[#f0f0f0]  text-[color:#333333]"/>
                                <span class="dark:text-[#f0f0f0]  text-[color:#333333]">减少推荐</span>  
                            </li>
                            <li class="flex mb-[5vw] items-center">
                                <Icon icon="mingcute:more-4-line" :horizontalFlip="true" width="30" class="mr-[2vw] dark:text-[#f0f0f0]  text-[color:#333333]"/>
                                <span class="dark:text-[#f0f0f0]  text-[color:#333333]">更多内容</span>
                            </li>
                        </ul>
                    </div>
                </Drawer>
                <!-- 从左往右的抽屉 -->
                <Drawer :visible.sync="drawVisibleL" direction="ltr">
                    <template #header>
                        <div class="dark:bg-[#151515] flex justify-between items-center mb-[3vw] fixed w-[85vw] h-[21vw] bg-[#f5f5f5] pt-[5vw] px-[4vw] box-border z-[999]">
                            <div class="flex items-center">
                                <span class="rounded-full w-[8vw] h-[8vw] bg-[#fff] text-center mr-[3vw] flex items-center justify-center overflow-hidden">
                                    <Icon icon="mdi:user" color="#f9dadd" class="w-[7vw] h-[7vw]" v-if="userName === ''" @click.native="login"/>
                                    <img :src="account?.avatarUrl" alt="" class="w-[7vw] h-[7vw] rounded-full" v-else @click="user">
                                </span>
                                <p class="dark:text-[#f0f0f0] text-[#383838] text-[3.5vw]" @click="login" v-if="userName === ''">立即登录</p>
                                <p class="dark:text-[#f0f0f0] text-[#383838] text-[3.5vw]" v-else @click="user">{{account?.nickname}}</p>
                                <Icon icon="ep:arrow-left-bold" :horizontalFlip="true" :verticalFlip="true" class="w-[4vw] h-[4vw] dark:text-[#f0f0f0] text-[#333]"/>
                            </div>
                            <Icon icon="tabler:scan" class="w-[7vw] h-[7vw] dark:text-[#f0f0f0] text-[#333]"/>
                        </div>
                    </template>
                    <div class="h-[100vh] overflow-hidden scroll-wrapper mt-[21vw] dark:bg-[#151515] bg-[#f1f1f1]" ref="side">
                        <div class="mt-[19.8vw] dark:bg-[#151515] bg-[#f1f1f1] scroll-content h-[550vw]">
                            <!-- 黑胶vip -->
                            <div class="w-[76vw] h-[32vw] bg-gradient-to-r from-[#3b3b3b] to-[#5f5050] rounded-xl p-[4vw] box-border m-auto">
                                <div class="border-b border-[#827773] pb-[3.8vw] box-border">
                                    <div class="flex justify-between">
                                        <div class="flex items-center">
                                            <p class="text-[#fde4df] font-bold text-[4vw]">黑胶VIP·贰</p>
                                            <div class="w-[12vw] h-[2vw] bg-[#343230] rounded-xl mx-[3vw]">
                                                <div class="bg-[#ead2cb] h-[100%] rounded-xl" style="width: 60%;"></div>
                                            </div>
                                            <span class="text-[#827773]">v3</span>
                                        </div>
                                        <p class="text-[#cecba8] border border-[#cecba8] rounded-xl w-[16vw] h-[6vw] text-center leading-[6vw] float-right">会员中心</p>
                                    </div>
                                    <div class="flex mt-[1.5vw]">
                                        <p class="text-[#cecba8]">礼品卡 | 毕业快乐！</p>
                                        <Icon icon="game-icons:graduate-cap" color="#454341" width="15" :horizontalFlip="true" />
                                    </div>
                                </div>
                                <div class="text-[#cecba8] mt-[4vw]">您的黑胶VIP即将到期，点击立即续费</div>
                            </div>
                            <SiderBar v-for="item in SideData" :key="item" :title="item.title" :data="item.data" :checks.sync='checked'></SiderBar>
                            <div class="dark:bg-[#2c2c2c] rounded-xl py-[4vw] box-border bg-[white] mx-[4vw] mt-[3.9vw] text-center text-[red] text-[4vw]" @click="pop" v-if="userName !== ''">退出登录/关闭</div>
                            <div class="dark:bg-[#2c2c2c] rounded-xl py-[4vw] box-border bg-[white] mx-[4vw] mt-[3.9vw] text-center text-[red] text-[4vw]" @click="login"  v-else>立即登录</div>
                        </div>
                    </div>
                </Drawer>
            </section>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import store from "storejs"
import _ from 'lodash';
import BScroll from '@better-scroll/core';
import {fetchSearchDefault,fetchSearchResult,fetchSeachSuggest,getUserAccount,getUserDetail} from '@/request';
import TheHot from './components/TheHot.vue';
import TheComment from './components/TheComment.vue';
import TheEvery from './components/TheEvery.vue';
import TheChart from './components/TheChart.vue';
import TheBanner from './components/TheBanner.vue';
import TheSong from './components/TheSong.vue';
import SiderBar from './components/SiderBar.vue';
import Dialog from '@/components/Dialog';

export default {
    components:{
        TheHot,TheComment,TheEvery,TheChart,TheBanner,TheSong,SiderBar
    },
    updated() { 
        this.bs.refresh();
    },
    data() {
        return {
            switchCheckStatus:false, // 抽屉开关
            menu: [],// 菜单
            banner: [],// 轮播
            activeMenuItem: '',
            nodeValue:[0,1,2],
            theme:'新晋',
            defaultSearch:{},
            userSearchkeywords:'',
            SeachSuggestList:[], 
            date:[],  //音乐日历
            charts:[],  //排行榜
            newSong:[],  //新歌新碟
            songSheet:[],  //推荐歌单
            commend:[], //每日推荐
            drawVisible:false, // 从下往上抽屉
            drawVisibleL:false, // 从左往右抽屉
            info:'',
            resources:[],
            resourceData:'',
            visible:0,
            checked:null, 
            SideData:[
                {
                    title:false,
                    data:[
                        { icon:'solar:letter-linear', name:'我的消息', right:false, },
                        { icon:'cib:shell', name:'云贝中心', right:'签到', },
                        { icon: 'icons8:idea', name: '创作者中心', right: false, }
                    ]
                },
                {
                    title:'音乐服务',
                    data:[
                        { icon:'ph:star-of-david-light', name:'趣测', right:'点击查看今日运势', },
                        { icon:'ion:ticket-outline', name:'云村有票', right:false, },
                        { icon: 'fluent:cube-20-regular', name: '多多西西口袋', right: false, },
                        { icon: 'icon-park-outline:shopping-bag', name: '商城', right: false, },
                        { icon: 'streamline:interface-signal-square-heart-line-stats-beat-square-graph', name: 'Beat专区', right: '顶尖制作邀你创作', },
                        { icon: 'tabler:bell-ringing-2', name: '口袋彩铃', right: false, },
                        { icon: 'icon-park-outline:gamepad', name: '游戏专区', right: '音乐浇灌治愈花园', }
                    ]
                },
                {
                    title:'其他',
                    data:[
                        { icon:'ri:settings-line', name:'设置', right:false, },
                        { icon:'fluent:sleep-24-regular', name:'深色模式', right:false, btn:true },
                        { icon: 'mdi:alarm-clock', name: '定时关闭', right: false, },
                        { icon: 'ph:t-shirt-thin', name: '个性装扮', right: false, },
                        { icon: 'icon-park-outline:headset', name: '边听边存', right: '未开启' },
                        { icon: 'icon-park-outline:radio-one', name: '在线听歌免流量', right: false, },
                        { icon: 'ant-design:stop-outlined', name: '音乐黑名单', right: '未开启', },
                        { icon: 'ant-design:safety-outlined', name: '青少年模式', right: '未开启', },
                        { icon: 'ep:alarm-clock', name: '音乐闹钟', right: false, }
                    ]
                },
                {
                    title:false,
                    data:[
                        { icon:'iconoir:page', name:'我的订单', right:false, },
                        { icon:'ion:ticket-outline', name:'优惠券', right:false, },
                        { icon:'ep:service', name:'我的客服', right:false, },
                        { icon: 'ri:share-circle-line', name: '分享网易云音乐', right: false, },
                        { icon: 'ph:file-thin', name: '个人信息收集与使用清单', right: false, },
                        { icon: 'icons8:share', name: '个人信息第三方共享清单', right: false, },
                        { icon: 'material-symbols:health-and-safety-outline-rounded', name: '个人信息与隐私保护', right: false, },
                        { icon: 'icon-park-outline:attention', name: '关于', right: false, }
                    ]
                },
            ],
            account:{}, // 用户信息
            userName:'' // 用户ID
        }
    },
    mounted() {
        this.init(this.$refs.scroll);
        this.init(this.$refs.sc);
        this.init(this.$refs.song);
        this.init(this.$refs.charts);
        this.init(this.$refs.hot);
        this.init(this.$refs.side);
        this.animateItems();
    },
    beforeDestroy() {
        this.bs.destroy()
    },
    methods: {
        user() {
            this.$router.push('/User')
        },
        login() { // 去登录页面
            this.$router.push('/Login')
        },
        seach() { // 去搜索页面
            this.$router.push('/SeachView')
        },
        init(name) {
            this.bs = new BScroll(name, {
                scrollX: true,
                probeType: 3, // listening scroll event
                click:true
            })
        },
        hotChartsColor(index) {
            if(index === 0) {
                return "#ae9f85"
            }else if(index === 1) {
                return "#a59e8d"
            }else {
                return "#9687ad"
            }
        },  
        getNodeColor(index) {
            if(index === 0) {
                return "#c49125"
            }else if(index === 1) {
                return "#7eb2ab"
            }else {
                return "#c67b4f"
            }
        },
        getThemeColor(name) {
            if(name !== '新晋') {
                return "red" 
            }else {
                return "#2eb784"
            }
        },
        Cover(num) {
            if (num < 10) {
                return "0" + num;
            } else {
                return num.toString();
            }
        },
        animateItems() {
            setInterval(() => {
                this.visible++;
                if(this.visible === this.resources.length){
                this.visible = 0;
                }
                this.resourceData = this.resources[this.visible]?.uiElement.mainTitle.title
            }, 5000);
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
        async searchHandler(keywords) {
            const res = await fetchSearchResult({keywords:this.userSearchKeywords || this.defaultSearch.realkeyword})
            console.log(res);
        },
        // 弹窗
        pop() {
            Dialog({title:'网易云音乐',msg:'确定退出当前账户吗？'}).then(() => {
                // console.log('点击了确定');
                const myCookie = localStorage.getItem('__m__cookie');
                localStorage.removeItem('__m__cookie');
                this.$router.push('/Login');
            }).catch(() => {
                console.log('点击了取消');
            })
        }
    },
    async created() {
        // 深色模式
        this.checked = store.get('switch');

        // 轮播图/新歌新碟/排行榜/推荐歌单
        axios.get('https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/homepage/block/page').then(res => {
            // console.log(res);
            this.banner = res.data.data.blocks[0].extInfo.banners // 轮播
            this.newSong = res.data.data.blocks[5].creatives  // 新歌新碟
            this.charts = res.data.data.blocks[3].creatives // 排行榜
            this.songSheet = res.data.data.blocks[1].creatives.slice(1,res.data.data.blocks[1].creatives.length) // 推荐歌单
            this.resources = res.data.data.blocks[1].creatives[0].resources 
            this.resourceData = this.resources[0].uiElement.mainTitle.title
            // console.log( this.resources);
        })
        // 每日推荐
        axios.get('https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/homepage/dragon/ball').then(res => {
            // console.log(res);
            this.commend = res.data.data
            // console.log(this.commend);
        })
        // 音乐日历
        axios.get('https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/calendar?startTime=1606752000000&endTime=1609430399999').then(res => {
            this.date = res.data.data.calendarEvents.slice(8,10);
            // console.log(this.date);
        })
        // 搜索框搜索数据
        const res = await fetchSearchDefault();
        this.defaultSearch = res.data.data
        // console.log(this.defaultSearch);
        // 登录
        const res1 = await getUserAccount();
        // console.log(res1);
        // 用户详情
        const detail = await getUserDetail(res1.data.profile.userId);
        this.account = res1.data.profile
        this.userName = res1.data.profile.nickname
        // console.log(this.account,this.userName);
    },
    watch: {
        userSearchkeywords:_.debounce(async function(keywords) {
            const res = await fetchSeachSuggest(keywords);
            // console.log(res);
            this.SeachSuggestList = res.data.result.songs
        },200) 
    }
}
</script>
<style>
    input::placeholder {
        font-size: 0.8vw;
    }

    .swiper-pagination-bullet {
        background-color: #fff;
    }

    .swiper-horizontal>.swiper-pagination-bullets {
        bottom: 0px;
    }

    img {
        max-width: none;
    }

    .red-image {
        filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
    }

    /* .trunca {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    } */

    .line {
        border: 1px solid #ebedf2;
        padding-top: 3vw;
        box-sizing: border-box;
    }

    .hot {
        background: rgb(129,172,222);
        background: linear-gradient(90deg, rgba(129,172,222,0.7987570028011204) 7%, rgba(237,168,197,0.7791491596638656) 85%);
    }

    main {
        overflow: hidden;
    }

    .shadow {
        --tw-shadow: 0 -2px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
    
    .abc-enter{
        opacity: 0;
        transform: translateY(100%) scale(.7);
    }

    .abc-enter-active{
        transition: all ease-in-out .6s;
    }

    .abc-enter-to{
        opacity: 1;
        transform: translateY(0%) scale(1);
    }

    .abc-leave{
        transform: translateY(0) scale(1);
    }

    .abc-leave-active{
        transition: all ease-in-out .6s;
    }

    .abc-leave-to{
        transform: translateY(-100%) scale(.7);
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
