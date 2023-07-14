import styled from 'styled-components-vue';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn';//引入汉化包
import relativeTime from 'dayjs/plugin/relativeTime';
import BScroll from '@better-scroll/core';
import { areaList } from '@vant/area-data';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
import {getUserAccount,getUserDetail,getUserPlaylist,getIPAddr,ip2Territory,fetchUserHistory,fetchSongDetail,fetchFollow } from '@/request'
const Wrapper = styled.div``;
export default {
    render() {
        return (
            <div class="text-[1vw] bg-[#f4f4f4] pb-[3vw] box-border dark:bg-[#151515]">
                <header class="relative z-[0]" ref="wrapper">
                    <img src={this.userBgimg} alt="" class="h-[67.037vw] w-screen"/>
                    <div class="flex justify-between items-center absolute top-[6vw] left-1/2 transform -translate-x-1/2 w-[20.5vw]">
                            <p class="rounded-3xl w-[12vw] h-[5vw] bg-[#dedfdc] text-center py-[0.5vw] box-border">照片墙</p>
                            <p class="rounded-full w-[3vw] h-[3vw] bg-[#a19c96]"></p>
                            <p class="rounded-full w-[1.8vw] h-[1.8vw] bg-[#a19c96]"></p>
                        </div>
                    {this.over == false ? <div class="flex justify-between items-center fixed left-0 top-0 h-[11.5vw] w-screen px-[5.37vw] box-border z-[9999]">
                        <Icon icon="ph:arrow-left-light" color="#fffcfb" class="w-[6.6vw] h-[5.8vw]" nativeOnclick={() => {this.$router.push('/HomeView')}}/>
                        <Icon icon="mingcute:more-2-line" color="#fffcfb" class="w-[6.6vw] h-[5.8vw]"/>
                    </div> : <div class="flex justify-between items-center fixed left-0 top-0 h-[11.5vw] w-screen px-[5.37vw] z-[9999] box-border bg-[#fff] dark:bg-[#2c2c2c]">
                        <Icon icon="ph:arrow-left-light" class="w-[6.6vw] h-[5.8vw] text-[#333] dark:text-[#dfdfdf]" nativeOnclick={() => {this.$router.push('/HomeView')}}/>
                        <Icon icon="mingcute:more-2-line" class="w-[6.6vw] h-[5.8vw] text-[#333] dark:text-[#dfdfdf]"/>
                    </div>}
                </header>
                <section class="relative w-[91.574vw] rounded-xl mx-auto mt-[-5vw] mb-[3vw] border-t z-[9] pb-[5vw] dark:from-[#2c2c2c] dark:to-[#151515] bg-gradient-to-b from-[#fff] to-[#fff] " ref="top">
                    {/* 头像 */}
                    <div class="absolute top-[-10vw] left-1/2 transform -translate-x-1/2">
                        <img src={this.user?.avatarUrl} alt="" class="rounded-full w-[18vw] h-[18vw]"/>
                    </div>
                    {/* 信息 */}
                    <div class="flex justify-between flex-col mt-[10.7vw] mx-auto w-[50vw] h-[31.204vw] text-center">
                        <p class="text-center font-bold text-[4vw] dark:text-[#ededed]">{this.user?.nickname}</p>
                        <div class="flex w-[35vw] mx-auto dark:text-[#9e9e9e]">
                            <span class="w-[14vw] text-center">{this.userDetail.follows} 关注</span>
                            <span class="w-[14vw] border-l border-r border-[#ccc] text-center">{this.userDetail.followeds} 粉丝</span>
                            <span class="w-[14vw] text-center">Lv.{this.userLv}</span>
                        </div>
                        <div class="flex justify-between dark:text-[#ededed]">
                            <span class="px-[2vw] box-border border border-[#e6e6e6] rounded-[1.5vw]">IP:湖北</span>
                            <span class="px-[2vw] box-border border border-[#e6e6e6] rounded-[1.5vw]">{this.areaList.province_list[this.province]?.replace(/省|市/g,'')} {this.areaList.city_list[this.city]?.replace(/省|市/g,'')}</span>
                            <span class="px-[2vw] box-border border border-[#e6e6e6] rounded-[1.5vw]">村龄{Math.floor(this.userAge / 365)}年</span>
                        </div>
                        <div class="flex justify-between w-[30.7vw] mx-auto dark:text-[#ededed]">
                            <p class="w-[21vw] h-[7.8vw] leading-[7.8vw] border border-[#e6e6e6] rounded-xl text-center" onClick={this.editorial}>编辑资料</p>
                            <div class="rounded-full w-[8vw] h-[8vw] border border-[#e6e6e6] px-[1.4vw] py-[1.3vw] box-border text-center" onClick={() => this.followDiv = !this.followDiv}>
                                <Icon icon="iconamoon:arrow-up-2-light" verticalFlip={this.followDiv} class="w-[5vw] h-[5vw] text-[#2f2f2f] dark:text-[#fff]"/>
                            </div>
                        </div>
                    </div>
                    {/* 编辑资料旁边按钮的下面的按钮 */}
                    {this.followDiv === true ? <div class="mt-[3.7vw] ml-[3.7vw]">
                        <div class="overflow-hidden scroll-wrapper" ref="follow">
                            <ul class="flex justify-between items-center scroll-content w-[198vw]">
                                    {this.follow.map((item) => (
                                        <li class="scroll-item flex flex-col justify-between items-center w-[25vw] h-[35vw] py-[3vw] px-[3vw] bg-[#f6f6f6] dark:bg-[#1d1d1d] rounded-[3vw]">
                                            <div>
                                                <img src={item.img1v1Url} alt="" class="w-[11vw] h-[11vw] rounded-full"/>
                                            </div>
                                            <div class="">
                                                <p class="dark:text-[#efefef] text-center">{item.name}</p>
                                                <p class="text-[#797979]">你可能喜欢</p>
                                            </div>
                                            <div class="w-[14vw] h-[6vw] rounded-[3vw] flex justify-center items-center border border-[#f2482a]">
                                                <Icon icon="carbon:add" color="#f2482a" class="w-[5vw] h-[5vw]" />
                                                <span class="text-[#f2482a]">关注</span>
                                            </div>
                                        </li>)   
                                    )}
                                </ul>
                            </div>
                        </div> : <div></div>
                    }
                </section>
                {/* 选项 */}
                {this.overTop == false ? <div class="flex justify-between items-center w-100% px-[23.5vw] h-[10vw] py-[3vw] sticky top-[10vw] dark:text-[#ededed]">
                    <span>主页</span>
                    <span>动态</span>
                    <span>播客</span>
                </div> : <div class="flex justify-between items-center w-100% px-[23.5vw] h-[10vw] py-[3vw] sticky top-[10vw] z-[99] bg-[#fff] dark:text-[#ededed] dark:bg-[#151515]">
                    <span>主页</span>
                    <span>动态</span>
                    <span>播客</span>
                </div>}
                <section class="mt-[3.3vw] w-[91.574vw] mx-auto bg-[#fff] dark:bg-[#2c2c2c] rounded-xl pt-[5.5vw] box-border">
                    <div class="h-[53vw] pt-[2.5vw] px-[4.6vw] pb-[1.7vw] box-border">
                        <p class="font-bold text-[4vw] mt-[2.5vw] mb-[2.9vw] dark:text-[#e8e8e8]">音乐品味</p>
                        <div class="flex justify-between w-[84vw]">
                            <div class="w-[27vw] h-[35vw] rounded-xl flex flex-col justify-between p-[2.5vw] box-border bg-gradient-to-b from-[#fef3f2] to-[#fdfafa] dark:from-[#414141] dark:to-[#313131]">
                                <div>
                                    <p class="mb-[2.7vw] dark:text-[#b6b6b6]">我的喜欢</p>
                                    <p class="text-[4vw] text-[#a9a8ae] dark:text-[#dcdcdc]">{this.likeSong.trackCount}首</p>
                                </div>
                                <div class="flex items-center">
                                    <Icon icon="ph:heart-fill" color="#b2b0ae" class="w-[3vw] h-[3vw]"/>
                                    <span class="text-[#ded2d0]">喜欢的音乐</span>
                                </div>
                            </div>
                            <div class="w-[27vw] h-[35vw] rounded-xl flex flex-col justify-between p-[2.5vw] box-border bg-gradient-to-b from-[#faf7e7] to-[#fefef9] dark:from-[#414141] dark:to-[#313131]">
                                <div>
                                    <p class="mb-[2.7vw] dark:text-[#b6b6b6]">累计听歌</p>
                                    <p class="text-[4vw] text-[#a9a8ae] dark:text-[#dcdcdc]">{this.listenSongs}首</p>
                                </div>
                                <div class="flex items-center">
                                    <Icon icon="ep:histogram" color="#b2b0ae" class="w-[3vw] h-[3vw]"/>    
                                    <span class="text-[#ded2d0]">听歌排行</span>
                                </div>
                            </div>
                            <div class="w-[27vw] h-[35vw] rounded-xl flex flex-col justify-between p-[2.5vw] box-border bg-gradient-to-b from-[#f0f7fc] to-[#fcffff] dark:from-[#414141] dark:to-[#313131]">
                                <div>
                                    <p class="mb-[2.7vw] dark:text-[#b6b6b6]">本周关键词</p>
                                    <p class="text-[4vw] text-[#a9a8ae] dark:text-[#dcdcdc]">属于你的音乐文档</p>
                                </div>
                                <div class="flex items-center">
                                    <Icon icon="solar:hourglass-bold" color="#b2b0ae" class="w-[3vw] h-[3vw]"/>
                                    <span class="text-[#ded2d0]">黑胶时光机</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 创建歌单 */}
                {this.creatSong.length !=0 ? <section class="mt-[6.3vw] w-[91.574vw] mx-auto bg-[#fff] dark:bg-[#2c2c2c] rounded-xl pt-[5.5vw] box-border">
                    <div class="flex flex-col justify-between mx-[4.6vw] mb-[2vw]">
                        <p class="font-bold text-[4vw] mt-[2.5vw] mb-[2.9vw] dark:text-[#e8e8e8]">创建歌单<span class="dark:text-[#808080]">（{this.creatSong.length}）</span></p>
                        <div class="flex flex-col justify-between">
                            {this.creatSong.map((item,index) => (
                                index <5 ? <div class="flex items-center mb-[2.7vw]">
                                    <div class="mr-[3.2vw]">
                                        <img src={item.coverImgUrl} alt="" class="w-[12.5vw] h-[12.5vw] rounded-[1.8vw]"/>
                                    </div>
                                    <div class="">
                                        <p class="dark:text-[#efefef]">{item.name}</p>
                                        <p class="dark:text-[#797979]">{item.trackCount}首，播放{item.playCount}次</p>
                                    </div>
                                </div> : <div></div>)
                            )}
                        </div>
                    </div>
                    {this.collectSong.length < 5 ? <div class="text-center flex justify-center items-center border-t border-[#ebebeb] dark:border-[#414141] text-[#a0a0a0] h-[11vw]">
                        查看全部 
                        <Icon icon="ep:arrow-left" color="#a0a0a0" horizontalFlip="true" class="w-[5vw] h-[5vw]"/>
                    </div> : <div></div>}
                </section> : <section></section>}
                {/* 收藏歌单 */}
                {this.collectSong.length !=0 ? <section class="mt-[6.3vw] w-[91.574vw] mx-auto bg-[#fff] dark:bg-[#2c2c2c] rounded-xl pt-[5.5vw] box-border">
                    <div class="flex flex-col justify-between mx-[4.6vw] mb-[2vw]">
                        <p class="font-bold text-[4vw] mt-[2.5vw] mb-[2.9vw] dark:text-[#e8e8e8]">收藏歌单<span class="dark:text-[#808080]">（{this.collectSong.length}）</span></p>
                        <div class="flex flex-col justify-between">
                            {this.collectSong.map((item,index) => (
                                index <10 ? <div class="flex items-center mb-[2.7vw]">
                                    <div class="mr-[3.2vw]">
                                        <img src={item.coverImgUrl} alt="" class="w-[12.5vw] h-[12.5vw] rounded-[1.8vw]"/>
                                    </div>
                                    <div class="">
                                        <p class="dark:text-[#efefef]">{item.name}</p>
                                        <p class="dark:text-[#797979]">{item.trackCount}首，播放{this.dataTruncation(item.playCount)}次</p>
                                    </div>
                                </div> : <div></div>)   
                            )}
                        </div>
                    </div>
                    {this.collectSong.length > 12 ? <div class="text-center flex justify-center items-center border-t border-[#ebebeb] dark:border-[#414141] text-[#a0a0a0] h-[11vw]">
                        查看全部 
                        <Icon icon="ep:arrow-left" color="#a0a0a0" horizontalFlip="true" class="w-[5vw] h-[5vw]"/>
                    </div> : <div></div>}
                </section> : <section></section>}
                {/* 我的评论 */}
                {this.history.length !=0 ? <section class="mt-[6.3vw] w-[91.574vw] mx-auto bg-[#fff] dark:bg-[#2c2c2c] rounded-xl pt-[5.5vw] box-border">
                    <div class="flex flex-col justify-between mx-[4.6vw] mb-[2vw]">
                        <div class="font-bold text-[4vw] mb-[2.9vw] flex justify-between items-center">
                            <p class="dark:text-[#e8e8e8]">我的评论<span class="dark:text-[#808080]">（{this.history.length}）</span></p>
                            <Icon icon="subway:lock-1" color="#a0a0a0" class="w-[5vw] h-[5vw]"/>
                        </div>
                        <div class="flex flex-col justify-between">
                            <div class="">
                                <div class=" flex justify-between items-center mb-[2vw]">
                                    <div class="flex items-center">
                                        <img src={this.picUrl} alt="" class="w-[7vw] h-[7vw] rounded-[1.8vw] mr-[1.5vw]"/>
                                        <p class="dark:text-[#808080]">单曲 {this.music.name}</p>
                                    </div>
                                    <Icon icon="icon-park-outline:good-two" color="#a0a0a0" class="w-[5vw] h-[5vw]"/>
                                </div>
                                <p class="mb-[2vw] dark:text-[#e8e8e8]">{this.history[0]?.content}</p>
                                <p class="mb-[2vw] dark:text-[#808080]">{this.time}</p>
                            </div>
                        </div>
                    </div>
                    {this.history.length >= 2 ? <div class="text-center flex justify-center items-center border-t border-[#ebebeb] dark:border-[#414141] text-[#a0a0a0] h-[11vw]">
                        查看全部 
                        <Icon icon="ep:arrow-left" color="#a0a0a0" horizontalFlip="true" class="w-[5vw] h-[5vw]"/>
                    </div> : <div></div>}
                </section> : <section></section>}
                {/* 基本信息 */}
                <section class="mt-[6.3vw] w-[91.574vw] mx-auto bg-[#fff] dark:bg-[#2c2c2c] rounded-xl pt-[5.5vw] box-border">
                    <div class="flex flex-col justify-between mx-[4.6vw] mb-[2vw]">
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-[4vw] dark:text-[#e8e8e8]">基本信息</span>
                            <span class="w-[20.37vw] h-[6.9vw] rounded-xl border border-[#e5e5e5] text-center py-[1.3vw] dark:text-[#e8e8e8]">{this.userCd}</span>
                        </div>    
                        <p class="text-[#7d7d7d] h-[9vw] leading-[9vw] dark:text-[#e8e8e8]">村龄：{Math.floor(this.creatDays / 356)}年（{this.timestamp(this.creatAccount)}注册）</p>
                        <p class="text-[#7d7d7d] h-[9vw] leading-[9vw] dark:text-[#e8e8e8]">性别：{this.getGender(this.gender)}</p>
                        <p class="text-[#7d7d7d] h-[9vw] leading-[9vw] dark:text-[#e8e8e8]">地区：河南 许昌</p>   
                        <p class="text-[#7d7d7d] h-[9vw] leading-[9vw] dark:text-[#e8e8e8]">个人简介：{this.userDetail.signature}</p>
                    </div>
                    <div class="text-center flex justify-center items-center border-t border-[#ebebeb] dark:border-[#414141] text-[#a0a0a0] h-[11.57vw]">
                        查看全部 
                        <Icon icon="ep:arrow-left" color="#a0a0a0" horizontalFlip="true" class="w-[5vw] h-[5vw]"/>
                    </div>
                </section>
            </div>
        )
    },
    data() {
        return {
            account:{}, // 用户信息
            userBgimg:'',
            user:null, // 用户信息具体数据
            userDetail:[], // 用户详情具体数据
            likeSong:[], // 我喜欢的歌
            likeSongTwo:[], 
            likeSongThree:[],
            userCd:'', // 村民证,
            creatSong:[], // 创建歌单
            collectSong:[], // 收藏歌单
            creatAccount:'', //创建账号的时间
            creatDays:'',
            gender:null,  // 性别
            listenSongs:'', //累计听歌
            history:[], //历史歌曲,
            music:'',
            picUrl:'',
            time:'', // 评论时间
            over:false, // 顶部
            overTop:false, // 吸顶 
            checked:null, // 暗黑模式
            areaList, // 地区数据
            province:'', // 省份
            city:'', // 城市
            follow:[], // 关注数组
            followDiv:false, // 编辑下的东西
        }
    },
    // updated() { 
    //     this.bs.refresh();
    // },
    async created() {
        console.log(this.areaList);
        // 登录
        const res1 = await getUserAccount();
        this.user = res1.data.profile
        this.userBgimg = res1.data.profile.backgroundUrl
        // console.log(this.userBgimg);
        // console.log(res1);
        // console.log(this.user);
        // 用户详情
        const detail = await getUserDetail(res1.data.profile.userId);
        this.userLv = detail.data.level  // 用户等级
        this.userDetail = detail.data.profile  // 用户详情数据
        this.userAge = detail.data.createDays 
        this.userCd = detail.data.profileVillageInfo.title // 村民证
        this.gender = detail.data.profile.gender // 性别
        this.listenSongs = detail.data.listenSongs// 累计听歌
        this.province =  detail.data.profile.province
        this.city =  detail.data.profile.city
        console.log(this.city,detail,this.province);
        // console.log(detail);
        // 创建账号的时间
        this.creatAccount = detail.data.createTime
        this.creatDays = detail.data.createDays
        // console.log(this.userDetail);
        // 个人主页
        const res2 = await getUserPlaylist(detail.data.profile.userId);
        this.likeSong = res2.data.playlist[0] // 我喜欢的歌
        this.likeSongTwo = res2.data.playlist[1]
        this.likeSongThree = res2.data.playlist[2]
        // console.log(this.likeSong);
        // console.log(res2);
        // 创建歌单
        this.creatSong = res2.data.playlist.filter(item => !item.subscribed)
        // console.log(this.creatSong);
        // console.log(res2.data.playlist);
        // 收藏歌单
        this.collectSong = res2.data.playlist.filter(item => item.subscribed)
        // console.log(this.collectSong);
        // 地址
        this.ip = getIPAddr().then(res=>{ip2Territory(res.data.ip).then(res => this.ip = res.data)})//ip
        // console.log(this.ip);
        // 评论
        // const userHistory = await getUserHistory(res1.data.profile.userId);
        // this.history = userHistory.data.data.comments;
        
        //用户历史评论
        const res5 = await fetchUserHistory(res1.data.account.id);
        if(res5.data.data.comments.length != 0) {
            this.history = res5.data.data.comments //评论
            this.music = JSON.parse(this.history[0].resourceInfo);//评论的歌曲信息
            this.time = dayjs(this.history[0].time).fromNow().replace(' ','');// 时间戳
            const img = await fetchSongDetail(this.music.id);//歌曲信息
            this.picUrl = img.data.songs[0].al.picUrl;//歌曲图片
        }

        // 关注
        const res6 = await fetchFollow();
        this.follow = res6.data.artists.splice(0,7)
        console.log(res6,this.follow);

    },
    methods: {
        // 到编辑页面
        editorial() {
            this.$router.push('/Editorial')
        },
        // 切换单位
        dataTruncation(playVolume) {
            if (playVolume > 100000000) {
                return `${Math.floor(playVolume / 100000000)}亿`;
            } else if (playVolume > 100000) {
                return `${Math.floor(playVolume / 10000)}万`;
            } else {
                return playVolume;
            }
        },
        // 注册时间
        timestamp(times) {
            const data = new Date(times);
            const year = data.getFullYear();
            const month = data.getMonth() + 1;
            return `${year}年${month}月`
        },
        // 根据数据判断男女
        getGender(num) {
            if(num === 1) {
                return '男'
            }else if (num === 2) {
                return '女'
            }else {
                return
            }
        },
        // 判断高度
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            
            // 如果滚动高度超过阈值，则固定在顶部；否则取消固定
            this.over = scrollTop > this.$refs.wrapper.offsetHeight ? true : false;
            this.overTop = scrollTop > this.$refs.top.offsetHeight + this.$refs.wrapper.offsetHeight ? true : false;
            // console.log(this.over);
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
        this.init(this.$refs.follow);  
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}