import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

// Pages
import Login from '@/pages/auth/Login.vue'
import Home from '@/pages/Home.vue'
import PackageDetails from '@/pages/PackageDetails.vue'
import AdminDashboard from '@/pages/admin/Dashboard.vue'
import RouteEditor from '@/pages/admin/RouteEditor.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/package/:id',
    component: PackageDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/package/:id/routes',
    component: RouteEditor,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/package/:id/pricing',
    component: () => import('@/pages/admin/PricingEditor.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 AUTH GUARD
router.beforeEach((to) => {
  const auth = useAuthStore()

  // ✅ Always allow login & register
  if (to.path === '/login' || to.path === '/register') {
    return true
  }

  // 🔐 Protected routes
  if (to.meta.requiresAuth && !auth.token) {
    return '/login'
  }

  // 🔐 Role-based protection
  if (to.meta.role && auth.role !== to.meta.role) {
    return '/'
  }

  return true
})


export default router
