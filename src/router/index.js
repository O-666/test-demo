import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HeadNavigation',
    component: () => import( '../views/HeadNavigation.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import( '../views/Home.vue')
      },
      {
        path: '/onlineMonitoring',
        name: 'OnlineMonitoring',
        component: () => import( '../views/OnlineMonitoring.vue')
      },
      {
        path: '/industryRegulationNavigation',
        name: 'IndustryRegulationNavigation',
        component: () => import( '../views/IndustryRegulationNavigation.vue'),
        children:[
          {
            path: '/industryRegulation',
            name: 'IndustryRegulation',
            component: () => import( '../components/IndustryRegulation.vue')
          },
          {
            path:'/infraredCodeLibrary',
            name: 'InfraredCodeLibrary',
            component: () => import( '../components/InfraredCodeLibrary.vue')
          }
        ]
      },
      {
        path: '/forecastWarning',
        name: 'ForecastWarning',
        component: () => import( '../views/ForecastWarning.vue')
      },
      {
        path: '/visualAnalysis',
        name: 'VisualAnalysis',
        component: () => import( '../views/VisualAnalysis.vue')
      },
      {
        path: '/systemManagement',
        name: 'SystemManagement',
        component: () => import( '../views/SystemManagement.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
