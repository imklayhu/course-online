import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import signin from '@/components/signin'
import greetings from '@/components/greetings'
import profile from '@/components/profile'
import CreateNewTask from '@/components/course/CreateNewTask'
import CreateNewTeam from '@/components/course/CreateNewTeam'
import CreateNewGroup from '@/components/course/CreateNewGroup'
import TasksList from '@/components/course/TasksList'
import ProcessingTasks from '@/components/course/Processing'
import CheckingTasks from '@/components/course/CheckingTask'
import SlovedTasks from '@/components/course/SlovedTask'
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
          component: TasksList
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
          component: TasksList
        },
        {
          path: 'processing/:id',
          name: 'processDetial',
          component: ProcessingTasks
        },
        {
          path: 'checking',
          name: 'checking',
          component: TasksList
        },
        {
          path: 'checking/:id',
          name: 'checkDetail',
          component: CheckingTasks
        },
        {
          path: 'sloved',
          name: 'sloved',
          component: TasksList
        },
        {
          path: 'sloved/:id',
          name: 'slovedDetail',
          component: SlovedTasks
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
          component: topicDetail
        }
      ]
    },
  ]
})
