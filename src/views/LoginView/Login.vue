<template>
    <div>
        <div class="h-screen bg-[#fefefe]">
            <header class="flex justify-between mx-[5.5vw] items-center h-[13vw] pt-[5vw] box-border">
                <Icon icon="uiw:left" class="w-[9vw] h-[9vw]" @click.native="Home"/>
                <span class="text-[#6b6b6b] text-[5vw]">游客登录</span>
            </header>
            <section class="mt-[12vw] w-[43vw] mx-auto text-center">
                <img src="/static/logo.fill.svg" alt="" class="w-[38vw] h-[7.179] mx-auto">
                <div v-if="code === 801">
                    <div class="relative w-[39vw] h-[40vw] mx-auto">
                        <img :src="qcrode" alt="" class="w-[39vw] h-[40vw] mt-[9.5vw] mx-auto z-0">
                    </div>
                    <p class="text-[#000] mt-[11vw] text-[3vw]">使用<span class="text-[#1872a9]">网易云音乐APP</span>扫码登录</p>
                </div>
                <div v-if="code === 802">
                    <div class="relative w-[39vw] h-[40vw] mx-auto">
                        <img src="/static/success.png" alt="" class="w-[39vw] h-[40vw] mt-[9.5vw] mx-auto z-0">
                    </div>
                    <p class="text-[#000] mt-[5vw] text-[5vw]">扫码成功</p>
                    <p class="mt-[5vw]">请在手机上确认登录</p>
                </div>
                <div v-if="code === 800">
                    <div class="relative w-[39vw] h-[40vw] mx-auto">
                        <img :src="qcrode" alt="" class="w-[39vw] h-[40vw] mt-[9.5vw] mx-auto z-0">
                        <div class="absolute top-0 left-0 bg-[#ccc] bg-opacity-50 w-[39vw] h-[40vw]"></div>
                        <div class="w-[20vw] h-[7.6vw] rounded-3xl absolute top-[16vw] left-[10vw] bg-gradient-to-r from-[#fe5934] to-[#f11629] text-[#fff] text-center text-[3.5vw] leading-[7.6vw]">点击刷新</div>
                    </div>
                    <p class="text-[#000] mt-[11vw] text-[3vw]">使用<span class="text-[#1872a9]">网易云音乐APP</span>扫码登录</p>
                </div>
            </section>
            <section class="fixed bottom-0">
                <img src="/static/login_bg.png" alt="" class="w-screen">
            </section>
        </div>
    </div>
</template>
<script>
    import { getQRkey,getQRInfo,checkQrStatus } from '@/request'
    import store from 'storejs'
    export default {
        data() {
            return {
                qcrode:'',
                code:null,
            }
        },
        methods:{
            // 返回主页面
            Home() {
                this.$router.push('/HomeView');
                console.log(111);
            },
            pollingCheck(key,interval = 1000) {
                const timer = setInterval(async() => {
                    const res = await checkQrStatus(key);   
                    this.code = res.data.code;
                    if(res.data.code === 800) {
                        // alert('此二维码已过期，请刷新后重试');
                        clearInterval(timer);
                    }else if(res.data.code === 803) {
                        clearInterval(timer);
                        // console.log(res.data.cookie);
                        store.set('__m__cookie',res.data.cookie)
                        this.$router.push('/HomeView')
                    }
                },interval);
                this.$on('hook:beforeDestroy',() => clearInterval(timer))
            }
        },
        async created() {
            const res = await getQRkey().catch(err => {
                console.log(err);
            })
            const qrInfo = await getQRInfo(res.data.data.unikey).catch((err) => {
                console.log(err);
            })
            // console.log(res.data.data.unikey);
            // console.log(qrInfo);
            this.qcrode = qrInfo.data.data.qrimg;
            this.pollingCheck(res.data.data.unikey)
        },
        
    }
</script>