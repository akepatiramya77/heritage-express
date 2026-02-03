<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <header class="flex justify-between items-center px-8 py-4 bg-indigo-600 text-white">
      <h1 class="text-xl font-bold">🚆 Heritage Express</h1>

      <button
        @click="toggleDark"
        class="bg-white text-indigo-600 px-3 py-1 rounded"
      >
        {{ dark ? '☀ Light' : '🌙 Dark' }}
      </button>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const dark = ref(localStorage.getItem('dark') === 'true')

watch(dark, (v) => {
  document.documentElement.classList.toggle('dark', v)
  localStorage.setItem('dark', v)
})

const toggleDark = () => {
  dark.value = !dark.value
}
</script>
