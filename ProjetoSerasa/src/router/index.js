import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SelectCompany from '../components/SelectCompany.vue'
import PanelInfo from '../components/PanelInfo.vue'
import PanelDebt from '../components/PanelDebt.vue'
import PanelScore from '../components/PanelScore.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/SelectCompany',
    name: 'SelectCompany',
    component: SelectCompany
  },
  {
    path: '/PanelInfo',
    name: 'PanelInfo',
    component: PanelInfo
  },
  {
    path: '/PanelDebt',
    name: 'PanelDebt',
    component: PanelDebt
  },
  {
    path: '/PanelScore',
    name: 'PanelScore',
    component: PanelScore
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
