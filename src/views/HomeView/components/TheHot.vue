<template>
    <div>
        <div>
            <p class="flex items-center w-[47vw] mb-[1.3vw]">
                <Icon icon="solar:chat-round-like-linear" width="20" class="dark:text-[#f0f0f0]  text-[color:#333333]" />
                <span class="dark:text-[#fff] text-[color:#333333] ml-[1.3vw]">最令你感动的那首歌</span>
            </p>
            <p class="dark:text-[#c9c9c9] text-[color:#333333] ">484万热度</p>
        </div>
        <div class="flex justify-between w-[100%] mt-[5vw]">
            <div>
                <p class="dark:text-[#ececec] text-[color:#333333] ">Saint_Denis:今日份的感动</p>
                <p class="dark:text-[#ececec] text-[color:#333333]">"我希望我们能永远真诚且热烈"</p>
            </div>
            <div>
                <img src="http://p1.music.126.net/JtMBJSd2ZFtarcVTAYjUFQ==/109951165550061432.jpg" alt="" class="w-[14vw] h-[14vw] rounded-xl">
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['hot'],
    }
</script>