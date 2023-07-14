<template>
  <div class=" overflow-hidden mt-[5.5vw] ml-[3.7vw]">
    <van-swipe class="rotationChart" :loop="false" :width="slideWidth">
      <van-swipe-item v-for="item in List" :key="item.id" class="w-[61.172vw] px-[4vw] pt-[2vw] bg-[#fff] dark:bg-[#31333a] rounded-[2vw] mr-[2.344vw]">
        <!-- 标题开始 -->
        <div class="w-[100%] h-[12.422vw] flex items-center border-b border-b-[#eaeaea] dark:border-b-[#43454c]">
          <span class="text-[4vw] text-[#000] dark:text-[#fff] mr-[3.359vw]">{{item.name}}</span>
          <div class="h-[5.235vw] bg-[#f3f4f1] dark:bg-[#393b42] flex items-center px-[2vw] rounded-[3vw]">
            <Icon icon="solar:play-bold" class="text-[#000] dark:text-[#fff] mr-[0.7vw] text-[2.6vw]"/>
            <span class="text-[2.6vw] text-[#000] dark:text-[#fff]">播放</span>
          </div>
        </div>
        <!-- 标题结束 -->
        <div class="py-[0.5vw]">
          <div v-for="(key, index) in item.tracks.slice(0,20)" :key="key.id" class="my-[2.7vw] flex items-center">
            <span class="text-[3.2vw] mr-[4vw]" :class="{ text_ff2c41d: index < 3, text_7d848d: index >= 3 }">{{ index+1 }}</span>
            <span class="w-[35.7vw] text-[3.2vw] text-[#000] dark:text-[#fff] mr-[1vw] truncate" :class="{ 'bold': index <= 2 }">{{key.name}}</span>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  props:["List"],
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
  },
  computed: {
    // 轮播图计算宽度
    slideWidth() {
      return `${window.innerWidth * 0.7}`; // 将宽度设置为视窗宽度的80%
    },
  },
};
</script>

<style lang="less">
.text_ff2c41d {
  color: #ff2c41;
}

.text_7d848d {
  color: #7d848d;
}

.rotationChart .van-swipe__indicators {
  display: none;
}
</style>
