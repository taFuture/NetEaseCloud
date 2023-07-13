<template>
    <div class="w-screen" :class='{dark:darkMode}'>
      <router-view />
      <!-- 播放器 -->
      <Player class="fixed bottom-0 w-[100%] z-[30]" v-if="showPlayer"></Player>
      <!-- 菜单 -->
      <!-- <Mymenu v-show="!showBottom"></Mymenu> -->
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
        return this.$route.path !== '/playHome' && this.$route.path !== '/User' && this.$route.path !== '/Editorial'
      }
    },

  };
  </script>
