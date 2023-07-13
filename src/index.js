import Vue from 'vue';
import './index.css';
import App from './App.vue';
import { Icon } from '@iconify/vue2';
import Drawer from '@/components/Drawer.vue'
import VStickyElement  from  'vue-sticky-element'; 
import router from '@/router';
import { Popup,Area,Button,DatetimePicker,Circle,NoticeBar} from 'vant';
import Player from '@/components/Player';
import 'vant/lib/index.css';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
Vue.use(Popup).use(Area).use(Button).use(DatetimePicker).use(Circle).use(NoticeBar);
Vue.use(Player)
Vue.use(VStickyElement);
Vue.component('VueSlider', VueSlider)
Vue.component('Icon', Icon);
Vue.component('Drawer', Drawer);
const vm = new Vue({
  el: '#app',
  router,
  components:{App},
  template:'<App/>',
  data: {
    swiper: null
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper(".mySwiper", {
        autoplay: true, // 自动播放
        disableOnInteraction: false, // 鼠标交互后不停止自动播放
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">'  + "</span>";
          },
        },
      });
    }
  }
});

// console.log(vm);
// 以_开头的变量名属性名是私有变量或属性，不希望他人使用
// 一般情况下：我们在实例化vue传递的配置项a ===> $a
// el ===> $el
// data ==> $data
// this.msg === this.$data.msg  对象属性代理
