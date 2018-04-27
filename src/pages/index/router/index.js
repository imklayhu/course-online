import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import signin from '@/components/signin'
// import todo from '@/components/todo'
import greetings from '@/components/greetings'
import profile from '@/components/profile'
import CourseOnline from './../../../modules/CourseOnline.vue';
import Community from './../../../modules/Community.vue';
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'greetings',
      component: greetings,
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/course',
      name: 'course',
      component: CourseOnline
    },
    {
      path: '/bbs',
      name: 'bbs',
      component: Community
    }
  ]
})
