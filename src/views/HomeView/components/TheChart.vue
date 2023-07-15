<template>
    <div>
        <div>
            <span class=" font-bold dark:text-[#f0f0f0]  text-[color:#333333]">{{charts.uiElement.mainTitle?.title}}</span>
            <Icon icon="ep:arrow-left-bold" width="10" :horizontalFlip="true" :verticalFlip="true" class="inline-block dark:text-[#f0f0f0]  text-[color:#333333]"/>
            <span class="float-right  leading-[8vw] dark:text-[#f0f0f0]  text-[color:#333333]">{{charts.uiElement.mainTitle?.titleDesc}}</span>
        </div>
        <div v-for="(key,index) in charts.resources" :key="key.id" class="flex justify-between mt-[2.8vw]">
            <div class="flex w-[81vw]">
                <div>
                    <img :src="key.uiElement.image.imageUrl" alt="" class="w-[10vw] h-[10vw] rounded-lg mr-5">
                </div>
                <div class="mr-[4vw] leading-[11vw] font-bold" :style="{ 'color': getNodeColor(index) }">{{index + 1}}</div>
                <div class="flex flex-col justify-around mr-[5vw]">
                    <p class="w-[47vw] font-bold truncate text-[4vw] dark:text-[#f0f0f0]  text-[color:#333333]">{{key.uiElement.mainTitle.title}}</p>
                    <p class="dark:text-[#f0f0f0]  text-[color:#333333]">{{key.resourceExtInfo?.artists[0].name}}</p>
                </div>
                <div class="flex items-center justify-center">
                    <div class="text-center w-[8vw]" :style="{ 'color': getThemeColor(key.uiElement.labelText.text)}">{{key.uiElement.labelText.text}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['charts'],
        methods: {
            getNodeColor(index) {
                if(index === 0) {
                    return "#c49125"
                }else if(index === 1) {
                    return "#7eb2ab"
                }else {
                    return "#ccc"
                }
            },
            getThemeColor(name) {
                if(name !== '新晋') {
                    return "red" 
                }else {
                    return "#2eb784"
                }
            },
        }
    }
</script>