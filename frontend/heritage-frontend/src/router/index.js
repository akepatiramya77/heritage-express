import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PackageDetails from '../pages/PackageDetails.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/package/:id', component: PackageDetails }
  ]
})
