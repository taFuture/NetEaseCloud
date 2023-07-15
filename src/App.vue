<template>
    <div class="w-screen h-screen" :class='{dark:darkMode}'>
      <router-view />
      <div class="fixed bottom-0">
        <!-- 播放器 -->
        <Player class="w-[100%] z-[30]" v-if="showPlayer"></Player>
        <!-- 菜单 -->
        <van-tabbar v-model="active" route active-color="#f53d5b" inactive-color="#949ba1" class="dark:bg-[#1f2129]" v-if="showMenu">
          <van-tabbar-item replace to="/HomeView" icon="home-o">
            首页
            <template #icon>
              <Icon icon="ri:netease-cloud-music-fill" class="w-[5vw] h-[5vw]"/>
            </template>
          </van-tabbar-item>
          <van-tabbar-item replace to="/MV" icon="search">
            排行榜
            <template #icon>
              <Icon icon="ep:histogram" class="w-[5vw] h-[5vw]"/>
            </template>
          </van-tabbar-item>
          <van-tabbar-item replace to="/User" icon="friends-o">
            我的
            <template #icon>
              <Icon icon="mingcute:music-line" class="w-[5vw] h-[5vw]"/>
            </template>
          </van-tabbar-item>
          <van-tabbar-item replace to="/SeachView" icon="setting-o">
            关注
            <template #icon>
              <Icon icon="iconoir:user-love" class="w-[5vw] h-[5vw]"/>
            </template>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </template>
  <script>
  import Player from '@/components/Player/player.vue';
  import store from '@/store/index.js'
  export default {
    components:{Player},
    data() {
      return {
        showBottom:false
      }
    },
    computed:{
      darkMode(){
        return store.state.darkMode
      },
      showPlayer() {
        return this.$route.path !== '/playHome' && this.$route.path !== '/Editorial'
      },
      showMenu() {
        return this.$route.path !== '/SongSheet' && this.$route.path !== '/User' && this.$route.path !== '/Editorial' && this.$route.path !== '/SeachView' && this.$route.path !== '/MV'
      }
    },

  };
  </script>
  <style>
    .van-tabbar {
      height: 13vw !important;
    }

    .van-tabbar-item--active {
      color:#f53d5b !important;
    }

    .dark .van-tabbar-item {
      background-color: #1f2129;
    }

    .van-tabbar--fixed {
      position: static !important;
    }
  </style>
