import SeachView from '@/views/SeachView/SeachView.vue';
import HomeView from '@/views/HomeView/HomeView.vue';
import SongSheet from '@/views/SongSheet/SongSheet.vue';
export default [
    // 路径重定向
    {
      path: '/',
      redirect: '/HomeView',
    },
    {
      path: '/SeachView/',
      component: SeachView,
    },
    {
        path: '/HomeView/',
        component: HomeView,
    },
    {
      path: '/SongSheet/',
      component: SongSheet,
    },
    {
      path: '/Login/',
      // 懒加载
      component:() => import('@/views/LoginView/Login.vue')
    },
    {
      path: '/User/',
      // 懒加载
      component:() => import('@/views/UserView/User.jsx')
    },
    {
      path: '/Editorial/',
      // 懒加载
      component:() => import('@/views/EditorialView/Editorial.jsx')
    },
    {
      path: '/Play/',
      // 懒加载
      component:() => import('@/components/Player/player.vue')
    },
    {
      path: '/playHome/',
      // 懒加载
      component:() => import('@/views/playHome/playHome.vue')
    }
];