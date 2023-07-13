<template>
    <div v-show="visible">
        <div class="fixed top-[50%] left-[50%] text-[3vw] text-center rounded-2xl bg-[white] w-[69.4vw] h-[35vw] translate-x-[-50%] translate-Y-[-40%] z-[1000]">
            <div class="pt-[5.7vw] leading-[5vw] font-bold text-[4vw]">{{title}}</div>
            <div>
                <div class="pt-[2.131vw] box-border mb-[6vw]">{{msg}}</div>
            </div>
            <div class="flex text-center items-center h-[11.279vw] border-t border-[#ebedf0] cursor-pointer">
                <div class="flex-1 border-r border-[#ebedf0] h-[11.279vw] leading-[11.279vw]" @click="cancle">
                    <span class="text-[#0c73fb] text-[3vw] font-bold">取消</span>
                </div>
                <div class="flex-1 h-[11.279vw] leading-[11.279vw]" @click="confirm">
                    <span class="text-[#0c73fb] text-[3vw] font-bold">确认</span>
                </div>
            </div>
        </div>
        <!-- 蒙版 -->
        <div class="w-screen h-screen bg-black opacity-20 fixed top-0 right-0 bottom-0 left-0 z-[999]" v-if="visible"></div>
    </div>
</template>
<script>
    export default {
        name:'Dialog',
        data() {
            return {
                visible:false,
            }
        },  
        methods:{
            hide() {
                this.visible = false
            },
            cancle() {
                this.hide();
                this.reject();
            },
            confirm() {
                this.hide();
                this.resolve();
            }
        },
    }
</script>