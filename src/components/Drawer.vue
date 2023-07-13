<template>
    <div @click="clickHandler">
        <transition :name="direction">
            <div>
                <div v-show="visible" class="block fixed z-[999] bottom-0 left-0 right-0 dark:bg-[#333] bg-[#fff]" :style="[drawerContentStyle,{width}] " >
                    <div>
                        <slot name="header">
                            <div class="flex justify-between items-center mx-[4vw] pt-[4vw] box-border">
                                <p class="text-[#abaeab] dark:text-[#f0f0f0] text-[3.5vw]">{{title}}</p>
                                <Icon @click.native="closeDrawer" icon="prime:times" width="20" :horizontalFlip="true" class="dark:bg-[#000] bg-[#D3D3D3] dark:text-[#f0f0f0]  text-[color:#333333] rounded-full"/>
                            </div>
                        </slot>
                    </div>
                    <div>
                        <slot>主要内容</slot>
                    </div>
                </div>
            </div>
        </transition>
        <div class="w-screen h-screen bg-black opacity-20 fixed top-0 right-0 bottom-0 left-0 z-[998] drawer" ref="drawerMask" v-if="visible"></div>
    </div>
</template>
<script>
export default {
    // 单项数据流(父级通过props传递给子组件的数据 子组件没有权利修改)
    props:{
        visible:{
            type:Boolean,
            require:true,
        },
        title:{
            type:String,
            default:'默认标题'
        },
        direction:{
            type:String,
            valodator(direction) {
                return ['ttb','btt','ltr','rtl'].includes(direction);
            },
        },
        width:{
            type:[Number,String],
            default:'85vw'
        }
    },
    // 计算属性
    computed:{
        drawerContentStyle() {
            if(this.direction === 'btt') {
                return {
                    with:'100vw',
                    left:0,
                    bottom:0,
                    borderTopLeftRadius:"5vw",
                    borderTopRightRadius:"5vw",
                    // backgroundColor:"#fff"
                }
            }else if(this.direction === 'ttb') {
                return {
                    with:'100vw',
                    left:0,
                    top:0
                }
            }else if(this.direction === 'ltr') {
                return {
                    height:'100vh',
                    left:0,
                    top:0,
                    backgroundColor:"#f5f5f5",
                    paddingTop:'0',
                    
                    // position:'relative',
                }
            }else if(this.direction === 'rtl') {
                return {
                    height:'100vh',
                    right:0,
                    top:0
                }
            }
        }
    },
    methods: {
        closeDrawer() {
            this.$emit('update:visible',false)
        },
        clickHandler(e) {
            if(e.target === this.$refs.drawerMask) {
                // this.visible = false;
                // 使用vm.$emit与父组件传递数据
                this.closeDrawer()
            }
        }
    }    
}
</script>
<style> 
    .btt-enter,.btt-leave-to {
        transform: translateY(110%);
    }

    .btt-enter-active,
    .btt-leave-active {
        transition: all ease-in-out 0.5s;
    }

    .btt-enter-to,.btt-leave {
        transform: translateY(0);
    }

    .ltr-enter,.ltr-leave-to {
        left: 0vw;
        transform: translateX(-110%);
    }

    .ltr-enter-active,
    .ltr-leave-active {
        transition: all ease-in-out 0.5s;
    }

    .ltr-enter-to,.ltr-leave {
        left: 80vw;
        transform: translateX(0);
    }
</style>