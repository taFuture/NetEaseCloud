<template>
    <div class="w-[40px] h-[20px] rounded-[15px] bg-[#cecece]" :class="`${value ? 'bg-[#cecece] ' : 'bg-[#2196F3]'}`" @click="toggle">
        <div class="w-[20px] h-[20px] rounded-[15px] bg-white transition-all" :class="`${value ? 'translate-x-[20px] ' : 'translate-x-0'}`"></div>
    </div>
</template>
<script>
    export default {
        // model主要是去配置v-model指令所需要使用的属性名和事件名的
        model:{
            prop:'value',
            event:'input',
        },
        props:{
            value: {
                type:Boolean,
                require:true,
            }
        },
        methods:{
            toggle() {
                // 触发自身的input1方法
                this.$emit('input',!this.value)
            },
        }
    }
</script>

