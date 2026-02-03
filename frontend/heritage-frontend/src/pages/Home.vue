<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Explore Heritage Journeys</h1>

    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <h3 class="text-xl font-semibold">{{ pkg.name }}</h3>
        <p class="text-sm text-gray-500">
          Runs on {{ pkg.running_day }} • {{ pkg.duration }} days
        </p>

        <router-link
          :to="`/package/${pkg.id}`"
          class="inline-block mt-4 text-indigo-600 font-semibold"
        >
          View Journey →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const packages = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:5000/api/packages')
  packages.value = await res.json()
})
</script>
