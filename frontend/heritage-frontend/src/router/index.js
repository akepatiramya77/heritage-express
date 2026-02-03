import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

// Pages
import Login from '@/pages/auth/Login.vue'
import Home from '@/pages/Home.vue'
import PackageDetails from '@/pages/PackageDetails.vue'
import AdminDashboard from '@/pages/admin/Dashboard.vue'

const routes = [
  { path: '/login', component: Login },

  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/package/:id',
    component: PackageDetails,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next('/login')
  }

  if (to.meta.role && auth.role !== to.meta.role) {
    return next('/login')
  }

  next()
})

export default router
