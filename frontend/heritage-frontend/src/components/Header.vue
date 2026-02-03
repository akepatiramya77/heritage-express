<template>
  <header class="flex justify-between items-center px-8 py-4 bg-indigo-700 dark:bg-indigo-900 text-white">
    <h1 class="text-xl font-bold">🚆 Heritage Express</h1>

    <div class="flex items-center gap-4">
      <span class="text-sm">
        {{ auth.name }} ({{ auth.role }})
      </span>

      <button
        @click="logout"
        class="px-3 py-1 bg-white text-indigo-700 rounded font-semibold"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>
