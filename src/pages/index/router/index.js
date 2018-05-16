import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import signin from '@/components/signin'
import greetings from '@/components/greetings'
import profile from '@/components/profile'
import CreateNewTask from '@/components/course/CreateNewTask'
import CreateNewTeam from '@/components/course/CreateNewTeam'
import CreateNewGroup from '@/components/course/CreateNewGroup'

// import TasksList from '@/components/course/TasksList'
import TaskDetails from '@/components/course/TaskDetails.vue'
import CheckingTasksList from '@/components/course/CheckingTasksList'
import SlovedTasksList from '@/components/course/SlovedTasksList'
import ProcessingTasksList from '@/components/course/ProcessingTasksList'

import CourseOnline from './../../../modules/CourseOnline.vue'
import Community from './../../../modules/Community.vue'
import communityHome from '@/components/community/communityHome'
import topicDetail from '@/components/community/topicDetail'

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
      component: CourseOnline,
      children: [{
          path: '',
          name: '',
          component: ProcessingTasksList
        },
        {
          path: 'create',
          name: 'create',
          component: CreateNewTask
        },
        {
          path: 'create/class',
          name: 'createClass',
          component: CreateNewTeam
        },
        {
          path: 'create/group',
          name: 'createGroup',
          component: CreateNewGroup
        },
        {
          path: 'processing',
          name: 'processing',
          component: ProcessingTasksList
        },
        {
          path: 'processing/:id',
          name: 'processDetial',
          component: TaskDetails,
          props: true
        },
        {
          path: 'checking',
          name: 'checking',
          component: CheckingTasksList
        },
        {
          path: 'checking/:id',
          name: 'checkDetail',
          component: TaskDetails,
          props: true
        },
        {
          path: 'sloved',
          name: 'sloved',
          component: SlovedTasksList
        },
        {
          path: 'sloved/:id',
          name: 'slovedDetail',
          component: TaskDetails,
          props: true
        },
      ]
    },
    {
      path: '/community',
      name: 'community',
      component: Community,
      children:[
        {
          path: '',
          name: '',
          component: communityHome
        },
        {
          path: '/community/:id',
          name: 'detail',
          component: topicDetail,
          props: true
        }
      ]
    },
  ]
})
